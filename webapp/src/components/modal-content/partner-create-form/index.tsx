import { getBranches } from "@/services/api/branch/index";
import { createPartner } from "@/services/api/partner";
import type { PartnerCreateRequest } from "@/types/partner";
import { Button, Form, Input, message, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./style.less";

interface FormProps {
    onCancel: () => void
}

export default function PartnerCreateForm({ onCancel }: FormProps) {
    const [form] = Form.useForm();
    //eslint-disable-next-line
    const [branchOptions, setBranchOptions] = useState<{ label: string; value: string }[]>([])
    const getBranchList = useCallback(async () => {
        const res = await getBranches();
        let options = [];
        if (res.data.length > 0) {
            options = res.data.map((item: any,) => {
                return { label: item.name, value: item.id }
            })
        }
        setBranchOptions(options)
    }, [])

    useEffect(() => {
        getBranchList()
    }, [
        getBranchList
    ])

    const onFinish = async (values: any) => {
        const partnerData: PartnerCreateRequest = {
            fullName: values.fullName,
            phone: values.phone || "",
            branchId: values.branchId || 1
        }
        const res = await createPartner(partnerData);
        if (res.id) {
            message.success("Thêm đối tác thành công")
            onCancel()
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return <div className="create-partner-form-wrapper">
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Chi nhánh"
                name="branchId"
            >
                <Select options={branchOptions} />
            </Form.Item>
            <Form.Item
                label="Tên đối tác"
                name="fullName"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}

            >
                <Input />
            </Form.Item>
            <Form.Item
                label="SDT"
                name="phone"
                rules={[
                    {
                        required: false,
                        message: 'SDT không đúng',
                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <div className="confirm-form-actions">
                <Button
                    type="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        form.resetFields();
                    }}
                    danger
                >
                    Xóa dữ liệu
                </Button>
                <Button htmlType="submit" type="primary">
                    Lưu thay đổi
                </Button>
            </div>
        </Form>
    </div>
}