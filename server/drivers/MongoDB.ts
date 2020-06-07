import { MongoClient } from 'mongodb';
import Driver from './Driver';

const NoSqltransfer = (sql = '') => {
  // db.system.users.find({ "pageamount": 6, "page": 0 }).limit(20);
  if (!sql) return {};
  let _sql = sql;
  let max = null;
  if (_sql.includes('limit')) {
    (function getLimit() {
      const lastIndex = _sql.lastIndexOf('.');
      const last = _sql.slice(lastIndex + 1);
      const _s = /^limit\((.+)\)/.exec(last)[1] || '';
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
};

const connectClient = async (dbConfig) => {
  const {
    host = '',
    port = 27017,
    user = '',
    password = '',
  } = dbConfig || {};
  const url = `mongodb://${user}:${password}@${host}:${port}`;
  return new Promise((resolve) => {
    MongoClient.connect(url, async (mainError, client) => {
      if (mainError || !client) {
        if (client) client.close();
        throw new Error(mainError);
      }
      resolve(client);
    });
  });
};

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

  static testConnection = async (dbConfig) => connectClient(dbConfig)

  static runSQL = async (sql, dbConfig) => {
    // console.log('MySQL -> staticrunSQL -> sql, dbConfig', sql, dbConfig);
    const { database = '' } = dbConfig || {};
    const {
      collection = '',
      func = '',
      obj = {},
      max = 1000,
    } = NoSqltransfer(sql);
    // console.log(collection, '1', func, '2', typeof obj, max);

    const client = await connectClient(dbConfig);
    const db = await client.db(database);
    if (func === 'createCollection') {
      return new Promise((resolve, reject) => {
        db.createCollection(obj, (err, result) => {
          if (err) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject([{ msg: 'fails' }]);
          }
          resolve([{ msg: 'ok' }]);
          client.close();
        });
      });
    }

    const _collection = db.collection(collection);
    return new Promise((resolve, reject) => {
      _collection[func](obj, (err, result) => {
        try {
          result.toArray((error, rows) => {
            if (error) {
              reject(error);
            } else {
              let _sliced = rows;
              if (max) {
                _sliced = rows.slice(0, max + 1);
              }
              resolve(_sliced);
            }
          });
        } catch (error) {
          resolve(result);
        }
        client.close();
      });
    });
  };


  // eslint-disable-next-line arrow-body-style
  static getSchema = async (connection) => {
    const client = await connectClient(connection);
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
    return obj;
  }
}

export default MongoDB;
