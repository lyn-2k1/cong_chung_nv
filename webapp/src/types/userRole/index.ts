export interface UserRoleDto {
  id: string;
  userId: string;
  roleName: string;
  email: string;
  createdAt: string | number;
  updatedAt: string | number;
  createdBy: string;
  updatedBy: string;
}

export interface UserRoleFindOneParams {
  id: string;
}

export interface UserRoleDelBody {
  id: string;
  numberStatus: number;
}

export interface UserRoleSortBody {
  skip: string;
  take: string;
  branchId: string;
  sreachBy: string;
  value: string;
  sortType: string;
}

export interface UserRoleSearchBody {
  skip: string;
  take: string;
  branchId: string;
  sreachBy: string;
  value: string;
}
