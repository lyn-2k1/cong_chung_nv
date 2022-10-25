// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/ocr */
export async function OcrControllerFindAll(options?: { [key: string]: any }) {
  return request<string>('/api/ocr', {
    method: 'GET',
    ...(options || {}),
  });
}
