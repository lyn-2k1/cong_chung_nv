import PizZipUtils from 'pizzip/utils/index.js';

export const loadFile = (url: 'string', callback: (error: any, content: any) => void) => {
  PizZipUtils.getBinaryContent(url, callback);
};
