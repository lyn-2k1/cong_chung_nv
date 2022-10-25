import { useMutation, useQuery } from '@tanstack/react-query';
import { userRoleService } from './service';

export const useSearchListUserRoleQuery = (search: any) => {
  return useQuery(['listUserRole', search], () => userRoleService.searchUserRole(search));
};
