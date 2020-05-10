import mysql from 'mysql';
import Driver from './Driver';
import { formatSchemaQueryResults } from '../utils/format';

class Postgres extends Driver {
  static get meta() {
    return {
      type: 'Postgres',
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
          key: 'database',
          formType: 'TEXT',
          label: 'Database',
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
    const sql = 'SELECT \'success\' AS TestQuery;';
    return this.runSQL(sql, dbConfig);
  }

  static runSQL = async (sql, dbConfig) => {
    const {
      host = '',
      port = 3306,
      user = '',
      password = '',
      database = '',
    } = dbConfig || {};

    const connectConfig = {
      host,
      port,
      user,
      password,
      database,
      timezone: 'Z',
      supportBigNumbers: true,
    };

    const connection = mysql.createConnection(connectConfig);
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        connection.release();
      });
    });
  };

  static getSchema = async (connection) => {
    const schemaSql = '';
    const rows = await this.runSQL(schemaSql, connection);
    const formatedResult = formatSchemaQueryResults(rows);
    return formatedResult;
  };
}

export default Postgres;