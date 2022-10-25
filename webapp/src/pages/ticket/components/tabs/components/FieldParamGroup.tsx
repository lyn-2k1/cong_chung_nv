import {
  useCreateOcrGroupMutation,
  useGetListOcrGroupQuery,
  useGetListOcrQuery,
} from '@/pages/ticket/services/query';
import { Button, Col, Divider, Form, Image, Input, message, Row, Select } from 'antd';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { URL_API } from '@/common';

type FieldParamGroupProps = {
  group: any;
};
const { Option } = Select;

const FieldParamGroup = ({ group }: FieldParamGroupProps) => {
  const [ocrSelected, setOcrSelected] = useState<string[]>();
  const { mutate: doCreateOcrGroup } = useCreateOcrGroupMutation();

  const { id: ticketId } = useParams<{
    id: string;
  }>();
  const { data: listOcr } = useGetListOcrQuery(ticketId);

  const { data: listOcrGroup } = useGetListOcrGroupQuery(ticketId, group.paramGroup);

  const selectedListOcr = listOcr?.filter((item: { id: string }) => ocrSelected?.includes(item.id));

  const handleChange = async (value: string[]) => {
    setOcrSelected(value);
    const createOcrData = value.map((e) => ({
      ocrId: e,
      paramGroupName: group.paramGroup,
      ticketId: ticketId,
    }));
    await doCreateOcrGroup(
      {
        data: createOcrData,
      },
      {
        onSuccess: () => {
          message.success('Cập nhật thành công');
        },
      },
    );
  };

  useEffect(() => {
    const defaultSelected = listOcrGroup?.map((item: { ocrId: any }) => item.ocrId) || [];
    setOcrSelected(defaultSelected);
  }, [listOcrGroup]);

  return (
    <div key={group}>
      <Divider dashed>{group.paramGroup}</Divider>
      <Row>
        <Col span={14}>
          {group &&
            group?.param.map((param: any) => (
              <div key={param.id}>
                <Form.Item name={param.ticketParamId} label={param.displayName}>
                  <Input defaultValue={param.value} />
                </Form.Item>
              </div>
            ))}
        </Col>
        <Col span={10}>
          <Select
            value={ocrSelected}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="select one country"
            onChange={handleChange}
            optionLabelProp="label"
          >
            {listOcr &&
              listOcr.map((item: any) => (
                <Option key={item.id} value={item.id} label={item.DocType?.key + item.id}>
                  <div className="demo-option-label-item">
                    <span>{item.DocType?.key + item.id}</span>
                  </div>
                </Option>
              ))}
          </Select>
          <Image.PreviewGroup>
            {selectedListOcr &&
              selectedListOcr.map((item: any) => (
                <Image
                  key={item.id}
                  width={200}
                  src={`${URL_API}/api/upload/${ticketId}/images/${item.File.file}`}
                />
              ))}
          </Image.PreviewGroup>
        </Col>
      </Row>
    </div>
  );
};
export default FieldParamGroup;
