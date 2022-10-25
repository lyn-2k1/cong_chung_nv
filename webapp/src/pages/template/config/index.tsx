/* eslint-disable @typescript-eslint/no-unused-vars */
import { getListBranch } from '@/services/api/Branch';
import { TemplateControllerGetListByTypeContractId } from '@/services/api/Template';
import {
  TemplateParamsControllerFilter,
  TemplateParamsUpdateAndCreateControllerCreate,
} from '@/services/api/TemplateParam';
import type {
  IBranch,
  IDataType,
  IDocParam,
  IDocType,
  ITemplate,
  ITemplateParamCreate,
  ITemplateParamResponse,
  ITypeContact,
  IViewField,
  IWorkType,
} from '@/types';

import { Col, Select, Row, Modal, Form, Button, message } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import ModalEditSection from './component/ModalEditSection';
import TableSection from './component/TableSection';
import 'dragula/dist/dragula.css';
import dragula from 'dragula';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import InspectModule from 'docxtemplater/js/inspect-module';
import { loadFile } from '@/utils/load-file';
import { getListTypeContractByWorkTypeId } from '@/services/api/TypeContract';
import { getListWorkType } from '@/services/api/WorkType';
import { getListViewField } from '@/services/api/ViewField';
import { getListDocParam } from '@/services/api/DocParam';
import { URL_API } from '@/common';
import { getListDataType } from '@/services/api/DataType';
import { getListDocType } from '@/services/api/DocType';
import { useModel } from 'umi';
const iModule = new InspectModule();
const getIndexInParent = (el: any) => Array.from(el.parentNode.children).indexOf(el);

