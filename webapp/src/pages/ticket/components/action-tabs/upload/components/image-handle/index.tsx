import { URL_API } from '@/common/index';
import { TabControlCtx } from '@/pages/ticket/components/tabs';
// import { TicketCtx } from '@/pages/ticket/store';
import { updateOcr } from '@/services/api/ocr';
import { removeOcrsId } from '@/services/api/ticket/upload';
import { getOrcTypes } from '@/services/common';
import { useOcrDataQuery, useUpdateOcrDataMutation } from '@/services/rest/ocr/ocr.query';
import { DownloadOutlined } from '@ant-design/icons';
// import { CardLoading } from '@ant-design/pro-card/lib/components/CheckCard/Group';
import { PageLoading } from '@ant-design/pro-layout';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Col, Form, Image, Input, message, Modal, Row, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useCallback, useEffect, useState, useContext } from 'react';
import type { imageRawData } from '../..';
import './style.less';

interface ImageHandleProps {
  imageRawFile: imageRawData[];
  ticketId: string;
  reload: () => Promise<any>;
}

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

const PreviewOcrDataModal = ({ ticketId, activeFile, showViewModal, setShowViewModal } : any) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data: scanedData, isLoading } = useOcrDataQuery(activeFile?.id);
  const { mutate: doUpdateOcrData } = useUpdateOcrDataMutation();
  if (isLoading) {
    return <PageLoading prefixCls="" />;
  }
  scanedData?.forEach((e: any) => {
    form.setFieldsValue({
      [e.id]: e.value,
    });
  });

  async function handleFinish(values: any) {
    console.log('update');
    console.log('VALUES', values);

    const updateData = Object.keys(values).map((key) => {
      const value = values[key];
      return {
        id: Number(key),
        value,
      };
    });

    await doUpdateOcrData(
      {
        data: updateData,
      },
      {
        onSuccess: () => {
          message.success('Cập nhật thành công');
          queryClient.invalidateQueries(['ocrData', activeFile?.id]);
        },
        onError: () => {
          message.error('Cập nhật thất bại');
        },
      },
    );
  }
  // console.log('🚀 ~ file: index.tsx ~ line 35 ~ ImageHandle ~ scanedData', scanedData);
  return (
    <Modal
      open={showViewModal}
      onCancel={() => setShowViewModal(false)}
      footer={false}
      width={1000}
      destroyOnClose
      bodyStyle={{ overflowY: 'scroll', height: '80vh' }}
    >
      <Row style={{ padding: '5px' }}>
        <Col span={24}>
          <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
            <Row>
              <Col span={14}>
                {scanedData &&
                  scanedData.map((param: any) => (
                    <div key={param.id}>
                      <Form.Item name={param.id} label={param.key}>
                        <Input defaultValue={param.value} />
                      </Form.Item>
                    </div>
                  ))}
              </Col>
              <Col span={10}>
                <Image.PreviewGroup>
                  <Image
                    width={200}
                    src={`${URL_API}/api/upload/${ticketId}/images/${activeFile.imgFile}`}
                    alt={activeFile.imgFile}
                  />
                </Image.PreviewGroup>
              </Col>
            </Row>
            <Form.Item>
              <div className="flex flex-row items-center space-x-2">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default function ImageHandle({ imageRawFile, ticketId, reload }: ImageHandleProps) {
  const [imageRawFileList, setImageRawFileList] = useState<imageRawData[]>([]);
  const [ocrOptions, setOcrOptions] = useState<{ label: string; value: string }[]>([]);
  const [activeFile, setActiveFile] = useState<any>(undefined);
  // const [showModal, setShowModal] = useState<boolean>(false)

  const [orcLoading, setOrcLoading] = useState<boolean>(false)

  // const { state } = useContext(TicketCtx)

  const [showModal, setShowModal] = useState<boolean>(false);
  const tabControlContext = useContext(TabControlCtx);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  useEffect(() => {
    setImageRawFileList(imageRawFile);
  }, [imageRawFile]);

  const getOcrList = useCallback(async () => {
    const res = await getOrcTypes();
    let ocrOptionList = [];

    if (res.length > 0) {
      ocrOptionList = res.map((item: { key: string; name: string }) => {
        return { label: item.name, value: item.key };
      });
    }
    setOcrOptions(ocrOptionList);
  }, []);

  useEffect(() => {
    getOcrList();
  }, [getOcrList]);

  const updateOrcData = useCallback(
    async (orcId: any, data: any) => {
      await updateOcr(orcId, data);
      reload();
    },
    [reload],
  );

  const handleChangeStatus = (value: CheckboxChangeEvent, index: any) => {
    const newData = imageRawFileList.map((item, indexItem) => {
      if (indexItem === index) {
        const updateItem = {
          ...item,
          isChecked: value.target.checked,
        };
        return updateItem;
      }
      return item;
    });
    setImageRawFileList(newData);
  };

  const handleChange = (value: any, index: any) => {
    const newData = imageRawFileList.map((item, indexItem) => {
      if (indexItem === index) {
        const updateItem: any = {
          ...item,
          orcType: value,
        };
        return updateItem;
      }
      return item;
    });
    setImageRawFileList(newData);
  };
  const handleApplyOCR = async () => {
    setOrcLoading(true)

    try {
      const requestList = imageRawFileList.filter((item) => {
        return item.isChecked;
      });
      const promiseList = [];
      for (let i = 0; i < requestList.length; i++) {
        const dataObj = {
          docTypeKey: requestList[i].orcType || undefined,
          status: true,
        };
        promiseList.push(updateOrcData(requestList[i].id, dataObj));
      }
      await Promise.all(promiseList);
    } catch (error) {
      message.error("Có lỗi xảy ra khi orc/scan")
    }

    setOrcLoading(false)

  };

  const handleOpenModalRemoveOrcItem = async (item: any) => {
    setShowModal(true);
    setActiveFile(item);
  };
  const handleOpenModalViewOrcItem = async (item: any) => {
    setShowViewModal(true);
    setActiveFile(item);
  };

  const handleRemoveOrcFile = async () => {
    try {
      const res = await removeOcrsId(activeFile.id);
      if (res.id) {
        message.success('Xóa file thành công');
      }
      reload();
    } catch (error) {
      message.error('Có lỗi xảy ra , hãy thử lại');
    }
    setShowModal(false)
  }
  console.log("orcLoading", orcLoading)
  return (
    <div className="image-handle-wrapper">
      <div className="wrapper">
        <div className="image-handle">
          {imageRawFileList.map((item: imageRawData, index: any) => {
            return (
              <div className="item" key={item.id}>
                <div className="image">
                  <img
                    src={`${URL_API}/api/upload/${ticketId}/images/${item.imgFile}`}
                    alt={item.imgFile}
                  />
                </div>
                <div>
                  <Select
                    defaultValue={item.orcType}
                    onChange={(value) => handleChange(value, index)}
                    style={{ width: 200 }}
                    options={ocrOptions}
                    disabled={item.isOcred === true}
                  />
                </div>
                <div className="item-label">
                  {item.isOcred ? (
                    !!item.orcType ? (
                      <span>OCRED</span>
                    ) : (
                      <span>SCANNED</span>
                    )
                  ) : !!item.orcType ? (
                    item.isChecked ? (
                      <span>OCR</span>
                    ) : (
                      ''
                    )
                  ) : item.isChecked ? (
                    <span>Scan</span>
                  ) : (
                    <span>Default</span>
                  )}
                </div>
                <div>
                  <Checkbox
                    onChange={(value) => handleChangeStatus(value, index)}
                    disabled={item.isOcred === true}
                  />
                </div>
                <div className="actions-btn">
                  <Button onClick={() => handleOpenModalRemoveOrcItem(item)} type="primary" danger>
                    Xóa
                  </Button>
                  <Button onClick={() => handleOpenModalViewOrcItem(item)} type="primary">
                    Xem
                  </Button>
                </div>
                <a
                  href={`${URL_API}/api/upload/${ticketId}/images/${item.imgFile}`}
                  className="download-img-btn"
                >
                  <DownloadOutlined />
                  <span> Tải xuống hình ảnh</span>
                </a>
              </div>
            );
          })}
        </div>
        <div className="apply-btn">
          <Button loading={orcLoading} type="primary" onClick={handleApplyOCR}>
            Tải lên
          </Button>
        </div>
      </div>
      <div className="next-btn">
        <Button
          type="primary"
          onClick={() =>
            tabControlContext?.onChangeTab((Number(tabControlContext.key) + 1).toString())
          }
        >
          Chuyển tiếp
        </Button>
      </div>
      {activeFile && (
        <Modal open={showModal} onCancel={() => setShowModal(false)} footer={false} destroyOnClose>
          <div className="remove-orc-modal">
            <strong>Bạn có chắc chắn muốn xóa file</strong>
            <img
              src={`${URL_API}/api/upload/${ticketId}/images/${activeFile.imgFile}`}
              alt={activeFile.imgFile}
            />
            <div className="actions-modal">
              <Button type="primary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button type="primary" onClick={handleRemoveOrcFile} danger>
                Xóa
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {activeFile && (
        <PreviewOcrDataModal
          activeFile={activeFile}
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          ticketId={ticketId}
        />
      )}
    </div>
  );
}
