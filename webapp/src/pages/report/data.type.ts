export interface IReportDto {
  [key: string]: any;
}

export interface IReportFilter {
  limit?: number;
  offset?: number;
  startDate?: number;
  endDate?: number;
  received?: number;
  workFlow?: string;
  nameTemplate?: string;
  typeContract?: string;
  workType?: string;
  sortType?: string;
  orderBy?: string;
}
