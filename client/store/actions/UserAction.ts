import { action } from 'mobx';
import {
  getUserInfo,
  goSignIn,
  goSignUp,
} from '../../dao/user';


class UserAction {
  private user: UserStore

  constructor({ user }) {
    this.user = user;
  }

  @action checkUser = async () => {
    const result = await getUserInfo();
    const { code = 0 } = result || {};
    switch (code) {
      case 200:
        this.user.isLogin = true;
        break;
      default:
        this.user.isLogin = false;
        break;
    }
  }

  @action signIn = async (data) => {
    const result = await goSignIn(data);
    console.log('@actionsignIn -> signin', result);
  }

  @action signUp = async (data) => {
    const signUp = await goSignUp(data);
    console.log('@actionsignUp -> signUp', signUp);
  }
}

export default UserAction;
