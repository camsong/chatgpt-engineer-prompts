import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './components/Card';
import { BarChart } from './components/BarChart';
import { DatasetResponse, IntlColumnName } from '../shared/common-types';
import './App.css';
import { Kpi } from './components/Kpi';

function App() {
  const [message, setMessage] = useState('每个月的销售金额是多少？');
  const [barChartOption, setBarChartOption] = useState<echarts.EChartsCoreOption>(null);
  const [barChartTitle, setBarChartTitle] = useState('');
  const [barChartSql, setBarChartSql] = useState<string>(undefined);
  const [intlColumnNames, setIntlColumnNames] = useState<IntlColumnName[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      '/api/datasets',
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Get response', response);
    const data = response.data as DatasetResponse;
    if (data.ready) {
      const newOptions = {
        legend: {},
        tooltip: {},
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [{ type: 'line' }, { type: 'line' }],
        dataset: {
          source: data.rows,
        },
        dimensions: Object.keys(data.rows[0]).map(key => ({ name: key })),
      };
      setBarChartOption(newOptions);
      setBarChartTitle(data.chartTitle);
      setBarChartSql(data.sql);
    } else {
      // TODO not ready, need to ask again
    }
  };

  useEffect(() => {
    const fetchIntlColumnNames = async () => {
      const response = await axios.get('/api/datasets/column-names');
      setIntlColumnNames(response.data as IntlColumnName[]);
    };
    fetchIntlColumnNames();
  }, []);

  return (
    <>
      <h1>Chat Data</h1>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="text" className="message-input" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter a question like 'What product sells the best?'" />
          <button type="submit">Submit</button>
        </form>
        <div className="dashboard-card-container grid grid-cols-1 gap-4">
          <Card title="经营核心指标">
            <Kpi
              data={[
                {
                  name: 'Total Sales',
                  value: 1000000,
                  unit: 'RMB',
                },
                {
                  name: 'Total Profit',
                  value: 100000,
                  unit: 'RMB',
                },
                {
                  name: 'Total Cost',
                  value: 900000,
                  unit: 'RMB',
                },
              ]}
            />
          </Card>
          <Card title={barChartTitle} sql={barChartSql}>
            <BarChart option={barChartOption} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
