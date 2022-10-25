import type { AxiosRequestConfig } from 'axios';
import AxiosInstance from './request';

export class BaseService {
  /* This is a base class for all services. It is a class that has a constructor that takes a basePath as
a parameter. */
  http = AxiosInstance;
  // basePath: string;
  // constructor(basePath: string) {
  //   this.basePath = basePath;
  // }

  get(url: string) {
    return this.http.get(url).then((res) => res.data);
  }
  post(url: string, data: any) {
    return this.http.post(url, data);
  }
  put(url: string, data: any) {
    return this.http.put(url, data);
  }
  // findAll() {
  //   return this.http.get(this.basePath);
  // }
  // find() {
  //   return this.http.get(`${this.basePath}`).then((res) => res.data);
  // }
  // findOne(id: any) {
  //   return this.http.get(`${this.basePath}/${id}`).then((res) => res.data);
  // }
  // create(data: any, options: AxiosRequestConfig | undefined) {
  //   return this.http.post(this.basePath, data, options).then((res) => res.data);
  // }
  // update(id: any, data: any) {
  //   return this.http.put(`${this.basePath}/${id}`, data).then((res) => res.data);
  // }
  // patch(id: any, data: any) {
  //   return this.http.patch(`${this.basePath}/${id}`, data).then((res) => res.data);
  // }
  // delete(id: any) {
  //   return this.http.delete(`${this.basePath}/${id}`);
  // }
}
