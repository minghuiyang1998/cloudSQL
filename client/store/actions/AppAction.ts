import { action, reaction } from 'mobx';
import { getDrivers, getSchema } from '../../dao/app';

class AppAction {
  private app: SchemaStore

  constructor({ app }) {
    this.app = app;
    const { connection = {} } = this.app || {};
    reaction(() => connection, () => { this.refreshSchema(); });
  }

  @action async drivers() {
    const result = await getDrivers();
    const { data = {} } = result || {};
    this.app.drivers = data;
  }

  @action async refreshSchema() {
    const { connection = {} } = this.app || {};
    const result = await getSchema(connection);
    const { data = {} } = result || {};
    this.app.drivers = data;
  }

  @action async storeConnection(connection = {}) {
    this.app.connection = connection;
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

}

export default AppAction;
