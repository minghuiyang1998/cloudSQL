import { observable } from 'mobx';

class AppStore {
  @observable baseURL = '';

  @observable list = [{ id: 1, component: null }]

  @observable current = null;
;
}

export default AppStore;
