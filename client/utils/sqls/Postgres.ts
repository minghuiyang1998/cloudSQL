import SQL from './SQL';

class Postgres extends SQL {
  static selectAll(tableName = '') {
    return `SELECT * FROM "${tableName}" LIMIT 20;`;
  }

  static selectColumn(tableName = '', columnName = '') {
    return `SELECT * FROM "${tableName}" WHERE "${columnName}" = `;
  }
}

export default Postgres;
