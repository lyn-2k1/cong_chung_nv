// import { getBranches } from "@/services/api/branch/index";
// import { IBranch } from "@/types/branch";
import { Button, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useCreateStaffMutation } from "@/services/api/staff/query";
import ContentStaff from "../content";
import IconAdd from "@/assets/icons/iconAdd.png";
import Style from "./index.less";
import { PlusCircleOutlined } from "@ant-design/icons";
const LocalizedModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: doPost } = useCreateStaffMutation();
  return (
    <div>
    <Button className={Style.buttonAdd} type="text" onClick={() => {setModalOpen(true)}} icon={<PlusCircleOutlined className={Style.icon}/>}>
      Thêm Nhân Viên
    </Button>
          <Modal
          // style={{margin: "auto", textAlign: "center", width: "70rem"}}
          className={Style.modalStaff}
          title="Thêm Nhân Viên"
          visible={modalOpen}
          // onOk={() => {setModalOpen(true)}}
          onCancel={() => {setModalOpen(false)}}
          destroyOnClose
          footer={false}
        >
          <ContentStaff handle = {setModalOpen} callAPI={doPost} nameFunc={"Thêm Nhân Viên"}/>
        </Modal>

    </div>
  );
};

export default LocalizedModal;