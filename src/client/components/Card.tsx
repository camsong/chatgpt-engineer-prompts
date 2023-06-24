import './Card.css';

class Props {
  title: string;
  showHeader?: boolean = true;
  sql?: string;
  children: React.ReactNode;
}

export function Card(props: Props) {
  return (
    <div className="card-root rounded-tremor-default flex w-full rounded-xl bg-white shadow-lg ">
      {props.showHeader && (
        <div className="card-header">
          <div className="card-title">{props.title}</div>
        </div>
      )}
      <div className="card-body w-full p-3">{props.children}</div>
      <div className="card-show-sql">{props.sql}</div>
    </div>
  );
}
