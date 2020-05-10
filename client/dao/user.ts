import fetch from '../utils/request';

export const getUserInfo = async () => {
  const request = {
    method: 'GET',
    url: '/node/userinfo',
  };
  const data = await fetch(request);
  return data;
};

export const goSignIn = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/signin',
    body,
  };
  const data = await fetch(request);
  return data;
};

export const goSignUp = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/signup',
    body,
  };
  const data = await fetch(request);
  return data;
};

export const goSignOut = async () => {
  const request = {
    method: 'GET',
    url: '/node/signout',
  };
  const data = await fetch(request);
  return data;
};
