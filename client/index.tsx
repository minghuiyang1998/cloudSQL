import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import Router from './router';
import Message from './components/Message';
import { initStore } from './store';
import globalStyle from './stylesheets/global.scss';

initStore();

const App = () => (
  <>
    <style jsx>{globalStyle}</style>
    <Router />
    <Message />
  </>
);
const HotApp = hot(module)(App);
ReactDOM.render(<HotApp />, document.getElementById('root'));
