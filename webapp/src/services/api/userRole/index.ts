import { UserRoleSearchBody, UserRoleSortBody } from '../../../types/userRole/index';
import { UserRoleDto, UserRoleDelBody, UserRoleFindOneParams } from '@/types';
import { BranchFindOneParam } from '@/types';
import { request } from 'umi';

// Get All User
export async function getUserRoles(params: BranchFindOneParam, options?: { [key: string]: any }) {
  return request<{
    data: UserRoleDto[];
    total?: number;
    success?: boolean;
  }>('/api/userRole/getUserRoles', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  }).then((data: any) => ({ data }));
}

// create user
export async function createUserRole(body: UserRoleDto, options?: { [key: string]: any }) {
  return request<any>('/api/creatUserRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// update status user

export async function delUserRole(
  params: UserRoleFindOneParams,
  body: UserRoleDelBody,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/userRole/setStatusUser/${param0}`, {
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
export async function findOneUserRole(
  params: UserRoleFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/userRole/userRoleInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

// update user
export async function updateUserRole(
  params: UserRoleFindOneParams,
  body: UserRoleDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/userRole/updateUserRole/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

// search UserRole
export async function searchUserRole(body: UserRoleSearchBody, options?: { [key: string]: any }) {
  return request<any>(`/api/userRole/searchUserRole`, {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

// sort UserRole
export async function sortUserRole(body: UserRoleSortBody, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/userRole/sortUserRole`, {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}
