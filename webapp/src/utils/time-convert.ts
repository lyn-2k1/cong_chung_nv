import * as moment from 'moment';

export const timestampConvert = (timestamp: number) => {
  if (!timestamp) return null;
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('vi-VI', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const getUnixTimeStamp = () => {
  return moment().unix();
};
