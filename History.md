# History

## 2023-6-17

- [x] Vite create frontend project using React, TypeScript
- [x] Use express.js as backend server
- [x] Use ECharts as chart library
- [x] MVP: Submit a question in frontend, let GPT generate sql, run the sql to query data, let GPT to create a chart using ECharts

## 2023-6-22

- [x] Add tailwindcss
- [x] 支持查询 “列举几个核心指标？”，会返回几个推荐的指标，这类问题也要能返回 function
- [] Add Kpi, support font awesome icon

- [] 鲁棒性支持：执行 SQL 报错，如果是缺少一个列，把 sql 错误发给 GPT，让他再试，如果再试也失败，经过3轮他会返回 null。这点非常好。如`以上 sql 报错：column "purchase_cost" does not exist`
- [] 使用 Function calling


- [] Add LineChart
- [] Add PieChart
- [] Add BarChart
- [] Add AreaChart
- [] Add ScatterChart
- [] Add RadarChart
- [] Add FunnelChart
- [] Add SimpleTable

- [] Create a chat dialog in the right to show all the chat history and let the user generate new chat


- [] Show Filters
- [] Add chat dialog.
- [] SQL Explorer[ChatQuery] 如何实现
- [] 给 LLM 提供创建表语句，以及 5 行示例数据
- [] 检查 SQL 语句是否正确，如果错误需要让 LLM 重新生成
- [] langchain 有一个 sql chain

- [] Use Sqlite as database
- [] Use Prisma as ORM
- [] Use TailwindCSS as CSS framework
- [] Use React Router as frontend router
- [] Use React Query as data fetching
- [] Use React Hook as state management
- [] Use CSS Grid as layout, design the dashboard json
- [] Use Vercel as deployment
- [] Use GitHub as version control
- [] Use GitHub Actions as CI/CD
