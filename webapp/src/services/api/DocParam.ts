// @ts-ignore
/* eslint-disable */
import { DocParamCreateRequest, DocParamUpdateRequest, IDocParam, IResponseData } from '@/types';
import { request } from 'umi';

export async function getListDocParam(options?: { [key: string]: any }) {
  return request<IResponseData<IDocParam[] | []>>('/api/doc-param', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getListDocParamByType(type: string, options?: { [key: string]: any }) {
  return request<IResponseData<IDocParam[] | []>>(`/api/doc-param/by-type?type=${type}&limit=100`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createDocParam(
  data: DocParamCreateRequest,
  options?: { [key: string]: any },
) {
  return request<IResponseData<IDocParam[] | []>>('/api/doc-param', {
    data: data,
    method: 'POST',
    ...(options || {}),
  });
}
export async function updateDocParam(
  data: DocParamUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<IResponseData<IDocParam[] | []>>('/api/doc-param', {
    data: data,
    method: 'POST',
    ...(options || {}),
  });
}
