/* eslint-disable no-unused-vars */
import { Context } from 'koa';
import { COOKIE_NAME, checkToken } from '../utils/token';

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
  ctx.response.status = 401;
}
