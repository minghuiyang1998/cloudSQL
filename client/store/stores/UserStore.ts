
import { observable } from 'mobx';

class UserStore {
  @observable user = {};

  @observable history = {};
}

export default UserStore;
