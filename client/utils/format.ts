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
  const columns = [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Age',
          accessor: 'age',
          width: 50,
          align: 'right',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
          width: 50,
          align: 'right',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ];
  const data = [];
  console.log('formatTableData -> list', list);
  return {
    columns,
    data,
  };
};
