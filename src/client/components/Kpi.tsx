import { MoneyCollectOutlined } from '@ant-design/icons';
import './Kpi.css';

interface Props {
  icon?: string;
  data: {
    name: string;
    value: number;
    unit: 'RMB' | 'USD';
  }[];
}

function formatNumber(num: number, ratio = 2) {
  return num.toFixed(ratio).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function Kpi(props: Props) {
  const moneySign = props.data[0].unit === 'RMB' ? '¥' : '$';

  return (
    <div className="kpi flex flex-row justify-between">
      {props.data.map((item, index) => (
        <div className="kpi-item flex items-center space-x-4" key={index}>
          <div className="shrink-0">
            <div className="kpi-icon h-8 w-8 rounded-full bg-blue-100 ring-1">
              <MoneyCollectOutlined />
            </div>
          </div>
          <div>
            <div className="kpi-value text-xl font-medium text-black">
              {moneySign}
              {formatNumber(item.value)}
            </div>
            <div className="kpi-name text-slate-500">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
