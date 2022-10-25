import { BaseService } from '@/common/services/base.service';

class Common extends BaseService {
  getWorkFlowRecord() {
    return this.http.get('/work-flow').then((data) => {
      return { data: data.data };
    });
  }
  getWorkTypeRecord() {
    return this.http.get('/work-type').then((data) => {
      return { data: data.data };
    });
  }
  getContractTypeByWorkTypeRecord(worktypeId: number) {
    return this.http.get(`type-contract/typeContractsByWorkTypeId/${worktypeId}`).then((data) => {
      return { data: data.data };
    });
  }
}

export const commonService = new Common();
