import { action } from 'mobx';
import {
  getUserInfo,
  goSignIn,
  goSignUp,
} from '../../dao/user';


class UserAction {
  private user: SchemaStore

  constructor({ user }) {
    this.user = user;
  }

  @action checkUser = async () => {
    const result = await getUserInfo();
    console.log('@actioncheckUser -> data', result);
    console.log(this.user);
  }

  @action signIn = async (data) => {
    const result = await goSignIn(data);
    console.log('@actionsignIn -> result', result);
    console.log(this.user);
  }

  @action signUp = async (data) => {
    const signUp = await goSignUp(data);
    console.log('@actionsignUp -> signUp', signUp);
    console.log(this.user);
  }
}

export default UserAction;
