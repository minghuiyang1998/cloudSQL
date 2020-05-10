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

  removeConnection = (history, cid) => {
    const index = history.findIndex((i) => i.cid === cid);
    const _history = history.splice(index, 1);
    return _history;
  }

  @action getHistory = async () => {
    const result = await getHistory();
    const { data = [] } = result || {};
    const { connection = {} } = this.app || {};

    const { cid: connectedId = '' } = connection || {};
    const history = this.removeConnection(data, connectedId);
    this.user.history = history;
  }

  @action newConnection = async (body) => {
    const test = await testConnection(body);
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
      const { cid: connectedId = '' } = body || {};
      const _history = this.removeConnection(newHistory, connectedId);
      this.user.history = _history;
      this.app.connection = body;
    }
    return {
      code,
      msg,
    };
  }

  @action reviseConnection = async (body) => {
    const test = await testConnection(body);
    const { code: testCode = 0, msg: testMsg = '' } = test || {};
    if (testCode !== 200) {
      return {
        code: testCode,
        msg: testMsg,
      };
    }
    const { cid = '' } = body || {};
    const result = await putRevisedConnection(cid, body);
    const { code = 0, msg = '', data: newHistory = [] } = result || {};
    if (code === 200) {
      const { cid: connectedId = '' } = body || {};
      const _history = this.removeConnection(newHistory, connectedId);
      this.user.history = _history;
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
