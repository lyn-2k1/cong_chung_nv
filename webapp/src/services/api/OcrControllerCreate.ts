// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/ocr/ekyc */
export async function OcrControllerCreate(
  body: API.CreateOcrDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/ocr/ekyc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
