import { action } from 'mobx';
import { getDrivers } from '../../dao/app';
import {
  newConnection,
  reviseConnection,
} from '../../dao/connection';

class AppAction {
  private app: SchemaStore

  constructor({ app }) {
    this.app = app;
  }

  @action async addTab(component = null) {
    // TODO: create a id
    const { list } = this.app || {};
    list.push({
      id: 0,
      component,
    });
  }

  @action async changeTab(id = 0) {
    const { list } = this.app || {};
    const component = list.find((i) => i.id === id);
    this.app.currentTab = component;
  }

  @action async storeConnection(connection = {}) {
    this.app.connection = connection;
  }

  @action async getDrivers() {
    const result = await getDrivers();
    const { data = {} } = result || {};
    this.app.drivers = data;
  }

  @action async newConnection() {
    const result = await newConnection();
    const { data = {} } = result || {};
    this.app.drivers = data;
  }

  @action async reviseConnection() {
    const result = await reviseConnection();
    const { data = {} } = result || {};
    this.app.drivers = data;
  }
}

export default AppAction;
