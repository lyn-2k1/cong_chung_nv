import { CURRENT_PAGE_SIZE } from '@/common';
import { TemplateControllerFindOne } from '@/services/api/Template';
import type { ITemplate } from '@/types';

import ProTable from '@ant-design/pro-table';
import { Col, Select, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import { TemplateTableColumn } from '../template-column';
import './style.less';

function TemplateDetail() {
  const [data, setData] = useState<ITemplate>();
  const [isLoading, setIsLoading] = useState(false);

  const getTemplate = () => {
    TemplateControllerFindOne({ id: '1' }).then((res) => setData(res));
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <div>
      <Row justify="center">
        {/* <Col xl={16} lg={24} xs={24} md={12}>
          <FormItem labelCol={{ md: 4, xl: 4, xs: 6 }} labelAlign="left" label="Chi nhánh" name="">
            <Select placeholder="Chọn chi nhánh">
              <Select.Option value="lisa">Văn phòng công chứng</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            labelCol={{ md: 4, xl: 4, xs: 6 }}
            labelAlign="left"
            label="Sổ làm việc"
            name=""
          >
            <Select placeholder="Chọn chi nhánh">
              <Select.Option value="lisa">Văn phòng công chứng</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            labelCol={{ md: 4, xl: 4, xs: 6 }}
            labelAlign="left"
            label="Loại hợp đồng"
            name=""
          >
            <Select placeholder="Chọn chi nhánh">
              <Select.Option value="lisa">Ô tô</Select.Option>
            </Select>
          </FormItem>
          <FormItem labelCol={{ md: 4, xl: 4, xs: 6 }} labelAlign="left" label="Template" name="">
            <Select placeholder="Chọn chi nhánh">
              <Select.Option value="lisa">Ô tô</Select.Option>
            </Select>
          </FormItem>
        </Col>
      </Row> */}

      <ProTable
        headerTitle=""
        rowKey="key"
        key="abc"
        columns={TemplateTableColumn}
        dataSource={[]?.map((item, index) => {
          return { ...item, key: index };
        })}
        search={false}
        toolBarRender={false}
        showSorterTooltip={false}
        pagination={{
          total: 1,
          pageSize: CURRENT_PAGE_SIZE,
        }}
      />
    </div>
  );
}

export default TemplateDetail;
