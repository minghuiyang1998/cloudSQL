import { COOKIE_NAME, newToken } from '../utils/token'
import { Context } from 'koa';
import { v4 } from 'uuid';
import { getPasshash, comparePassword } from '../utils/passhash';
import moment from 'moment';

export const newUser = async (ctx: Context) =>{
  const { body = {} } = ctx.request || {}
  const { username = '', password = '' } = body || {};
  let passhash = '';
  password.length && ( passhash = await getPasshash(password))
  const uuid = v4()
  const _user = {
    uuid,
    username,
    passhash,
    createdDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  }
  const newUser = await ctx.models.user.userSave(_user)
  if (!newUser) {
    ctx.response.status = 500;
    ctx.body = {
      msg:'Busy, please try later'
    }
  }
  ctx.body = newUser
}

export const signOut = (ctx: Context) => {
  ctx.cookies.set(COOKIE_NAME, null);
  ctx.response.status = 200
}

export const signIn = async (ctx: Context) => {
  const { body = {} } = ctx.request || {}
  const { username = '', password = '' } = body || {};
  const _user = await ctx.models.user.userGetByName(username)

  // account doesn't exist
  if (!_user) {
    ctx.response.status = 401;
  }
  
  const { passhash: _hash = '' } = _user || {};
  const _temp = await getPasshash(password)
  const isValid = comparePassword( _temp, _hash)

  // password incorrect
  if(!isValid) {
    ctx.response.status = 401;
  }

  const token = newToken(_user)
  ctx.cookies.set(COOKIE_NAME, token);
  ctx.response.status = 200
}