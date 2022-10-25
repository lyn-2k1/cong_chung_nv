import { StaffDto } from '../../../types/staff/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { staffService } from './service';

export const useSearchListStaffQuery = (search: any) => {
  let searchStaff = search;
  if(!search) {
    searchStaff=`?skip=0&take=9999999&branchId=${localStorage.getItem('branch')}&searchBy=email&value=%20`
  }
  return useQuery(['listSearchStaff',searchStaff], () => staffService.getSearchListStaff(search));
};

export const useSearchSortStaffQuery = (params: any) => {
  let searchSortStaff = params;
  if(!searchSortStaff){
    searchSortStaff=`limit=10&offset=1&branchId=${localStorage.getItem('branch')}`
  }
  return useQuery(['listStaff', params], () => staffService.getSearchSortStaff(searchSortStaff))
}

export const useSortListStaffQuery = (sort: any) => {
  const sortStaff = `?skip=0&take=9999999&`+ sort;
  return useQuery(['sortListStaff', sortStaff], () => staffService.getSortListStaff(sortStaff));
}

export const useGetAllStaffQuery = (branchId: number) => {
  return useQuery(['allStaffBranch', `${branchId}`], () => staffService.getAllStaffBranch(branchId))
}

export const useCreateStaffMutation = () => {
  return useMutation((data:StaffDto) => {
    return staffService.createStaff(data);
  })
}

export const useUpdateStaffMutation = () => {
  return useMutation((data:any) => {
    let {id,...user} = data;
    return staffService.updateStaff(id, user);
  })
}

export const useFindOneStaffQuery = (id:number) => {
  return useQuery(['findOneStaff', `${id}`], () => staffService.getFindOneStaff(id));
}

export const useSetStatusStaffMutation = () => {
  return useMutation((param: {id:number, numberStatus: number}) => staffService.getSetStatusStaff(param.id, param.numberStatus));
}

export const useUpdateAvatarStaffMutation = () => {
  return useMutation((file:any) => {
    return staffService.updateAvatar(file);
  })
}
