import { BaseService } from '@/common/services/base.service';

class Notify extends BaseService {
  getAllNotifyRecord() {
    return this.http.get('/notification/findAllNotification?limit=10&offset=1').then((data) => {
      return { data: data.data };
    });
  }
}

export const notifyService = new Notify();
