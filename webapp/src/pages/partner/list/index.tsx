import { CURRENT_PAGE_SIZE } from '@/common';
import {
  createPartner,
  deletePartner,
  getListPartner,
  updatePartner,
} from '@/services/api/partner';
import type { IPartner, PartnerCreateRequest, PartnerUpdateRequest } from '@/types';
import { message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import FromSearch from './component/FromSearch';
import PartnerListTabSection from './component/PartnerListTabSection';
import PartnerModalSection from './component/PartnerModalEditSection';

const listPartner = () => {
  const [name, setName] = useState<string>('');
  const [data, setData] = useState<{
    list: IPartner[] | [];
    totalPage: number;
  }>({
    list: [],
    totalPage: 1,
  });

  const [changeData, setChangeData] = useState<{
    isCreate: boolean;
    data: {
      id: number;
      fullName: string;
      // email: string;
      branchId?: number;
      phone: string;
      date?: string | Date;
      //   contact?: string;
    } | null;
  }>({
    isCreate: false,
    data: null,
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    getData(1);
  }, []);

  const _handleRemove = (selectedRows: IPartner) => {
    if (selectedRows) {
      const hide = message.loading('deleting');
      deletePartner(selectedRows.id)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangePage = (page: number) => {
    getData(page);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const _handleUpdate = (_data: PartnerCreateRequest | PartnerUpdateRequest) => {
    if (!!_data) {
      console.log('Đang tạo dữ liệu!!', changeData.isCreate);
      if (!!changeData.isCreate) {
        const hide = message.loading('Đang tạo dữ liệu!!');

        createPartner(_data)
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
          updatePartner({ id: changeData.data.id, body: _data })
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
          fullName: row.fullName,
          branchId: row.branchId,
          // email: row?.email,
          phone: row?.phone,
          date: row?.date,
          // contact: row?.contact || '',
        },
      });
    }
  };
  const getData = (page: number) => {
    const hide = message.loading('Đang cập nhật dữ liệu');

    getListPartner({ page: page, name: name, limit: CURRENT_PAGE_SIZE })
      .then((res) => {
        hide();
        console.log(res);
        setData({
          list: res.data || [],
          totalPage: res.totalPage || 1,
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
      <PartnerListTabSection
        onChangePage={onChangePage}
        data={data.list}
        totalPage={data.totalPage}
        onDelete={_handleRemove}
        onChange={_onChange}
      />
    );
  }, [data.list, data.totalPage, onChangePage]);

  const _renderModal = useMemo(
    () => (
      <PartnerModalSection
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

export default listPartner;
