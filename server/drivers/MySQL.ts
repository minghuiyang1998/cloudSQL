import mysql from 'mysql';
import Driver from './Driver';
import { formatSchemaQueryResults } from '../utils/format';

const getSchemaSql = (database) => {
  const whereSql = database
    ? `WHERE t.table_schema = '${database}'`
    : `WHERE t.table_schema NOT IN (
        'mysql', 
        'performance_schema', 
        'information_schema'
      )`;
  return `
    SELECT 
      t.table_schema, 
      t.table_name, 
      c.column_name, 
      c.data_type
    FROM 
      INFORMATION_SCHEMA.TABLES t 
      JOIN INFORMATION_SCHEMA.COLUMNS c ON t.table_schema = c.table_schema AND t.table_name = c.table_name 
    ${whereSql}
    ORDER BY 
      t.table_schema, 
      t.table_name, 
      c.ordinal_position
  `;
};

class MySQL extends Driver {
  static get meta() {
    return {
      type: 'MySQL',
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
    const { database = '' } = connection || {};
    const schemaSql = getSchemaSql(database);
    const rows = await this.runSQL(schemaSql, connection);
    console.log("MySQL -> staticgetSchema -> rows", rows)
    // const formatedResult = formatSchemaQueryResults(rows);
    return rows;
  };
}

export default MySQL;
