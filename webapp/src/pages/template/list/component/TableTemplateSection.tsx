import { CURRENT_PAGE_SIZE } from '@/common';
import type { IBranch, ITemplate, IWorkType } from '@/types';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Typography } from 'antd';
import React from 'react';

type Props = {
  data: ITemplate[] | [];
  onDelete: (_data: ITemplate) => void;
  branchs: IBranch[] | [];
  workTypes: IWorkType[] | [];
  onShowModal: ({ _data, _isCreate }: { _data: ITemplate | null; _isCreate: boolean }) => void;
  dataFilter: {
    branchId?: number;
    typeContractId?: number | null;
    templateId?: number | null;
  };
};

const TableSection = ({ onDelete, data, onShowModal, dataFilter, branchs, workTypes }: Props) => {
  const TemplateTableColumn: ProColumns<ITemplate>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Loại Việc',
      dataIndex: 'workType',
      key: 'workType',
      render: (record) => {
        return (
          <Typography.Paragraph ellipsis={true} style={{ width: 100 }}>
            {/* {workTypes.find((workType) => workType?.id == record)?.name || ''} */}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Loại HĐ',
      dataIndex: 'contractType',
      key: 'contractType',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Template Hợp đồng',
      dataIndex: 'file',
      key: 'file',
      render: (record) => {
        return (
          <Typography.Paragraph ellipsis={true} style={{ width: 100 }}>
            {record}
          </Typography.Paragraph>
        );
      },
    },

    {
      title: 'Chi nhánh',
      dataIndex: 'branchName',
      key: 'branchName',
      render: (record) => {
        return (
          <Typography.Paragraph ellipsis={true} style={{ width: 200 }}>
            {record}
            {/* {branchs.find((branch) => branch?.id == record)?.name || ''} */}
          </Typography.Paragraph>
        );
      },
    },

    {
      title: 'Action',
      valueType: 'option',
      // disable-eslint-next-line
      key: 'actions',
      width: 84,
      render: (_, row: ITemplate, index, action) => [
        <Button className="delete" key="delete" onClick={() => onDelete(row)}>
          Delete
        </Button>,
        <Button
          type="primary"
          key="edit"
          onClick={() => onShowModal({ _data: row, _isCreate: false })}
        >
          Edit
        </Button>,
      ],
    },
  ];

  return (
    <ProTable
      headerTitle=""
      rowKey="key"
      key="abc"
      columns={TemplateTableColumn}
      dataSource={data?.map((item, index) => {
        return { ...item, key: index };
      })}
      search={false}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="primary"
            onClick={() => onShowModal({ _data: null, _isCreate: true })}
            title="Thêm mới"
          >
            Thêm mới
          </Button>,
        ];
      }}
      showSorterTooltip={false}
      pagination={{
        total: 1,
        pageSize: CURRENT_PAGE_SIZE,
      }}
    />
  );
};

export default React.memo(TableSection);
