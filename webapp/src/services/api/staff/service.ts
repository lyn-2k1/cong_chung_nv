import { URL_API } from '@/common/index';
import { StaffDto } from '../../../types/staff/index';
import { BaseService } from '@/common/services/base.service';

class Staff extends BaseService {
  getSearchListStaff(search: any) {
    return this.http.get(`/users/searchUsersStaff${search}`).then((res) => res.data);
  }
  getSortListStaff(sort: any) {
    return this.http.get(`/users/sortUsersStaff${sort}`)
    .then((res) => res.data);
  }
  getSearchSortStaff(params: any) {
    return this.http.post(`/users/searchUsersStaff?${params}`)
    .then((res) => res.data);
  }
  createStaff(data: StaffDto) {
    return this.http.post(`/users/createStaff`, data)
    .then((res) => res.data);
  }
  updateStaff(id: number, user: StaffDto) {
    return this.http.post(`/users/updateStaff/${id}`, user)
    .then((res) => res.data)
    .catch((error) => error.message);
  }
  updateAvatar(file: any){
    return this.http.post(`${URL_API}/api/upload/upload-avatar`, file)
    .then((res) => res.data)
    .catch((err) => err.message);
  }
  getAllStaffBranch(branchId: number) {
    return this.http
      .get(`/users/getAllUser?branchId=${branchId}`)
      .then((res) => res.data);
  }
  getFindOneStaff(id: number) {
    if(!id) return {}
    return this.http
    .get(`/users/userInfo/${id}`)
    .then((res) => res.data as StaffDto);
  }
  getSetStatusStaff(id:number, numberStatus: number) {
    return this.http
    .post(`/users/setStatusUser?id=${id}&numberStatus=${numberStatus}`)
    .then((res) => res.data);
  }
}

export const staffService = new Staff();
