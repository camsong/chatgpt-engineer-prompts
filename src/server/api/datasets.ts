import express, { Router, Request, Response } from "express";
import { Message, chatStreaming } from "../openai-client.ts";
import { dbPool } from "../db.ts";
import { DatasetGPT, DatasetResponse } from "../../shared/common-types.ts";
import { getCreateTableQuery, getIntlColumnNameByLLM, getTableSampleData } from "../openai-task.ts";

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response) => {
  console.log('get /list with query: ', req.query);
  return res.status(200).json({ code: 200, data: [], msg: '' });
})

router.get('/column-names', async (_: Request, res: Response) => {
  const data = await getIntlColumnNameByLLM('sales_data');
  return res.status(200).json({ code: 200, data: data, msg: '' });
})

/**
 * 带有尝试次数的 GPT 调用
 * @param messages 要发送的消息
 * @param checkFunc 检查函数，如果返回 true 则停止继续发送消息。如果失败，就抛出有错误信息的异常
 * @param maxTryTimes 失败后最多尝试的次数
 */
async function makeGPTWithRetry<T>(messages: Message[], checkFunc: (data: T) => boolean, maxTryTimes = 5): Promise<T> {
  let tryCount = 0;
  let data: T | undefined;

  while (tryCount < maxTryTimes) {
    try {
      const result = await chatStreaming(messages, 0)
      data = JSON.parse(result); // as DatasetGPT;

      if (checkFunc(data)) {
        return data;
      }
    } catch (error: any) {
      console.error(`GPT request got an exception . Retrying... (${tryCount + 1}/${maxTryTimes})`, error);
      // 增加错误信息到 message 中
      messages.push({ role: 'user', content: '你再想一想，执行报错。错误信息为：' + error.stack.split('\n')[0] })
    }

    tryCount++;
  }

  throw new Error(`Maximum try times exceeded. Fetch request failed.`);
  /*
    return new Promise((resolve, reject) => {
      chatStreaming(messages, 0, {
        async onComplete(result) {
          console.log('收到的结果为: ', result);
          // 从结果中解析出 SQL
          // 从结果中解析出图表类型
          // 从结果中解析出这样查询的原因
          // 从结果中解析出是否需要追问
          try {
            const datasetGPT = JSON.parse(result) as DatasetGPT;
            if (datasetGPT.ready) {
              // run sql
              const sql = datasetGPT.sql;
  
              try {
                const result = await dbPool.query(sql)
                console.log('result', result.rows)
                const datasetResponse: DatasetResponse = {
                  ready: true,
                  rows: result.rows,
                  sql: sql,
                  sqlReason: datasetGPT.sqlReason,
                  chart: datasetGPT.chart,
                  chartTitle: datasetGPT.chartTitle,
                  chartReason: datasetGPT.chartReason,
                };
                return res.status(200).json(datasetResponse);
              } catch (error) {
                console.error('ERROR: run query failed', error)
                throw error
              }
              // 只有明确写出 ready === false 才能完成 type narrowing
            } else if (datasetGPT.ready === false) {
              const datasetResponse: DatasetResponse = { ready: false, unreadyReason: datasetGPT.unreadyReason }
              return res.status(200).json(datasetResponse);
            }
          } catch (error: any) {
            console.error('ERROR: parse result failed', error)
            // error message is error.stack.split('\n')[0]
  
            // 提取 error.stack.split('\n')[0] 作为错误信息，让 GPT 再试一次
            const errorMessage = (error.stack || "").split('\n')[0];
  
            console.log('error console.log', error.message)
            // JSON 格式错误，让 GPT 再试一次
            // Unexpected token 根 in JSON at position 0
            throw error
          }
        },
        onFailure(err) {
          console.log('err: ', err);
          return res.status(500).json({ code: 500, data: {}, msg: err.message });
        }
      })
    });
    */
}

