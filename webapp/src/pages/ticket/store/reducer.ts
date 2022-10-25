import { ITicketFilter, TicketDto } from '../data';

export enum TicketActionType {
  SET_TICKET_LIST = 'SET_TICKET_LIST',
  SET_TICKET_FILTER = 'SET_TICKET_FILTER',
  SET_TICKET_DETAIL = 'SET_TICKET_DETAIL',
  ACTIONS_SET_HDCC = 'ACTIONS_SET_HDCC',
}

export interface ITicketAction {
  type: TicketActionType;
  payload: any;
}

export interface ITicketState {
  filter?: ITicketFilter;
  dataDetail?: TicketDto;
  actions?: {
    hdcc: number;
  };
  dataList: {
    data: TicketDto[];
    totalDocs: number;
    totalCount: number;
  };
}

export const reducer = (state: ITicketState, action: ITicketAction) => {
  switch (action.type) {
    case TicketActionType.SET_TICKET_LIST: {
      return {
        ...state,
        dataList: {
          data: action.payload.data,
          totalDocs: action.payload.totalDocs,
          totalCount: action.payload.totalCount,
        },
      };
    }
    case TicketActionType.SET_TICKET_DETAIL: {
      return {
        ...state,
        dataDetail: action.payload,
      };
    }
    case TicketActionType.ACTIONS_SET_HDCC: {
      return {
        ...state,
        actions: {
          ...state.actions,
          hdcc: action.payload,
        },
      };
    }
    case TicketActionType.SET_TICKET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};
