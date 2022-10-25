import { Button, Form, Input, Row } from 'antd';

type Props = {
  onChangeText: (e: React.FormEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const FromSearch = ({ onChangeText, onSearch }: Props) => {
  return (
    <Form>
      <Row style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <Row style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 600 }}>
          <Form.Item
            labelAlign="left"
            label="Từ khoá"
            name="key"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Input onChange={(e) => onChangeText(e)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onSearch}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Row>
      </Row>
    </Form>
  );
};

export default FromSearch;
