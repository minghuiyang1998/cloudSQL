import * as jwt from 'jsonwebtoken';
export const COOKIE_NAME = 'cloud_sql_session';
const KEY = 'cloud_sql_session';

export const checkToken = token => {
  if(!token) return false
  const userInfo = jwt.verify(token, KEY);
  let valid = false;
  const { uuid = '' } = userInfo || {}
  if (uuid) {
    valid = true;
  }
  return valid;
};

export const newToken = userInfo => {
  const { username = '', uuid = '' } = userInfo || {}
  const token = jwt.sign({ username, uuid }, KEY, { expiresIn: '7d' });
  return token;
};
