// import { BranchDto } from "@/types/branch";
// import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Upload } from "antd";
import { useState } from "react";
import UploadIpnut from "./inputUpload";
const defaultFormItemLayout = {
    labelCol: {
      xs: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 20 },
    },
};

const ContentStaff = ({handle, dataUser}:any) => {
    const [form] = Form.useForm(dataUser);
    const [gender, setGender] = useState([
      {value: "Nam", lable: "Nam"},
      {value: "Nữ", lable: "Nữ"},
    ])
    const [branchData, setBranchData] = useState(
      [
        {
          lable:"1",
          value: "Chi nhánh Hà Nội",
        },
        {
          lable:"2",
          value: "Chi nhánh Hồ Chí Minh",
        },
        {
          lable:"3",
          value: "Chi nhánh Hà Nam",
        }
      ]
    )
    
    async function handleFinish(values: any) {
        console.log('VALUES', values);
      }
    const handleAddStaff = () => {
      handle((prev:boolean) => !prev);
    }
    return (
    <Row style={{ padding: '5px'}} gutter={[24, 16]}>
      <Col span={12}>
        <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>                   
            <Form.Item name='branch' label="Chi nhánh">
              <Select options={branchData} defaultValue={dataUser?.branchName}/>
            </Form.Item>
            <Form.Item 
              name='name' 
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc!',
                },
              ]}  
            >
                <Input defaultValue={dataUser?.name}/>
            </Form.Item>
            <Form.Item name='phone' label="SDT">
                <Input />
            </Form.Item>
            <Form.Item 
              name='email' 
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc!',
                },
              ]}
            >
                <Input defaultValue={dataUser?.email}/>
            </Form.Item>
            <Form.Item name='birthday' label="Ngày sinh">
              <DatePicker defaultValue={dataUser?.birthday}/>
            </Form.Item>
            <Form.Item name='sex' label="Giới tính">
                <Select options={gender} defaultValue={dataUser?.sex}/>
            </Form.Item>
            <Form.Item name='address' label="Địa chỉ">
                <Input defaultValue={dataUser?.address}/>
            </Form.Item>
            <Form.Item name='password' label="Mật khẩu">
                <Input.Password defaultValue={dataUser?.password}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => handleAddStaff()}>
                    Thêm Nhân Viên
                </Button>
            </Form.Item>
        </Form>
      </Col>
      <Col span={10}>
        <UploadIpnut/>        
      </Col>
    </Row>
    )
}

export default ContentStaff;