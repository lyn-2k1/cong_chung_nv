// @ts-ignore
/* eslint-disable */
import { IResponseData, IWorkType } from '@/types';
import { request } from 'umi';

export async function getListWorkType(options?: { [key: string]: any }) {
  return request<IResponseData<IWorkType[] | []>>('/api/work-type', {
    method: 'GET',
    ...(options || {}),
  });
}
