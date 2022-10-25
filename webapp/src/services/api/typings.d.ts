declare namespace API {
  type CreateOcrDto = {
    image: string;
  };

  type CreateTemplateDto = {
    name: string;
    branchId: number;
    typeContractId: number;
    file: File;
    price: number;
  };

  type CreateTicketDto = {
    ticketStatusName?: string;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
    updatedBy?: string;
  };
  type TemplateControllerUpdateParams = {
    id: number;
  };
  type LoginDTO = {
    email: string;
    password: string;
  };

  type OcrControllerFindOneParams = {
    id: string;
  };

  type OcrControllerRemoveParams = {
    id: string;
  };

  type OcrControllerUpdateParams = {
    id: string;
  };

  type RefreshTokenInput = {
    token: string;
  };

  type SignUpDTO = {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
  };

  type TemplateParamControllerFilterPrams = {
    templateId?: number;
    branchId?: number;
    contractId?: number;
  };
  type TemplatePramsControllerRemoveParams = {
    id: number;
  };

  type TemplateControllerFindOneParams = {
    id: string;
  };

  type TemplateControllerRemoveParams = {
    id: string;
  };

  type TemplateParamControllerUpdateParams = {
    id: string;
  };

  type TemplateParamControllerUpdateDTO = {
    id?: number;
    key: string;
    value: string;
    name: string;
    position?: number;
    paramId?: number;
    defaultValue?: string;
    ocrDataId: number;
    paramGroup: string;
    templateId: number | null;
    updatedBy?: number;
    createBy?: number;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  type TicketControllerFindOneParams = {
    id: string;
  };

  type TicketControllerRemoveParams = {
    id: string;
  };

  type TicketControllerUpdateParams = {
    id: string;
  };

  type Token = {
    accessToken: string;
    refreshToken: string;
  };

  type UpdateOcrDto = {
    image?: string;
  };

  type UpdateTemplateDto = {
    id: number;
    name: string;
    file: File;
    branchId: number;
    typeContractId: number;
    price: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  type UpdateTicketDto = {
    ticketStatusName?: string;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
    updatedBy?: string;
  };

  type UploadControllerStreamFileParams = {
    ticketId: string;
    type: string;
    filename: string;
  };

  type UploadControllerUploadFileParams = {
    ticketId: string;
    type: string;
  };
}
