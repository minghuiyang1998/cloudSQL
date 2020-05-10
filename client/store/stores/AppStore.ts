import { observable } from 'mobx';
import Store from './Store';

class AppStore extends Store {
  @observable list = [{ id: 1, component: null }]

  @observable current = null;

  @observable connection = {};

  @observable drivers = [];
}

export default AppStore;
