import { QueryResultRow } from "pg"

interface ReadyDatasetGPT {
  ready: true
  sql: string
  sqlReason: string
  chart: string
  chartTitle: string
  chartReason: string
}
interface UnreadyDatasetGPT {
  ready: false
  unreadyReason: string
}

interface ReadyDatasetResponse extends ReadyDatasetGPT {
  rows: QueryResultRow[]
}

type DatasetGPT = ReadyDatasetGPT | UnreadyDatasetGPT
type DatasetResponse = ReadyDatasetResponse | UnreadyDatasetGPT

interface ColumnDatum {
  columnName: string;
  dataType: string;
  isNullable: boolean;
}

interface IntlColumnName {
  tableColumnName: string;
  chineseName: string;
  englishName: string;
}

export type { DatasetGPT, DatasetResponse, ColumnDatum, IntlColumnName }