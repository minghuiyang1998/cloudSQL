/* eslint-disable no-unused-vars */
import { Context } from 'koa';
import { v4 } from 'uuid';
import moment from 'moment';
import { getPasshash, comparePassword } from '../utils/passhash';
import { COOKIE_NAME, checkToken, newToken } from '../utils/token';

export const newUser = async (ctx: Context) => {
  const { body = {} } = ctx.request || {};
  const { username = '', password = '' } = body || {};
  let passhash = '';
  password.length && (passhash = await getPasshash(password));
  const _user = {
    uuid: v4(),
    username,
    passhash,
    createdDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  };
  const newu = await ctx.models.user.userSave(_user);
  if (!newu) {
    ctx.response.status = 500;
    ctx.body = {
      msg: 'Busy, please try later',
    };
  }
  ctx.body = newu;
};

export const signOut = (ctx: Context) => {
  ctx.cookies.set(COOKIE_NAME, null);
  ctx.response.status = 200;
};

export const signIn = async (ctx: Context) => {
  const { body = {} } = ctx.request || {};
  const { username = '', password = '' } = body || {};
  const _user = await ctx.models.user.userGetByName(username);

  // account doesn't exist
  if (!_user) {
    ctx.response.status = 401;
  }

  const { passhash: _hash = '' } = _user || {};
  const _temp = await getPasshash(password);
  const isValid = comparePassword(_temp, _hash);

  // password incorrect
  if (!isValid) {
    ctx.response.status = 401;
  }

  const token = newToken(_user);
  ctx.cookies.set(COOKIE_NAME, token);
  ctx.response.status = 200;
};

export const getUserInfo = async (ctx: Context) => {
  const token = ctx.cookies.get(COOKIE_NAME);
  const { username = '', uuid = '' } = checkToken(token);
  const _user = await ctx.models.user.userGetById(uuid);

  // account doesn't exist
  if (!_user) {
    ctx.response.status = 401;
  }

  ctx.response.status = 200;
  ctx.response.body = _user;
};
