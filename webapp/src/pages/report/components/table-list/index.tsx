/* eslint-disable */
import { CURRENT_REPORT_PAGE_SIZE } from "@/common";
import { updateTicket } from "@/services/api/ticket/index";
import { Button, Checkbox, Divider, Input, message, Table, Tag } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { ColumnsType } from 'antd/es/table';
import queryString from 'query-string';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IReportFilter } from "../../data.type";
import { reportService } from "../../services";
import { ReportCtx } from "../../store";
import { ReportActionType } from "../../store/reducer";
import "./style.less";

const configNewData = (array: any[], index: any, data: Record<string, any>) => {
    const { name, value } = data
    return array.map((data, indexArray) => {
        if (indexArray === index) {
            return {
                ...data,
                [name]: value
            }
        }
        return data;
    })
}

const sumByProperty = (array: any[], key: string) => {
    return array.reduce((pre, nex) => {
        return pre + nex[key]
    }, 0)
}

export default function ReportTableList() {
    const { state, dispatch } = useContext(ReportCtx)
    const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const [btnActive, setBtnActive] = useState<number | undefined>(undefined)
    const [totalTurnover, setTotalTurnover] = useState(0);

    const getAllReportRecord = useCallback(async (reqParam: IReportFilter) => {
        setLoading(true)
        try {
            const queryStringConvert = queryString.stringify(reqParam)
            const res = await reportService.getAllReportList(queryStringConvert)
            dispatch({ type: ReportActionType.GET_RES_DATA, payload: res.data })
        } catch (error) {
            message.error("Có lỗi xảy ra hãy thử lại sau")
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        const reqParam = {
            ...state.filter
        }
        getAllReportRecord(reqParam)
    }, [getAllReportRecord, state.filter])

    const handleChangeReportFee = (e: any, item: any, index: any) => {
        const { name, value } = e.target
        const newDataList = configNewData(state.dataList.data, index, { name, value: Number(value) })
        const configTotalData = newDataList.map((item) => {
            const totalRevenue = item.notaryFees + item.notaryRemuneration + item.externallySignedRemuneration + item.otherAutumn;
            const totalExpenditure = item.sourceOfExpenditure + item.expensesForNotary + item.costOfWork + item.otherCosts
            const turnover = totalRevenue - totalExpenditure;
            return {
                ...item,
                totalRevenue: totalRevenue,
                totalExpenditure: totalExpenditure,
                turnover: turnover
            }
        })
        dispatch({ type: ReportActionType.SET_DATA_LIST, payload: configTotalData })
    }
    const handleChangePaid = (e: CheckboxChangeEvent, item: any, index: any) => {
        const { name, checked } = e.target;
        const newDataList = configNewData(state.dataList.data, index, { name, value: + checked })
        dispatch({ type: ReportActionType.SET_DATA_LIST, payload: newDataList })
    };

    const handleSaveRecord = async (item: any, index: any) => {
        setSaveLoading(true)
        const { contractNumber, nameTemplate, ticketId, key, ...reqDataSaveReport } = item;
        setBtnActive(index)
        try {
            const res = await reportService.createReportRecord(reqDataSaveReport);
            const reqData = {
                reportId: res.id
            }
            await updateTicket(ticketId, reqData);
            index !== -1 && message.success("Lưu báo cáo thành công")
        } catch (error) {
            message.error("Có lỗi xảy ra , hãy thử lại sau")
        }
        setSaveLoading(false)
    }

    const handleSaveAll = async () => {
        // console.log("select rows", selectedRows)
        try {
            let saveRecordList = [];
            for (let i = 0; i < selectedRows!.length; i++) {
                saveRecordList.push(handleSaveRecord(selectedRows![i], -1));
            }
            await Promise.all(saveRecordList);
            message.success("Lưu tất cả báo cáo thành công")
        } catch (error) {
            message.error("Lưu tất cả báo cáo thất bại , thử lại sau")
        }
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const { current } = pagination;
        const { order, field } = sorter;
        console.log({ current, order, field })
        const sortType = order ? order === "ascend" && "asc" || "desc" : undefined;
        const newFilter: IReportFilter = {
            ...state.filter,
            offset: current,
            orderBy: sortType && field,
            sortType: sortType
        }
        console.log("new filter", newFilter)
        dispatch({ type: ReportActionType.SET_FILTER, payload: newFilter })
    };

    const columns: ColumnsType<Record<string, any>[]> = [
        {
            title: "Số HDCC",
            key: 'contractNumber',
            dataIndex: "contractNumber",
            fixed: "left",
            sorter: true,
            showSorterTooltip: false,
            width: 150,
            render: (record) => {
                return <div>
                    <span>{record}</span>
                </div>
            }
        },
        {
            title: "Tên hợp đồng",
            key: "nameTemplate",
            dataIndex: "nameTemplate",
            width: 200,
            render: (record) => {
                return <div>
                    <span>{record}</span>
                </div>
            }
        },
        {
            title: "Phí cc",
            key: "notaryFees",
            dataIndex: "notaryFees",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number"
                        value={record as number}
                        onChange={(e) => handleChangeReportFee(e, item, index)} name="notaryFees"
                    />
                </div>
            }
        },
        {
            title: "Thù lao cc",
            key: "notaryRemuneration",
            dataIndex: "notaryRemuneration",
            width: 150,
            render: (record, item, index) => {
                return <div>

                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="notaryRemuneration" />
                </div>
            }
        },
        {
            title: "Thù lao kn",
            key: "externallySignedRemuneration",
            dataIndex: "externallySignedRemuneration",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="externallySignedRemuneration" />
                </div>
            }
        },
        {
            title: "Thu khác",
            key: "otherAutumn",
            dataIndex: "otherAutumn",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="otherAutumn" />
                </div>
            }
        },
        {
            title: "Tổng thu",
            key: "totalRevenue",
            dataIndex: "totalRevenue",
            width: 100,
            render: (record: any) => {
                return <div>
                    <span className="totalRevenue">{record}</span>
                </div>
            }
        },
        {
            title: "Chi nguồn",
            key: "sourceOfExpenditure",
            dataIndex: "sourceOfExpenditure",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="sourceOfExpenditure" />
                </div>
            }
        },
        {
            title: "Chi công chứng viên",
            key: "expensesForNotary",
            dataIndex: "expensesForNotary",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="expensesForNotary" />
                </div>
            }
        },
        {
            title: "Chi công tác",
            key: "costOfWork",
            dataIndex: "costOfWork",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="costOfWork" />
                </div>
            }
        },
        {
            title: "Chi khác",
            key: "otherCosts",
            dataIndex: "otherCosts",
            width: 150,
            render: (record, item, index) => {
                return <div>
                    <Input type="number" value={record as number} onChange={(e) => handleChangeReportFee(e, item, index)} name="otherCosts" />
                </div>
            }
        },
        {
            title: "Tổng chi",
            key: "totalExpenditure",
            dataIndex: "totalExpenditure",
            width: 100,
            render: (record: any) => {
                return <div>
                    <span className="totalExpenditure">{record}</span>
                </div>
            }
        },
        {
            title: "Doanh thu",
            key: "turnover",
            dataIndex: "turnover",
            width: 100,
            render: (record: any) => {
                return <div>
                    <span>{record}</span>
                </div>
            }
        },
        {
            title: "Đã thu",
            key: "received",
            dataIndex: "received",
            width: 100,
            render: (record, item, index) => {
                return <div>
                    <Checkbox name="received" checked={record as boolean} onChange={(e) => handleChangePaid(e, item, index)} />
                </div>
            }
        },
        {
            title: "Nguồn",
            key: "source",
            dataIndex: "source",
            width: 150,
            render: (record) => {
                return <div>
                    <span>{record}</span>
                </div>
            }
        },
        {
            title: "Giai đoạn",
            key: "status",
            dataIndex: "status",
            width: 100,
            render: (record) => {
                return <div>
                    <span><Tag>{record}</Tag></span>
                </div>
            }
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            width: 200,
            render: (record) => {
                return <div>
                    <span>{record}</span>
                </div>
            }
        },
        {
            key: "actions",
            fixed: "right",
            width: 100,
            render: (record, _, index) => {
                return <div className="table-actions">
                    <Button loading={saveLoading && index === btnActive} onClick={() => handleSaveRecord(record, index)} type="primary">Lưu</Button>
                </div>
            }
        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setTotalTurnover(sumByProperty(selectedRows, "turnover"))
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record: any) => ({
            name: record.name,
        }),
    };

    return <div className="table-list-wrapper">

        <Table
            columns={columns}
            dataSource={state.dataList.data.map((item: any, index: any) => { return { ...item, key: index } })}
            rowSelection={{
                ...rowSelection,
                type: "checkbox",
            }}
            loading={loading}
            bordered={true}
            scroll={{ x: 1500 }}
            onChange={handleTableChange}
            pagination={{
                current: state.filter?.offset,
                pageSize: CURRENT_REPORT_PAGE_SIZE,
                total: state.dataList.totalDocs,
            }}
            footer={() => {
                return <div className="footer-table">
                    <div className="turnover">
                        <span className="footer-title">Tổng thu</span>
                        <span>{totalTurnover}</span>
                    </div>
                    <Divider type="vertical" />
                    <div className="group-actions">
                        <Button type="primary">Xuất file</Button>
                        <Button disabled={selectedRows.length === 0} loading={saveLoading && btnActive === -1} onClick={handleSaveAll} type="primary">Lưu tất cả</Button>
                    </div>
                </div>
            }}
        />


    </div>
}