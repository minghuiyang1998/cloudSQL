import { action } from 'mobx';
import {
  getUserInfo,
  goSignIn,
  goSignUp,
  goSignOut,
} from '../../dao/user';


class UserAction {
  private user: UserStore

  constructor({ user }) {
    this.user = user;
  }

  @action checkUser = async () => {
    const result = await getUserInfo();
    const { code = 0, data = {} } = result || {};
    switch (code) {
    case 200:
      this.user.isLogin = true;
      this.user.user = data;
      break;
    default:
      this.user.isLogin = false;
      break;
    }
  }

  @action signIn = async (data) => {
    const result = await goSignIn(data);
    const { code = 0, msg = '', data: userdata = {} } = result || {};
    if (code !== 200) {
      console.log(code, msg);
    } else {
      this.user.isLogin = true;
      this.user.user = userdata;
    }
  }

  @action signUp = async (data) => {
    const result = await goSignUp(data);
    const { code = 0, msg = '' } = result || {};
    console.log(code, msg);
  }

  @action signOut = async (data) => {
    const result = await goSignOut(data);
    const { code = 0, msg = '' } = result || {};
    console.log(code, msg);
  }
}

export default UserAction;
