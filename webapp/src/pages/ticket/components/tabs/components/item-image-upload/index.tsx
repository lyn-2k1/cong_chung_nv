import { Col, Row, Select, Image, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect, useState } from 'react';

export const ItemImageUpload = (props: { image: any; ocrTypes: string[] }) => {
  const [ocrType, setOcrType] = useState('');
  const [status, setStatus] = useState('');
  const { Option } = Select;
  const [isCheck, setIsCheck] = useState(props.image?.isCheck || false);

  const onImageApply = () => {
    props.image.isCheck = isCheck;
    props.image.ocrType = ocrType;
    props.image.status = status;
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setIsCheck(e.target.checked);
    onImageApply();
  };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
    setOcrType(value);
    setStatus('OCR');
    onImageApply();
  };
  useEffect(() => {
    if (ocrType === '') {
      setStatus('SCAN');
    }
    onImageApply();
  }, []);
  return (
    <Row>
      <Col span={5}>
        <Image width={100} src={props.image.image} />
      </Col>
      <Col span={5}>
        <Select onChange={handleChangeSelect}>
          {props.ocrTypes.map((type, index) => {
            return (
              <React.Fragment>
                <Option value={index}>{type}</Option>
              </React.Fragment>
            );
          })}
        </Select>
      </Col>
      <Col span={5}>
        <div className="bg-sky-500 w-fit">
          <span>{status}</span>
        </div>
      </Col>
      <Col span={5}>
        <Checkbox onChange={onChange}></Checkbox>
      </Col>
    </Row>
  );
};
