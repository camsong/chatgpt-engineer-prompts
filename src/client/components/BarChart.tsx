import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './BarChart.css';

interface Props {
  height?: string;
  option?: echarts.EChartsCoreOption;
}

const DEFAULT_OPTION = {
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [{ type: 'line' }, { type: 'line' }],
};

export function BarChart({ height = '300px', option }: Props) {
  const myChartRef = useRef<HTMLDivElement>();
  const myChartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    myChartInstance.current = echarts.init(myChartRef.current, null, { height: height });

    myChartInstance.current.setOption(DEFAULT_OPTION);

    return () => {
      myChartInstance.current.dispose();
    };
  }, [height]);

  useEffect(() => {
    if (!myChartInstance.current || !option) {
      return;
    }
    myChartInstance.current.setOption(option);
    return () => {
      myChartInstance.current.dispose();
    };
  }, [option]);

  return (
    <div className="bar-chart">
      <div className="bar-chart-container" ref={myChartRef}></div>
    </div>
  );
}
