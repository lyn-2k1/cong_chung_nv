/* eslint-disable */
import { TicketDto } from '@/pages/ticket/data';
import { request } from 'umi';
export async function getTicketList(
  params?: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/ticket', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((data: any) => {
    return { data: data.data, totalDocs: data.total };
  });
}

export async function getTicketsId(
  ticketId: number | string,
  options?: Record<string, any>,
): Promise<TicketDto> {
  return request(`/api/ticket/${ticketId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createTicket(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<any>('/api/ticket', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateTicket(
  ticketId: any,
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<any>(`/api/ticket/${ticketId}`, {
    data,
    method: 'PATCH',
    ...(options || {}),
  });
}

export async function cloneTicket(data: Record<string, any>) {
  return request<any>('/api/ticket/clone', {
    method: 'POST',
    data,
  });
}

/** 删除规则 DELETE /api/rule */
// export async function removeRule(data: { key: number[] }, options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     data,
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
