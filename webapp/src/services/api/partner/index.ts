import type { PartnerCreateRequest, PartnerUpdateRequest } from '@/types/partner';
import { request } from 'umi';

// eslint-disable-next-line
export async function createPartner(data: PartnerCreateRequest, options?: { [key: string]: any }) {
  console.log(data);
  return request<any>('/api/partner', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updatePartner(
  params: { id: number; body: PartnerUpdateRequest },
  options?: { [key: string]: any },
) {
  return request<any>(`/api/partner/${params.id}`, {
    data: params.body,
    method: 'PATCH',
    ...(options || {}),
  });
}

export async function getListPartner(
  query: {
    name?: string;
    limit?: number;
    page?: number;
  },
  options?: Record<string, any>,
) {
  return request<any>(`/api/partner/search-by-name?name=${query.name}&limit=${query.limit}&page=${query.page}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function findPartnersId(partnerId: any, options?: { [key: string]: any }) {
  return request<any>(`/api/partner/findPartnerById/${partnerId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deletePartner(id: number, options?: { [key: string]: any }) {
  return request<any>(`/api/partner/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
