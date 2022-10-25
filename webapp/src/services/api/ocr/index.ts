import { request } from 'umi';

export async function updateOcr(
  orcId: number | string,
  //eslint-disable-next-line
  data: { [key: string]: any },
  //eslint-disable-next-line
  options?: { [key: string]: any },
) {
  return request<any>(`/api/ocr/${orcId}`, {
    data,
    method: 'PATCH',
    ...(options || {}),
  });
}
