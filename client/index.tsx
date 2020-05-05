import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import Message from './components/Message';
import { initStore } from './store'
initStore()

ReactDOM.render(
  <>
    <Router />
    <Message />
  </>,
  document.getElementById('root')
);
