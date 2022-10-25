import type { ContractTypeDto, WorkTypeDto } from '@/pages/ticket/data';
import { request } from 'umi';
// eslint-disable-next-line
interface Ioptions {
  [key: string]: any;
}
// this means search for table
export async function searchByCollection(
  collection: string,
  params: { searchBy: string; value: string },
  options?: Ioptions,
) {
  return request<any>(`/api/${collection}/search`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((data: any) => ({ data, total: data.length }));
}

export async function filterByCollection(
  collection: string,
  params: { filterBy: string; filterValue: string | number },
  options?: Ioptions,
) {
  return request<any>(`/api/${collection}/filter`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((data: any) => ({ data, total: data.length }));
}

export async function getWorkType(options?: Ioptions) {
  return request<any>('/api/work-type', {
    method: 'GET',
    ...(options || {}),
  }).then((data: WorkTypeDto[]) => {
    return {
      data,
      totalDocs: data.length,
    };
  });
}

export async function getAllTypeContract(options?: Ioptions) {
  return request<any>('/api/type-contract', {
    method: 'GET',
    ...(options || {}),
  }).then((data: ContractTypeDto[]) => {
    return {
      data,
      totalDocs: data.length,
    };
  });
}

export async function getContractTypeByWorkType(workTypeId: number, options?: Ioptions) {
  return request<any>(`/api/type-contract/typeContractsByWorkTypeId/${workTypeId}`, {
    method: 'GET',
    ...(options || {}),
  }).then((data: any) => {
    return {
      data,
      total: data.length,
    };
  });
}

export async function getAllTemplate(options?: Ioptions) {
  return request<any>('/api/template', {
    method: 'GET',
    ...(options || {}),
  }).then((data: any[]) => {
    return {
      data,
      totalDocs: data.length,
    };
  });
}

export async function uploadImages(
  ticketId: string | undefined,
  formData: FormData,
  options?: Ioptions,
) {
  return request<any>(`/api/upload/${ticketId}/images`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

export async function getOrcTypes(options?: Ioptions) {
  return request<any>('/api/ocr/OcrType', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getOrcUploadedByTicketId(ticketId: string | undefined, options?: Ioptions) {
  return request<any>(`/api/ocr/ocr/${ticketId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getContentUploaded(
  params: { ticketId: string; type: string; filename: string },
  options?: Ioptions,
) {
  return request<any>(`/api/upload/${params.ticketId}/${params.type}/${params.filename}`, {
    method: 'GET',
    ...(options || {}),
  });
}
