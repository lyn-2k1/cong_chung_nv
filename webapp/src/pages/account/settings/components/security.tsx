import React, { useState } from 'react';
import { Button, Form, Input, List, message } from 'antd';
import { outLogin } from '@/services/ant-design-pro/api';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import { useChangePasswordMutation } from '@/services/api/password/query';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const SecurityView: React.FC = () => {
  const [form] = Form.useForm();
  const {mutate: doChangePassword} = useChangePasswordMutation();
  const { initialState, setInitialState } = useModel('@@initialState');
  const onFinish = async (values: any) => {
    
    const body = {
      "password": values.password,
      "newPassword": values.newPassword
    }
    console.log('Success:', body);
    await doChangePassword(body, {
      onSuccess: ()=> {
        message.success('Thay đổi mật khẩu thành công!');
        setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        localStorage.clear();
        loginOut();
        return;
      },
      onError: () => {
        message.error('Mật khẩu hiện tại không đúng!');
      }
    })
    
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Mật khẩu hiện tại: "
        name="password"
        // hasFeedback
        rules={[
          {
            required: true,
            message: 'Mật khẩu hiện tại đang trống!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[
          {
            required: true,
            message: 'Mật khẩu mới đang trống: ',
          },
          {
            required: false,
            pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$"),
            message:
                'Mật khẩu phải dài trên 8 kí tự, có ít nhất 1 chữ cái in hoa, in thường, số và kí tự đặng biệt',
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu mới: "
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Nhập lại mật khẩu mới trống!',
          },
          ({ getFieldValue}: any) => ({
            validator(rule: any, value: any) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Mật khẩu không trùng khớp');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SecurityView;
