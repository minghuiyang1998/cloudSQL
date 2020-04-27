import jwt from 'jsonwebtoken';

export const authenticate = token => {
  const userInfo = jwt.verify(token, 'yep_session');
  let valid = false;
  if (userInfo.PersonId) {
    valid = true;
  }
  return valid;
};

export const newToken = userInfo => {
  const token = jwt.sign(JSON.parse(userInfo), 'cloud_sql_session', { expiresIn: '7d' });
  return token;
};
