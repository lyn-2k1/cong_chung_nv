import { Button, Col, DatePicker, DatePickerProps, Input, message, Row, Select } from "antd";
import { useContext, useState, useCallback, useEffect } from "react";
import { TicketCtx } from "../../store";
import { ITicketFilter } from '../../data'
import "./style.less";
import { commonService } from "@/services/common/index.axios";
import moment from 'moment';
import { TicketActionType } from "../../store/reducer";

interface IOptions { label: string, value: string | number, [key: string]: any }

export default function TicketFilter() {
    const { state, dispatch } = useContext(TicketCtx);
    const [filter, setFilter] = useState<ITicketFilter>({})

    const [statusOptions, setStatusOptions] = useState<IOptions[] | undefined>(undefined)
    const [worktypeOptions, setworktypeOptions] = useState<IOptions[] | undefined>(undefined)
    const [contracttypeOptions, setContracttypeOptions] = useState<IOptions[] | undefined>(undefined)

    const getWorkFlowList = useCallback(async () => {
        try {
            const res = await commonService.getWorkFlowRecord();
            const configOptions = res.data.map((item: any) => {
                return { label: item.name, value: item.id }
            })
            setStatusOptions(configOptions)
        } catch (error) {
            message.error("Có lỗi xảy ra , hãy thử lại sau")
        }
    }, [])

    useEffect(() => {
        getWorkFlowList()
    }, [getWorkFlowList])

    const getWorkTypeList = useCallback(async () => {
        try {
            const res = await commonService.getWorkTypeRecord();
            const configOptions = res.data.map((item: any) => {
                return { label: item.name, value: item.id }
            })
            setworktypeOptions(configOptions)
        } catch (error) {
            message.error("Có lỗi xảy ra , không thể lấy thông tin loại việc")
        }
    }, [])

    useEffect(() => {
        getWorkTypeList()
    }, [getWorkTypeList])

    const getContractTypeList = useCallback(async (worktypeId: number) => {
        try {
            const res = await commonService.getContractTypeByWorkTypeRecord(worktypeId);
            const configOptions = res.data.map((item: any) => {
                return { label: item.description, value: item.id }
            })
            setContracttypeOptions(configOptions)
        } catch (error) {
            message.error("Có lỗi xảy ra , không thể lấy thông tin loại hợp đồng")
        }
    }, [])

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {

        const { name, value } = e.target as HTMLTextAreaElement
        console.log({ name, value })
        const newDataFilter: ITicketFilter = {
            ...filter,
            [name]: value || undefined
        }
        setFilter(newDataFilter)
    }

    const handleSelectStatus = (value: number[]) => {
        const newDataFilter: ITicketFilter = {
            ...filter,
            workFlow: value.toString() || undefined
        }
        setFilter(newDataFilter)
    }

    const handleSelectSingleOption = (value: any, name: any) => {
        console.log({ value, name })
        const newDataFilter: ITicketFilter = {
            ...filter,
            [name]: value || undefined
        }
        setFilter(newDataFilter)
    }

    const handleSelectWorktype = async (value: any) => {
        value && await getContractTypeList(value)
        !value && setContracttypeOptions(undefined)
        handleSelectSingleOption(value, "workType")
    }

    const handleSelectDatePickerStart: DatePickerProps['onChange'] = (value) => {
        console.log("value", value)
        const newDataFilter: ITicketFilter = {
            ...filter,
            startDate: moment(value).startOf('day').unix() || undefined
        }
        setFilter(newDataFilter)
    }
    const handleSelectDatePickerEnd: DatePickerProps['onChange'] = (value) => {
        const newDataFilter: ITicketFilter = {
            ...filter,
            endDate: moment(value).unix() || undefined
        }
        setFilter(newDataFilter)
    }


    const handleApplyFilter = () => {
        const newStoreFilter: ITicketFilter = {
            ...state.filter,
            ...filter,
            offset: 1,
        }
        console.log("filter", newStoreFilter)
        dispatch({ type: TicketActionType.SET_TICKET_FILTER, payload: newStoreFilter })

    }

    return <div className="ticket-filter-wrapper">
        <div>
            <Row gutter={[24, 24]} >
                <Col span={8}>
                    <div>
                        <span className="title">Số HDCC</span>
                        <div>
                            <Input allowClear name="value" value={filter.value || ""} onChange={handleChangeInput} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span className="title">Loại việc</span>
                        <div>
                            <Select allowClear style={{ width: "100%" }} options={worktypeOptions} onChange={handleSelectWorktype} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span className="title">Loại Hd</span>
                        <div>
                            <Select allowClear disabled={contracttypeOptions === undefined} options={contracttypeOptions} onChange={(value: any) => { handleSelectSingleOption(value, "typeContract") }} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span className="title">Giai đoạn</span>
                        <div>
                            <Select allowClear options={statusOptions} onChange={handleSelectStatus} style={{ width: "100%" }} mode="multiple" />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span className="title">Từ ngày</span>
                        <div>
                            <DatePicker onChange={handleSelectDatePickerStart} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span className="title">Đến ngày</span>
                        <div>
                            <DatePicker onChange={handleSelectDatePickerEnd} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="filter-actions">
            <Button type="primary" onClick={handleApplyFilter}>Tìm kiếm</Button>
        </div>
    </div>
}