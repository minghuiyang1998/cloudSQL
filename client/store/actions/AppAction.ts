import { action } from 'mobx';

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
}

export default AppAction;
