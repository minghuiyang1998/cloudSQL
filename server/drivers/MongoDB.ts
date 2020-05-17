import { MongoClient } from 'mongodb';
import Driver from './Driver';

class MongoDB extends Driver {
  static get meta() {
    return {
      type: 'MongoDB',
      config: [
        {
          key: 'host',
          formType: 'TEXT',
          label: 'Host/Server/IP Address',
        },
        {
          key: 'port',
          formType: 'TEXT',
          label: 'Port (optional)',
        },
        {
          key: 'user',
          formType: 'TEXT',
          label: 'Database Username',
        },
        {
          key: 'password',
          formType: 'PASSWORD',
          label: 'Database Password',
        },
      ],
    };
  }

  static testConnection = async (dbConfig) => {
    const {
      host = '',
      port = 27017,
      user = '',
      password = '',
    } = dbConfig || {};
    const url = `mongodb://${user}:${password}@${host}:${port}`;
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, async (mainError, client) => {
        if (mainError || !client) {
          if (client) client.close();
          reject(mainError);
        }
        resolve();
      });
    });
  }

    getmethodArray = () => {

    }

  proceedExecutingQuery = () => {

  }

  NoSqltransfer = (sql = '') => {
    // db.system.users.find({ "pageamount": 6, "page": 0 }).limit(20);
    if (!sql) return {};
    let _sql = sql;
    let max = null;
    if (_sql.includes('limit')) {
      (function getLimit() {
        const lastIndex = _sql.lastIndexOf('.');
        const last = _sql.slice(lastIndex + 1);
        const _s = /^limit\((.+)\)/.exec(last)[1] || '';
        console.log('MongoDB -> getLimit -> _s', _s);
        max = Number(_s);
        _sql = _sql.slice(0, lastIndex);
      }());
    }

    let func = '';
    let obj = {};
    (function getFunc() {
      const lastIndex = _sql.lastIndexOf('.');
      const last = _sql.slice(lastIndex + 1);
      const lastBracket = last.lastIndexOf(')');
      const firstBracket = last.indexOf('(');
      func = last.slice(0, firstBracket);
      const objStr = last.slice(firstBracket + 1, lastBracket).trim();
      try {
        obj = JSON.parse(objStr);
      } catch (error) {
        obj = {};
      }
      _sql = _sql.slice(0, lastIndex);
    }());

    let collection = '';
    (function getCollection() {
      const firstDot = _sql.indexOf('.');
      if (firstDot === -1) return;
      collection = _sql.slice(firstDot + 1);
    }());

    return {
      collection,
      func,
      obj,
      max,
    };
  }

  static runSQL = async (sql, dbConfig) => {
    // console.log('MySQL -> staticrunSQL -> sql, dbConfig', sql, dbConfig);
    const {
      host = '',
      port = 21017,
      user = '',
      password = '',
      database = '',
    } = dbConfig || {};
    const {
      collection = '',
      func = '',
      obj = {},
      max = 1000,
    } = this.NoSqltransfer(sql);
    let url = `mongodb://${user}:${password}@${host}:${port}`;
    if (database) {
      url = `${url}/${database}`;
    }

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (error, db) => {
        const _collection = db.collection(collection);
        if (error) {
          reject(error);
          db.close();
        }
        _collection[func](obj, (err, result) => {
          const { rows = [] } = result || {};
          if (err) {
            reject(err);
          } else {
            resolve(rows.slice(0, max + 1));
          }
          db.close();
        });
      });
    });
  };

  static getSchema = async (connection) => {
    const {
      host = '',
      port = 27017,
      user = '',
      password = '',
    } = connection || {};
    const url = `mongodb://${user}:${password}@${host}:${port}`;
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, async (mainError, client) => {
        if (mainError || !client) {
          if (client) client.close();
          reject(mainError);
        }
        // nskins
        const { databases = [] } = await client.db().admin().listDatabases();
        const prolist = databases.map((i) => {
          const { name = '' } = i || {};
          return new Promise((res, rej) => {
            client.db(name).listCollections().toArray((err, collections) => {
              const _collection = {};
              collections.forEach((e) => { _collection[e.name] = []; });
              if (err) rej(err);
              res({ [name]: _collection });
            });
          });
        });
        const result = await Promise.all(prolist);
        let obj = {};
        result.forEach((e) => {
          obj = {
            ...obj,
            ...e,
          };
        });
        resolve(obj);
      });
    });
  }
}

export default MongoDB;
