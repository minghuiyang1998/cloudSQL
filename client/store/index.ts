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


let mobxStates = {};
let actions = {};

export const initStore = () => {
  mobxStates = {
    home: new ConnectionStore(),
    details: new SchemaStore(),
    recommends: new UserStore(),
  };

  actions = {
    home: new ConnectionAction(mobxStates),
    detail: new SchemaAction(mobxStates),
    recommend: new UserAction(mobxStates),
  };
};

export const getStore = () => mobxStates;
export const getAction = () => actions;
