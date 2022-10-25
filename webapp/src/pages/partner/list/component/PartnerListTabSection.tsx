import { Button, Typography } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';

import { CURRENT_PAGE_SIZE } from '@/common';
import type { IPartner, PartnerTableColumn } from '@/types';
import React from 'react';

type Props = {
  data: any;
  totalPage: number;
  onChangePage: (page: number) => void;

  onDelete: (row: IPartner) => void;
  onChange: ({ isCreate, row }: { isCreate: boolean; row: IPartner | null }) => void;
};

const PartnerListTabSection = ({ data, totalPage, onChangePage, onDelete, onChange }: Props) => {
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
      title: 'Tên đối tác',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Người liên hệ',
      dataIndex: 'User',
      key: 'name',
      render: (record) => {
        return <span>{record?.name}</span>;
      },
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'User',
      key: 'branchId',
      render: (record) => {
        return (
          <Typography.Paragraph ellipsis={true} style={{ width: 150 }}>
            {record?.Branch?.name}
          </Typography.Paragraph>
        );
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',

      render: (record) => {
        return <span style={{ width: 300 }}>{record}</span>;
      },
    },

    {
      title: 'Người tạo',
      dataIndex: 'createByName',
      key: 'createByName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },

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
        onChange: (page: number) => onChangePage(page),
        total: totalPage,
        pageSize: CURRENT_PAGE_SIZE,
      }}
    />
  );
};

export default React.memo(PartnerListTabSection);
