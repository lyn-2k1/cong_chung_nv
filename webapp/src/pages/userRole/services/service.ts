import { BaseService } from '@/common/services/base.service';

class UserRole extends BaseService {
  searchUserRole(search: any) {
    return this.http.get(`${this.basePath}/searchUserRole${search}`).then((res) => res.data);
  }
}

export const userRoleService = new UserRole('userRole');
