import Axios from 'axios';
// import Message from './message';

const BASE_URL = 'http://127.0.0.1:3000';

async function fetch({ method = '', url = '', body = {} }) {
  const opts = {
    method: method.toUpperCase(),
    url: `${BASE_URL}${url}`,
    // TODO: cors header Access-Control-Allow-Origin: *
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    withCredentials: true,
    data: body,
  };

  try {
    const response = await Axios(opts);
    console.log('fetch -> response', response);
    const { data = {} } = response || {};
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export default fetch;
