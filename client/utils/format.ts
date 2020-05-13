export const formatSchemaData = (data) => {
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


export const formatTableData = (list = []) => {
  if (!list.length) return {};
  const item = list[0];
  const columns = Object.keys(item).map((k) => ({
    Header: k,
    accessor: k,
  }));
  const data = list;
  return {
    columns,
    data,
  };
};
