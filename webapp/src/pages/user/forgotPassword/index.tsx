import { LoginForm, ProFormText } from "@ant-design/pro-form";
import { AuthControllerLogin } from '@/services/api/Auth';
import { message, Tabs } from "antd";
import styles from "./index.less";
import { history } from "umi";
import { useForgotPasswordMutation } from "@/services/api/password/query";
const forgotPassword = () => {
    const {mutate: doForgotPassword} = useForgotPasswordMutation();
    const handleSubmit = async (values: API.LoginDTO) => {
        console.log(values);
        await doForgotPassword(values,{
            onSuccess: () => {
                history.push('/user/forgot/confirmEmail');
                localStorage.setItem('email', values.email);
            },
            onError: () => {
                message.error("email không tồn tại");
            }
        })
        
        
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" width="64" src="/logo.png" />}
                    title="CONG CHUNG"
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginDTO);
                    }}
                >
                    <Tabs defaultActiveKey="Khôi phục mật khẩu">
                        <Tabs.TabPane tab="Khôi phục mật khẩu" key="forgotPassword"/>
                    </Tabs>
                    <>
                        <ProFormText
                            // width="md"
                            name="email"
                            label="Nhập địa chỉ email:"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Sai định dạng của email!',
                                },
                                {
                                    required: true,
                                    message: 'Hãy điền email của bạn vào đây!',
                                },
                            ]}
                        />
                    </>
                </LoginForm>
            </div>
        </div>
        
    )
}
export default forgotPassword;