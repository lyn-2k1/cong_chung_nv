import { useMutation, useQuery } from '@tanstack/react-query';
import { ocrService } from './ocr.service';

export const useOcrDataQuery = (id: number) => {
  return useQuery(['ocrData', id], () => ocrService.getOcrData(id), {
    enabled: !!id,
  });
};

export const useUpdateOcrDataMutation = () => {
  return useMutation((data: any) => ocrService.updateOcrData(data));
};
