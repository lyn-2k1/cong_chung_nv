import { UserRoleDto } from '@/types';
import { Button, Modal, notification, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import type { NotificationPlacement } from 'antd/es/notification';
import ContentStaff from './components/content';

export const columns: ColumnsType<UserRoleDto> = [
  {
    title: 'Id',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'Name',
    key: 'roleName',
    dataIndex: 'roleName',
    sorter: (a, b) => a.roleName.length - b.roleName.length,
  },
  {
    title: 'Chi Nhánh',
    key: 'branchName',
    dataIndex: 'branchName',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Del user={{ id: record.id, roleName: record?.roleName, userId: record?.userId }}></Del>
        <Edit user={record}></Edit>
      </Space>
    ),
  },
];

const Context = React.createContext({
  name: '',
  email: 'a@gmail.com',
});

const Del = ({ user }: any) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement | undefined) => {
    api.info({
      message: `Tắt chức năng thành công`,
      description: (
        <Context.Consumer>
          {({ name, email }) => `Nhân viên ${name} có email là ${email} đã được ẩn`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <Context.Provider
      value={{
        name: user?.name,
        email: user?.email,
      }}
    >
      {contextHolder}
      <Space>
        <Button type="primary" danger onClick={() => openNotification('bottomRight')}>
          Del
        </Button>
      </Space>
    </Context.Provider>
  );
};

const Edit = ({ user }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [branchList, setBranchList] = useState<BranchDto[] | undefined>(undefined);
  // const getBranchList = useCallback(async ()=> {
  //   const res = await getBranches();
  //   setBranchList(res.data);
  // }, []);
  // useEffect(()=> {
  //     getBranchList();
  // })
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Modal
        style={{ margin: 'auto', textAlign: 'center', width: '70rem !important' }}
        title="Sửa thông tin nhân viên"
        visible={modalOpen}
        onOk={() => {
          setModalOpen(true);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <ContentStaff dataUser={user} handle={setModalOpen} />
      </Modal>
    </>
  );
};
