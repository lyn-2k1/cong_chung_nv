import { CURRENT_REPORT_PAGE_SIZE } from '@/common';
import { ReactNode, Dispatch, createContext, useReducer } from 'react'
import { IReportState, reducer, ReportActionType } from './reducer'

interface IReportContextDefault {
    state: IReportState;
    dispatch: Dispatch<{ type: ReportActionType, payload: any }>
}

const reportStateDefault: IReportState = {
    filter: {
        limit: CURRENT_REPORT_PAGE_SIZE,
        offset: 1
    },
    dataList: {
        data: [],
        totalCount: 0,
        totalDocs: 0
    }
}

export const ReportCtx = createContext<IReportContextDefault>(
    { state: reportStateDefault, dispatch: () => null }
)

interface Props {
    children: ReactNode
}

const ReportProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, reportStateDefault);

    return <ReportCtx.Provider value={{ state, dispatch }}>
        {children}
    </ReportCtx.Provider>
}

export default ReportProvider