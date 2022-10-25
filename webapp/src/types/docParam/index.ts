export interface IDocParam {
  id: number;
  name: string;
  description?: string;
  docType: string;
}

export interface DocParamCreateRequest {
  name: string;
  description?: string;
  docType: string;
}
export interface DocParamUpdateRequest {
  id: number;
  name: string;
  description?: string;
  docType: string;
}
