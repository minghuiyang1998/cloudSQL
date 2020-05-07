import Axios from 'axios';
// import Message from './message';

const BASE_URL = 'http://127.0.0.1:3000';

async function fetch({ method = '', url = '', body = {} }) {
  const opts = {
    method: method.toUpperCase(),
    url: `${BASE_URL}${url}`,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    body,
  };

  Axios(opts)
    .then((response) => {
      if (response.redirected) {
        window.location = response.url;
      }

      if (response.status === 200) {
        return response.json();
      }

      if (response.status === 401) {
        window.location = '/signIn';
      }

      console.error(response);
      throw new Error('Server responded not ok');
    })
    .catch((error) => {
      console.log(error);
    });
}

export default fetch;
