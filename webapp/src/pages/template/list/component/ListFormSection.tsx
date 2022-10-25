import { Roles } from '@/common/constants';
import type { IBranch, ITemplate, ITypeContact, IWorkType } from '@/types';
import { Button, Col, Form, Row, Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';

type Props = {
  onSelect: ({ name, value }: { name: string; value: string }) => void;
  templates: ITemplate[] | [];
  branchs: IBranch[] | [];
  workTypes: IWorkType[] | [];
  typeContracts: ITypeContact[] | [];
  onFinish: () => void;
  dataFilter: {
    branchId?: number | null;
    typeContractId?: number | null;
    workTypeId?: number | null;
    templateId?: number | null;
  };
};

const ListFormSection = ({
  templates,
  branchs,
  typeContracts,
  workTypes,
  onFinish,
  onSelect,
  dataFilter,
}: Props) => {
  const { initialState } = useModel('@@initialState');
  return (
    <Row justify="center">
      <Col xl={12} lg={24} xs={24} md={12}>
        <Form.Item
          labelCol={{ md: 24, xl: 24, xs: 24 }}
          labelAlign="left"
          label="Chi nhánh"
          name="branchId"
          initialValue={initialState?.currentUser?.branchId}
        >
          <Select
            // disabled
            defaultValue={initialState?.currentUser?.branchId || 1}
            onSelect={(value: any) => onSelect({ name: 'branchId', value: value })}
            // disabled={
            //   !initialState?.currentUser?.UserRole?.some(
            //     ({ roleName }) => roleName === Roles.superAdmin,
            //   )
            // }
            placeholder="Chọn Branch"
          >
            {branchs &&
              branchs?.map((branch) => (
                <Select.Option key={branch.id} value={branch.id}>
                  {branch.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Col xl={24} lg={24} xs={24} md={24}>
          <Row justify="space-between" style={{ flex: 1 }}>
            <Form.Item
              colon
              style={{ flex: 1, marginRight: 10 }}
              wrapperCol={{ md: 24, xl: 24, xs: 24 }}
              labelCol={{ md: 24, xl: 24, xs: 24 }}
              labelAlign="left"
              label="Sổ(Làm Việc)"
              name="workTypeId"
            >
              <Select
                onSelect={(value: any) => onSelect({ name: 'workTypeId', value: value })}
                disabled={!!dataFilter?.branchId ? false : true}
                placeholder="Chọn sổ làm việc"
              >
                {workTypes &&
                  workTypes?.map((workType) => (
                    <Select.Option key={workType.id} value={workType.id}>
                      {workType.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ flex: 1, marginLeft: 10 }}
              wrapperCol={{ md: 24, xl: 24, xs: 24 }}
              labelCol={{ md: 24, xl: 24, xs: 24 }}
              labelAlign="left"
              label="Loại Hợp Đồng"
              name="typeContractId"
            >
              <Select
                onSelect={(value: any) => onSelect({ name: 'typeContractId', value: value })}
                disabled={!!dataFilter.branchId && !!dataFilter.workTypeId ? false : true}
                placeholder="Chọn Loại hợp đồng"
              >
                {typeContracts &&
                  typeContracts?.map((typeContract) => (
                    <Select.Option key={typeContract.id} value={typeContract.id}>
                      {typeContract.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Row>
        </Col>
        <Col xl={24} lg={24} xs={24} md={24}>
          <Row wrap style={{ alignItems: 'end' }}>
            <Form.Item
              style={{ flex: 1, marginRight: 15 }}
              labelCol={{ md: 24, xl: 24, xs: 24 }}
              labelAlign="left"
              label="Template"
              name="templateId"
            >
              <Select
                onSelect={(value: any) => onSelect({ name: 'templateId', value: value })}
                disabled={
                  !!dataFilter.branchId && !!dataFilter?.workTypeId && !!dataFilter?.typeContractId
                    ? false
                    : true
                }
                placeholder="Chọn Template"
              >
                {templates &&
                  templates?.map((template) => (
                    <Select.Option key={template.id} value={template.id}>
                      {template.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ md: 4, xl: 4, xs: 4 }}>
              <Button
                disabled={
                  !!dataFilter.branchId &&
                  !!dataFilter.workTypeId &&
                  !!dataFilter.typeContractId &&
                  !!dataFilter.templateId
                    ? false
                    : true
                }
                type="primary"
                htmlType="submit"
                onClick={onFinish}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default React.memo(ListFormSection);
