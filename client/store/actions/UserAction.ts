import { action } from 'mobx';
import {
  getUserInfo,
  getHistory,
  goSignIn,
  goSignUp,
  goSignOut,
} from '../../dao/user';
import {
  testConnection,
  postNewConnection,
  putRevisedConnection,
} from '../../dao/connection';


class UserAction {
  private user: UserStore

  private app: AppStore

  constructor({ user, app }) {
    this.user = user;
    this.app = app;
  }

  @action getHistory = async () => {
    const result = await getHistory();
    const { data = [] } = result || {};
    const { connection = {} } = this.app || {};

    const index = data.findIndex((i) => i.cid === connection.cid);
    data.slice(index, 1);

    this.user.history = data;
  }

  @action newConnection = async (body) => {
    const test = await testConnection(body);
    console.log("@actionnewConnection -> test", test)
    const { code: testCode = 0, msg: testMsg = '' } = test || {};
    if (testCode !== 200) {
      return {
        code: testCode,
        msg: testMsg,
      };
    }

    const result = await postNewConnection(body);
    const { code = 0, msg = '', data: newHistory = [] } = result || {};
    if (code === 200) {
      this.user.history = newHistory;
      this.app.connection = body;
    }
    return {
      code,
      msg,
    };
  }

  @action reviseConnection = async (data) => {
    const { connection = {} } = this.app || {};
    const body = {
      ...connection,
      data,
    };

    const test = await testConnection(body);
    console.log("@actionnewConnection -> test", test)
    const { code: testCode = 0, msg: testMsg = '' } = test || {};
    if (testCode !== 200) {
      return {
        code: testCode,
        msg: testMsg,
      };
    }

    const result = await putRevisedConnection(body);
    console.log("@actionreviseConnection ->  result",  result)
    const { code = 0, msg = '', data: newHistory = [] } = result || {};
    if (code === 200) {
      this.user.history = newHistory;
      this.app.connection = body;
    }
    return {
      code,
      msg,
    };
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
