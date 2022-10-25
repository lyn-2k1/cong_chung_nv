import { getListBranch } from '@/services/api/Branch';
import type { CustomerCreateRequest, CustomerUpdateRequest, IBranch } from '@/types';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

type Props = {
  _onCancel: () => void;
  visible: boolean;
  isCreate: boolean;
  changeData: CustomerCreateRequest | CustomerUpdateRequest | null;
  handleUpdate: (_data: CustomerCreateRequest | CustomerUpdateRequest) => void;
};

const CustomerModalSection = ({
  visible,
  _onCancel,
  handleUpdate,
  changeData,
  isCreate,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...changeData,
    });
  }, [changeData, form]);

  const _onFinish = async () => {
    form
      .validateFields()
      .then((values) => handleUpdate(values))
      .catch((info) => {
        message.error('Xoá thất bại, Vui lòng thử lại sau!');
      });
  };

  const [listBranch, setListBranch] = useState<IBranch[] | []>([]);

  useEffect(() => {
    getListBranch().then((res) => {
      if (res) {
        setListBranch(res || []);
      }
    });
  }, []);
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={isCreate ? 'THÊM MỚI THÔNG TIN KHÁCH HÀNG' : 'SỬA THÔNG TIN KHÁCH HÀNG'}
      visible={visible}
      footer={[
        <Button form="modal_edit_partner" type="primary" key="submit" htmlType="submit">
          OK
        </Button>,
        <Button onClick={_onCancel} key="cancel" htmlType="submit">
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} onFinish={_onFinish} name="modal_edit_partner">
        <Form.Item
          labelCol={{ md: 6, xl: 6, xs: 6 }}
          labelAlign="left"
          label="Chi nhánh"
          name="branchId"
          required
          rules={[
            {
              required: true,
              message: 'Trường này không được bỏ trống!',
            },
          ]}
        >
          <Select placeholder="Chọn Chọn chi nhánh">
            {listBranch &&
              listBranch.map((branch) => (
                <Select.Option key={branch.id} value={branch.id}>
                  {branch.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          labelCol={{ md: 6, xl: 6, xs: 6 }}
          label="Tên tên khác hàng"
          labelAlign="left"
          required
        >
          <Input placeholder="Nhập tên Khách hàng" />
        </Form.Item>

        <Form.Item
          name="phone"
          labelCol={{ md: 6, xl: 6, xs: 6 }}
          label="Số điện thoại"
          labelAlign="left"
          required
          rules={[
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: 'Vui lòng nhập đúng số điện thoại',
            },
          ]}
        >
          <Input type="phone" placeholder="Nhập số điện" />
        </Form.Item>

        <Form.Item
          name="email"
          labelCol={{ md: 6, xl: 6, xs: 6 }}
          label="Enail"
          rules={[
            {
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Vui lòng nhập đúng email!',
            },
          ]}
          labelAlign="left"
        >
          <Input type="email" placeholder="Nhập email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(CustomerModalSection);
