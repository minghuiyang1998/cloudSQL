import {
  SchemaStore,
  UserStore,
  AppStore,
} from './stores';

import {
  SchemaAction,
  UserAction,
  AppAction,
} from './actions';


let stores = {};
let actions = {};

export const initStore = () => {
  stores = {
    schema: new SchemaStore(),
    user: new UserStore(),
    app: new AppStore(),
  };

  actions = {
    schema: new SchemaAction(stores),
    user: new UserAction(stores),
    app: new AppAction(stores),
  };
};

export const getStore = () => stores;
export const getAction = () => actions;
