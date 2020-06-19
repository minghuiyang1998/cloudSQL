/* eslint-disable consistent-return */
// import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';

export function updateCompletions(schemaInfo, isNoSQL = false) {
  if (!schemaInfo) {
    return;
  }
  const tableCompletions = {};
  const columnCompletions = {};
  Object.keys(schemaInfo).forEach((table) => {
    tableCompletions[table] = 1;
    const columns = schemaInfo[table] || [];
    columns.forEach((column) => {
      const { column_name: colName = '' } = column || {};
      columnCompletions[colName] = 1;
    });
  });

  const myCompleter = {
    getCompletions(editor, session, pos, prefix, callback) {
      // figure out if there are any schemas/tables referenced in query
      const tablesKeys = Object.keys(schemaInfo);
      let columnsKeys = [];
      tablesKeys.forEach((k) => {
        const cols = schemaInfo[k] || [];
        const _keys = cols.map((c) => c.column_name);
        columnsKeys = [...columnsKeys, ..._keys];
      });
      // 当前行存在table就把对应column value提高, 存在column就把tablevalue提高
      const allTokens = session
        .getValue()
        .split(/\s+/)
        .map((t) => t.toUpperCase());
      const currTable = [];
      tablesKeys.forEach((t) => {
        if (allTokens.indexOf(t) >= 0) {
          currTable.push(t);
        }
      });
      currTable.forEach((i) => {
        const cols = schemaInfo[i] || [];
        const colkeys = cols.map((c) => c.column_name);
        colkeys.forEach((k) => {
          columnCompletions[k] += 2;
        });
      });
      const currCol = [];
      columnsKeys.forEach((c) => {
        if (allTokens.indexOf(c) >= 0) {
          currCol.push(c);
        }
      });
      currCol.forEach((i) => {
        Object.keys(schemaInfo).forEach((table) => {
          const columns = schemaInfo[table] || [];
          columns.forEach((column) => {
            const { column_name: colName = '', table_name: tableName = '' } = column || {};
            if (colName === i) {
              tableCompletions[tableName] += 2;
            }
          });
        });
      });

      if (!isNoSQL) {
        // 查找前一个词来判断，当没有column时，为noSQL，此时仅采用way1
        let wanted = '';
        const tableWantedKeywords = ['FROM', 'JOIN'];
        const columnWantedKeywords = ['SELECT', 'WHERE', 'GROUP', 'HAVING', 'ON'];
        // find out what is wanted // first look at the current line before cursor, then rest of lines beforehand
        const currentRow = pos.row;
        let line = session.getDocument().getLine(currentRow);
        line = line.slice(0, pos.column);
        const lineTokens = line.split(/\s+/).map((t) => t.toUpperCase());
        // eslint-disable-next-line no-plusplus
        for (let i = lineTokens.length - 1; i >= 0; i--) {
          const token = lineTokens[i];
          if (columnWantedKeywords.indexOf(token) >= 0) {
            wanted = 'COLUMN';
            break;
          }
          if (tableWantedKeywords.indexOf(token) >= 0) {
            wanted = 'TABLE';
            break;
          }
        }

        if (wanted === 'TABLE') {
          Object.keys(tableCompletions).forEach((t) => {
            tableCompletions[t] += 1;
          });
        }

        if (wanted === 'COLUMN') {
          Object.keys(columnCompletions).forEach((c) => {
            columnCompletions[c] += 1;
          });
        }
      }

      const wantedCompletions = [];
      Object.keys(tableCompletions).forEach((t) => {
        const _temp = {
          name: t,
          value: t,
          caption: t,
          meta: 'table',
          type: 'table',
          score: tableCompletions[t],
        };
        wantedCompletions.push(_temp);
      });
      Object.keys(columnCompletions).forEach((c) => {
        const _temp = {
          name: c,
          value: c,
          caption: c,
          meta: 'column',
          type: 'column',
          score: columnCompletions[c],
        };
        wantedCompletions.push(_temp);
      });

      callback(null, wantedCompletions);
    },
  };

  // ace.acequire(['ace/ext/language_tools'], (langTools) => {
  //   langTools.setCompleters([myCompleter]);
  // });
  return myCompleter;
}
