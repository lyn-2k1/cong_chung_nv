export interface IBranch {
  id: number;
  name: string;
  status: boolean;
}

export interface BranchFindOneParam {
  branchId: number;
}
