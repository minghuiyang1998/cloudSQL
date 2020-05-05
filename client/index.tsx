import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import Message from './components/Message';
import { hot } from 'react-hot-loader';
import { initStore } from './store'
initStore()

const App = () => {
  return (<>
    <Router />
    <Message />
  </>)
}
const HotApp = hot(module)(App);
ReactDOM.render(<HotApp />, document.getElementById('root'));
