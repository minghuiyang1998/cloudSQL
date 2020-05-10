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

export const postNewConnection = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/connection',
    body,
  };
  const data = await fetch(request);
  return data;
};

export const putRevisedConnection = async (connectionId, body) => {
  const request = {
    method: 'PUT',
    url: `/node/connection/${connectionId}`,
    body,
  };
  const data = await fetch(request);
  return data;
};
