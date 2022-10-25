import { URL_API } from '@/common/index';
import { BaseService } from '@/common/services/base.service';

class Password extends BaseService {
  patchChangePassword(body: {"password": string, "newPassword":string}) {
      return this.http.patch(`/auth/change-password`, body)
      .then((res) => res.data);
  }
  postForgotPassword(body: {email:string}) {
      return this.http.post(`/auth/forgot-password`,body)
      .then((res) => res.data);
  }
}

export const passwordService = new Password();
