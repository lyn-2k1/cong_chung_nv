/* eslint-disable */
import { TicketCtx } from '@/pages/ticket/store';
import { getOrcUploadedByTicketId, uploadImages } from '@/services/common';
import { getBase64 } from '@/utils/base64-convert';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Modal, Row, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { useCallback, useContext, useEffect, useState } from 'react';
import ImageHandle from './components/image-handle';
import './style.less';
export interface imageRawData {
  orcType: string | number;
  imgFile: string;
  id: string | number;
  fileId: string | number;
  isChecked: boolean;
  isOcred: boolean;
}

function checkTypeImage(type: any) {
  if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
    return true;
  } else {
    message.error("Ảnh phải thuộc định dạng: jpg , jpeg , png")
    return false

  }
}

function UpLoadTab() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageRawFile, setImageRawFile] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { state } = useContext(TicketCtx);
  const { dataDetail } = state

  const getOrcUploadedList = useCallback(async () => {
    const res = await getOrcUploadedByTicketId(dataDetail?.ticketId);
    const imageRawConvert: imageRawData = res.map((item: any) => {
      return {
        orcType: item.docTypeKey,
        imgFile: item.File.file,
        id: item.id,
        fileId: item.fileId,
        isChecked: false,
        ticketId: dataDetail?.ticketId,
        isOcred: item.status,
      };
    });
    setImageRawFile(imageRawConvert);
  }, [dataDetail?.ticketId]);

  useEffect(() => {
    getOrcUploadedList();
  }, [getOrcUploadedList]);

  const handleChangeListImg: UploadProps['onChange'] = useCallback(({ fileList: newFileList }: any) => {
    const filterListFile = newFileList.filter((item: any) => { return checkTypeImage(item.type) });
    setFileList(filterListFile);
  }, []);

  const handlePreviewImg = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);



  const handleUpLoadImage = async () => {
    const formData: FormData = new FormData();
    fileList.map((item: any) => {
      formData.append('files', item.originFileObj);
    });
    console.log(dataDetail?.ticketId)
    await uploadImages(dataDetail?.ticketId, formData);
    setFileList([]);
    getOrcUploadedList();
  };
  return (
    <div className="upload-tab-wrapper">
      <Row gutter={24}>
        <Col span={18}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple
            maxCount={5}
            onChange={handleChangeListImg}
            onPreview={handlePreviewImg}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Col>
        <Col span={6}>
          <div className="upload-btn">
            <Button type="primary" onClick={handleUpLoadImage}>
              Tải lên
            </Button>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="upload-show-actions">
        <Col span={24}>
          {imageRawFile.length > 0 && dataDetail!.ticketId && (
            <ImageHandle
              imageRawFile={imageRawFile}
              ticketId={dataDetail!.ticketId}
              reload={getOrcUploadedList}
            />
          )}
        </Col>
      </Row>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UpLoadTab;
