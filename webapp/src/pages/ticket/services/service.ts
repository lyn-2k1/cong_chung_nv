import { URL_API } from '@/common/index';
import { BaseService } from '@/common/services/base.service';

class CreateTicket extends BaseService {
  async postStorageImage(data: any) {
    const res = await this.http.post(
      `/ticket/${data.get('ticketId')}/${data.get('typeFile')}`,
      data,
    );
    return res.data;
  }
  async getImageById(data: any) {
    const res = await this.http.get(
      `file/${data.get('ticketId')}/${data.get('typeFile')}/${data.get('imageName')}`,
      data,
    );
    return res.data;
  }

  getListTicket(): Promise<any> {
    return this.http.get(`/ticket`).then((res) => {
      console.log('this data', res.data);
      return res.data;
    });
  }

  async getListTicketFile(ticketId: string) {
    const res = await this.http.get(`${URL_API}/api/ticket-file`, {
      params: {
        ticketId,
      },
    });
    return res.data;
  }

  async deleteTicketFile(id: string) {
    const res = await this.http.delete(`${URL_API}/api/ticket-file/${id}`);
    return res.data;
  }

  async getTicketParam(ticketId: string) {
    const res = await this.http.get(`/ticket/param/${ticketId}`, {
      params: {
        ticketId,
      },
    });
    return res.data;
  }
  async exportTicket(ticketId: string) {
    const res = await this.http.get(`/ticket/param/${ticketId}`, {
      params: {
        ticketId,
      },
    });
    return res.data;
  }

  async updateTicketParam(data: any) {
    const res = await this.http.post(`/ticket/param`, data);
    return res.data;
  }

  async getListOcr(ticketId: string) {
    const res = await this.http.get(`/ocr/ocr/${ticketId}`);
    return res.data;
  }

  async getOcrGroup(ticketId: string, paramGroupName: string) {
    const res = await this.http.get(`/ocr-group`, {
      params: {
        ticketId,
        paramGroupName,
      },
    });
    return res.data;
  }

  async createOcrGroup(data: any) {
    const res = await this.http.post(`/ocr-group`, data);
    return res.data;
  }

  async updateTicket(data: any) {
    const { ticketId, ...payload } = data;
    const res = await this.http.patch(`/ticket/${ticketId}`, payload);
    return res.data;
  }
}

export const ticketService = new CreateTicket();
