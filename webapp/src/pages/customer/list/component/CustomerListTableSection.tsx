import { Button, Typography } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';

import { CURRENT_PAGE_SIZE } from '@/common';
import type { ICustomer, IPartner, PartnerTableColumn } from '@/types';
import React from 'react';
type Props = {
  data: any;
  totalPage: number;
  onChangePage: (page: number) => void;

  onDelete: (row: ICustomer) => void;
  onChange: ({ isCreate, row }: { isCreate: boolean; row: ICustomer | null }) => void;
};

const CustomerListTableSection = ({ data, totalPage, onChangePage, onDelete, onChange }: Props) => {
  const columns: ProColumns<PartnerTableColumn>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên khác hàng',
      dataIndex: 'name',
      key: 'name',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (record) => {
        return (
          <Typography.Paragraph ellipsis={true} style={{ width: 150 }}>
            {record}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Zalo',
      dataIndex: 'phone',
      key: 'zalo',
      render: (record) => {
        return (
          <a
            // onClick={() => {}
            href={`https://zalo.me/${record}`}
          >
            open zalo
          </a>
        );
      },
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'createAt',
    //   key: 'createAt',
    //   render: (record) => {
    //     console.log(record);
    //     return <span style={{ width: 300 }}>{moment().format('DD-MM-YYYY')}</span>;
    //   },
    // },

    // {
    //   title: 'Người tạo',
    //   dataIndex: 'createByName',
    //   key: 'createByName',
    //   render: (record) => {
    //     return <span>{record}</span>;
    //   },
    // },

    {
      title: 'Action',
      valueType: 'option',
      key: 'actions',
      width: 84,
      render: (_, row: any, index, action) => [
        <Button className="delete" key="delete" onClick={() => onDelete(row)}>
          Delete
        </Button>,
        <Button
          type="primary"
          key="edit"
          onClick={() =>
            onChange({
              isCreate: false,
              row: row,
            })
          }
        >
          Edit
        </Button>,
      ],
    },
  ];

  return (
    <ProTable
      headerTitle=""
      rowKey="partner_list_table"
      key="partner_list_table"
      columns={columns}
      dataSource={data?.map((item: IPartner, index: number) => {
        return { ...item, key: index };
      })}
      search={false}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="primary"
            onClick={() => onChange({ isCreate: true, row: null })}
            title="Thêm mới"
          >
            Thêm mới
          </Button>,
        ];
      }}
      showSorterTooltip={false}
      pagination={{
        defaultCurrent: 1,
        onChange: (page: number) => onChangePage(page),
        total: totalPage *CURRENT_PAGE_SIZE,
        pageSize: CURRENT_PAGE_SIZE,
        // defaultCurrent: 2,
      }}
    />
  );
};

export default React.memo(CustomerListTableSection);
