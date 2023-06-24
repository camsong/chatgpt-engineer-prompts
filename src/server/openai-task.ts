import { ColumnDatum, IntlColumnName } from "../shared/common-types";
import { dbPool } from "./db.ts";
import { Message, chatStreaming } from "./openai-client.ts";

// 返回表的列名和数据类型
export async function getTableColumns(tableName: string): Promise<ColumnDatum[]> {
  const { rows: tableRows } = await dbPool.query(`
    SELECT column_name, data_type, is_nullable 
    FROM information_schema.columns 
    WHERE table_name = $1;
  `, [tableName]);

  const columns = tableRows.map(row => ({
    columnName: row.column_name,
    dataType: row.data_type,
    isNullable: row.is_nullable === 'YES',
  }));

  return columns;
}

// 返回建表语句
export async function getCreateTableQuery(tableName: string): Promise<string> {
  const tableColumns = await getTableColumns(tableName);
  const columns = tableColumns.map(column => `${column.columnName} ${column.dataType} ${column.isNullable ? '' : 'NOT NULL'}`).join(',\n');
  return `CREATE TABLE ${tableName} (\n${columns}\n);`;
}

// 返回表格的前5条数据，第一行为表头，剩下5行为样例数据，以 CSV 格式返回
export async function getTableSampleData(tableName: string, limit = 5): Promise<string> {
  const tableColumns = await getTableColumns(tableName);
  const columns = tableColumns.map(column => column.columnName).join(', ');
  const { rows: dataRows } = await dbPool.query(`
    SELECT ${columns}
    FROM ${tableName}
    LIMIT ${limit};
  `);

  const header = tableColumns.map(column => column.columnName).join(' | ');
  const data = dataRows.map(row => Object.values(row).join(' | ')).join('\n');

  return `${header}\n${data}`;
}

// 使用 LLM 对表的每个字段推荐1个适合展示的中文名
export async function getIntlColumnNameByLLM(tableName: string): Promise<IntlColumnName[]> {
  const tableInfo = getCreateTableQuery(tableName);
  const tableColumns = await getTableColumns(tableName)
  const prompt = `
  你扮演一个数据应用方面的专家，擅长基于数据库的表结构和特征对每个列起中文名和英文名，这些中文名英文名会被用于 BI 数据分析场景的展示。
以下为表结构信息：
${tableInfo}

请你给这些字段 ${tableColumns.map(col => col.columnName).join(', ')} 起中文名和英文名。

返回格式为：
[{tableColumnName: '原始列名', chineseName: '中文名', englishName: '英文名'}]

以下为例子：
输入：
创建表语句如下：
CREATE TABLE "public"."sales_data" (
  "invoiceno" varchar,
  "quantity" int4,
  "invoicedate" timestamp
);

输出：
${JSON.stringify([
    { tableColumnName: 'invoiceno', chineseName: '发票号', englishName: 'invoice number' },
    { tableColumnName: 'quantity', chineseName: '销售数量', englishName: 'quantity' },
    { tableColumnName: 'invoicedate', chineseName: '发票日期', englishName: 'invoice code' },
  ])}
  `

  const messages: Message[] = [
    { role: 'user', content: prompt },
  ];

  return new Promise((resolve, reject) => {
    chatStreaming(messages, 0, {
      async onComplete(result) {
        console.log('收到的结果为: ', result);
        const columnNames = JSON.parse(result) as IntlColumnName[];
        return resolve(columnNames);
      },
      onFailure(err) {
        console.log('err: ', err);
        reject(err)
      }
    })
  })
}