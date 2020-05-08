/* eslint-disable no-unused-vars */
import { Context } from 'koa';
import { COOKIE_NAME, checkToken } from '../utils/token';
import { StatusCode, StatusMsg } from '../constant/status';

export const authenticate = async (ctx: Context, next:() => Promise<any>) => {
  const token = ctx.cookies.get(COOKIE_NAME);
  const { username = '', uuid = '' } = checkToken(token);
  if (username && uuid) {
    ctx.user = {
      username,
      uuid,
    };
    return next();
  }

  ctx.body = {
    code: StatusCode.NOT_LOGIN,
    msg: StatusMsg.NOT_LOGIN,
  };
};
