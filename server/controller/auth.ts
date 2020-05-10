/* eslint-disable no-unused-vars */
import { Context } from 'koa';
import { v4 } from 'uuid';
import moment from 'moment';
import { getPasshash, comparePassword } from '../utils/passhash';
import { COOKIE_NAME, checkToken, newToken } from '../utils/token';
import { StatusCode, StatusMsg } from '../constant/status';

export const newUser = async (ctx: Context) => {
  const { body = {} } = ctx.request || {};
  const { username = '', password = '' } = body || {};
  if (!username.trim() || !password.trim()) {
    ctx.body = {
      code: StatusCode.INFO_ERROR,
      msg: StatusMsg.INFO_ERROR,
    };
    return;
  }
  let passhash = '';
  if (password) {
    passhash = await getPasshash(password);
  }
  const _user = {
    uuid: v4(),
    username,
    passhash,
    createdDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  };
  const newu = await ctx.models.user.userSave(_user);
  if (!newu) {
    ctx.body = {
      code: StatusCode.DB_ERROR,
      msg: StatusMsg.DB_ERROR,
    };
    return;
  }

  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: newu,
  };
};

export const signOut = (ctx: Context) => {
  ctx.cookies.set(COOKIE_NAME, null);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
  };
};

export const signIn = async (ctx: Context) => {
  const { body = {} } = ctx.request || {};
  const { username = '', password = '' } = body || {};
  if (!username.trim() || !password.trim()) {
    ctx.body = {
      code: StatusCode.INFO_ERROR,
      msg: StatusMsg.INFO_ERROR,
    };
    return;
  }

  const _user = await ctx.models.user.userGetByName(username);
  // account doesn't exist
  if (!_user) {
    ctx.body = {
      code: StatusCode.INEXIST_USER,
      msg: StatusMsg.INEXIST_USER,
    };
    return;
  }

  const { passhash: _hash = '', salt = '' } = _user || {};
  const _temp = await getPasshash(password);
  const isValid = await comparePassword(password, _hash);

  // password incorrect
  if (!isValid) {
    ctx.body = {
      code: StatusCode.INFO_ERROR,
      msg: StatusMsg.INFO_ERROR,
    };
    return;
  }

  const token = newToken(_user);
  ctx.cookies.set(COOKIE_NAME, token);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: _user,
  };
};

export const getUserInfo = async (ctx: Context) => {
  const token = ctx.cookies.get(COOKIE_NAME);
  const { username = '', uuid = '' } = checkToken(token);
  const _user = await ctx.models.user.userGetById(uuid);

  // account doesn't exist
  if (!_user) {
    ctx.body = {
      code: StatusCode.INEXIST_USER,
      msg: StatusMsg.INEXIST_USER,
    };
    return;
  }

  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: _user,
  };
};
