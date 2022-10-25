import type { IResponseData } from '@/types';
import type { IBranch } from '@/types/branch';
import { request } from 'umi';

export async function getBranches(
  // eslint-disable-next-line
  options?: { [key: string]: any },
) {
  return request<IBranch[]>('/api/branch', {
    method: 'GET',
    ...(options || {}),
  }).then((data) => ({ data }));
}
