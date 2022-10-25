export interface CustomerCreateRequest {
  branchId: number;
  name: string;
  phone: string;
  email: string;
  createBy: number;
}
export interface CustomerUpdateRequest {
  id: number;
  branchId: number;
  name: string;
  phone: string;
  email: string;
  createBy: number;
}


export interface CustomerDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  createAt: string;
  createBy: number;
  branchId: number;
}
export interface ICustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  createAt: string;
  createBy: number;
  branchId: number;
}
