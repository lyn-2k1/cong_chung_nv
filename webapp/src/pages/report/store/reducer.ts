import { IReportFilter } from '../data.type';

export enum ReportActionType {
  CHANGE_PAGE = 'CHANGE_PAGE',
  GET_RES_DATA = 'GET_RES_DATA',
  SET_DATA_LIST = 'SET_DATA_LIST',
  SET_FILTER = 'SET_FILTER',
}

export interface IReportAction {
  type: ReportActionType;
  payload: any;
}

export interface IReportState {
  filter?: IReportFilter;
  dataList: {
    data: Record<string, any>[];
    totalDocs: number;
    totalCount: number;
  };
}

export const reducer = (state: IReportState, action: IReportAction) => {
  switch (action.type) {
    case ReportActionType.CHANGE_PAGE: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case ReportActionType.GET_RES_DATA: {
      return {
        ...state,
        dataList: {
          data: action.payload.data,
          totalDocs: action.payload.totalDocs,
          totalCount: action.payload.totalCount,
        },
      };
    }
    case ReportActionType.SET_DATA_LIST: {
      return {
        ...state,
        dataList: {
          ...state.dataList,
          data: action.payload,
        },
      };
    }
    case ReportActionType.SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};
