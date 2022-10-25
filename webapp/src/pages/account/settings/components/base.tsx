import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, useModel } from 'umi';
// import { queryCurrent } from '../service';
// import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';
import { useUpdateStaffMutation } from '@/services/api/staff/query';
import { StaffDto } from '@/types';
import { URL_API } from '@/common';
// import axios from 'axios';
import UploadIpnut from '@/pages/managerStaff/components/content/inputUpload';
import { GENDER } from '@/common/constants';
// import { useQueryClient } from '@tanstack/react-query';

const BaseView: React.FC = () => {
  const { initialState} = useModel('@@initialState');
  const {mutate: doEdit} = useUpdateStaffMutation();
  const { currentUser , loading } = initialState;
  console.log("INITTIALSTATE", initialState, currentUser);
  // const getAvatarURL = () => {
  //   if (currentUser) {
  //     if (currentUser.avatar === "string" || !currentUser.avatar) {
  //       const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  //       return url;
  //     }
  //     return `${URL_API}/api/upload/avatar/${currentUser.avatar}`;
  //   }
  //   return '';
  // };
  const [avatar, setAvatar] = useState<string>('');
  // const queryClient = useQueryClient();
  const handleFinish = async (values: any) => {
    const user = { id: currentUser?.id, ...values, branchId: Number(localStorage.getItem('branch')), avatar: avatar};
    await doEdit( user as StaffDto,
        {
          onSuccess: () => {
            message.success('Cập nhật nhân viên thành công');
          },
        },
    );
  };
  
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              // layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: 'Lưu thay đổi',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                // phone: currentUser?.phone,
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: 'vui lòng nhập tên của bạn!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="phone"
                label="SĐT"
              />
              <ProFormText
                width="md"
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email của bạn!',
                  },
                ]}
              />
              <ProFormDatePicker
                width="md"
                name="birthday"
                label="Ngày sinh"
              />
              <ProFormSelect
                width="sm"
                name="sex"
                label="Giới tính"
                options={GENDER}
              />
              <ProFormText
                width="md"
                name="address"
                label="Địa chỉ"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <UploadIpnut uploadFile={setAvatar} styleImg={styles.avatar} defaultImage={currentUser?.avatar}/>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
