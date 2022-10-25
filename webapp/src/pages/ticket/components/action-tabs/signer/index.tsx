import { URL_API } from '@/common';
import { TicketCtx } from '@/pages/ticket/store';
import { Button, Card, Row } from 'antd';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { TabControlCtx } from '../../tabs';
import './style.less';

const SignerTab = () => {
  const { state } = useContext(TicketCtx);
  const tabControlContext = useContext(TabControlCtx);
  const { id: ticketId } = useParams();
  const docxUrl = `${URL_API}/api/upload/${ticketId}/docs/${ticketId}.docx`;
  return (
    <div className="signer-wrapper">
      <Row>
        <Card style={{ width: '100%' }}>
          <iframe
            src={`https://docs.google.com/gview?url=${docxUrl}&embedded=true`}
            height="500"
            width="100%"
          />
        </Card>
      </Row>
      <Row className="group-actions">
        {/* List button */}
        <div>
          <Button type="primary">Send</Button>
          <Button type="primary">Export</Button>
        </div>
        <div className="next-btn">
          <Button
            type="primary"
            //(state.dataDetail?.workFlowId + 1).toString())
            onClick={() =>
              tabControlContext?.onChangeTab((Number(tabControlContext.key) + 1).toString())
            }
          >
            Chuyển tiếp
          </Button>
        </div>
      </Row>
    </div>
  );
};

export default SignerTab;
