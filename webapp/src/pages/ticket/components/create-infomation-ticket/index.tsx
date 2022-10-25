import SearchInput from '@/components/input-search';
import CustomerCreateForm from '@/components/modal-content/customer-create-form';
import PartnerCreateForm from '@/components/modal-content/partner-create-form';
import SelectSearch from '@/pages/ticket/components/select-search';
import { createTicket } from '@/services/api/ticket/index';
import { filterByCollection, getWorkType } from '@/services/common';
import { priceConvert } from '@/utils';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import type { ContractTypeDto, InfoTicket, TemplateDto, WorkTypeDto } from '../../data';
import './style.less';

interface Props {
  updateAction?: boolean
}

export default function ContractInfoView({ updateAction }: Props) {

  const { initialState } = useModel('@@initialState');

  const [form] = Form.useForm();
  const [workTypeOptions, setWorkTypeOptions] = useState<any[]>([]);

  const [showContractType, setShowContractType] = useState<number | null>(null);
  const [contractTypeOptions, setContractTypeOptions] = useState<any[]>([]);

  const [showTemplate, setShowTemplate] = useState<number | null>(null);
  const [templateOptions, setTemplateOptions] = useState<any[]>([]);

  const [customerPhone, setCustomerPhone] = useState<string | undefined>(undefined)
  // const [showcustomerNetwork, isShowCustomerNetwork] = useState<boolean>(false)

  const [templateName, setTemplateName] = useState<any>(undefined)

  const [showAddCustomerModal, setShowAddCustomerModal] = useState<boolean>(false)
  const [showAddPartnerModal, setShowAddPartnerModal] = useState<boolean>(false)

  const [templateFee, setTemplateFee] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)

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
      if (showContractType) {
        const res = await filterByCollection("type-contract", { filterBy: "workTypeId", filterValue: showContractType });
        const contractTypeList = res.data.map((item: ContractTypeDto) => {
          return { label: item.description, value: item.id };
        });
        setContractTypeOptions(contractTypeList);
      }
    } catch (error) {
      message.error("Không thể lấy thông tin loại hợp đồng")
    }
  }, [showContractType]);

  useEffect(() => {
    getContractTypeList();
  }, [getContractTypeList]);

  const getTemplateList = useCallback(async () => {
    try {
      if (showTemplate) {
        const res = await filterByCollection("template", { filterBy: "typeContractId", filterValue: showTemplate })
        const contractNameList = res.data.map((item: TemplateDto) => {
          return { label: item.name, value: item.id };
        });
        setTemplateOptions(contractNameList)
      }
    } catch (error) {
      message.error("Không thể lấy thông tin hợp đồng")
    }
  }, [showTemplate])

  useEffect(() => {
    getTemplateList()
  }, [getTemplateList])

  const handleSelectWorkType = (value: number) => {
    form.setFieldValue('workTypeId', value);
    setShowContractType(value);
  };

  const handleGetCustomerValue = async (option: any) => {
    if (option) {
      const res = await filterByCollection('customer', { filterBy: 'name', filterValue: option.value });
      const { id, phone } = res.data[0];
      setCustomerPhone(phone)
      // isShowCustomerNetwork(true)
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

  const handleSelectContractType = (value: number) => {
    form.setFieldValue('contractTypeId', value);
    setShowTemplate(value);
  }

  const handleSelectTemplate = async (value: string, option: any) => {
    form.setFieldValue('templateId', value);
    setTemplateName(option.label)
    try {
      const res = await filterByCollection("template", { filterBy: "id", filterValue: value })
      setTemplateFee(res.data[0].price)
    } catch (error) {
      message.error("Không thể lấy thông tin phí hợp đồng")
    }
  }

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
    setLoading(true);
    let createTicketData = {
      name: templateName,
      templateId: values.templateId,
      customerId: values.customerId,
      phone: values.customerPhone,
      partnerId: values.partnerId,
      userId: values.supervisorId || initialState?.currentUser.id,
      signerId: values.signerId,
      workFlowId: 2,
      statusName: "Inprocess"
    };
    console.log("creat ticket", createTicketData);
    try {
      const res = await createTicket(createTicketData);
      setLoading(false);
      message.success("Tạo ticket thành công");
      history.push(`/ticket/detail/${res.id}`);

    } catch (error) {
      message.error("Tạo ticket thất bại")
    }
  };

  const handleFailedSubmit = (error: any) => {
    console.log(error);
  };

  return (
    <div className="contract-info-view">
      <Form
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
              <Select options={workTypeOptions} onSelect={handleSelectWorkType} />
            </Form.Item>
            <Form.Item  {...formItemLayout} label="Tên khách hàng">
              <Form.Item
                name="customerId"
                className="full-width"
                rules={[
                  {
                    required: true,
                    message: 'Tìm kiếm khách hàng đã có',
                  },
                ]}
              >
                <SearchInput
                  initialValue={{}}
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
                  initialValue={{}}

                  searchFor="partner"
                  searchBy="fullName"
                  onGetValue={handleGetPartnerValue}
                />
              </Form.Item>
              <Button onClick={() => setShowAddPartnerModal(true)} type="primary">Thêm</Button>
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
              <Select options={contractTypeOptions} onSelect={handleSelectContractType} disabled={!!!showContractType} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="templateId"
              label="Tên hợp đồng:"
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc!',
                },
              ]}
            >
              <Select onSelect={handleSelectTemplate} options={templateOptions} disabled={!!!showTemplate} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="supervisorId"
              label="Chuyên viên"

            >
              <SelectSearch initialValue={initialState?.currentUser.id} searchParams="all" onGetValue={handleGetSupervisor} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Phí"
            >
              <InputNumber value={priceConvert(templateFee)} disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="signerId"
              label="Công chứng viên"

            >
              <SelectSearch initialValue={""} searchParams="signer" onGetValue={handleGetSigner} />
            </Form.Item>
          </Col>
        </Row>
        {/* submit side */}
        <div className=" confirm-ticket-form mt-5">
          <div>
            <Button loading={loading} htmlType="submit" type="primary">
              Tạo hợp đồng
            </Button>
          </div>
          <div>
            <span className="status-title">Trạng thái:</span>
            {/* this label for showing status of action */}
            <Tag color="orange">Tạo hợp đồng</Tag>
          </div>
        </div>
      </Form>
      <Modal title="Thêm khách hàng" open={showAddCustomerModal} onCancel={() => setShowAddCustomerModal(false)} destroyOnClose footer={false}>
        <CustomerCreateForm onCancel={() => setShowAddCustomerModal(false)} />
      </Modal>
      <Modal title="Thêm nguồn hợp đồng" open={showAddPartnerModal} onCancel={() => setShowAddPartnerModal(false)} destroyOnClose footer={false}>
        <PartnerCreateForm onCancel={() => setShowAddPartnerModal(false)} />
      </Modal>
    </div>
  );
}
