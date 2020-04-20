import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import unistoreStore from '@/stores/store';
import { Provider } from 'unistore/react';
import { Message } from '@/components/Message';

ReactDOM.render(
  <Provider store={unistoreStore}>
    <>
      <Router />
      <Message />
    </>
  </Provider>,
  document.getElementById('root')
);
