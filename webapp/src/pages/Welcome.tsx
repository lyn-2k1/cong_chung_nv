import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const Welcome: React.FC = () => {
  const intl = useIntl();
  const data = [
    {
      uri: 'https://images.unsplash.com/photo-1657299143228-f971e4887268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1067&q=80',
    },
    {
      uri: '/example.pdf',
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div className="h-full min-h-0 p-5 overflow-y-auto">
          <DocViewer documents={data} pluginRenderers={DocViewerRenderers} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
