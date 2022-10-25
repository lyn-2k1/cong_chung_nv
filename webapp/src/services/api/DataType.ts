// @ts-ignore
/* eslint-disable */
import { IDataType, IResponseData } from '@/types';
import { request } from 'umi';

export async function getListDataType(options?: { [key: string]: any }) {
  return request<IResponseData<IDataType[] | []>>('/api/data-type', {
    method: 'GET',
    ...(options || {}),
  });
}
