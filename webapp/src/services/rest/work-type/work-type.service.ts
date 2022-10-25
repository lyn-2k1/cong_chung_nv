import { URL_API } from '@/common/index';
import { BaseService } from '@/common/services/base.service';
import { WorkTypeFlow } from '../types';

class WorkTypeService extends BaseService {
  getFlow(id: number): Promise<WorkTypeFlow[]> {
    return this.http.get<WorkTypeFlow[]>(`/work-type/${id}/flow`).then((res) => {
      return res.data;
    });
  }
}

export const workTypeService = new WorkTypeService();
