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
    responseType: 'json',
    validateStatus: false,
    // transformResponse: [].concat(
    //   Axios.defaults.transformResponse,
    //   (data) => { console.log(data);  },
    // ),
  };

  try {
    const response = await Axios(opts);
    console.log('fetch -> response', response);
    const { request = {} } = response || {};
    const { response: real = {} } = request || {};
    // const { data = {} } = real || {};
    return real;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export default fetch;
