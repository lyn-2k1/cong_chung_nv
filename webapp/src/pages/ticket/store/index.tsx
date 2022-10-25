
import { createContext, useReducer } from "react";
import type { ReactNode, Dispatch } from 'react'
import { ITicketState, reducer, TicketActionType } from "./reducer";
import { CURRENT_PAGE_SIZE } from "@/common";
import moment from "moment"
interface Props {
    children: ReactNode
}

interface ITicketContextDefault {
    state: ITicketState,
    dispatch: Dispatch<{ type: TicketActionType, payload: any }>
}


const ticketStateDefault: ITicketState = {
    filter: {
        offset: 1,
        limit: CURRENT_PAGE_SIZE,
        isSearchByDynamic: false,
        endDate: moment(new Date()).unix(),
        orderBy: "id",
        sortType: "desc"
    },
    dataDetail: undefined,
    actions: undefined,
    dataList: {
        data: [],
        totalCount: 0,
        totalDocs: 0
    }
}

export const TicketCtx = createContext<ITicketContextDefault>({
    state: ticketStateDefault,
    dispatch: () => null
})

const TicketProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, ticketStateDefault)
    return <TicketCtx.Provider value={{ state, dispatch }}>
        {children}
    </TicketCtx.Provider>
}

export default TicketProvider