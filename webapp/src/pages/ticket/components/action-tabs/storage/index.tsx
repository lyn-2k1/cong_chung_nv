import { DownloadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useEffect, useState, useContext } from 'react';

import { URL_API } from '@/common/index';
import { Select } from 'antd';
import { useParams } from 'react-router';
import { useDeleteTicketFileMutation, useListFileTicketQuery } from '@/pages/ticket/services/query';
import "./style.less"
import { TicketCtx } from '@/pages/ticket/store';
import { TabControlCtx } from '../../tabs';
const { Option } = Select;

function fileToBase64(file): any {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    }).then((data) => data);
}

export const StorageTab: React.FC = () => {
    // const ticketId = 1;
    const { id: ticketId } = useParams();
    const { state } = useContext(TicketCtx)
    const tabControlContext = useContext(TabControlCtx)
    const { data: listFileDoc, refetch: reloadList } = useListFileTicketQuery(ticketId);
    console.log(listFileDoc);
    const typeFile = 'ocr';
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    const [imageList, setImageList] = useState<any>([]);

    const [ocrTypes, setOcrTypes] = useState(['CCCD', 'XEMAY', 'OTO']);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
    };
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const clearFileList = async () => {
        setFileList([]);
    };
    useEffect(async () => {
        await reloadList();
    }, [fileList]);

    // const validateFile: UploadProps = {
    //   beforeUpload: (file) => {
    //     const isPNG = file.type === 'image/jpeg';
    //     if (!isPNG) {
    //       message.error(`${file.name} is not a image file`);
    //     }
    //     return isPNG || Upload.LIST_IGNORE;
    //   },
    //   onChange: (info) => {
    //     //console.log(info.fileList);
    //   },
    // };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const uploadFile = async (fileList: any, ticketId: any) => {
        const data = new FormData();
        fileList.map((value: any, index: any) => {
            data.append('files', value.originFileObj, value.name);
        });
        data.append('ticketId', ticketId);
        data.append('typeFile', typeFile);
        // const res={}
        // // const res = await UploadControllerUploadFile(
        // //   {
        // //     ticketId: ticketId,
        // //     type: typeFile,
        // //   },
        // //   data,
        // // );
        // await clearFileList();
        // await res.map(async (data: any) => {
        //   console.log('data: ', data);
        //   let url = `${URL_API}/api/file/${ticketId}/${typeFile}/${data.fileName}`;
        //   const imageItem = { image: url };
        //   setImageList((current: any) => [...current, imageItem]);
        // });
        // console.log('--------------------', imageList);
    };

    const { mutate: doDeteleTicketFile } = useDeleteTicketFileMutation();

    const onApply = () => {
        console.log(imageList);
    };

    const handleRemove = async (id: string) => {
        console.log('remove item', id);
        doDeteleTicketFile(id, {
            onSuccess: async () => {
                await reloadList();
            },
            onError: async (e) => {
                console.log(e);
            },
        });
    };
    return (
        <div className='storage-wrapper'>
            <Row>
                <Col span={24}>
                    <h1>File hợp đồng đã ký: </h1>
                </Col>
            </Row>
            <Row gutter={24} className="border border-solid border-slate-500">
                <Col span={18} className="py-3">
                    <Dragger
                        multiple
                        onChange={handleChange}
                        maxCount={10}
                        fileList={fileList}
                        onPreview={handlePreview}
                        name="files"
                        action={`${URL_API}/api/upload/${ticketId}/docs`}
                        showUploadList={false}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </Col>
            </Row>
            <Row>
                <div className="flex flex-col w-full space-y-2">
                    {listFileDoc &&
                        listFileDoc.map((e: any) => (
                            <Row key={e.id} className="list-file">
                                <div className="h-full text-center">{e?.File?.file}</div>
                                <div className="action">
                                    <div>
                                        <Button type="primary">Preview</Button>
                                    </div>

                                    <div>
                                        <Button type="primary" onClick={() => handleRemove(e.id)} danger>
                                            Xóa
                                        </Button>
                                    </div>
                                    <a
                                        href={`${URL_API}/api/upload/${ticketId}/docs/${e?.File?.file}`}
                                        target="_blank"
                                        className="download-img-btn" rel="noreferrer"
                                    >
                                        <DownloadOutlined />
                                        <span> Tải xuống tài liệu</span>
                                    </a>
                                </div>
                            </Row>
                        ))}
                </div>
            </Row>
            <div className='next-btn'>
                <Button type='primary'
                    onClick={() => tabControlContext?.onChangeTab((Number(tabControlContext.key) + 1).toString())}>
                    Chuyển tiếp
                </Button>
            </div>
        </div>
    );
};

export default StorageTab;
