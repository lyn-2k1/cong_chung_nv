import { useMutation, useQuery } from '@tanstack/react-query';
import { workTypeService } from './work-type.service';

export const useListWorkFlowQuery = (id: number) => {
  return useQuery(['listWorkFlow', id], () => workTypeService.getFlow(id));
};
