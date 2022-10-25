/* eslint-disable */
import { Button, DatePicker, message } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './style.less';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getHdccListByDate } from '@/services/api/ticket/hdcc-number';
import moment from 'moment'
import { TicketCtx } from '@/pages/ticket/store';
import { TicketActionType } from '@/pages/ticket/store/reducer';
interface Props {
  onCancel: () => void
}


const TableExistNumber: React.FC<Props> = ({ onCancel }) => {
  const [hdccList, setHdccList] = useState<any[] | undefined>(undefined);

  const { dispatch } = useContext(TicketCtx)

  const [dateFilter, setDateFilter] = useState<any>({
    startDate: moment().startOf('day').unix(),
    endDate: moment().unix()
  });

  const getHdccNumberList = useCallback(async (reqData: any) => {
    try {
      const res = await getHdccListByDate(reqData);
      setHdccList(res.map((item: any, index: any) => { return { ...item, key: index } }))
    } catch (error) {
      message.error("Có lỗi xảy ra , không thể lấy thông tin số hdcc")
    }
  }, [])

  useEffect(() => {
    getHdccNumberList(dateFilter)
  }, [getHdccNumberList])


  const handleChangeFromDate: DatePickerProps['onChange'] = async (date) => {
    // console.log({ date, dateString });
    const newFilterDate = {
      ...dateFilter,
      startDate: moment(date).unix()
    }
    setDateFilter(newFilterDate);
    await getHdccNumberList(newFilterDate)
  };
  const handleChangeEndDate: DatePickerProps['onChange'] = async (date) => {
    const newFilterDate = {
      ...dateFilter,
      endDate: moment(date).unix()
    }
    setDateFilter(newFilterDate);
    await getHdccNumberList(newFilterDate)
  };

  const handleGetExistNumber = async (value: any) => {
    await dispatch({ type: TicketActionType.ACTIONS_SET_HDCC, payload: value['So HDCC'] })
    onCancel()
  }

  const hdccNumberTableColumn: ProColumns<any>[] = [

    {
      title: 'Số HDCC',
      dataIndex: 'So HDCC',
      key: 'hdccNumber',
      sorter: (a, b) => a.hdccNumber - b.hdccNumber,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'Loai HD',
      key: 'contractType',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên hợp đồng',
      dataIndex: 'Ten Hop Dong',
      key: 'contractName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'Ten Khach hang',
      key: 'customerName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },

    {
      title: 'Chuyên viên',
      dataIndex: 'Chuyen Vien',
      key: 'supervisorName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render: (record) => {
        return <Button type='primary' onClick={() => handleGetExistNumber(record)}>Lấy số</Button>;
      },
    },
  ];

  return (
    <div className="table-exist-number-wrapper">
      <div className="body-wrap">
        <div className="filter-date">
          <div className="date-from">
            <span className="label-title">Từ ngày :</span>
            <div>
              <DatePicker
                allowClear={false}
                placeholder="Chọn ngày"
                className="full-width"
                onChange={handleChangeFromDate}
              />
            </div>
          </div>
          <div className="date-to">
            <span className="label-title">Đến ngày :</span>
            <div>
              <DatePicker
                allowClear={false}
                placeholder="Chọn ngày"
                className="full-width"
                onChange={handleChangeEndDate}
              />
            </div>
          </div>
        </div>
        <div className="table-render">
          <ProTable
            rowKey="key"
            key="abc" search={false} columns={hdccNumberTableColumn} dataSource={hdccList} pagination={{
              defaultPageSize: 15
            }} />
        </div>
      </div>
    </div>
  );
};
export default TableExistNumber;
