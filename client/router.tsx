import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import NotFound from './pages/404';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/query/new" />} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/query" render={() => <Redirect to="/query/new" />} />
        <Route exact path="/query/:queryId" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
