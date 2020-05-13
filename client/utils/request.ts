import Axios from 'axios';
import * as Message from '../components/Message';

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
    const _loadingItem = Message.startLoading();
    const _sendDate = (new Date()).getTime();
    const response = await Axios(opts);
    const _receiveDate = (new Date()).getTime();
    Message.endLoading(_loadingItem);
    const _responseTimeMs = _receiveDate - _sendDate;
    const { data = {} } = response || {};
    const { code = 0, msg = '' } = data || {};
    if (code !== 200) {
      Message.error({ content: msg });
    }
    return {
      ...data,
      timeCount: _responseTimeMs,
    };
  } catch (err) {
    Message.error({ content: err });
    return {};
  }
}

export default fetch;
