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
  deleteConnection,
} from '../../dao/connection';
import { CLEAR_ALL_TABS, emitEvent } from '../../utils/event';


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
    const { cid = '' } = connection || {};
    const index = data.findIndex((i) => i.cid === cid);
    if (index !== -1) {
      data.splice(index, 1);
    }
    this.user.history = data;
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
    const { code = 0, msg = '', data = {} } = result || {};
    const { connection = {}, history = [] } = data || {};
    if (code === 200) {
      const { cid = '' } = connection || {};
      const index = history.findIndex((i) => i.cid === cid);
      if (index !== -1) {
        history.splice(index, 1);
      }
      this.user.history = history;
      this.app.connection = connection;
      this.app.selectedSchemas = [];
      emitEvent(CLEAR_ALL_TABS);
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
    const { code = 0, msg = '', data = {} } = result || {};
    const { connection = {}, history = [] } = data || {};
    if (code === 200) {
      const { cid: connectionId = '' } = connection || {};
      const _hist = history.filter((i) => i.cid !== connectionId);
      this.user.history = _hist;
      this.app.connection = connection;
      this.app.selectedSchemas = [];
      emitEvent(CLEAR_ALL_TABS);
    }
    return {
      code,
      msg,
    };
  }

  @action deleteInstance = async (body) => {
    const { cid = '' } = body || {};
    const result = await deleteConnection(cid);
    const { code = 0, msg = '', data: newHistory = [] } = result || {};
    if (code === 200) {
      const { cid: connectionId = '' } = this.app.connection || {};
      const index = newHistory.findIndex((i) => i.cid === connectionId);
      if (index !== -1) {
        newHistory.splice(index, 1);
      }
      this.user.history = newHistory;
      if (connectionId === cid) {
        this.app.connection = {};
        this.app.selectedSchemas = [];
        emitEvent(CLEAR_ALL_TABS);
      }
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
    if (code === 200) {
      this.user.isLogin = false;
      this.user.user = {};
    }
    console.log(code, msg);
  }
}

export default UserAction;
