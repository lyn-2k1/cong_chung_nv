// @ts-ignore
/* eslint-disable */
import { IResponseData } from '@/types';
import { CustomerCreateRequest, CustomerDto, ICustomer } from '@/types/customer';
import { request } from 'umi';

export async function getListCustomer(
  // options?: { [key: string]: any },
  params: { name?: string; limit: number; page: number },
) {
  return request<IResponseData<{ data: ICustomer[] | []; totalPage: number }>>(
    `/api/customer/list?name=${params.name}&page=${params.page}&limit=${params.limit}`,
    {
      method: 'GET',
      // ...(options || {}),
    },
  );
}
export async function createCustomer(
  data: CustomerCreateRequest,
  // eslint-disable-next-line
  options?: { [key: string]: any },
): Promise<CustomerDto> {
  return request<CustomerDto>('/api/customer', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeCustomer(
  id: number,
  // eslint-disable-next-line
  options?: { [key: string]: any },
): Promise<CustomerDto> {
  return request<CustomerDto>(`/api/customer/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function updateCustomer({
  id,
  body,
}: {
  id: number;
  body: CustomerCreateRequest;
}): Promise<CustomerDto> {
  return request<CustomerDto>(`/api/customer/${id}`, {
    data: body,
    method: 'PATCH',
  });
}
