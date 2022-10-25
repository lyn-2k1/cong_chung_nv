import { Button, Card, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import styles from "./style.less";
import { history } from "umi";
import { useState } from "react";
const resetPassword = () => {
    // const [email, setEmail] = useState<string>(localStorage.getItem('email') as string);
    const handleChange = (values: any) => {
        console.log(values);
        if(values){
            localStorage.removeItem('email');
            message.success("Đổi mật khẩu thành công!");
            history.push('/user/login');
        }   
    }
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Card
                    style={{
                        width: "40rem"
                    }}
                    title="MẬT KHẨU MỚI:"
                >
                    <div>
                        <Form
                            name="basic"
                            labelCol={{
                              span: 8,
                            }}
                            wrapperCol={{
                              span: 48,
                            }}
                            onFinish={handleChange}
                        >
                            <Form.Item
                                name="password"
                                label="Nhập mật khẩu mới:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Mật khẩu mới đang trống!',
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
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Mật khẩu không trùng khớp!');
                                    },
                                }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item 
                                wrapperCol={{
                                    offset: 12,
                                    span: 16,
                                  }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Change
                                </Button>     
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
        
    )
}

export default resetPassword;