router.post('/', async (req: Request, res: Response) => {
  console.log('post / with body: ', req.body);
  const message = req.body.message;

  // 例子：对于百分比类型的分析，可以推荐 PieChart，对于流量转化的场景推荐 FunnelChart，对于趋势变化的使用 LineChart， 对于百分比类的分析，推荐的图表有饼图、漏斗图、仪表盘和矩阵树图（Treemap）。对于相关性分析，推荐的图表有散点图、矩阵树图、指标看板、树图和来源去向图。对于趋势类分析，推荐的图表是折线图。对于地理类的分析，推荐使用气泡地图和色彩地图。

  const tableName = 'sales_data';
  const dataFeature = await getCreateTableQuery(tableName);
  const tableData = await getTableSampleData(tableName);
  // `
  // CREATE TABLE "public"."sales_data" (
  //   "invoiceno" varchar,
  //   "stockcode" varchar,
  //   "description" varchar,
  //   "quantity" int4,
  //   "invoicedate" timestamp,
  //   "unitprice" numeric,
  //   "customerid" int4,
  //   "country" varchar
  // );  
  // `;

  const systemPrompt = `我希望你扮演专业的数据分析师，了解数据挖掘、擅长基于数据的特征来生成sql，并对数据做仪表板可视化展现，提供给客户。
你的目标是根据客户的需求设计查询数据的 SQL，并说明为什么这样设计 SQL，以及返回的数据如何满足客户的需求。
作为专业的数据分析师，你需要了解：数据的特征，如果客户提供的数据特征不够详细，你可以追问需要什么输入。

数据库表结构为：
${dataFeature}

前5条数据为：
${tableData}

你的处理步骤为：
1. 解析客户的意图，比如客户问“什么卖的最好”，实际上是希望看到产品销量的排行榜，你可以返回5条数据，并做排行榜图表的展示。
2. 根据数据库表结构，生成 postgres sql 的查询 SQL，查询结果的格式需要符合 OLAP 的维度度量模型。注意如果用户问的是日期相关的数据，你需要做日期格式化。比如用户问“每月的销量”，你需要将日期格式化为“2020-01”这样的格式，比如用户问“每天的销量”，你需要将日期格式化为“2020-01-01”这样的格式。
3. 根据数据特征推荐出适合的图表做可视化，并给出你推荐的理由，给图表生成一个有含义的标题。只能推荐一下图表类型之一：Kpi, LineChart, BarChart, PieChart, AreaChart, ScatterChart, RadarChart, FunnelChart, SimpleTable。
4. 综合以上数据按照约定的 JSON 格式返回。

图表类型的适用场景如下，希望你结合用户语义和这些规则做图表推荐：
* KPI 图用于简洁地展示并追踪一个或多个关键业务指标的表现或进展，图表类型为 Kpi
* 折线图（线状图）用于展示数据随时间的变化，也就是趋势，图表类型为 LineChart
* 柱状图（条形图）用于比较不同类型的数值，图表类型为 BarChart。
* 饼状图用于展示各个类别在总体中的占比，图表类型为 PieChart
* 面积图是折线图的一个变种，通过对线图下方区域进行填充，更加强调量的大小，图表类型为 AreaChart
* 散点图主要用于展示两个（或更多）变量之间的关系，图表类型为 ScatterChart
* 表格用于展示多维度详情数据，图表类型为 SimpleTable。

注意：无论任何情况下，你必须按照以下 JSON 格式返回，不要返回其他任何格式：
1. 如果你已经能解决客户问题，按照规范的 json 格式：{"ready": true, "sql": "要执行的 SQL", "sqlReason": "这样设计 SQL 的原因，解释 SQL 做的事情，为什么能满足需求", "chart": "推荐的图表类型", "chartReason": "推荐此图表的原因", "chartTitle": "图表的标题"}
有且仅有以上 json，不要模拟对话。
2. 如果用户的问题不属于数据分析类型，或者用户的问题不够完整需要你追问获得更多信息，你需要给出无法完成任务的理由，并结合用户3个推荐的问题，返回的 json 格式为：{"ready": false, "unreadyReason": "你要追问的问题", "recommendQuestion": ["推荐问题1", "推荐问题2", "推荐问题3"]}
`;

  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message },
  ];

  // 对日期数据做格式化
  chatStreaming(messages, 0, {
    async onComplete(result) {
      console.log('收到的结果为: ', result);
      // 从结果中解析出 SQL
      // 从结果中解析出图表类型
      // 从结果中解析出这样查询的原因
      // 从结果中解析出是否需要追问
      try {
        const datasetGPT = JSON.parse(result) as DatasetGPT;
        if (datasetGPT.ready) {
          // run sql
          const sql = datasetGPT.sql;

          try {
            const result = await dbPool.query(sql)
            console.log('result', result.rows)
            const datasetResponse: DatasetResponse = {
              ready: true,
              rows: result.rows,
              sql: sql,
              sqlReason: datasetGPT.sqlReason,
              chart: datasetGPT.chart,
              chartTitle: datasetGPT.chartTitle,
              chartReason: datasetGPT.chartReason,
            };
            return res.status(200).json(datasetResponse);
          } catch (error) {
            console.error('ERROR: run query failed', error)
            throw error
          }
          // 只有明确写出 ready === false 才能完成 type narrowing
        } else if (datasetGPT.ready === false) {
          const datasetResponse: DatasetResponse = { ready: false, unreadyReason: datasetGPT.unreadyReason }
          return res.status(200).json(datasetResponse);
        }
      } catch (error: any) {
        console.error('ERROR: parse result failed', error)
        // error message is error.stack.split('\n')[0]

        // 提取 error.stack.split('\n')[0] 作为错误信息，让 GPT 再试一次
        const errorMessage = (error.stack || "").split('\n')[0];

        console.log('error console.log', error.message)
        // JSON 格式错误，让 GPT 再试一次
        // Unexpected token 根 in JSON at position 0
        throw error
      }
    },
    onFailure(err) {
      console.log('err: ', err);
      return res.status(500).json({ code: 500, data: {}, msg: err.message });
    }
  })
})

export default router;