/* eslint-disable */
import { commonService } from "@/services/common/index.axios";
import { Button, Col, DatePicker, DatePickerProps, Input, message, Row, Select } from "antd"
import { useCallback, useContext, useEffect, useState } from "react"
import { IReportFilter } from "../../data.type";
import { ReportCtx } from "../../store"
import { ReportActionType } from "../../store/reducer";
import moment from 'moment';

import "./style.less"
import { partnerService } from "@/pages/partner/services";
import SelectSearch from "@/components/select-search";

interface IOptions { label: string, value: string | number, [key: string]: any }
const recievedOptions: IOptions[] = [
    { label: "Đã thu", value: 1 },
    { label: "Chưa thu", value: 0 }
]

export default function ReportFilter() {
    const { state, dispatch } = useContext(ReportCtx);
    const [filter, setFilter] = useState<IReportFilter>({})

    const [statusOptions, setStatusOptions] = useState<IOptions[] | undefined>(undefined)
    const [worktypeOptions, setworktypeOptions] = useState<IOptions[] | undefined>(undefined)
    const [contracttypeOptions, setContracttypeOptions] = useState<IOptions[] | undefined>(undefined)
    const [partnerOptions, setPartnerOptions] = useState<IOptions[] | undefined>(undefined)

    const getWorkFlowList = useCallback(async () => {
        try {
            const res = await commonService.getWorkFlowRecord();
            const configOptions = res.data.map((item: any) => {
                return { label: item.Name, value: item.id }
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
                return { label: item.Name, value: item.id }
            })
            setworktypeOptions(configOptions)
        } catch (error) {
            message.error("Có lỗi xảy ra , hãy thử lại sau")
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
            message.error("Có lỗi xảy ra , hãy thử lại sau")
        }
    }, [])

    const getPartnerList = useCallback(async () => {
        try {
            const res = await partnerService.getAllPartnerRecord();
            const configOptions = res.data.map((item: any) => {
                return { label: item.fullName, value: item.id }
            })
            setPartnerOptions(configOptions)
        } catch (error) {
            message.error("Có lỗi xảy ra , hãy thử lại sau")
        }
    }, [])

    useEffect(() => {
        getPartnerList()
    }, [getPartnerList])

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLTextAreaElement
        const newDataFilter: IReportFilter = {
            ...filter,
            [name]: value
        }
        setFilter(newDataFilter)
    }

    const handleSelectStatus = (value: number[]) => {
        const newDataFilter: IReportFilter = {
            ...filter,
            workFlow: value.toString()
        }
        setFilter(newDataFilter)
    }

    const handleSelectSingleOption = (value: any, name: any) => {
        const newDataFilter: IReportFilter = {
            ...filter,
            [name]: value
        }
        setFilter(newDataFilter)
    }

    const handleSelectWorktype = async (value: any) => {
        await getContractTypeList(value)
        handleSelectSingleOption(value, "workType")
    }

    const handleSelectDatePickerStart: DatePickerProps['onChange'] = (value) => {
        // console.log("unix", moment(value).unix())
        const newDataFilter: IReportFilter = {
            ...filter,
            startDate: moment(value).unix()
        }
        setFilter(newDataFilter)
    }
    const handleSelectDatePickerEnd: DatePickerProps['onChange'] = (value) => {
        const newDataFilter: IReportFilter = {
            ...filter,
            endDate: moment(value).unix()
        }
        setFilter(newDataFilter)
    }

    const handleApplyFilter = () => {
        const newStoreFilter: IReportFilter = {
            ...state.filter,
            ...filter,
            offset: 1,
        }
        console.log("filter", newStoreFilter)
        dispatch({ type: ReportActionType.SET_FILTER, payload: newStoreFilter })

    }

    return <div className="filter-wrapper">
        <div>
            <Row gutter={[24, 24]}>
                <Col span={8}>
                    <div>
                        <span>Từ khóa</span>
                        <div>
                            <Input value={filter?.nameTemplate || ""} onChange={handleChangeInput} name="nameTemplate" style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span>Giai đoạn</span>
                        <div>
                            <Select mode="multiple" options={statusOptions} onChange={handleSelectStatus} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <span>Tình trạng doanh thu báo cáo</span>
                        <div>
                            <Select options={recievedOptions} onSelect={(value: any) => { handleSelectSingleOption(value, "received") }} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <div>
                        <span>Loại việc</span>
                        <div>
                            <Select style={{ width: "100%" }} options={worktypeOptions} onSelect={handleSelectWorktype} />
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <div>
                        <span>Loại hợp đồng</span>
                        <div>
                            <Select disabled={contracttypeOptions === undefined} options={contracttypeOptions} onSelect={(value: any) => { handleSelectSingleOption(value, "typeContract") }} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <div>
                        <span>Nguồn</span>
                        <div>
                            <SelectSearch initialoptions={partnerOptions || []} onGetValue={(value: any) => { handleSelectSingleOption(value, "partnerId") }} />
                            {/* <Select style={{ width: "100%" }} /> */}
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <span>Từ ngày</span>
                        <div>
                            <DatePicker allowClear={false} mode="date" onChange={handleSelectDatePickerStart} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <span>Đến ngày</span>
                        <div>
                            <DatePicker allowClear={false} onChange={handleSelectDatePickerEnd} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="actions">
            <Button type="primary" onClick={handleApplyFilter}>Tìm kiếm</Button>
        </div>
    </div>
}