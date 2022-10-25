export interface StaffDto {
    id: string;
    name: string;
    email: string;
    branchId: number | string | null;
    phone: string;
    address: string;
    branchName: string;
    avatar: string;
    status: number;
    createdAt: string | number;
    updatedAt: string | number;
    createdBy: string;
    updatedBy: string;
  }
  
  export interface StaffFindOneParams {
    id: string;
  }
  
  export interface StaffDelBody {
    id: string;
    numberStatus: number;
  }
  
  export interface StaffSortBody {
    skip: string;
    take: string;
    branchId: string;
    sreachBy: string;
    value: string;
    sortType: string;
  }
  
  export interface StaffSearchBody {
    skip: string;
    take: string;
    branchId: string;
    sreachBy: string;
    value: string;
  }
  