import { useMutation, useQuery } from '@tanstack/react-query';
import { ticketService } from './ticket.service';

export const useListTicketQuery = () => {
  return useQuery(['listTicket'], () => ticketService.getListTicket());
};

export const useListFileTicketQuery = (ticketId: string) => {
  return useQuery(['listTicketFile', ticketId], () => ticketService.getListTicketFile(ticketId));
};
export const useListParamTicketQuery = (ticketId: string) => {
  return useQuery(['listParamTicket', ticketId], () => ticketService.getTicketParam(ticketId));
};

export const useDeleteTicketFileMutation = () => {
  return useMutation((id: string) => {
    return ticketService.deleteTicketFile(id);
  });
};

export const useCreateOcrGroupMutation = () => {
  return useMutation((data: any) => {
    return ticketService.createOcrGroup(data);
  });
};

export const useUpdateTicketParamMutation = () => {
  return useMutation((data: any) => {
    return ticketService.updateTicketParam(data);
  });
};

export const useGetListOcrQuery = (ticketId: string) => {
  return useQuery(['listOcr', ticketId], () => ticketService.getListOcr(ticketId));
};

export const useGetListOcrGroupQuery = (ticketId: string, paramGroupName: string) => {
  return useQuery(['listOcrGroup', ticketId, paramGroupName], () =>
    ticketService.getOcrGroup(ticketId, paramGroupName),
  );
};

export const useUpdateTicketMutation = () => {
  return useMutation((data: any) => {
    return ticketService.updateTicket(data);
  });
};

export const useFillTicketParamMutation = () => {
  return useMutation((data: any) => {
    return ticketService.fillTicketParam(data);
  });
}
