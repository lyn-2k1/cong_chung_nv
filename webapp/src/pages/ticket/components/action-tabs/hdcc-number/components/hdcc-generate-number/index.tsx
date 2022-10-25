import { TicketCtx } from '@/pages/ticket/store';
import { TicketActionType } from '@/pages/ticket/store/reducer';
import { createHdccNumber } from '@/services/api/ticket/hdcc-number';
import { updateTicket } from '@/services/api/ticket/index';
import { EyeOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import TableExistNumber from '../table-exist-number';
import './style.less';

export default function HDCCGenerateNumber() {
  const [showExistHdcc, setShowExistHdcc] = useState<boolean>(false)

  const { state, dispatch } = useContext(TicketCtx)

  const { dataDetail } = state;

  useEffect(() => {
    dispatch({ type: TicketActionType.ACTIONS_SET_HDCC, payload: dataDetail?.hdccNumber || 0 })
  }, [dataDetail?.hdccNumber, dispatch])


  const handleGetNewNumber = async () => {
    const createHdccNumberBody = {
      year: new Date().getFullYear(),
      workTypeId: dataDetail?.workTypeId,
      createdBy: ""
    }
    const res = await createHdccNumber(createHdccNumberBody);
    console.log("res", res)
    if (res.id) {
      dispatch({ type: TicketActionType.ACTIONS_SET_HDCC, payload: res.id })
    }
  }

  const handleRePickExistNumber = () => {
    setShowExistHdcc(true)
  }

  const handleClickUpdateTicket = async () => {
    const dataUpdate = {
      contractNumberId: state.actions?.hdcc
    }
    const res = await updateTicket(dataDetail?.ticketId, dataUpdate)
    if (res.id) {
      message.success("Số hdcc đã được lưu lại trong ticket")
    }
  }

  return (
    <div className="hdcc-generate-number-wrapper">
      <div className="title">
        <span>Cấp số HDCC</span>
      </div>
      <div className="border-wrap">
        <div className="create-actions">
          <div>
            <span>Cấp số : </span>
          </div>
          <div>
            <Button onClick={handleGetNewNumber} type="primary">Auto</Button>
            <Button onClick={handleRePickExistNumber} className="mr-3" type="primary">
              Chọn lại
            </Button>
          </div>
        </div>
        <div className="generated-number">
          <div>
            <span>Số HDCC : </span>
          </div>
          <div className="number">
            <span>{state.actions?.hdcc}</span>
          </div>
        </div>
        <div className="apply-actions">
          <Button style={{ borderColor: 'green', color: 'green' }}>
            <EyeOutlined />
            Hiển thị
          </Button>
          <Button style={{ borderColor: 'green', color: 'green' }}>
            <UploadOutlined />
            Xuất báo cáo
          </Button>
          <Button onClick={handleClickUpdateTicket} style={{ borderColor: 'green', color: 'green' }}>
            <SendOutlined />
            Gửi đi
          </Button>
        </div>
      </div>
      <Modal className='hdcc-modal' open={showExistHdcc} onCancel={() => setShowExistHdcc(false)} destroyOnClose footer={false} title="Chọn số hdcc cũ">
        <TableExistNumber onCancel={() => setShowExistHdcc(false)} />
      </Modal>
    </div>
  );
}
