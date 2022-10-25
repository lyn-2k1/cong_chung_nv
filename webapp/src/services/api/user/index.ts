import { request } from 'umi';

export async function getAllUser() {
  return request<any>('/api/users', {
    method: 'GET',
  }).then((data) => {
    return { data, total: data.length };
  });
}
