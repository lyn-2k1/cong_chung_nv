/* how to use ? 
param1 : messageConst[message]
param2 : array param match each param in message
*/
const getMessage = (message: string, params?: Array<number | string>) => {
  if (params) {
    for (let i = 0; i < params.length; i++) {
      message = message.replace(`param${i}`, params[i] as string);
    }
  }
  return message;
};
