import { getListDocParamByType } from '@/services/api/DocParam';
import { getListDocType } from '@/services/api/DocType';
import type {
  IBranch,
  ITemplate,
  IContract,
  ITemplateParamCreate,
  IDocParam,
  IDataType,
  IDocType,
  ITemplateParamResponse,
} from '@/types';
import { IViewField } from '@/types/viewField';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Input, InputRef, Modal, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  isModalEdit: boolean;
  onCancel: () => void;
  contracts: IContract[];
  listBranch: IBranch[] | [];
  templates: ITemplate[] | [];
  onUpdate: (data: any) => void;
  changeData?: ITemplateParamResponse | null;
  viewField: IViewField[] | [];
  dataType: IDataType[] | [];
};

const ModalEditSection = ({
  isModalEdit,
  onCancel,
  onUpdate,
  changeData,
  viewField,
  dataType,
}: Props) => {
  const [form] = Form.useForm();
  const [listDocType, setListDocType] = useState<IDocType[] | []>();
  const [docParams, setDocParams] = useState<IDocParam[] | []>([]);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [data, setData] = useState<ITemplateParamResponse | null>();

  useEffect(() => {
    getDocType();
  }, []);

  const getDocType = () => {
    getListDocType().then((res) => setListDocType(res));
  };

  useEffect(() => {
    form.setFieldsValue({
      ...changeData,
    });
    setData(changeData);
    if (changeData?.docParamField) {
      onChangeDocType(changeData?.docParamField);
    }
  }, [changeData, form]);

  const _onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, '');
        onUpdate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // createDocParam({
    //   name: e.target.value,
    //   description: "",
    //   docType: "";
    // }).then(()=>{

    //   message.success('Th??m data th??nh c??ng!');

    //   getListDocParamByType("").then((res) => setListDocType(res));
    // })

    // setItems([...items, name || `New item ${index++}`]);
    // setName('');
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);?
  };

  const onChangeDocType = (_type: string) => {
    setData((prevData) => {
      return {
        ...prevData,
        docParamField: _type,
      };
    });
    getListDocParamByType(_type).then((res) => {
      setDocParams(res.data);
    });
  };

  // const _onChangeData = (e) => {
  //   setData((prevData) => {
  //     return {
  //       ...prevData,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };
  // const _onChangeCheckBox = (e) => {
  //   setData((prevData) => {
  //     return {
  //       ...prevData,
  //       [e.target.name]: !e.target.value,
  //     };
  //   });
  // };

  return (
    <Modal
      title="S???a c???u h??nh"
      centered
      visible={isModalEdit}
      onCancel={onCancel}
      width={640}
      footer={[
        <Button form="params" type="primary" key="submit" htmlType="submit">
          OK
        </Button>,
        <Button onClick={onCancel} key="cancel" htmlType="submit">
          Cancel
        </Button>,
      ]}
    >
      <Col>
        <Form form={form} onFinish={_onFinish} name="params" initialValues={{ changeData }}>
          <Form.Item
            name="param"
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            label="T??? kho??"
            required={true}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'Tr?????ng n??y kh??ng ???????c b??? tr???ng!',
              },
            ]}
          >
            <Input name="param" placeholder="Nh???p T??? kho??" />
          </Form.Item>

          <Form.Item
            name="displayName"
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            label="T??n hi???n th???"
            labelAlign="left"
          >
            <Input name="displayName" placeholder="Nh???p t??n hi???n th???" />
          </Form.Item>

          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Multiline"
            name="multiline"
          >
            <Checkbox
              value={data?.multiline || false}
              name="multiline"
              type="checkbox"
              // onChange={_onChangeCheckBox}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Lo???i gi???y t???"
            name="docParamField"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n l???i gi???y t???',
              },
            ]}
          >
            <Select showSearch placeholder="Lo???i gi???y t???" onChange={onChangeDocType}>
              {listDocType &&
                listDocType?.map((_docType: IDocType) => (
                  <Select.Option key={_docType.key} value={_docType.key}>
                    {_docType.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Data Field"
            name="docParamId"
            rules={[
              {
                required: true,
                message: 'Vui l??ng ch???n Data Field',
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n Data Field"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Nh???p T??n data"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Th??m
                    </Button>
                  </Space>
                </>
              )}
            >
              {docParams.map((docParams) => (
                <Select.Option key={docParams.id} value={docParams.id}>
                  {docParams.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="defaultValue"
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            label="Default Value"
            labelAlign="left"
          >
            <Input placeholder="Nh???p data Default Value" />
          </Form.Item>

          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="View field:(Column)"
            colon={true}
            name="viewFieldKey"
          >
            <Select placeholder="Ch???n view field">
              {viewField &&
                viewField.map((vf) => (
                  <Select.Option key={vf.key} value={vf.key}>
                    {vf.value}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ md: 6, xl: 6, xs: 6 }}
            labelAlign="left"
            label="Ki???u d??? li???u"
            colon={true}
            name="dataType"
          >
            <Select placeholder="Ki???u d??? li???u">
              {dataType &&
                dataType.map((type) => (
                  <Select.Option key={type.type} value={type.type}>
                    {type.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </Modal>
  );
};

export default React.memo(ModalEditSection);
