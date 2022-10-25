import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import type { Store } from 'antd/es/form/interface';
import { Link, useRequest, history, SelectLang } from 'umi';
import type { StateType } from './service';
import { fakeRegister } from './service';

import styles from './style.less';
import { AuthControllerSignup } from '@/services/api/Auth';

const FormItem = Form.Item;
// const { Option } = Select;
// const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>Strength: strong</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>Strength: Medium</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>Strength: too short</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  // const [count, setCount]: [number, any] = useState(0);
  // const [prefix, setPrefix]: [string, any] = useState('86');
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  // const onGetCaptcha = () => {
  //   let counts = 59;
  //   setCount(counts);
  //   interval = window.setInterval(() => {
  //     counts -= 1;
  //     setCount(counts);
  //     if (counts === 0) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const { loading: submitting, run: register } = useRequest<{ data: StateType }>(fakeRegister, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('Registration Success!');
        history.push({
          pathname: '/user/login',
          state: {
            account: params.email,
          },
        });
      }
    },
  });
  const onFinish = async (values: API.SignUpDTO) => {
    // register(values);
    const msg = await AuthControllerSignup({
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
    });
    console.log(msg);
    if (msg) {
      message.success('Registration Success!');
      history.push({
        pathname: '/user/login',
        state: {
          account: msg,
        },
      });
    } else {
      message.error('Registration Error!');
    }
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The passwords entered twice do not match!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // no value
    if (!value) {
      setVisible(!!value);
      return promise.reject('Please enter password!');
    }
    // worthwhile case
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  // const changePrefix = (value: string) => {
  //   setPrefix(value);
  // };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}
      <div className={styles.main}>
        <h2>Register</h2>
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please input the first name!',
              },
            ]}
          >
            <Input size="large" placeholder="first name" />
          </FormItem>
          <FormItem
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input the last name!',
              },
            ]}
          >
            <Input size="large" placeholder="last name" />
          </FormItem>
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the email address!',
              },
              {
                type: 'email',
                message: 'Email address format error!',
              },
            ]}
          >
            <Input size="large" placeholder="Mail" />
          </FormItem>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>
                      Please enter at least 6 characters. Please do not use passwords that are easy
                      to guess.
                    </span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input
                size="large"
                type="password"
                placeholder="At least 6 digit password, case sensitive"
              />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Confirm Password',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="Confirm Password" />
          </FormItem>
          {/* <InputGroup compact>
          <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <FormItem
            style={{ width: '80%' }}
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please enter phone number!',
              },
              {
                pattern: /^\d{11}$/,
                message: 'Malformed phone number!',
              },
            ]}
          >
            <Input size="large" placeholder="Phone number" />
          </FormItem>
        </InputGroup>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'please enter verification code!',
                },
              ]}
            >
              <Input size="large" placeholder="verification code" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : 'get verification code'}
            </Button>
          </Col>
        </Row> */}
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>Register</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>Log in with account</span>
            </Link>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default Register;
