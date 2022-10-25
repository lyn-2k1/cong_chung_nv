import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';
import { UserOutlined } from '@ant-design/icons';

const routes: IConfigFromPlugins['routes'] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        name: 'forgot',
        icon: 'smile',
        path: '/user/forgot',
        component: './user/forgotPassword',
      },
      {
        name: 'confirmEmail',
        icon: 'smile',
        path: '/user/forgot/confirmEmail',
        component: './user/forgotPassword/components/confirmEmail',
      },
      {
        name: 'resetPassword',
        icon: 'smile',
        path: '/user/forgot/resetPassword',
        component: './user/forgotPassword/components/resetPassword',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/managerStaff',
    name: 'Quản lý nhân viên',
    icon: 'UsergroupAddOutlined',
    access: 'managerStaff',
    //component: './ticket',
    routes: [
      {
        path: '/managerStaff/listStaff',
        name: 'Danh sách nhân viên',
        component: './managerStaff/listStaff',
      },
    ],
  },
  {
    path: '/ticket',
    name: 'Hợp đồng',
    icon: 'FileTextOutlined',
    access: 'ticket',
    //component: './ticket',
    routes: [
      {
        path: '/ticket/detail/:id',
        hideInMenu: true,
        name: 'ticket-id',
        component: './ticket/id',
      },

      {
        path: '/ticket/add',
        hideInMenu: true,
        name: 'ticket-add',
        component: './ticket/add',
      },
      {
        path: '/ticket/list',
        name: 'Danh sách hợp đồng',
        icon: 'file',
        component: './ticket/list',
      },
    ],
  },
  {
    path: '/customer',
    name: 'Khách hàng',
    icon: 'table',
    access: 'customer',
    //component: './ticket',
    routes: [
      {
        path: '/customer/list',
        name: 'Danh sách khách hàng',
        component: './customer/list',
      },
    ],
  },
  {
    path: '/partner',
    name: 'Đối tác',
    icon: 'TabletOutlined',
    access: 'partner',
    //component: './ticket',
    routes: [
      {
        path: '/partner/list',
        name: 'Danh sách đối tác',
        component: './partner/list',
      },
    ],
  },
  {
    path: '/report',
    name: 'Báo cáo',
    icon: 'ProfileOutlined',
    access: 'report',
    component: './report/list',
  },
  {
    path: '/signProcess',
    name: 'Trình ký',
    icon: 'FileDoneOutlined',
    access: 'signProcess',
    component: './signProcess',
  },
  {
    path: '/decentralization',
    name: 'Phân quyền',
    icon: 'dashboard',
    access: 'decentralization',
    component: './userRole/list',
  },
  // {
  //   path: '/configuration',
  //   name: 'Cấu hình',
  //   icon: 'CheckCircleOutlined',
  //   access: 'configuration',
  //   //component: './ticket',
  //   routes: [
  //     {
  //       path: '/configuration/listConfiguration',
  //       name: 'Danh sách cấu hình',
  //       component: './configuration/listConfiguration',
  //     },
  //     {
  //       path: '/configuration/listTemplate',
  //       name: 'Danh sách Template',
  //       component: './configuration/listTemplate',
  //     },
  //   ],
  // },
  {
    path: '/template',
    name: 'Cấu hình',
    icon: 'form',
    access: 'example',
    routes: [
      {
        path: '/list',
        redirect: '/template/list',
      },
      {
        name: 'List',
        icon: 'smile',
        path: './list',
        component: './template/list',
      },
      {
        name: 'Config dynamic template',
        icon: 'smile',
        path: './config',
        component: './template/config',
      },
      {
        component: '404',
      },
    ],
  },

  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   access: 'example',
  //   routes: [
  //     {
  //       path: '/dashboard',
  //       redirect: '/dashboard/analysis',
  //     },
  //     {
  //       name: 'analysis',
  //       icon: 'smile',
  //       path: '/dashboard/analysis',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: 'monitor',
  //       icon: 'smile',
  //       path: '/dashboard/monitor',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: 'workplace',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    access: 'accountInfo',
    hideInMenu: true,
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    path: '/',
    redirect: '/ticket/list',
  },
  {
    component: '404',
  },
];
export default routes;
