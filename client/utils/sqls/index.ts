export function selectAll(tableName = '') {
  return `SELECT * FROM \`${tableName}\` LIMIT 20;`;
}

export function selectColumn(tableName = '', columnName = '') {
  return `SELECT * FROM \`${tableName}\` WHERE \`${columnName}\` = `;
}