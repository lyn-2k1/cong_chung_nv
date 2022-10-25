import { URL_API } from "@/common";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import axios from "axios";
import React, { useState ,useEffect} from "react";
import styles from "./style.less";

const UploadIpnut = ({uploadFile,defaultImage,styleImg, ...props}: any) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {  
    setImageUrl(defaultImage?`${URL_API}/api/upload/avatar/${defaultImage}`:"");
  }, [defaultImage])
  
  const hasData = file && 0;
  const onChangeFile = ({ file }: any) => {
    setFile(file);
  };

  const onSubmit = async () => {
    if (!file && !imageUrl) return;

    if (file) {
      
      const formData = new FormData();
      formData.append('file', file);
      console.log("formData", formData);
      setLoading(true);
      axios({
        method: 'post',
        url: `${URL_API}/api/upload/upload-avatar`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((res) => {
         console.log("Avatar res",res)
         uploadFile(res.data?.fileName|| "")
         setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    
    
  };

  const onReset = () => {
    setFile(null); 
    setImageUrl("");
  };

  const onDelete = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onReset();
  };

 

  return (
      <Row gutter={[16,32]}>
        <Col span={24}>
          <Upload
            multiple={false}
            accept="image/*"
            beforeUpload={() => false}
            showUploadList={false}
            onChange={onChangeFile}
            disabled={loading || hasData}
            className="image-uploader"
          >
            {file || imageUrl ? (
              <div style={{ position: 'relative'}}>
                {error ? (
                  <div className="upload-area">{error}</div>
                ) : (
                  <div className={styleImg ? styleImg : {}}>
                    <img
                      src={file ? URL.createObjectURL(file) : imageUrl}
                      alt="avatar"
                      style={styleImg ? { width: '100%'} : {width: "100%"}}
                    />
                    <Button
                      icon={<DeleteFilled />}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      type="primary"
                      onClick={onDelete}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="upload-area">
                <PlusOutlined />
                <div style={{ marginTop: "8px"}}>Tải ảnh avatar lên</div>
              </div>
            )}
          </Upload>
          {styleImg ? <br/> : <></>}
          <Button
            style={styleImg ? {width: '120px'} : {marginTop: "4px"}}
            onClick={hasData ? onReset : onSubmit}
            loading={loading}
            type="primary"
            block
          >
            {hasData ? 'Thay Đổi' : 'Tải ảnh lên'}
          </Button>
        </Col>
      </Row>
  );
};

export default React.memo(UploadIpnut);
