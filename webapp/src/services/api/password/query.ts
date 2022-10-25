import { useMutation, useQuery } from '@tanstack/react-query';
import { passwordService } from './service';

export const useChangePasswordMutation = () => {
    return useMutation((body: {"password": string, "newPassword": string}) => {
        return passwordService.patchChangePassword(body);
    })
}
export const useForgotPasswordMutation = () => {
    return useMutation((body: {email:string}) => {
        return passwordService.postForgotPassword(body);
    })
}

