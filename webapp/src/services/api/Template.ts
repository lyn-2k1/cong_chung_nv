// @ts-ignore
/* eslint-disable */
import { IResponseData, ITemplate } from '@/types';
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/template */
export async function TemplateControllerFindAll(options?: { [key: string]: any }) {
  return request<IResponseData<ITemplate[] | []>[]>('/api/template', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function TemplateControllerGetListByTypeContractId(
  params: number | string,
  options?: {
    [key: string]: any;
  },
) {
  return request<IResponseData<ITemplate[] | []>[]>(`/api/template/param/${params}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function TemplateControllerFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { filterBy: string; value: string },
  options?: { [key: string]: any },
) {
  return request<IResponseData<ITemplate[] | []> | []>(
    `/api/template/filter?filterBy=${params.filterBy}&filterValue=${params.value}`,
    {
      method: 'GET',
      // params: { ...queryParams },
      ...(options || {}),
    },
  );
}

export async function TemplateControllerCreate(
  body: API.CreateTemplateDto,
  options?: { [key: string]: any },
) {
  const formData = new FormData();
  formData.append('file', body.file.file);
  formData.append('name', body.name);
  formData.append('branchId', body.branchId.toString());
  formData.append('typeContractId', body.typeContractId.toString());
  formData.append('price', body?.price.toString());
  return request<any>('/api/template/create', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function TemplateControllerFindOne(
  params: API.TemplateControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/template/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

export async function TemplateControllerRemove(
  params: string | number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/template/${params}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function TemplateControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: number,
  body: API.UpdateTemplateDto,
  options?: { [key: string]: any },
) {
  const formData = new FormData();
  formData.append('file', body.file.file);
  formData.append('name', body.name);
  formData.append('branchId', body.branchId.toString());
  formData.append('typeContractId', body.typeContractId.toString());
  formData.append('price', body?.price.toString());
  return request<string>(`/api/template/${params}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: formData,
    ...(options || {}),
  });
}
