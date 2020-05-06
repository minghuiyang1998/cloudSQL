// const loadSchemaInfo =  async (connectionId, reload) => {
//   const { schema, showSchema } = state;
//   if (!schema[connectionId] || reload) {
//     store.setState({
//       schema: {
//         ...schema,
//         [connectionId]: {
//           loading: true,
//           expanded: {},
//         },
//       },
//     });

//     const qs = reload ? '?reload=true' : '';
//     const json = await fetchJson('GET', `/api/schema-info/${connectionId}${qs}`);
//     const { error, data } = json;
//     if (error) {
//       store.setState({
//         schema: {
//           ...schema,
//           [connectionId]: {
//             loading: false,
//             error,
//           },
//         },
//       });
//       return;
//     }
//     updateCompletions(data);

//     // Pre-expand schemas
//     const expanded = {};
//     if (data) {
//       Object.keys(data).forEach((schemaName) => {
//         expanded[schemaName] = true;
//       });
//     }

//     return {
//       schema: {
//         ...schema,
//         [connectionId]: {
//           loading: false,
//           schemaInfo: data,
//           error: null,
//           expanded,
//         },
//       },
//     };
//   }
// };
