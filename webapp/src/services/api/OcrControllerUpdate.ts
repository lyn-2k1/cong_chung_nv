// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 PATCH /api/ocr/${param0} */
export async function OcrControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OcrControllerUpdateParams,
  body: API.UpdateOcrDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/ocr/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
