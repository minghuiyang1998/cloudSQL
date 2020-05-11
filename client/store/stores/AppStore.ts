import { observable } from 'mobx';
import Store from './Store';

class AppStore extends Store {
  @observable drivers = [];

  @observable connection = {};

  @observable schema = {};

  @observable selectedSchemas = [];
}

export default AppStore;
