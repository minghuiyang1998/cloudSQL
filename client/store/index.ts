import {
  ConnectionStore,
  SchemaStore,
  UserStore,
} from './stores';

import {
  ConnectionAction,
  SchemaAction,
  UserAction,
} from './actions';


let stores = {};
let actions = {};

export const initStore = () => {
  stores = {
    connection: new ConnectionStore(),
    schema: new SchemaStore(),
    user: new UserStore(),
  };

  actions = {
    connection: new ConnectionAction(stores),
    schema: new SchemaAction(stores),
    user: new UserAction(stores),
  };
};

export const getStore = () => stores;
export const getAction = () => actions;
