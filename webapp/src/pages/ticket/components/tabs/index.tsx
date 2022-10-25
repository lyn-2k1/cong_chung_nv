import { ITicketTabs, TAB_ACTIONS } from '@/common/ticket';
import { message, Tabs } from 'antd';
import { useContext, useState, createContext } from 'react'
import { ticketService } from '../../services/service';
import { TicketCtx } from '../../store';
import './style.less';

export type Props = {
  onReload: () => void;
};

export const TabControlCtx = createContext<{
  onChangeTab: (key: string) => void,
  key: string
} | null>(null)

export default function TabControl({ onReload }: Props) {

  const { state } = useContext(TicketCtx)
  const [activeKey, setActiveKey] = useState<string>(state.dataDetail?.workFlowId.toString())

  const handleChangeActiveKey = async (key: string) => {
    console.log("key", key)
    if (key > state.dataDetail?.workFlowId) {
      try {
        const req = {
          ticketId: state.dataDetail?.ticketId,
          workFlowId: Number(key),
        }
        await ticketService.updateTicket(req);
        onReload()
        message.success('Cập nhật workFlow thành công');

      } catch (error) {
        message.success('Cập nhật workFlow khong thành công');
      }
    }
    setActiveKey(key)
  }

  return (
    <TabControlCtx.Provider value={{ onChangeTab: handleChangeActiveKey, key: activeKey }}>
      <div className="tabs-control">
        <Tabs
          type="card"
          tabBarGutter={20}
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          className="tabs-flow-status"
          items={TAB_ACTIONS.map((item: ITicketTabs) => {
            return { ...item, className: 'bg-white', disabled: Number(item.key) > state.dataDetail?.workFlowId };
          })}
          onChange={handleChangeActiveKey}
        />


      </div>
    </TabControlCtx.Provider>
  );
}
