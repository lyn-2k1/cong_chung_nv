import { BaseService } from '@/common/services/base.service';

class Ticket extends BaseService {
  getAllTicketRecord(query: string) {
    return this.http.post(`/ticket/searchTicketOptions?${query}`).then((data) => {
      return { data: data.data };
    });
  }
}

export const ticketService = new Ticket();
