import type { IResponseData } from '@/types';
import { request } from 'umi';
//eslint-disable-next-line
interface Ioptions {
  [key: string]: any;
}

export async function createHdccNumber(body: any, options?: Ioptions) {
  return request<any>('/api/contract-number', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getAllHdccNumber(options?: Ioptions): Promise<IResponseData<any>> {
  return request('/api/contract-number', {
    method: 'GET',
    ...(options || {}),
  }).then((data: any[]) => {
    return {
      data: data,
      totalDocs: data.length,
    };
  });
}

export async function getHdccListByDate(
  params?: {
    startDate: any;
    endDate: any;
  },
  //eslint-disable-next-line
  options?: { [key: string]: any },
) {
  return request('/api/contract-number/searchDate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
