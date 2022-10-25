import ContractTab from '@/pages/ticket/components/action-tabs/create-contract';
import FinishTicket from '@/pages/ticket/components/action-tabs/finish';
import HDCCNumber from '@/pages/ticket/components/action-tabs/hdcc-number';
import ReleaseTab from '@/pages/ticket/components/action-tabs/release';
import SignerTab from '@/pages/ticket/components/action-tabs/signer';
import StorageTab from '@/pages/ticket/components/action-tabs/storage';
import UpLoadTab from '@/pages/ticket/components/action-tabs/upload';
import type { ReactNode } from 'react';

export interface ITicketTabs {
  label: string;
  key: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const TAB_ACTIONS: ITicketTabs[] = [

  {
    label: "Bắt đầu",
    key: "1",
  },

  {
    label: 'Tải tài liệu',
    key: '2',
    children: <UpLoadTab />,
  },
  {
    label: 'Tạo hợp đồng',
    key: '3',
    children: <ContractTab />,
  },
  {
    label: 'Số HDCC',
    key: '4',
    children: <HDCCNumber />,
  },
  {
    label: 'Trình ký',
    key: '5',
    children: <SignerTab />,
  },
  {
    label: 'Phát hành',
    key: '6',
    children: <ReleaseTab />,
  },
  {
    label: 'Lưu trữ',
    key: '7',
    children: <StorageTab />,
  },
  {
    label: 'Kết thúc',
    key: '8',
    children: <FinishTicket />,
  },
];

export enum TicketStatus {
  Opened = 'Tạo ticket',
  Inprocess = 'Đang thực hiện',
  Closed = 'Đóng ticket',
  Canceled = 'Hủy ticket',
}
