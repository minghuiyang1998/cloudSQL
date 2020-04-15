import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from '@/pages/app';
import Home from '@/pages/home';

export default function route() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}