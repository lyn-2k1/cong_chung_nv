// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/upload/${param0}/${param1} */
// export async function UploadControllerUploadFile(
//   // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
//   params: API.UploadControllerUploadFileParams,
//   body: {},
//   file?: File,
//   options?: { [key: string]: any },
// ) {
//   const { ticketId: param0, type: param1, ...queryParams } = params;
//   const formData = new FormData();

//   if (file) {
//     formData.append('file', file);
//   }

//   Object.keys(body).forEach((ele) => {
//     const item = (body as any)[ele];

//     if (item !== undefined && item !== null) {
//       formData.append(
//         ele,
//         typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
//       );
//     }
//   });

//   return request<any>(`/api/upload/${param0}/${param1}`, {
//     method: 'POST',
//     params: { ...queryParams },
//     data: formData,
//     requestType: 'form',
//     ...(options || {}),
//   });
// }
export async function UploadControllerUploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadControllerUploadFileParams,
  formData: FormData,
) {

  return request<any>(`/api/upload/${params.ticketId}/${params.type}`, {
    method: 'POST',
    params: { ...params},
    data: formData,
    requestType: 'form',
    ...(Option || {}),
  });
}
/** 此处后端没有提供注释 GET /api/upload/${param0}/${param1}/${param2} */
export async function UploadControllerStreamFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadControllerStreamFileParams,
  options?: { [key: string]: any },
) {
  const { ticketId: param0, type: param1, filename: param2, ...queryParams } = params;
  return request<Record<string, any>>(`/api/upload/${param0}/${param1}/${param2}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
