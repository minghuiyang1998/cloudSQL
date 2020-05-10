
import { observable } from 'mobx';

class UserStore {
  @observable isLogin = false;

  @observable user = {};

  @observable history = [];
}

export default UserStore;
