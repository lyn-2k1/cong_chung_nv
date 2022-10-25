export interface ITemplate {
  id: number;
  name: string;
  workType: string;
  contractType: string;
  file: string;
  branchName: string;
}
export interface ITemplateCreate {
  name: string;
  branchId: number;
  typeContractId: number;
  file: File;
  price: number;
}
