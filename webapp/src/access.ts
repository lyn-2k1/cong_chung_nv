/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
 import { history } from 'umi';
 import { stringify } from 'querystring';
 export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
   const { currentUser } = initialState ?? {};
   console.log('-->Access', currentUser);
   if (
     currentUser == null ||
     currentUser == undefined ||
     currentUser?.UserRole == null ||
     currentUser?.UserRole == undefined
   ) {
     const { query = {}, search, pathname } = history.location;
     const { redirect } = query;
     // Note: There may be security issues, please note
     const location = window.location.pathname;
     if (location !== '/user/login' && !redirect || !location.includes('/user/forgot') && !redirect) {
       history.replace({
         pathname: location.includes('/user/forgot') ? location : '/user/login',
         search: stringify({
           redirect: pathname + search,
         }),
       });
     }
   }
   var permissions = {
     managerStaff: false,
     ticket: true,
     customer: false,
     partner: false,
     report: false,
     signProcess: false,
     decentralization: false,
     configuration: false,
   };
   currentUser?.UserRole?.forEach(({ roleName }) => {
     if (roleName === 'super-admin' || roleName === 'admin') {
       Object.keys(permissions).map((e) => {
         permissions[e] = true;
       });
     }
     if (roleName === 'staff' || roleName === 'signer') {
       permissions['customer'] = true;
       permissions['partner'] = true;
     }
     if (roleName === 'signer') {
       permissions['signProcess'] = true;
     }
     if (roleName === 'accountant') {
       permissions['report'] = true;
     }
   });
 
   console.log('String', permissions);
   return permissions;
 }
 