import { action } from 'mobx';

class SchemaAction {
  private schema: SchemaStore

  constructor({ schema }) {
    this.schema = schema;
  }

  @action async refreshSchema(schema = []) {
    // TODO: request in dao
    // TODO: result set into the state
    this.schema = schema;
  }
}

export default SchemaAction;
