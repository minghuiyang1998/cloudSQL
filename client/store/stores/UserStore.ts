
import { observable } from 'mobx';

class UserStore {
  @observable status = '';

  @observable user = {};

  @observable history = {};
}

export default UserStore;
