import { autorun } from 'mobx';
import { updateCompletions } from '../utils/updateCompletions';

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

  autorun(() => {
    // eslint-disable-next-line no-unused-vars
    const a = stores.app.connection;
    actions.app.refreshSchema();
  });

  // autorun(() => {
  //   const { schema } = stores.app;
  //   updateCompletions(schema);
  // });
};


export const getStore = () => stores;
export const getAction = () => actions;
