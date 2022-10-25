import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import axios from "axios";
import { useState } from "react";

const UploadIpnut: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const hasData = file;

  const onChangeFile = ({ file }: any) => {
    setFile(file);
  };

  const onSubmit = async () => {
    if (!file && !imageUrl) return;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);
     
    }
  };

  const onReset = () => {
    setFile(null);
 
    setImageUrl(null);
    setInput('');
  };

  const onDelete = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onReset();
  };

  return (
      <Row gutter={[24, 16]}>
        <Col md={24} xs={24} span={12}>
          <Upload
            multiple={false}
            accept="image/*"
            beforeUpload={() => false}
            showUploadList={false}
            onChange={onChangeFile}
            disabled={loading || hasData}
            className="image-uploader"
          >
            {file || input ? (
              <div style={{ position: 'relative' }}>
                {error ? (
                  <div className="upload-area">{error}</div>
                ) : (
                  <>
                    <img
                      src={file ? URL.createObjectURL(file) : imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                    <Button
                      icon={<DeleteFilled />}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      type="primary"
                      onClick={onDelete}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="upload-area">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>

          <Button
            onClick={hasData ? onReset : onSubmit}
            loading={loading}
            type="primary"
            block
          >
            {hasData ? 'Thay Đổi' : 'Avatar'}
          </Button>
        </Col>
      </Row>
  );
};

export default UploadIpnut;
