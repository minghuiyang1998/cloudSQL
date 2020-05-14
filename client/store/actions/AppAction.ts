import { action } from 'mobx';
import { getDrivers, getSchema } from '../../dao/app';

class AppAction {
  private app: SchemaStore

  constructor({ app }) {
    this.app = app;
  }

  @action async drivers() {
    const result = await getDrivers();
    const { data = {} } = result || {};
    this.app.drivers = data;
  }

  @action async refreshSchema() {
    const { connection = {} } = this.app || {};
    if (!Object.keys(connection).length) {
      return;
    }
    const result = await getSchema(connection);
    const { data = {} } = result || {};
    const schemas = Object.keys(data);
    this.app.connection.children = schemas;
    this.app.schema = data;
  }

  @action addSelectedSchemas(value) {
    const { selectedSchemas = [] } = this.app || {};
    const _set = new Set(selectedSchemas);
    _set.add(value);
    this.app.selectedSchemas = [..._set];
  }

  @action deleteSelectedSchemas(value) {
    const { selectedSchemas = [] } = this.app || {};
    const _set = new Set(selectedSchemas);
    _set.delete(value);
    this.app.selectedSchemas = [..._set];
  }
}

export default AppAction;
