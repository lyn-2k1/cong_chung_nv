import { useQuery } from '@tanstack/react-query';
import { reportService } from '.';

export const useCatchReportList = (query: string) => {
  console.log(query);
  return useQuery(['reportList'], () => reportService.getAllReportList(query));
};
