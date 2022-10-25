import { message } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

import { notifyService } from '@/services/api/notify';
import styles from './index.less';
import NoticeIcon from './NoticeIcon';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: any): any => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice: any = { ...notice };
    const dateString = moment(new Date(notice.createdAt * 1000)).format("YYYY/MM/DD");
    if (newNotice.createdAt) {
      newNotice.datetime = moment(dateString).fromNow();
    }
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    return newNotice;
  });

  const notification = [...newNotices];

  const message = newNotices.reduce((pre, cur) => {
    const res = [];
    if (cur.isRead === false) {
      res.push(cur)
    }
    return pre.concat(res)
  }, [])

  return {
    notification,
    message
  }
};

const getUnreadData = (noticeData: Record<string, Record<string, any>[]>) => {
  const unreadMsg: Record<string, number> = {};

  Object.keys(noticeData).forEach((key) => {
    if (key !== "notification") {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter((item) => !item.isRead).length;
      }
    }
  });
  return unreadMsg;
};

const NoticeIconView: React.FC = () => {
  const [notices, setNotices] = useState<Record<string, any>[]>([]);

  const getNotifyList = useCallback(async () => {
    try {
      const res = await notifyService.getAllNotifyRecord();
      setNotices(res.data || [])
    } catch (error) {
      message.error("Có lỗi xảy ra , không thể hiển thị các thông báo")
    }
  }, [])

  useEffect(() => {
    getNotifyList();
  }, [getNotifyList]);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});
  console.log({ noticeData, unreadMsg })
  const changeReadState = (id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.isRead = true;
        }
        return notice;
      }),
    );
  };

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={unreadMsg.message}
      onItemClick={(item) => {
        changeReadState(item.id!);
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={false}
      // clearText="Không có thông báo"
      viewMoreText="Xem thêm"
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="Tất cả"
        emptyText="Bạn đã xem tất cả các thông báo"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="Chưa đọc"
        showClear={false}
        emptyText="Bạn đã đọc tất cả các tin nhắn"
      // showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
