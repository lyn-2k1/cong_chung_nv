import { Button, Card, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import styles from "./style.less";
import { history } from "umi";

const confirmEmail:React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Card>
                    <h1>Vui lòng kiểm tra email của bạn!</h1>
                </Card>
            </div>
        </div>
    )
}

// const confirmEmail:React.FC = () => {
//     const [email, setEmail] = useState<string>(localStorage.getItem('email') as string);
//     const handleCancel = () => {
//         localStorage.removeItem('email');
//         history.push('/user/login');
//     }

//     const handleConfirm = (values: any) => {
//         console.log(values);
//         if(values){
//             message.success("Xác nhận thành công!");
//             history.push('/user/forgot/resetPassword');
//         }
        
//     }
//     const handleConfirmAgain = () => {
//         message.success("Đã gửi lại biểu mẫu");
//     }
//     return (
//         <div className={styles.container}>
//             <div className={styles.main}>
//                 <Card
//                     style={{
//                         width: "40rem"
//                     }}
//                     title="NHẬP MÃ BẢO MẬT:"
//                 >
//                     <p><strong>Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số: </strong></p>
//                     <div className={styles.confirm}>
//                         <div>
//                             <p>Chúng tôi đã gửi cho bạn mã đến:</p>
//                             <p>{email}</p>
//                         </div>
//                         <Form className={styles.input}
//                             onFinish={handleConfirm}
//                         >
//                             <FormItem
//                                 name = "confirm"
//                                 label = "Nhập mã"
//                                 rules={[
//                                     {
//                                       required: true,
//                                       message: 'Bạn chưa nhập mã xác nhận',
//                                     }
//                                   ]}
//                             >
//                                 <Input/>
//                             </FormItem>
//                             <Form.Item className={styles.button}>
//                                 <Button className={styles.buttonHandle} type="link" htmlType="button" onClick={() => handleConfirmAgain()}>
//                                     Lấy lại mã
//                                 </Button>
//                                 <Button style={{marginRight: "8px"}} type="primary" htmlType="submit">
//                                     Xác Nhận
//                                 </Button>
//                                 <Button  htmlType="button" onClick={() => handleCancel()}>
//                                     Hủy
//                                 </Button>       
//                             </Form.Item>
//                         </Form>
//                      </div>
//                 </Card>
//             </div>
//         </div>   
//     )
// }

export default confirmEmail; 