import { URL_API } from '@/common';
import {
    useListParamTicketQuery,
    useUpdateTicketParamMutation
} from '@/pages/ticket/services/query';
import { TicketCtx } from '@/pages/ticket/store';
import { useFillTicketParamMutation } from '@/services/rest/ticket/ticket.query';
import { groupBy } from '@/utils/tool';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col, Form, message,
    Row,
    Select, Upload
} from 'antd';
import axios from 'axios';
import type { Key } from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { TabControlCtx } from '../../tabs';
import FieldParamGroup from '../../tabs/components/FieldParamGroup';
import "./style.less"
const { Option } = Select;

function VanBanScan(data: any[]) {
    if (!data) return;
    return (
        <div className="result-wrapper">
            {data &&
                data?.map((item: any) => {
                    return (
                        <div key={item}>
                            {item?.map((children: any[], index: Key | null | undefined) => {
                                return (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <div key={index} style={{ whiteSpace: 'nowrap' }}>
                                        {children?.map((box: any, index) => (
                                            <span key={index}>{box.text} </span>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
        </div>
    );
}

function ScanPanel({ result, setResult }: any) {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const { id: ticketId } = useParams();

    const hasData = file && result?.data;

    const onChangeFile = ({ file }) => {
        setFile(file);
        setResult(null);
    };

    const onSubmit = async () => {
        if (!file && !imageUrl) return;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            axios({
                method: 'post',
                url: `${URL_API}/api/upload/${ticketId}/scan`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then((res) => {
                    axios
                        .post(`${URL_API}/api/ocr/scan`, {
                            id: res.data.id,
                        })
                        .then((res) => {
                            setResult(res.data);
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    const onReset = () => {
        setFile(null);
        setResult(null);
        setImageUrl(null);
        setInput('');
    };

    const onDelete = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        onReset();
    };

    return (
        <>
            <Row gutter={[30, 60]}>
                <Col md={24} xs={24}>
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
                        style={{ height: 48, marginTop: 24 }}
                    >
                        {hasData ? 'Thử lại' : 'XỬ LÝ'}
                    </Button>
                    <div className="scan-result">{result && VanBanScan(result.data[0].result)}</div>
                </Col>
            </Row>
        </>
    );
}

const defaultFormItemLayout = {
    labelCol: {
        xs: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 12 },
    },
};

const ContractTab = () => {
    const [form] = Form.useForm();

    const [ocrResult, setOcrResult] = useState(null);

    const { id: ticketId } = useParams<{
        id: string;
    }>();

    const [listParam, setListParam] = useState<any>([]);

    const { data } = useListParamTicketQuery(ticketId);
    const { mutate: doFillTicketParam } = useFillTicketParamMutation();

    const { state } = useContext(TicketCtx)
    const tabControlContext = useContext(TabControlCtx)

    useEffect(() => {
        if (!data) return;
        const params = data.map((e: { TemplateParam: any; id: any; value: any }) => {
            return {
                ...e.TemplateParam,
                ticketParamId: e.id,
                value: e.value,
            };
        });

        setListParam(groupBy(params, 'paramGroup', 'paramGroup', 'param'));
    }, [data]);

    const { mutate: doUpdateParam } = useUpdateTicketParamMutation();

    async function handleExport() {
        const res = await axios({
            method: 'get',
            url: `${URL_API}/api/ticket/export/${ticketId}`,
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${ticketId}.docx`);
        document.body.appendChild(link);
        link.click();
        message.success('Export thành công');
    }

    async function handleFinish(values: any) {
        console.log('VALUES', values);

        const updateData = Object.keys(values).map((k) => ({
            id: k,
            value: values[k],
        }));

        doUpdateParam(
            {
                ticketId: ticketId,
                data: updateData,
            },
            {
                onSuccess: () => {
                    message.success('Cập nhật thành công');
                },
            },
        );

        console.log('updateData', updateData);
    }

    const handleFill = async () => {
        const { data: res } = await axios.post(`${URL_API}/api/ticket/param/fill/${ticketId}`);

        await doFillTicketParam(
            {
                ticketId: ticketId,
                payload: res,
            },
            {
                onSuccess: (data) => {
                    if (!data) return;
                    data.forEach((e: any) => {
                        form.setFieldsValue({
                            [e.id]: e.value,
                        });
                    });
                    message.success('Điền thông tin thành công');
                },
            },
        );
    };

    return (
        <div className='create-contract-wrapper'>
            <Row style={{ padding: '5px' }}>
                <Col span={24}>
                    <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
                        {listParam.map((group: any) => {
                            return <FieldParamGroup key={group.paramGroup} group={group} />;
                        })}
                        <Row>
                            <Col span={14}></Col>
                            <Col span={10}>
                                <ScanPanel result={ocrResult} setResult={setOcrResult} />
                            </Col>
                        </Row>
                        <Form.Item>
                            <div className="action-button">
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>

                                <Button onClick={handleExport} type="primary">
                                    Export
                                </Button>

                                <Button onClick={handleFill} type="primary">
                                    Fill
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div className='next-btn'>
                <Button type='primary'
                    onClick={() => tabControlContext?.onChangeTab((Number(tabControlContext.key) + 1).toString())}
                >Chuyển tiếp</Button>
            </div>
        </div>
    );
};

export default ContractTab;
