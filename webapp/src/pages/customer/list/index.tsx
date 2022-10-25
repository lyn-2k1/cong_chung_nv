import { CURRENT_PAGE_SIZE } from '@/common';
import {
  createCustomer,
  getListCustomer,
  removeCustomer,
  updateCustomer,
} from '@/services/api/Customer';
import type { CustomerCreateRequest, CustomerUpdateRequest, ICustomer } from '@/types';
import { message } from 'antd';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import CustomerListTableSection from './component/CustomerListTableSection';
import CustomerModalSection from './component/CustomerModalSection';
import FromSearch from './component/FromSearch';

const Customers = () => {
  const [name, setName] = useState<string>('');
  const [state, setState] = useState<{
    data: ICustomer[] | [];
    totalPage: number;
    isLoading: boolean;
  }>({
    data: [],
    totalPage: 1,
    isLoading: false,
  });

  const [changeData, setChangeData] = useState<{
    isCreate: boolean;
    data: CustomerUpdateRequest | CustomerCreateRequest | null;
  }>({
    isCreate: false,
    data: null,
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    getData(1);
  }, []);

  const _handleRemove = (selectedRows: ICustomer) => {
    if (selectedRows) {
      const hide = message.loading('deleting');
      removeCustomer(selectedRows.id)
        .then(() => {
          getData(1);
          hide();
          message.success('Bạn xoá thành công dữ liệu');
        })
        .catch(() => {
          hide();
          message.error('Xoá thất bại, Vui lòng thử lại sau!');
        });
    }
  };

  const onChangePage = (page: number) => {
    getData(page);
  };

  const _handleUpdate = (_data: CustomerCreateRequest | CustomerUpdateRequest) => {
    if (!!_data) {
      if (!!changeData.isCreate) {
        const hide = message.loading('Đang tạo dữ liệu!!');
        createCustomer(_data)
          .then(() => {
            hide();
            setChangeData({ isCreate: false, data: null });
            message.success('Bạn tạo mới thành công!');
            getData(1);
            setIsShowModal(false);
          })
          .catch(() => {
            hide();
            setIsShowModal(false);

            message.error('Tạo thất bại, Vui lòng thử lại sau!');
          });
      } else {
        const hide = message.loading('Đang cập dữ liệu!!');
        if (changeData.data && changeData.data.id) {
          updateCustomer({ id: changeData.data.id, body: _data })
            .then(() => {
              hide();
              message.success('Bạn cập nhật thành công!');
              getData(1);
              setChangeData({ isCreate: false, data: null });
              setIsShowModal(false);
            })
            .catch(() => {
              hide();
              setIsShowModal(false);
              message.error('Tạo thất bại, Vui lòng thử lại sau!');
            });
        } else {
          setIsShowModal(false);
          message.error('Tạo thất bại, Vui lòng thử lại sau!');
        }
      }
    }
  };
  const _onChange = ({ isCreate, row }: { isCreate: boolean; row: IPartner | null }) => {
    setIsShowModal(true);
    if (isCreate) {
      setChangeData({
        isCreate: isCreate,
        data: null,
      });
    } else if (row) {
      setChangeData({
        isCreate: isCreate,
        data: {
          id: row.id,
          name: row.name,
          email: row.email,
          branchId: row.branchId,
          phone: row?.phone,
        },
      });
    }
  };
  const getData = (page: number) => {
    const hide = message.loading('Đang cập nhật dữ liệu');

    getListCustomer({ name: name, page: page, limit: CURRENT_PAGE_SIZE })
      .then((res) => {
        hide();
        setState({
          data: res.data || [],
          totalPage: res.totalPage || 1,
          isLoading: false,
        });
      })
      .catch(() => {
        hide();
      });
  };
  const _onChangeTextSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const _onSearch = () => {
    getData(1);
  };
  const _renderTable = useMemo(() => {
    return (
      <CustomerListTableSection
        onChangePage={onChangePage}
        data={state.data}
        totalPage={state.totalPage}
        onDelete={_handleRemove}
        onChange={_onChange}
      />
    );
  }, [state.data, state.totalPage, onChangePage]);

  const _renderModal = useMemo(
    () => (
      <CustomerModalSection
        _onCancel={() => setIsShowModal(false)}
        visible={isShowModal}
        changeData={changeData.data}
        handleUpdate={_handleUpdate}
        isCreate={changeData.isCreate}
      />
    ),
    [changeData.data, changeData.isCreate, isShowModal],
  );
  return (
    <div>
      <FromSearch onChangeText={_onChangeTextSearch} onSearch={_onSearch} />
      {_renderTable}
      {_renderModal}
    </div>
  );
};

export default React.memo(Customers);
