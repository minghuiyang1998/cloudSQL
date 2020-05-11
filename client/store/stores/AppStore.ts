import { observable } from 'mobx';
import Store from './Store';

class AppStore extends Store {
  @observable list = [{ id: 1, component: null }]

  @observable current = null;

  @observable drivers = [];

  @observable connection = {};

  @observable schema = {};

  @observable selectedSchema = '';
}

export default AppStore;
