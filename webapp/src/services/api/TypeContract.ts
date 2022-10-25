// @ts-ignore
/* eslint-disable */
import { IResponseData, ITypeContact } from '@/types';
import { request } from 'umi';

export async function getListTypeContract(options?: { [key: string]: any }) {
  return request<IResponseData<ITypeContact[] | []>>('/api/type-contract', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getListTypeContractByWorkTypeId(
  params: number | string,
  options?: { [key: string]: any },
) {
  return request<IResponseData<ITypeContact[] | []>>(`/api/type-contract/param/${params}`, {
    method: 'GET',
    ...(options || {}),
  });
}
