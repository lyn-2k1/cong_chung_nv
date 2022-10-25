// @ts-ignore
/* eslint-disable */
import { IBranch, IResponseData } from '@/types';
import { request } from 'umi';

export async function getListBranch(options?: { [key: string]: any }) {
  return request<IResponseData<IBranch[] | []>>('/api/branch', {
    method: 'GET',
    ...(options || {}),
  });
}
