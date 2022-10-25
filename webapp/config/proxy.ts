import { URL_API } from '@/common/index';
export default {
  dev: {
    '/api/': {
      // target: 'http://107.191.60.27:4000',
      target: 'http://localhost:4000',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'http://107.191.60.27:4000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
