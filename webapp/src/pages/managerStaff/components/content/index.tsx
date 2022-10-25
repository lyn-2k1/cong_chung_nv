import { getBranches } from '@/services/api/branch/index';
import { useQueryClient } from "@tanstack/react-query";
import { IBranch, StaffDto } from '@/types';
import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import UploadIpnut from './inputUpload';
import { generate } from 'generate-password';
import { useFindOneStaffQuery } from '../../../../services/api/staff/query';
import { GENDER } from '@/common/constants';
import moment from 'moment';
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

const ContentStaff = ({ handle, dataUser, callAPI, nameFunc }: any) => {
  const [form] = Form.useForm();
  const password = generate({
    length: 10,
    numbers: true,
  });

  const {data: staffData} = useFindOneStaffQuery(dataUser?.id);
  if(staffData?.birthday){
    form.setFieldsValue({ ...staffData, birthday: moment(staffData?.birthday,"YYYY-MM-DD HH:mm Z")});
  }
  else {
    form.setFieldsValue({ ...staffData});
  }

  
  console.log(staffData);
  const [branchList, setBranchList] = useState<IBranch[]>([]);
  const [avatar, setAvatar] = useState<string>('');
  const queryClient = useQueryClient();
  const [gender, setGender] = useState(GENDER);
  useEffect(() => {
    const doFunc = async () => {
      const res = await getBranches();
      if (res.data.length > 0) {
      }
      setBranchList(res.data);
    };
    doFunc();
  }, []);
  async function handleFinish(values: any) {
    if (nameFunc === 'Thêm Nhân Viên') {
      console.log('add');
      const user = {
        ...values,
        status: 1,
        password: password,
        avatar: avatar
      };
      await callAPI(user as StaffDto, {
        onSuccess: () => {
          message.success('Thêm nhân viên thành công');
          queryClient.invalidateQueries(["listStaff"]);
          handle((prev: boolean) => !prev);
          form.resetFields();
        },
        onError: () => {
          message.error('Tài khoản đã tồn tại!');
        }
      });
    } 
    else {
      console.log('edit');
      await callAPI(
        { id: dataUser?.id, ...values, avatar: avatar},
        {
          onSuccess: () => {
            message.success('Cập nhật nhân viên thành công');
            queryClient.invalidateQueries(["listStaff"]);
            handle((prev: boolean) => !prev); 
            // form.resetFields();
          },
          onError: () => {
            message.error('Cập nhật chưa thành công!');
          }
        },
      );
     
    }
  }
  const handleFailedSubmit = (error: any) => {
    console.log(error);
  };

  return (
    <Row gutter={[24, 16]}>
      <Col span={16}>
        <Form
          form={form}
          {...defaultFormItemLayout}
          onFinish={handleFinish}
          onFinishFailed={handleFailedSubmit}
        >
          <Form.Item
            name="branchId"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!',
              },
            ]}
          >
            <Select >
              {branchList.map((item: { id: number | string; name: string }) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="SDT">
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!',
              },
              {
                type: 'email',
                message: 'Định dạng sai email!',
              }
            ]}
          >
            <Input disabled={dataUser?.id ? true : false}/>
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item name="sex" label="Giới tính">
            <Select>
              {gender.map((item: { id: number | string; name: string }) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password defaultValue={password} disabled={dataUser?.id ? true: false}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {nameFunc}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={6}>
        <UploadIpnut uploadFile={setAvatar} defaultImage={staffData?.avatar}/>
      </Col>
    </Row>
  );
};

export default ContentStaff;
