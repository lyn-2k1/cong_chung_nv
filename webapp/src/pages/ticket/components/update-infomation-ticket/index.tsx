/* eslint-disable */
import { TicketStatus } from '@/common/ticket';
import SearchInput from '@/components/input-search';
import CustomerCreateForm from '@/components/modal-content/customer-create-form';
import PartnerCreateForm from '@/components/modal-content/partner-create-form';
import SelectSearch from '@/pages/ticket/components/select-search';
import { updateTicket } from '@/services/api/ticket/index';
import { filterByCollection, getAllTemplate, getAllTypeContract, getWorkType } from '@/services/common';
import { priceConvert } from '@/utils';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select, Tag } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { ContractTypeDto, InfoTicket, TemplateDto, WorkTypeDto } from '../../data';
import { TicketCtx } from '../../store';
import './style.less';

export default function ContractInfoViewUpdate() {
    const { state } = useContext(TicketCtx);
    const { dataDetail } = state;
    const [form] = Form.useForm();
    const [workTypeOptions, setWorkTypeOptions] = useState<any[]>([]);
    const [contractTypeOptions, setContractTypeOptions] = useState<any[]>([]);
    const [templateOptions, setTemplateOptions] = useState<any[]>([]);
    const [customerPhone, setCustomerPhone] = useState<string | undefined>(dataDetail?.customerPhone || undefined)
    const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false)
    const [showAddPartnerModal, setShowAddPartnerModal] = useState<boolean>(false)

    const [templateFee, setTemplateFee] = useState<number>(0)



    const getWorkTypeList = useCallback(async () => {
        try {
            const res = await getWorkType();
            const workTypeList = res.data.map((item: WorkTypeDto) => {
                return { label: item.name, value: item.id };
            });
            setWorkTypeOptions(workTypeList);
        } catch (error) {
            message.error("Không thể lấy thông tin loại việc")
        }
    }, []);

    useEffect(() => {
        getWorkTypeList();
    }, [getWorkTypeList]);

    const getContractTypeList = useCallback(async () => {
        try {
            const res = await getAllTypeContract();
            const contractTypeList = res.data.map((item: ContractTypeDto) => {
                return { label: item.description, value: item.id };
            });
            setContractTypeOptions(contractTypeList);
        } catch (error) {
            message.error("Không thể lấy thông tin loại hợp đồng")
        }

    }, []);

    useEffect(() => {
        getContractTypeList();
    }, [getContractTypeList]);

    const getTemplateList = useCallback(async () => {
        try {
            const res = await getAllTemplate();
            const contractTypeList = res.data.map((item: TemplateDto) => {
                return { label: item.name, value: item.id };
            });
            setTemplateOptions(contractTypeList);
        } catch (error) {
            message.error("Không thể lấy thông tin hợp đồng")
        }
    }, [])

    useEffect(() => {
        getTemplateList()
    }, [getTemplateList])

    const getTemplateFee = useCallback(async () => {
        try {
            const res = await filterByCollection("template", { filterBy: "id", filterValue: dataDetail?.templateId })
            setTemplateFee(res.data[0].price)
        } catch (error) {
            message.error("Không thể lấy thông tin phí hợp đồng")
        }
    }, [])

    useEffect(() => {
        getTemplateFee()
    }, [getTemplateFee])


    const handleGetCustomerValue = async (option: any) => {
        if (option) {
            const res = await filterByCollection('customer', { filterBy: 'name', filterValue: option.value });
            const { id, phone } = res.data[0];
            setCustomerPhone(phone)
            form.setFieldsValue({
                customerId: id,
                customerPhone: phone,
            });
            return;
        }
        form.setFieldsValue({
            customerId: undefined,
            customerPhone: undefined,
        });
    };

    const handleGetPartnerValue = (option: any) => {
        if (option) {
            form.setFieldValue('partnerId', option.id);
            return;
        }
        form.setFieldValue('partnerId', undefined);
    };

    const handleGetSupervisor = (value: any) => {
        form.setFieldValue('supervisorId', value);
    };

    const handleGetSigner = (value: any) => {
        form.setFieldValue('signerId', value);
    };

    // config layout form
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const handleSubmitForm = async (values: InfoTicket) => {
        const updateTicketData = {
            name: values.templateName,
            customerId: values.customerId,
            phone: values.customerPhone,
            userId: values.supervisorId,
            signerId: values.signerId,
            partnerId: values.partnerId,
            templateId: dataDetail?.templateId,
        }
        console.log("updateTicketData", updateTicketData)
        try {
            const res = await updateTicket(dataDetail?.ticketId, updateTicketData);
            if (res.id) {
                message.success("Lưu thông tin thành công")
            }
        } catch (error) {
            message.error("Lưu ticket thất bại")
        }
    };

    const handleCancelTicket = async () => {
        const dataUpdateTicket = {
            statusName: "Canceled"
        }
        const res = await updateTicket(dataDetail?.ticketId, dataUpdateTicket);
        if (res.id) {
            message.success("Ticket chuyển sang trạng thái hủy bỏ")
        }
    }

    const handleFailedSubmit = (error: any) => {
        console.log(error);
    };

    return (
        <div className="contract-info-view">
            <Form
                initialValues={dataDetail}
                form={form}
                onFinish={handleSubmitForm}
                onFinishFailed={handleFailedSubmit}
            >
                {/* left side */}
                <Row gutter={24}>
                    <Col span={12} className="gutter-row">
                        <Form.Item
                            {...formItemLayout}
                            name="workTypeId"
                            label="Loại việc:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Select options={workTypeOptions} disabled={true} />
                        </Form.Item>
                        <Form.Item  {...formItemLayout} label="Tên khách hàng">
                            <Form.Item
                                name="customerId"
                                className="full-width"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này là bắt buộc!',
                                    },
                                ]}
                            >
                                <SearchInput
                                    initialValue={{ label: dataDetail?.customerName, value: dataDetail?.customerName, id: dataDetail?.customerId }}
                                    searchFor="customer"
                                    searchBy="name"
                                    onGetValue={handleGetCustomerValue}
                                />
                            </Form.Item>
                            <Button onClick={() => setShowAddCustomerModal(true)} type="primary">Thêm KH</Button>
                        </Form.Item>

                        <Form.Item label="SDT" {...formItemLayout}>
                            <Form.Item
                                name="customerPhone"
                                rules={[
                                    {
                                        message: 'SDT không đúng',
                                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setCustomerPhone(e.target.value)} />
                            </Form.Item>

                            <Button style={{ padding: 0 }} type="link" href={customerPhone && "https://zalo.me/" + customerPhone} target="_blank" >Liên lạc zalo</Button>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Nguồn hợp đồng">
                            <Form.Item
                                name="partnerId"
                            >
                                <SearchInput
                                    initialValue={{ label: dataDetail?.partnerName, value: dataDetail?.partnerName, id: dataDetail?.partnerId }}
                                    searchFor="partner"
                                    searchBy="fullName"
                                    onGetValue={handleGetPartnerValue}
                                />
                            </Form.Item>
                            <Button onClick={() => setShowAddPartnerModal(true)} type="primary">Thêm đối tác</Button>
                        </Form.Item>
                    </Col>
                    {/* right side */}
                    <Col span={12} className="gutter-row">
                        <Form.Item
                            {...formItemLayout}
                            name="contractTypeId"
                            label="Loại hợp đồng:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Select options={contractTypeOptions} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="templateName"
                            label="Tên hợp đồng:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Select options={templateOptions} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="supervisorId"
                            label="Chuyên viên"

                        >
                            <SelectSearch initialValue={dataDetail?.supervisorId} searchParams="all" onGetValue={handleGetSupervisor} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            // name="fee"
                            label="Phí"
                        >
                            <InputNumber value={priceConvert(templateFee)} disabled style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="signerId"
                            label="Công chứng viên"

                        >
                            <SelectSearch initialValue={dataDetail?.signerId} searchParams="signer" onGetValue={handleGetSigner} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* submit side */}
                <div className=" confirm-ticket-form mt-5">
                    <div>
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={handleCancelTicket}
                            danger
                        >
                            Hủy
                        </Button>
                        <Button htmlType="submit" type="primary">
                            Lưu thay đổi
                        </Button>
                    </div>
                    <div>
                        <span className="status-title">Trạng thái:</span>
                        {/* this label for showing status of action */}
                        <Tag color="orange">{TicketStatus[dataDetail?.statusName]}</Tag>
                    </div>
                </div>
            </Form>
            <Modal title="Thêm khách hàng" open={showAddCustomerModal} onCancel={() => setShowAddCustomerModal(false)} destroyOnClose footer={false}>
                <CustomerCreateForm onCancel={() => setShowAddCustomerModal(false)} />
            </Modal>
            <Modal title="Thêm đối tác" open={showAddPartnerModal} onCancel={() => setShowAddPartnerModal(false)} destroyOnClose footer={false}>
                <PartnerCreateForm onCancel={() => setShowAddPartnerModal(false)} />
            </Modal>
        </div>
    );
}
