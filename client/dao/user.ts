import fetch from '../utils/request';

export const getUserInfo = async () => {
  await fetch('GET', '/node/userinfo');
};

export const goSignIn = async () => {
  await fetch();
};

export const goSignUp = async () => {
  await fetch();
};
