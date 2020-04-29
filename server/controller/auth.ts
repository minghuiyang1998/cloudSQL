import { newToken } from '../utils/authenticate'
import { Context } from 'koa';

const newUser = async (ctx: Context) =>{
  const _user = await ctx.model.userSave()
  const { uuid = '' } = _user || {}
  const userInfos = await ctx.model.userGetById(uuid)
  const token = newToken(userInfos)
  ctx.cookie.set("session", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 1000)
  });
  if (!userInfos) {
    ctx.status = 404;
    return;
  }
  ctx.redirect("/");
}

const signOut = (ctx: Context) => {
  ctx.clearCookie("session");
  ctx.redirect('/login');
}

const signIn = (ctx: Context) => {
  if (ctx.authenticate()) {
    ctx.body = '认证通过';
  } else {
    ctx.throw(401);
    ctx.body = '非法访问';
  }
}

export default {
  newUser,
  signOut,
  signIn,
}