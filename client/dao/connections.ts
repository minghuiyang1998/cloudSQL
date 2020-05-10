import fetch from '../utils/request';

export const testConnection = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/test-connect',
    body,
  };
  const data = await fetch(request);
  return data;
};

export const newConnection = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/connection',
    body,
  };
  const data = await fetch(request);
  return data;
};

export const reviseConnection = async (connectionId, body) => {
  const request = {
    method: 'PUT',
    url: `/node/connection/${connectionId}`,
    body,
  };
  const data = await fetch(request);
  return data;
};
