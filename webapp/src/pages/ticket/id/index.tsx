import { getTicketsId } from '@/services/api/ticket/index';
import { message, Spin } from 'antd';
import { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'umi';
import Comment from '../components/comment';
import TabControl from '../components/tabs';
import ContractInfoViewUpdate from '../components/update-infomation-ticket';
import TicketProvider, { TicketCtx } from '../store';
import { TicketActionType } from '../store/reducer';
import './style.less';
// import Comment from '../components/comment';

function TicketDetail() {

  const { dispatch, state } = useContext(TicketCtx);

  console.log({ state, dispatch });

  const { id } = useParams<{ id: string }>();

  const getTicketById = useCallback(async () => {
    try {
      const res = await getTicketsId(id);
      const convertTicketData: any = {
        workTypeId: res.Template.TypeContract.WorkType.id,
        contractTypeId: res.Template.TypeContract.id,
        templateId: res.templateId,
        templateName: res.name,
        customerId: res.customerId,
        customerName: res.Customer.name,
        customerPhone: res.phone,
        partnerId: res?.partnerId,
        partnerName: res?.Partner?.fullName,
        supervisorId: res?.userId,
        signerId: res?.signerId,
        hdccNumber: res.contractNumberId,
        statusName: res.statusName,
        workFlowId: res.workFlowId,
        ticketId: res.id,
      };
      dispatch({ type: TicketActionType.SET_TICKET_DETAIL, payload: convertTicketData });
    } catch (error) {
      message.error('Có lỗi xảy ra , không lấy được thông tin hợp đồng');
    }
  }, [id]);

  useEffect(() => {
    getTicketById();
  }, [getTicketById]);

  return (
    <div>
      {state.dataDetail ? (
        <>
          <div> <ContractInfoViewUpdate /></div>
          <div className="mt-5">
            <TabControl
              onReload={getTicketById}
            />
          </div>
          <div className="mt-5">
            <Comment />
          </div>
        </>
      ) : <Spin />
      }

    </div>
  );
}

export function TicketDetailWrapper() {
  return (
    <TicketProvider>
      <TicketDetail />
    </TicketProvider>
  );
}

export default TicketDetailWrapper;
