import { COOKIE_NAME, newToken } from '../utils/token'
import { Context } from 'koa';

export const newUser = async (ctx: Context) =>{
  const _user = await ctx.models.user.userSave()
  if (!_user) {
    ctx.response.status = 500;
    ctx.body = {
      msg:'Busy, please try later'
    }
  }
}

export const signOut = (ctx: Context) => {
  ctx.cookie.set(COOKIE_NAME, null);
}

export const signIn = async (ctx: Context) => {
  const _user = await ctx.models.user.userGetByName()
  if (Object.keys(_user).length) {
    const token = newToken(_user)
    ctx.cookie.set(COOKIE_NAME, token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 1000)
    });
  } else {
    ctx.response.status = 500;
    ctx.body = {
      msg:'Busy, please try later'
    }
  }
}