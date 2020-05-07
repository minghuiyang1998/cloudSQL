import { observable } from 'mobx';
import Store from './Store';

class AppStore extends Store {
  @observable baseURL = '';

  @observable list = [{ id: 1, component: null }]

  @observable current = null;

  @observable connection = {};
}

export default AppStore;
