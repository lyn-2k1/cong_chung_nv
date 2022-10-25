import { StaffDto } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Button, message, Modal, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import ContentStaff from "./components/content";
import { useSetStatusStaffMutation, useUpdateStaffMutation } from "../../services/api/staff/query";
import Style from "./components/modal/index.less";
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IconPen from "@/assets/icons/iconPen.png";
import IconDel from "@/assets/icons/iconDelete.png";
import styles from "./style.less";
import { Link } from "umi";
export const columns: ColumnsType<StaffDto> = [
    {
        title:'Id',
        key: 'id',
        dataIndex: 'id',
        
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      render: (record) => {
        return (
          <Link to={`/managerStaff/listStaff`}>
            <span>{record}</span>
          </Link>
        );
      },
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Chi Nhánh',
      key: 'branchName',
      dataIndex: 'branchName',
    },
    {
      title: 'SDT',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
        title: 'Ngày Sinh',
        key: 'birthday',
        dataIndex: 'birthday',
        sorter: true,
    },
    {
        title: 'Địa Chỉ',
        key: 'address',
        dataIndex: 'address',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => {
          return(
            <Space size="middle">
              <Edit user={{id:record.id}}></Edit>
              <Del user={{id:record.id, name: record?.name, email: record?.email}}></Del> 
            </Space>
          )
        }
    }
  ];

const Del = ({user} : any) => {
  const {confirm} = Modal;
  const queryClient = useQueryClient();
  const {mutate: setStatusStaff} = useSetStatusStaffMutation();
  async function handleDelOk() {
    await setStatusStaff({id: user.id, numberStatus: 0}, {
      onSuccess: () => {
        message.success('Xóa nhân viên thành công!');
        queryClient.invalidateQueries(["listStaff"]);
      },
      onError: () => {
        message.error('Xóa không thành công. Vui lòng thực hiện lại sau!');
      }
    });
  } 
  const showPromiseConfirm = () => {
    confirm({
      title: 'Bạn chắc chắn muốn xóa nhân viên này!',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelOk();
      },
      onCancel() {},
    });
  };
  return (
    <Space wrap>
      <Button onClick={showPromiseConfirm} className={styles.buttonDel} danger>
        <img src={ IconDel} alt="Delete" className={styles.icon}/>
      </Button>
    </Space>
  );
};

const Edit = ({user}:any) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const {mutate: doUpdate} = useUpdateStaffMutation();
  return (
    <>
      <Button onClick={() => {setModalOpen(true)}} className={styles.buttonEdit}>
        <img src={IconPen} alt="edit" className={styles.icon}/>
      </Button>
      <Modal
          className={Style.modalStaff}
          title="Sửa thông tin nhân viên"
          visible={modalOpen}
          onCancel={() => {setModalOpen(false)}}
          destroyOnClose
          footer={false}
        >
          <ContentStaff dataUser={user} callAPI={doUpdate} handle={setModalOpen} nameFunc={"Save"}/>
        </Modal>
    </>
    
  )
}