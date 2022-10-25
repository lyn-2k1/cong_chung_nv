export interface ITemplateParam {
  id?: number;
  templateId: number;
  paramGroup: string;
  defaultValue: null | string;
  createBy?: number;
  updatedBy?: number;
  multiline: false;
  position: number;
  createdAt?: string | Date;
  updatedAt: string | Date;
  docParamId?: null | number;
  displayName?: string;
  docParamField?: null | string;
  param: string;
}

export interface ITemplateParamResponse {
  id: number;
  templateId: number;
  paramGroup: string;
  defaultValue: null | string;
  createBy: number;
  updatedBy: number;
  multiline: boolean;
  position: null | number;
  createdAt: string | Date;
  updatedAt: string | Date;
  docParamId: number;
  displayName: string;
  docParamField: null | string;
  param: string;
  viewFieldKey: null | string;
  DocParam: {
    id: number;
    name: string;
    description: string;
    docType: string;
  } | null;
  ParamGroup: {
    name: string;
    description: null | string;
  };
  SystemConfig: null;
  DataType: {
    type: string;
    name: string;
  };
  Template: {
    id: number;
    name: string;
    file: string;
  };
}

export interface ITemplateParamCreate {
  viewFieldKey: string;
  templateId: number;
  paramGroup: string;
  defaultValue: null | string;
  createBy?: number;
  updatedBy?: number;
  dataType?: string;
  status?: boolean | null;
  multiline: false;
  position: number;
  createdAt?: string | Date;
  updatedAt: string | Date;
  docParamId?: null | number;
  displayName?: string;
  docParamField?: null | string;
  param: string;
}
