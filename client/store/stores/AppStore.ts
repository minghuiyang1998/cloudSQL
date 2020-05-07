import { observable } from 'mobx';

class AppStore {
  @observable baseURL = '';

  @observable list = [{ id: 1, component: null }]
;
}

export default AppStore;
