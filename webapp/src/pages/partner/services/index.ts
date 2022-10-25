import { BaseService } from '@/common/services/base.service';

class Partner extends BaseService {
  getAllPartnerRecord() {
    return this.http.get('/partner').then((data) => {
      return { data: data.data };
    });
  }
}

export const partnerService = new Partner();
