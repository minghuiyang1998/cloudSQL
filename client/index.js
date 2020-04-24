import * as React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { store } from './stores';
import { Provider } from 'redux';
import Message from '@/components/Message';


ReactDOM.render(
  <Provider store={store}>
    <>
      <Router />
      <Message />
    </>
  </Provider>,
  document.getElementById('root')
);
