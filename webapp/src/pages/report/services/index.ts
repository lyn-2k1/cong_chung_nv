import { BaseService } from '@/common/services/base.service';

class Report extends BaseService {
  getAllReportList(query: string) {
    return this.http.post(`/report/searchReportOptions?${query}`).then((data) => {
      return { data: data.data };
    });
  }
  createReportRecord(reqData: any) {
    return this.http.post(`/report`, reqData).then((data) => {
      return data.data;
    });
  }
}

export const reportService = new Report();
