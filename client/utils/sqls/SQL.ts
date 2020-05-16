class SQL {
  static selectAll() {
    throw new Error('testConnection() method must be overriden');
  }

  static selectColumn() {
    throw new Error('getSchema() method must be overriden');
  }
}

export default SQL;
