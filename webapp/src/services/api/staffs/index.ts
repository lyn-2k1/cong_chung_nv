/* eslint-disable */
import type { StaffSearchBody, StaffSortBody } from './../../../types/staff/index';
import type { StaffDto, StaffDelBody, StaffFindOneParams } from '@/types';
import { request } from 'umi';

// create user
export async function createStaff(
  body: StaffDto,
  options?: { [key: string]: any },
): Promise<StaffDto> {
  return request<any>('api/users/createStaff', {
    method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    data: body,
    ...(options || {}),
  });
}

// update status user

export async function delStaff(
  params: StaffFindOneParams,
  body: StaffDelBody,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/users/setStatusUser/${param0}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

// findOne user
export async function findOneStaff(params: StaffFindOneParams, options?: { [key: string]: any }) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/users/userInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

// update user
export async function updateStaff(
  params: StaffFindOneParams,
  body: StaffDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/users/updateStaff/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

// search staff
export async function searchStaff(body: StaffSearchBody, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/users/searchUserStaff`, {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

// sort staff
export async function sortStaff(body: StaffSortBody, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/users/sortUsersStaff`, {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

// Get All User
export async function getStaffs(
  // params: BranchFindOneParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/users/getAllUser', {
    method: 'GET',
    ...(options || {}),
  }).then((data: any[]) => {
    return { data, totalDocs: data.length };
  });
}

export async function getStaffListByRole(role: string, options?: { [key: string]: any }) {
  return request<any>(`/api/users/userByRole/${role}`, {
    method: 'GET',
    ...(options || {}),
  }).then((data: any[]) => ({ data, totalDocs: data.length }));
}
