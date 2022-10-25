import { URL_API } from '@/common/index';
import { BaseService } from '@/common/services/base.service';

class OcrService extends BaseService {
  async getOcrData(id: number) {
    const res = await this.http.get(`/ocr-data/data/${id}`);
    return res.data;
  }

  async updateOcrData(data: any) {
    const res = await this.http.put(`/ocr-data`, data);
    return res.data;
  }
}

export const ocrService = new OcrService();
