import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import charts from './api/charts.ts'
import dashboards from './api/dashboards.ts'
import databases from './api/databases.ts'
import datasets from './api/datasets.ts'

const app: Express = express();
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use('/api/charts', charts)
app.use('/api/dashboards', dashboards)
app.use('/api/databases', databases)
app.use('/api/datasets', datasets)

app.get('/', async (_: Request, res: Response) => {
  res.send('Hello from Chat Data :)');
})

/**
 * 检查版本，如果是最新版本，返回 isUpdate: false，否则返回 isUpdate: true 和下载地址
 */

export default app