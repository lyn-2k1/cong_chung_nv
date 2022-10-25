// import { getBranches } from "@/services/api/branch/index";
// import { IBranch } from "@/types/branch";
import { Button, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ContentStaff from '../content';

const LocalizedModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        style={{ float: 'right', borderRadius: '5px' }}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        + Thêm Quyền
      </Button>
      <Modal
        style={{ margin: 'auto', textAlign: 'center', width: '50rem' }}
        title="Thêm Quyền Người Dùng"
        visible={modalOpen}
        onOk={() => {
          setModalOpen(true);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <ContentStaff handle={setModalOpen} />
      </Modal>
    </>
  );
};

export default LocalizedModal;
