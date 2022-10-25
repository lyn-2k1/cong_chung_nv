
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { AuthControllerMe } from './services/api/Auth';
import moment from 'moment';
moment.locale('vi');

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await AuthControllerMe();
      // debugger;
      return msg;
    } catch (error) {
      //history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // chekck login status
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        //history.push(loginPath);
      }
    },
    links: isDev ? [] : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;

      const queryClient = new QueryClient();

      return (
        <>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

// Configuration for request
const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  const authHeader = { Authorization: `Bearer ${accessToken}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
export const request: RequestConfig = {
  // Add a pre-request interceptor that automatically adds an AccessToken
  requestInterceptors: [authHeaderInterceptor],
};
