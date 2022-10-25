import type { IBranch, ITemplate, ITemplateCreate, ITypeContact, IWorkType } from '@/types';

import { Button, Col, Form, InputNumber, message, Modal, Select, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/lib/input/Input';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect } from 'react';

type Props = {
  isModalEdit: boolean;
  isCreate: boolean;
  branchs: IBranch[] | [];
  workTypes: IWorkType[] | [];
  typeContracts: ITypeContact[] | [];
  onCancel: () => void;
  onCreate: (_data: ITemplateCreate) => void;
  onUpdate: (_data: ITemplate) => void;
  changeData: ITemplate | null;
};

const ModalEditSection = ({
  isModalEdit,
  onCancel,
  changeData,
  isCreate,
  branchs,
  onCreate,
  onUpdate,
  typeContracts,
}: Props) => {
  const [form] = Form.useForm();
  const _onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        if (!!isCreate) {
          onCreate(values);
        } else {
          onUpdate({
            ...changeData,
            ...values,
          });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...changeData,
    });
  }, [changeData, form]);

  const onChangePrice = (value: string) => {
    form.setFieldValue('price', value);
  };

  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng =
  //     file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' ||
  //     file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
  //     file.type === 'application/msword';
  //   if (!isJpgOrPng) {
  //     message.error('Vui lòng bạn chọn file .docx hoặc .dotx!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  return (
    <Modal
      title={isCreate ? 'Tạo template' : 'Sửa template'}
      centered
      visible={isModalEdit}
      onCancel={onCancel}
      width={640}
      footer={[
        <Button form="form-list-template" type="primary" key="submit" htmlType="submit">
          OK
        </Button>,
        <Button onClick={onCancel} key="cancel">
          Cancel
        </Button>,
      ]}
    >
      <Col>
        <Form
          form={form}
          onFinish={_onFinish}
          name="form-list-template"
          initialValues={{ changeData }}
        >
          <FormItem
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: 'Chi nhánh không được bỏ trống!',
              },
            ]}
            name="branchId"
          >
            {/* Check role disable */}
            <Select disabled placeholder="Chọn Template Field">
              {branchs &&
                branchs.map((branch) => (
                  <Select.Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem>

          {/* <FormItem
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Sổ (Làm việc):"
            name="workTypeId"
            rules={[
              {
                required: true,
                message: 'Sổ làm việc không được bỏ trống sổ làm việc!',
              },
            ]}
          >
            <Select placeholder="Chọn Sổ làm việc">
              {workTypes &&
                workTypes.map((workType) => (
                  <Select.Option key={workType.id} value={workType.id}>
                    {workType.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem> */}
          <FormItem
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Loại hợp đồng"
            rules={[
              {
                required: true,
                message: 'Loại hợp đồng không được bỏ trống!',
              },
            ]}
            name="typeContractId"
          >
            <Select placeholder="Chọn loại hợp đồng">
              {typeContracts &&
                typeContracts.map((typeContract) => (
                  <Select.Option key={typeContract.id} value={typeContract.id}>
                    {typeContract.name}
                  </Select.Option>
                ))}
            </Select>
          </FormItem>
          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            label="Tên hợp đồng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Tên hợp đồng không được bỏ trống sổ làm việc!',
              },
            ]}
            labelAlign="left"
          >
            <Input placeholder="Nhập tên hợp đồng" />
          </Form.Item>

          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="File hợp đồng"
            name="file"
            rules={[
              {
                required: true,
                message: 'File hợp đồng không bỏ trống',
              },
            ]}
          >
            <Upload
              accept=".docx, .dotx"
              // beforeUpload={beforeUpload}
              // multiple={false}
              // showUploadList={false}
              multiple={false}
              style={{ width: '100%' }}
            >
              <Button>Chọn file hợp đồng(.docx)</Button>
              {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :     <Button>Chọn file hợp đồng(.docx)</Button>} */}
            </Upload>
          </Form.Item>
          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            label="Phí"
            name="price"
            rules={[
              {
                required: true,
                message: 'Phí không được bỏ trống sổ làm việc!',
              },
            ]}
            valuePropName="inputNumber"
            labelAlign="left"
          >
            <InputNumber
              onChange={onChangePrice}
              style={{ width: 200 }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
            &nbsp; VND
          </Form.Item>
        </Form>
      </Col>
    </Modal>
  );
};

export default React.memo(ModalEditSection);
