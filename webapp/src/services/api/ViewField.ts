// @ts-ignore
/* eslint-disable */
import { IBranch, IResponseData } from '@/types';
import { request } from 'umi';

export async function getListViewField(options?: { [key: string]: any }) {
  return request<IResponseData<IBranch[] | []>>('/api/system-config', {
    method: 'GET',
    ...(options || {}),
  });
}
