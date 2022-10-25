export interface IOptionSelect {
  label: string;
  value: string;
  [key: string]: any;
}

export interface IResponseData<T> {
  data: T[];
  totalDocs: number;
  [key: string]: any;
}