function TemplateDetail() {
  const [templates, setTemplate] = useState<ITemplate[]>([]);
  const [listBranch, setListBranch] = useState<IBranch[]>([]);
  const [typeContracts, setTypeContracts] = useState<ITypeContact[] | []>([]);
  const [workTypes, setWorkType] = useState<IWorkType[] | []>([]);
  const [docParams, setDocParams] = useState<IDocParam[] | []>([]);
  const [viewField, setViewField] = useState<IViewField[] | []>([]);
  const [dataType, setDataType] = useState<IDataType[] | []>([]);
  const [docTypes, setDocTypes] = useState<IDocType[] | []>([]);
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState<ITemplateParamResponse[] | []>([]);
  // const [form] = Form.useForm();
  const [dataFilter, setDataFilter] = useState<{
    typeContractId?: number | null;
    workTypeId?: number | null;
    templateId?: number | null;
  }>({
    branchId: 1,
    typeContractId: null,
    workTypeId: null,
    templateId: null,
  });
  const [isModal, setIsModal] = useState(false);
  const [dataChange, setDataChange] = useState<ITemplateParamCreate | null>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getDocParam(),
      Promise.all([getBranchData(), getWorkType(), getViewField(), getDataType(), getDocType()]);
  }, []);

  const getDocType = () => {
    getListDocType().then((res) => {
      setDocTypes(res);
    });
  };
  const getDocParam = () => {
    getListDocParam().then((res) => {
      setDocParams(res);
    });
  };

  const getDataType = () => {
    getListDataType().then((res) => {
      setDataType(res);
    });
  };
  const getViewField = () => {
    getListViewField().then((res) => {
      setViewField(res);
    });
  };
  const getWorkType = () => {
    getListWorkType().then((res) => {
      setWorkType(res);
    });
  };
  useEffect(() => {
    if (!!dataFilter?.workTypeId) {
      getListTypeContractByWorkTypeId(dataFilter?.workTypeId).then((res) => {
        setDataFilter((prevData) => ({
          ...prevData,
          typeContractId: null,
          templateId: null,
        }));
        setTypeContracts(res);
      });
    }
  }, [dataFilter?.workTypeId]);

  useEffect(() => {
    if (!!dataFilter?.typeContractId) {
      TemplateControllerGetListByTypeContractId(dataFilter?.typeContractId).then((res) => {
        setDataFilter((prevData) => ({
          ...prevData,
          templateId: null,
        }));
        setTemplate(res);
      });
    }
  }, [dataFilter?.typeContractId]);

  const getBranchData = () => {
    getListBranch().then((res) => setListBranch(res));
  };

  const _onModalCancel = () => {
    setIsModal(false);
  };

  const _onChangeData = (_data: ITemplateParamCreate | null) => {
    setDataChange(_data);
    setIsModal(true);
  };

  const _onDeleteData = useCallback(
    (d: ITemplateParamCreate, index: number) => {
      if (index > -1) {
        Modal.confirm({
          title: 'Bạn muốn xoá!',
          content: `Bạn muốn xoá dữ liệu ${d.param}`,
          onOk() {
            setData(data?.filter((_, i: number) => i !== index) || []);
          },
        });
      }
    },
    [data],
  );

  const _onUpdate = useCallback(
    (_data: ITemplateParamCreate) => {
      const checkNewDate = data.some((d) => d.param === _data.param);
      if (checkNewDate) {
        setIsModal(false);
        setDataChange(null);
        setData((pervData) => {
          return pervData?.map((d) =>
            d.param === _data.param
              ? {
                  ...d,
                  param: _data.param,
                  templateId: initialState?.currentUser?.branchId,
                  paramGroup: _data.paramGroup,
                  defaultValue: _data.defaultValue,
                  viewFieldKey: _data.viewFieldKey,
                  dataType: _data?.dataType,
                  createBy: _data?.createBy || null,
                  updatedBy: _data?.updatedBy || null,
                  multiline: _data.multiline || false,
                  status: true,
                  position: _data?.position,
                  createdAt: _data?.createdAt,
                  updatedAt: _data?.updatedAt,
                  docParamId: _data?.docParamId,
                  displayName: _data.displayName,
                  docParamField: _data.docParamField,
                }
              : d,
          );
        });
      } else {
        setDataChange(null);
        setIsModal(false);
        setData((pervData) => {
          return [
            ...pervData,
            {
              ..._data,
              status: true,
              position: pervData.length + 1,
            },
          ];
        });
      }
    },
    [data],
  );
  const _onUpdateTableAll = useCallback(() => {
    if (data.length) {
      Modal.confirm({
        title: 'Cập tất cả dữ liêu bảng',
        content: `Bạn muốn đồng bộ ko!.

      có ${data?.filter((_d) => _d?.status === true)?.length} dữ liệu  thay đổi!`,
        onOk() {
          TemplateParamsUpdateAndCreateControllerCreate(data)
            .then(() => {
              message.success('Cập nhật thành công');
              TemplateParamsControllerFilter({ templateId: dataFilter?.templateId })
                .then((res) => {
                  setData(res);
                })
                .catch((co) => console.log(co));
            })
            .catch((err) => {
              message.error(err.ResponseError);
            });
        },
      });
    }
  }, [data]);

  const _modalSection = useMemo(() => {
    return (
      <ModalEditSection
        changeData={dataChange}
        listBranch={listBranch}
        templates={templates}
        contracts={typeContracts}
        onCancel={_onModalCancel}
        isModalEdit={isModal}
        onUpdate={_onUpdate}
        viewField={viewField}
        dataType={dataType}
      />
    );
  }, [dataChange, listBranch, templates, typeContracts, isModal, _onUpdate, viewField, dataType]);

  const _tableSection = useMemo(() => {
    return (
      <TableSection
        data={data}
        onChangeData={_onChangeData}
        updateTableAll={_onUpdateTableAll}
        onDelete={_onDeleteData}
        viewField={viewField}
        docParams={docParams}
        dataType={dataType}
        docTypes={docTypes}
      />
    );
  }, [_onDeleteData, _onUpdateTableAll, data, dataType, viewField, docParams]);

  const _loadData = () => {
    setData([]);
    _onFinish();
  };

  const _onFinish = () => {
    if (!!dataFilter.templateId) {
      const _file = templates.find((_template) => _template?.id == dataFilter?.templateId)?.file;
      if (!!_file) {
        loadFile(`${URL_API}/public/template/${_file}`, (error, content) => {
          if (error) {
            if (dataFilter.templateId) {
              TemplateParamsControllerFilter({ templateId: dataFilter.templateId })
                .then((res) => {
                  setData(res);
                })
                .catch((co) => console.log(co));
            }
          } else {
            new Docxtemplater(new PizZip(content), { modules: [iModule] });
            const tags = iModule.getAllTags();
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const loadFile = Object.keys(tags).map((_key, index) => {
              return {
                templateId: initialState?.currentUser?.branchId,
                paramGroup: '',
                defaultValue: _key,

                multiline: false,
                position: index,
                createdAt: new Date(),
                updatedAt: new Date(),
                docParamId: null,
                displayName: _key,
                docParamField: '',
                param: _key,
                viewFieldKey: null,
                DocParam: null,
                ParamGroup: null,
                SystemConfig: null,
                Template: null,
              };
            });
            const uniqByKeepFirst = (a: any[], key: (arg0: any) => any) => {
              const seen = new Set();
              return a.filter((item) => {
                const k = key(item);
                return seen.has(k) ? false : seen.add(k);
              });
            };
            if (!!dataFilter?.templateId) {
              TemplateParamsControllerFilter({ templateId: dataFilter?.templateId })
                .then((res) => {
                  setData(uniqByKeepFirst(res?.concat(loadFile), (it) => it.param));
                })
                .catch((co) => console.log(co));
            }
          }
        });
      } else {
        TemplateParamsControllerFilter({ templateId: dataFilter.templateId })
          .then((res) => {
            setData(res);
          })
          .catch((co) => console.log(co));
      }
    } else {
    }
  };

  const handleReorder = (dragIndex: number, draggedIndex: number) => {
    setData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, { ...item, position: dragIndex });
      return newState;
    });
  };

  React.useEffect(() => {
    let start: number;
    let end;
    const container = document.querySelector('.ant-table-tbody');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define

    const drake = dragula([container], {
      moves: (el: any) => {
        start = getIndexInParent(el);
        return true;
      },
    });

    drake.on('drop', (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
  }, []);

  const _onChangeForm = ({ name, value }: { name: string; value: string | number }) => {
    setDataFilter((pervData) => ({
      ...pervData,
      [name]: value,
    }));
    setTemplate([]);
  };

  return (
    <div>
      <Row justify="center">
        <Col xl={16} lg={24} xs={24} md={24}>
          {/* <Form form={form} initialValues={dataFilter}> */}
          <Form.Item
            initialValue={initialState?.currentUser?.branchId}
            labelCol={{ md: 4, xl: 4, xs: 24 }}
            labelAlign="left"
            label="Chi nhánh"
            name="branchId"
          >
            <Select
              defaultValue={initialState?.currentUser?.branchId}
              disabled
              filterOption={false}
              placeholder="Chọn chi nhánh"
            >
              {listBranch.map((branch) => (
                <Select.Option key={branch?.id} value={branch?.id}>
                  {branch.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ md: 4, xl: 4, xs: 24 }}
            labelAlign="left"
            label="Sổ làm việc"
            name="workTypeId"
          >
            <Select
              onSelect={(value: string | number) => {
                setDataFilter((pervData) => ({
                  // ...pervData,
                  templateId: null,
                  typeContractId: null,
                }));
                // form.resetFields(['typeContractId', 'templateId']);
                _onChangeForm({ name: 'workTypeId', value: value });
              }}
              placeholder="Chọn sổ làm việc"
            >
              {workTypes &&
                workTypes?.map((workType) => (
                  <Select.Option key={workType.id} value={workType.id}>
                    {workType.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ md: 4, xl: 4, xs: 24 }}
            labelAlign="left"
            label="Loại hợp đồng"
            name="typeContractId"
          >
            <Select
              allowClear
              value={dataFilter.typeContractId}
              onSelect={(value: string | number) => {
                setDataFilter((pervData) => ({
                  ...pervData,
                  templateId: null,
                }));
                // form.resetFields(['templateId']);
                _onChangeForm({ name: 'typeContractId', value: value });
              }}
              disabled={!dataFilter?.workTypeId}
              placeholder="Chọn loại hợp đồng"
            >
              {typeContracts &&
                typeContracts.map((typeContract) => (
                  <Select.Option key={typeContract?.id} value={typeContract?.id}>
                    {typeContract.name} ({typeContract.description})
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ md: 4, xl: 4, xs: 24 }}
            labelAlign="left"
            label="Template"
            name="templateId"
            required
          >
            <Select
              disabled={!dataFilter?.typeContractId}
              filterOption={false}
              placeholder="Chọn template"
              onSelect={(value: string | number) => {
                // console.log({ name: 'templateId', value: value });

                _onChangeForm({ name: 'templateId', value: value });
              }}
            >
              {templates &&
                templates.map((_template) => (
                  <Select.Option value={_template?.id} key={_template?.id}>
                    {_template?.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          {/* </Form> */}
          <Row align="stretch">
            <Form.Item>
              <Button
                disabled={
                  !!dataFilter?.typeContractId &&
                  !!dataFilter?.workTypeId &&
                  !!dataFilter?.templateId
                    ? false
                    : true
                }
                type="primary"
                htmlType="submit"
                onClick={_loadData}
              >
                Hiện thị
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
      {_tableSection}
      {_modalSection}
    </div>
  );
}

export default React.memo(TemplateDetail);
