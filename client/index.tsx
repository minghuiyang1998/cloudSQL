import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import App from './app';
import { initStore } from './store';

initStore();
const HotApp = hot(module)(App);
ReactDOM.render(<HotApp />, document.getElementById('root'));
