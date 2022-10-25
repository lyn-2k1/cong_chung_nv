import { getListBranch } from '@/services/api/Branch';
import {
  TemplateControllerCreate,
  TemplateControllerFilter,
  TemplateControllerGetListByTypeContractId,
  TemplateControllerRemove,
  TemplateControllerUpdate,
} from '@/services/api/Template';
import { getListTypeContractByWorkTypeId } from '@/services/api/TypeContract';
import { getListWorkType } from '@/services/api/WorkType';
import type { IBranch, ITemplate, ITemplateCreate, ITypeContact, IWorkType } from '@/types';

import { message, Modal } from 'antd';
import React, { useCallback } from 'react';

import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import ListFormSection from './component/ListFormSection';
import ModalEditSection from './component/ModalEditSection';
import TableTemplateSection from './component/TableTemplateSection';
import './style.less';

function TemplateDetail() {
  const [state, setState] = useState<{
    data: ITemplate[] | [];
    totalDocs: number;
    totalCount: number;
  }>({
    data: [],
    totalDocs: 0,
    totalCount: 0,
  });

  const [templates, setTemplates] = useState<ITemplate[] | []>([]);
  const [branchs, setBranchs] = useState<IBranch[] | []>([]);
  const [workTypes, setWorkType] = useState<IWorkType[] | []>([]);
  const [typeContracts, setTypeContracts] = useState<ITypeContact[] | []>([]);

  const [dataFilter, setDataFilter] = useState<{
    branchId?: number | null;
    typeContractId?: number | null;
    templateId?: number | null;
    workTypeId?: number | null;
  }>({ branchId: null, typeContractId: null, workTypeId: null, templateId: null });

  const [isLoading, setIsLoading] = useState(false);
  const [changeData, setChangeData] = useState<ITemplate | ITemplateCreate | null>(null);
  const { initialState } = useModel('@@initialState');

  const [modal, setModal] = useState({
    isModal: false,
    isCreate: false,
  });

  useEffect(() => {
    if (initialState?.currentUser?.branchId) {
      setDataFilter(() => ({
        typeContractId: null,
        templateId: null,
        workTypeId: null,
        branchId: initialState?.currentUser?.branchId,
      }));
    }
  }, [initialState?.currentUser?.branchId]);

  useEffect(() => {
    Promise.all([getBrach(), getWorkType()]);
  }, []);

  const getBrach = () => {
    getListBranch().then((res) => setBranchs(res));
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
        setTemplates(res);
      });
    }
  }, [dataFilter?.typeContractId]);

  const _onModalCancel = () => {
    setModal((prevModal) => {
      return {
        ...prevModal,
        isModal: false,
      };
    });
  };

  const _onDeleteData = (_data: ITemplate) => {
    if (!!_data.id) {
      Modal.confirm({
        title: 'Bạn muốn xoá!',
        content: `Bạn muốn xoá dữ liệu ${_data.name}`,
        onOk() {
          TemplateControllerRemove(_data.id).then(() => {
            TemplateControllerFilter({
              filterBy: 'branchId,typeContractId',
              value: `${dataFilter.branchId},${dataFilter.typeContractId}`,
            }).then((res) => setData(res));
            message.success('Bạn xoá dữ liệu thành công');
          });
        },
      });
    }
  };
  const _onFinish = useCallback(() => {
    if (dataFilter.typeContractId) {
      TemplateControllerFilter({
        filterBy: 'branchId,typeContractId',
        value: `${dataFilter.branchId},${dataFilter.typeContractId}`,
      }).then((res) =>
        setState({
          data: res.data || [],
          totalDocs: res.totalDocs || 0,
          totalCount: res.totalCount || 0,
        }),
      );
    }
  }, [dataFilter.branchId, dataFilter.typeContractId]);
  const _onSelect = ({ name, value }: { name: string; value: string | number }) => {
    setDataFilter((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const _formSection = useMemo(() => {
    return (
      <ListFormSection
        workTypes={workTypes}
        branchs={branchs}
        typeContracts={typeContracts}
        onSelect={_onSelect}
        onFinish={_onFinish}
        templates={templates}
        dataFilter={dataFilter}
      />
    );
  }, [workTypes, branchs, typeContracts, _onFinish, templates, dataFilter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _onShowModal = ({ _data, _isCreate }: { _data: ITemplate | null; _isCreate: boolean }) => {
    setModal({
      isModal: true,
      isCreate: _isCreate,
    });

    if (!!_isCreate && !!dataFilter.typeContractId && !!dataFilter.branchId) {
      setChangeData(_data);
      setChangeData(_data);
      setChangeData({
        price: 0,
        file: null,
        name: '',
        typeContractId: dataFilter.typeContractId,
        branchId: dataFilter.branchId,
      });
    } else {
      setChangeData(_data);
    }
  };
  const _tableSection = useMemo(() => {
    return (
      <TableTemplateSection
        data={state.data}
        onShowModal={_onShowModal}
        onDelete={_onDeleteData}
        workTypes={workTypes}
        branchs={branchs}
        dataFilter={dataFilter}
      />
    );
  }, [_onDeleteData, _onShowModal, branchs, state.data, dataFilter, workTypes]);

  const _onUpdate = useCallback((value) => {
    setIsLoading(true);
    TemplateControllerUpdate(value.id, value)
      .then(() => {
        setIsLoading(false);
        message.success('Cập nhật thành công template!');
        setModal({
          isCreate: true,
          isModal: false,
        });
        TemplateControllerFilter({
          filterBy: 'branchId,typeContractId',
          value: `${dataFilter.branchId},${dataFilter.typeContractId}`,
        }).then((res) => setData(res));
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.ResponseError);
      });
  }, []);
  const _onCreate = useCallback(
    (value: ITemplateCreate) => {
      if (!!modal.isCreate) {
        setIsLoading(true);
        TemplateControllerCreate(value)
          .then(() => {
            setIsLoading(false);
            message.success('Tạo thành công template!');
            setModal({
              isCreate: true,
              isModal: false,
            });
            if (dataFilter.typeContractId) {
              TemplateControllerFilter({
                filterBy: 'typeContractId',
                value: dataFilter.typeContractId,
              }).then((res) =>
                setState({
                  data: res.data || [],
                  totalCount: res.totalCount || 0,
                  totalDocs: res.totalDocs || 0,
                }),
              );
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            message.error(err.ResponseError);
          });
      }
    },
    [dataFilter.typeContractId, modal.isCreate],
  );

  const _modalEditSection = useMemo(() => {
    return (
      <ModalEditSection
        isModalEdit={modal.isModal}
        onCancel={_onModalCancel}
        onCreate={_onCreate}
        onUpdate={_onUpdate}
        workTypes={workTypes}
        branchs={branchs}
        typeContracts={typeContracts}
        changeData={changeData}
        isCreate={modal.isCreate}
      />
    );
  }, [
    _onCreate,
    _onUpdate,
    branchs,
    changeData,
    modal.isCreate,
    modal.isModal,
    typeContracts,
    workTypes,
  ]);

  return (
    <div>
      {_formSection}
      {_tableSection}
      {_modalEditSection}
    </div>
  );
}
export default React.memo(TemplateDetail);
