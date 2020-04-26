import { newToken } from '../utils/authenticate'
import { create, getUserInfos } from '../models/users'

const newUser = async (ctx, next) =>{
  //TODO: setInfo 2 DB with uuid
  const { body } = ctx.request || {}
  await create(body)
  const userInfos = await getUserInfos()
  //TODO: get info
  const token = newToken(userInfos)
  ctx.cookie.set("session", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 1000)
  });
  ctx.redirect("/");
}

const signOut = (ctx, next) => {
  ctx.clearCookie("session");
  ctx.redirect('/login');
}

const signIn = (ctx, next) => {
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