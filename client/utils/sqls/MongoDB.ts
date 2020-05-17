import SQL from './SQL';

class MongoDB extends SQL {
  static selectAll(tableName = '') {
    return `db.${tableName}.find().limit(20);`;
  }

  static selectColumn() {
    return '';
  }
}

export default MongoDB;
