// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/ocr/vehicle-registrations */
export async function OcrControllerVehicleRegistrations(
  body: API.CreateOcrDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/ocr/vehicle-registrations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
