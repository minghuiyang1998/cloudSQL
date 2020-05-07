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
}

export default AppAction;
