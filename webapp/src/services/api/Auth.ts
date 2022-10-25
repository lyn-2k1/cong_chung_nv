// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/auth/login */
export async function AuthControllerLogin(body: API.LoginDTO, options?: { [key: string]: any }) {
  return request<API.Token>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/auth/me */
export async function AuthControllerMe(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/auth/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/refresh-token */
export async function AuthControllerRefreshToken(
  body: API.RefreshTokenInput,
  options?: { [key: string]: any },
) {
  return request<API.Token>('/api/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/register */
export async function AuthControllerSignup(body: API.SignUpDTO, options?: { [key: string]: any }) {
  return request<API.Token>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
