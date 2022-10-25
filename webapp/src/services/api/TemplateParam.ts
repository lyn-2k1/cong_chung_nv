// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/template */
export async function TemplateParamsControllerFindAll(options?: { [key: string]: any }) {
  return request<Record<string, any>[]>('/api/template-params', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function TemplateParamsUpdateAndCreateControllerCreate(
  body: API.CreateTemplateDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/template-params', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/template */
export async function TemplateParamsControllerCreate(
  body: API.CreateTemplateDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/template-params', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/template/${param0} */

export async function TemplateParamsControllerFilter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TemplateParamControllerFilterPrams,
  options?: { [key: string]: any },
) {
  const { templateId, ...queryParams } = params;
  return request<Record<string, any>>(`/api/template-params?templateId=${templateId}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

export async function TemplateParamsControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TemplateControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/template-params/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/template/${param0} */
export async function TemplateParamControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TemplatePramsControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id, ...queryParams } = params;
  return request<Record<string, any>>(`/api/template-params/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/template/${param0} */
export async function TemplateParamsControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: number,
  body: API.TemplateParamControllerUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<string>(`/api/template-params/${params}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    // params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

export async function TemplateParamsControllerManyUpdate(
  body: API.TemplateParamControllerUpdateDTO[],
  options?: { [key: string]: any },
) {
  return request<string>(`/api/template-params/many-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
