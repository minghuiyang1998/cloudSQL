import fetch from '../utils/request';

export const getDrivers = async () => {
  const request = {
    method: 'GET',
    url: '/node/drivers',
  };
  const data = await fetch(request);
  return data;
};


export const getSchema = async (body) => {
  const request = {
    method: 'POST',
    url: '/node/schemainfos',
    body,
  };
  const data = await fetch(request);
  return data;
};
