class Driver {
  static get meta() {
    throw new Error('meta information must be overridden.');
  }

  static testConnection() {
    throw new Error('testConnection() method must be overriden');
  }

  static getSchema() {
    throw new Error('getSchema() method must be overriden');
  }

  static runSQL() {
    throw new Error('runSQL() method must be overriden');
  }
}

export default Driver;
