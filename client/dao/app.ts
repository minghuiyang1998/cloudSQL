import fetch from '../utils/request';

export const getDrivers = async () => {
  const request = {
    method: 'GET',
    url: '/node/drivers',
  };
  const data = await fetch(request);
  return data;
};
