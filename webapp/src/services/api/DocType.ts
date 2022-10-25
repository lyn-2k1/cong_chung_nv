// @ts-ignore
/* eslint-disable */
import { IDocType, IResponseData } from '@/types';
import { request } from 'umi';

export async function getListDocType(options?: { [key: string]: any }) {
  return request<IResponseData<IDocType[] | []>>('/api/doc-type', {
    method: 'GET',
    ...(options || {}),
  });
}
