/* eslint-disable consistent-return */
import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';

export function updateCompletions(schemaInfo) {
  console.log("updateCompletions -> schemaInfo", schemaInfo)
  if (schemaInfo === null || schemaInfo === undefined) {
    return;
  }

  const schemaCompletions = [];
  const tableCompletions = [];

  const matchMaps = {
    schema: {}, // will contain tables
    table: {},
    schemaTable: {},
  };

  Object.keys(schemaInfo).forEach((schema) => {
    schemaCompletions.push({
      name: schema,
      value: schema,
      score: 0,
      meta: 'schema',
    });
    const SCHEMA = schema.toUpperCase();
    if (!matchMaps.schema[SCHEMA]) matchMaps.schema[SCHEMA] = [];

    Object.keys(schemaInfo[schema]).forEach((table) => {
      const SCHEMA_TABLE = `${SCHEMA}.${table.toUpperCase()}`;
      const TABLE = table.toUpperCase();
      if (!matchMaps.table[TABLE]) matchMaps.table[TABLE] = [];
      if (!matchMaps.schemaTable[SCHEMA_TABLE]) {
        matchMaps.schemaTable[SCHEMA_TABLE] = [];
      }
      const tableCompletion = {
        name: table,
        value: table,
        score: 0,
        meta: 'table',
        schema,
      };
      tableCompletions.push(tableCompletion);
      matchMaps.schema[SCHEMA].push(tableCompletion);

      const columns = schemaInfo[schema][table];
      columns.forEach((column) => {
        const columnCompletion = {
          name: schema + table + column.column_name,
          value: column.column_name,
          score: 0,
          meta: 'column',
          schema,
          table,
        };
        matchMaps.table[TABLE].push(columnCompletion);
        matchMaps.schemaTable[SCHEMA_TABLE].push(columnCompletion);
      });
    });
  });

  const tableWantedCompletions = schemaCompletions.concat(tableCompletions);

  const myCompleter = {
    getCompletions(editor, session, pos, prefix, callback) {
      // figure out if there are any schemas/tables referenced in query
      const allTokens = session
        .getValue()
        .split(/\s+/)
        .map((t) => t.toUpperCase());
      const relevantDottedMatches = {};
      Object.keys(matchMaps.schemaTable).forEach((schemaTable) => {
        if (allTokens.indexOf(schemaTable) >= 0) {
          relevantDottedMatches[schemaTable] = matchMaps.schemaTable[schemaTable];
          // HACK - also add relevant matches for table only
          const firstMatch = matchMaps.schemaTable[schemaTable][0];
          const table = firstMatch.table.toUpperCase();
          relevantDottedMatches[table] = matchMaps.table[table];
        }
      });
      Object.keys(matchMaps.table).forEach((table) => {
        if (allTokens.indexOf(table) >= 0) {
          relevantDottedMatches[table] = matchMaps.table[table];
          // HACK add schemaTable match for this table
          // we store schema at column match item, so look at first one and use that
          const firstMatch = matchMaps.table[table][0];
          const schemaTable = `${firstMatch.schema.toUpperCase()
          }.${
            firstMatch.table.toUpperCase()}`;
          relevantDottedMatches[schemaTable] = matchMaps.table[table];
        }
      });

      // complete for schema and tables already referenced, plus their columns
      let matches = [];
      Object.keys(relevantDottedMatches).forEach((key) => {
        matches = matches.concat(relevantDottedMatches[key]);
      });
      const schemas = {};
      const tables = {};
      const wantedColumnCompletions = [];
      matches.forEach((match) => {
        if (match.schema) schemas[match.schema] = match.schema;
        if (match.table) tables[match.table] = match.schema;
      });
      Object.keys(schemas).forEach((schema) => {
        wantedColumnCompletions.push({
          name: schema,
          value: schema,
          score: 0,
          meta: 'schema',
        });
      });
      Object.keys(tables).forEach((table) => {
        const tableCompletion = {
          name: table,
          value: table,
          score: 0,
          meta: 'table',
        };
        wantedColumnCompletions.push(tableCompletion);
        const SCHEMA = tables[table].toUpperCase();
        if (!relevantDottedMatches[SCHEMA]) relevantDottedMatches[SCHEMA] = [];
        relevantDottedMatches[SCHEMA].push(tableCompletion);
      });

      // get tokens leading up to the cursor to figure out context
      // depending on where we are we either want tables or we want columns
      const tableWantedKeywords = ['FROM', 'JOIN'];
      const columnWantedKeywords = ['SELECT', 'WHERE', 'GROUP', 'HAVING', 'ON'];

      // find out what is wanted
      // first look at the current line before cursor, then rest of lines beforehand
      let wanted = '';
      const currentRow = pos.row;
      // eslint-disable-next-line no-plusplus
      for (let r = currentRow; r >= 0; r--) {
        let line = session.getDocument().getLine(r);
        // if dealing with current row only use stuff before cursor
        if (r === currentRow) {
          line = line.slice(0, pos.column);
        }
        const lineTokens = line.split(/\s+/).map((t) => t.toUpperCase());

        // eslint-disable-next-line no-plusplus
        for (let i = lineTokens.length - 1; i >= 0; i--) {
          const token = lineTokens[i];
          if (columnWantedKeywords.indexOf(token) >= 0) {
            wanted = 'COLUMN';
            r = 0;
            break;
          }
          if (tableWantedKeywords.indexOf(token) >= 0) {
            wanted = 'TABLE';
            r = 0;
            break;
          }
        }
      }

      const currentLine = session.getDocument().getLine(pos.row);
      const currentTokens = currentLine
        .slice(0, pos.column)
        .split(/\s+/)
        .map((t) => t.toUpperCase());
      //   const precedingCharacter = currentLine.slice(pos.column - 1, pos.column);
      const precedingToken = currentTokens[currentTokens.length - 1];

      // if preceding token has a . try to provide completions based on that object
      if (precedingToken.indexOf('.') >= 0) {
        const dotTokens = precedingToken.split('.');
        dotTokens.pop();
        const DOT_MATCH = dotTokens.join('.').toUpperCase();
        if (wanted === 'TABLE') {
          // if we're in a table place, a completion should only be for tables, not columns
          return callback(null, matchMaps.schema[DOT_MATCH]);
        }
        if (wanted === 'COLUMN') {
          // here we should see show matches for only the tables mentioned in query
          return callback(null, relevantDottedMatches[DOT_MATCH]);
        }
      }

      // if we are not dealing with a . match show all relevant objects
      if (wanted === 'TABLE') {
        return callback(null, tableWantedCompletions);
      }
      if (wanted === 'COLUMN') {
        // TODO also include alias?
        return callback(null, matches.concat(wantedColumnCompletions));
      }
      // No keywords found? User probably wants some keywords
      callback(null, null);
    },
  };

  // ace.acequire(['ace/ext/language_tools'], (langTools) => {
  //   langTools.setCompleters([myCompleter]);
  // });
  return myCompleter;
}
