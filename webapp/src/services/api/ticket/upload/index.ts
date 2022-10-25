import { request } from 'umi';

export async function removeOcrsId(ocrId: any) {
  return request(`/api/ocr/${ocrId}`, {
    method: 'DELETE',
  });
}
