import {
  ConnectionStore,
  SchemaStore,
  UserStore,
  AppStore,
} from './stores';

import {
  ConnectionAction,
  SchemaAction,
  UserAction,
  AppAction,
} from './actions';


let stores = {};
let actions = {};

export const initStore = () => {
  stores = {
    connection: new ConnectionStore(),
    schema: new SchemaStore(),
    user: new UserStore(),
    app: new AppStore(),
  };

  actions = {
    connection: new ConnectionAction(stores),
    schema: new SchemaAction(stores),
    user: new UserAction(stores),
    app: new AppAction(stores),
  };
};

export const getStore = () => stores;
export const getAction = () => actions;
