export const runSQL = async ({ sql = '', connection = '' }) => {
  const request = {
    method: 'POST',
    url: '/node/sql',
    body: {
      sql,
      connection,
    },
  };
  const data = await fetch(request);
  return data;
};
