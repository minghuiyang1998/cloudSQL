import fetch from '../utils/request';

export const runSQL = async ({ sql = '', connection = '' }) => {
  const {
    database = '',
    host = '',
    password = '',
    port = '',
    type = '',
    user = '',
  } = connection || {};
  const request = {
    method: 'POST',
    url: '/node/sql',
    body: {
      sql,
      connection: {
        database,
        host,
        password,
        type,
        user,
        port,
      },
    },
  };
  const data = await fetch(request);
  return data;
};
