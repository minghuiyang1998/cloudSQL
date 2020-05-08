import fetch from '../utils/request';

export const getUserInfo = async () => {
  const request = {
    method: 'GET',
    url: '/node/userinfo',
  };
  const data = await fetch(request);
  return data;
};

export const goSignIn = async () => {
  const request = {
    method: 'POST',
    url: '/node/signin',
  };
  const data = await fetch(request);
  return data;
};

export const goSignUp = async () => {
  const request = {
    method: 'POST',
    url: '/node/signup',
  };
  const data = await fetch(request);
  return data;
};
