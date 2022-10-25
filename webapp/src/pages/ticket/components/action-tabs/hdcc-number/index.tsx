import { Button } from 'antd';
import HDCCGenerateNumber from './components/hdcc-generate-number';
import { useContext } from 'react'
import './style.less';
import { TicketCtx } from '@/pages/ticket/store';
import { TabControlCtx } from '../../tabs';
export default function HDCCNumber() {
  const { state } = useContext(TicketCtx)
  const tabControlContext = useContext(TabControlCtx)

  return (
    <div className="hdcc-number-wrapper">
      <div>
        <HDCCGenerateNumber />
      </div>
      <div className='next-btn'>
        <Button type='primary'
          onClick={() => tabControlContext?.onChangeTab((Number(tabControlContext.key) + 1).toString())}
        >Chuyển tiếp</Button>
      </div>
    </div>
  );
}
