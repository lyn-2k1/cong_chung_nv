export interface PartnerCreateRequest {
  branchId: number;
  fullName: string;
  phone: string;
  // contact?: string | null;
}
export interface PartnerUpdateRequest {
  id: number;
  branchId: number;
  fullName: string;
  phone: string;
  // contact?: string | null;
}

export interface IPartner {
  contact?: string | '';
  date: string | Date | undefined;
  id: number;
  createdAt?: number;
  phone: string;
  fullName: string;
  branchId?: number;
  User: {
    name: string;
    phone: string;
    Branch: {
      id?: number;
      name?: string;
    };
  };
}

export interface PartnerTableColumn {
  id: number;
  createdAt?: number;
  phone?: string;
  fullName?: string;
  branchId?: number;
  User: {
    name?: string;
    phone?: string;
    Branch?: {
      id?: number;
      name?: string;
    };
  };
}
