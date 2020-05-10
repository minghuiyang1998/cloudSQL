import {
  UserStore,
  AppStore,
} from './stores';

import {
  UserAction,
  AppAction,
} from './actions';


let stores = {};
let actions = {};

export const initStore = () => {
  stores = {
    user: new UserStore(),
    app: new AppStore(),
  };

  actions = {
    user: new UserAction(stores),
    app: new AppAction(stores),
  };
};

export const getStore = () => stores;
export const getAction = () => actions;
