export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

// create-infomation-ticket
export interface InfoTicket {
  workTypeId?: string;
  customerId?: string;
  customerPhone?: string;
  partnerId?: string;
  contractTypeId?: string;
  templateId?: string;
  supervisorId?: string;
  signerId?: string;
  [key: string]: any;
}

export interface WorkTypeDto {
  id: string | number;
  key: string;
  name: string;
}

export interface ContractTypeDto {
  id: number | string;
  description: string;
  name: string;
  workTypeId: number;
}

export interface TemplateDto {
  id: string | number;
  branchId: number;
  file: string;
  typeContractId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export type TicketDto = Record<string, any>;

export interface ITicketFilter {
  limit?: number;
  offset?: number;
  value?: number;
  typeContract?: number;
  workType?: number;
  isSearchByDynamic?: boolean;
  dynamicColumn?: string;
  workFlow?: string;
  startDate?: number;
  endDate?: number;
  sortType?: string;
  orderBy?: string;
}
