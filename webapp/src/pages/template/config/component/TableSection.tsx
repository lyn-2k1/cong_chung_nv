import type {
  IDataType,
  IDocParam,
  IDocType,
  ITemplateParam,
  ITemplateParamCreate,
  IViewField,
} from '@/types';

import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Checkbox } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  data: ITemplateParamCreate[] | ITemplateParam[] | [];
  onChangeData: (data: ITemplateParamCreate | null) => void;
  onDelete: (data: ITemplateParamCreate, index: number) => void;
  updateTableAll: () => void;
  docParams: IDocParam[] | [];
  viewField: IViewField[] | [];
  dataType: IDataType[] | [];
  docTypes: IDocType[] | [];
};

const TableSection = ({
  onChangeData,
  onDelete,
  data,
  updateTableAll,
  docParams,

  viewField,
  dataType,
  docTypes,
}: Props) => {
  const [dataTable, setDataTable] = React.useState<ITemplateParamCreate[] | []>([]);

  useEffect(() => {
    if (data) {
      setDataTable(data || []);
    }
  }, [data]);

  const TemplateTableColumn: ProColumns<ITemplateParam>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    // {
    //   title: 'Thứ tự',
    //   dataIndex: 'position',
    //   key: 'position',
    //   render: (record) => {
    //     return <span>{record}</span>;
    //   },
    // },
    {
      title: 'Từ khoá',
      dataIndex: 'param',
      key: 'param',
      sorter: true,
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Defaul Value',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'View Field',
      dataIndex: 'viewFieldKey',
      key: 'viewFieldKey',
      render: (record) => {
        return <span>{viewField && viewField?.find((vf) => vf.key == record)?.value}</span>;
      },
    },
    {
      title: 'Tên hiện thị',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Value',
      dataIndex: 'docParamId',
      key: 'docParamId',
      render: (record) => {
        return (
          <span>
            {/* {record.name} */}
            {(docParams && docParams?.find((_docParam) => _docParam.id === record)?.name) || ''}
          </span>
        );
      },
    },

    {
      title: 'Loại giấy tờ',
      dataIndex: 'docParamField',
      key: 'docParamField',
      render: (record) => {
        return <span>{record}</span>;
      },
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (record) => {
        return <span>{dataType && dataType?.find((type) => type.type == record)?.name}</span>;
      },
    },
    {
      title: 'Multiline',
      dataIndex: 'multiline',
      key: 'multiline',
      valueType: 'checkbox',
      valueEnum: {
        true: true,
        false: false,
      },
      render: (_, row, index, action) => {
        return <Checkbox defaultChecked={row.multiline || false} disabled />;
      },
    },
    {
      title: 'Action',
      valueType: 'option',
      // disable-eslint-next-line
      key: 'actions',
      width: 84,
      render: (_, row, index, action) => [
        //  <Button className="delete" key="delete" onClick={() => onDelete(row, index)}>
        //   Delete
        // </Button>,
        // <Button className="delete" key="delete" onClick={() => onDelete(row, index)}>
        //   Delete
        // </Button>,
        <Button type="primary" key="edit" onClick={() => onChangeData(row)}>
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
      dataSource={dataTable.map((item, index) => {
        return { ...item, key: index };
      })}
      search={false}
      toolBarRender={() => {
        return [
          <Button
            disabled={dataTable.length <= 0}
            style={{
              background: dataTable.length <= 0 ? 'white' : 'red',
              color: dataTable.length <= 0 ? 'black' : 'white',
            }}
            key="update"
            onClick={updateTableAll}
            title="Đồng bộ"
          >
            Đồng bộ
          </Button>,

          // <Button type="primary" key="create" onClick={() => onChangeData(null)} title="Thêm mới">
          //   Thêm mới
          // </Button>,
        ];
      }}
      showSorterTooltip={false}
      pagination={{
        total: Math.ceil(dataTable.length),
        pageSize: 100,
      }}
    />
  );
};

export default React.memo(TableSection);
