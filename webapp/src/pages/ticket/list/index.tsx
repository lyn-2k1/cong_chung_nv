/* eslint-disable */
import { CURRENT_PAGE_SIZE } from '@/common';
import { cloneTicket } from '@/services/api/ticket/index';
import { ticketService } from '@/services/api/ticket/index.axios';
import { shortcutString } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import queryString from 'query-string';
import { useCallback, useContext, useEffect, useState } from 'react';
import { history, Link } from 'umi';
import { timestampConvert } from '../../../utils/time-convert';
import TicketFilter from '../components/filter';
import { ITicketFilter } from '../data';
import TicketProvider, { TicketCtx } from '../store';
import { TicketActionType } from '../store/reducer';
import "./style.less";

function TicketList() {
  const { state, dispatch } = useContext(TicketCtx)
  const { filter, dataList } = state
  const [loading, setLoading] = useState<boolean>(false);
  const [clonetTicketLoading, setCloneTicketLoading] = useState<boolean>(false)
  const [cloneTicketActive, setCloneTicketActive] = useState<string | number | undefined>(undefined)

  const getListTicket = useCallback(async (reqParam: ITicketFilter) => {
    setLoading(true)
    try {
      const queryStringConvert = queryString.stringify(reqParam);
      const res = await ticketService.getAllTicketRecord(queryStringConvert);
      dispatch({ type: TicketActionType.SET_TICKET_LIST, payload: res.data })
    } catch (error) {
      message.error("Có lỗi xảy ra , không thể lấy được thông tin các hợp đồng")
    }
    setLoading(false)
  }, [dispatch]);

  useEffect(() => {
    const reqParam = {
      ...filter
    }
    getListTicket(reqParam);
  }, [getListTicket, filter]);

  const handleCloneTicket = async (item: any, index: any) => {
    setCloneTicketLoading(true)
    setCloneTicketActive(index)
    try {
      const reqData = {
        ticketId: item.id
      }
      const res = await cloneTicket(reqData);
      history.push(`/ticket/detail/${res.id}`);
      message.success("Ticket đã được sao chép thành công")
    } catch (error) {
      message.error("Có lỗi xảy ra , hãy thử lại sau")
    }
    setCloneTicketLoading(false)
  }
  const ticketTableColumn: ColumnsType<Record<string, any>[]> = [
    {
      title: 'Ticket Id',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      defaultSortOrder: "descend",
      render: (record) => {
        return (
          <Link to={`/ticket/detail/${record}`}>
            <Tooltip title={record}>
              <span>{shortcutString(record as string, 4)}</span>
            </Tooltip>
          </Link>
        );
      },
    },
    {
      title: 'Số HDCC',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      sorter: true,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên hợp đồng',
      dataIndex: 'nameTemplate',
      key: 'nameTemplate',
      sorter: true,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: true,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (record) => {
        return <span>{timestampConvert(record as number)}</span>;
      },
    },
    {
      title: 'Giai đoạn',
      dataIndex: 'workFlow',
      key: 'workFlow',
      sorter: true,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: true,
      render: (record) => {
        return <span>{record !== "null" || ""}</span>;
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render: (record, _, index) => [
        <Button loading={clonetTicketLoading && cloneTicketActive === index} type="primary" key="edit" onClick={() => handleCloneTicket(record, index)}>
          Tạo bản sao
        </Button>,
      ],
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current } = pagination;
    const { order, field } = sorter;
    console.log("test", { current, order, field })
    const sortType = order ? order === "ascend" && "asc" || "desc" : undefined;
    const newFilter: ITicketFilter = {
      ...state.filter,
      offset: current,
      orderBy: sortType && field,
      sortType: sortType
    }
    console.log("new filter", newFilter)
    dispatch({ type: TicketActionType.SET_TICKET_FILTER, payload: newFilter })
  };

  return (
    <div className='ticket-list-wrapper'>
      <div className='ticket-filter'>
        <TicketFilter />
      </div>
      <div className='ticket-table-wrapper'>
        <div className='ticket-group-actions'>
          <Button onClick={() => {
            history.push('/ticket/add');
          }} type='primary'><PlusOutlined />Thêm mới hợp đồng</Button>
        </div>
        <div className='table-list'>
          <Table
            rowKey="key"
            key="abc"
            columns={ticketTableColumn}
            loading={loading}
            dataSource={dataList.data.map((item: any, index: any) => { return { ...item, key: index } })}
            onChange={handleTableChange}
            pagination={{
              current: state.filter?.offset,
              pageSize: CURRENT_PAGE_SIZE,
              total: state.dataList.totalDocs,
            }}

          />
        </div>

      </div>
    </div>
  );
}

function TicketListWrapper() {
  return <TicketProvider>
    <TicketList />
  </TicketProvider>
}

export default TicketListWrapper;
