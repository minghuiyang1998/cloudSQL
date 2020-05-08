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
    console.log("@actioncheckUser -> result", result)
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
    const { code = 0, msg = '' } = result || {};
    if (code !== 200) {
      console.log(code, msg);
    } else {
      this.user.isLogin = true;
    }
  }

  @action signUp = async (data) => {
    const result = await goSignUp(data);
    const { code = 0, msg = '' } = result || {};
    console.log(code, msg);
  }
}

export default UserAction;
