import { action } from 'mobx';

const formatSchemaData = (data) => {
  const schemas = [];
  const tables = [];
  const columns = [];
  data.forEach((i) => {
    const { type } = i || {};
    switch (type) {
      case 'schema':
        schemas.push({
          ...i,
          children: [],
        });
        break;
      case 'table':
        tables.push({
          ...i,
          children: [],
        });
        break;
      case 'column':
        columns.push(i);
        break;
      default: break;
    }
  });
  tables.forEach((t, index) => {
    const { schemaName, name } = t || {};
    const temp = columns.filter((c) => c.schemaName === schemaName && c.tableName === name);
    tables[index].children = temp;

    const sIndex = schemas.findIndexOf((e) => e.name === schemaName);
    schemas[sIndex].children.push(t);
  });
  return schemas;
};

class SchemaAction {
  private schema: SchemaStore

  constructor({ data }) {
    this.schema = data;
  }

  @action async refreshSchema(data = []) {
    // set loading
    // TODO: request in dao
    // TODO: result set into the state, set error
    this.schema = data;
  }
}

export default SchemaAction;
