import pg from 'pg';
import Driver from './Driver';
import { formatSchemaQueryResults } from '../utils/format';

const SCHEMA_SQL = `
  select 
    ns.nspname as table_schema, 
    cls.relname as table_name, 
    attr.attname as column_name,
    trim(leading '_' from tp.typname) as data_type,
    pg_catalog.col_description(attr.attrelid, attr.attnum) as column_description
  from 
    pg_catalog.pg_attribute as attr
    join pg_catalog.pg_class as cls on cls.oid = attr.attrelid
    join pg_catalog.pg_namespace as ns on ns.oid = cls.relnamespace
    join pg_catalog.pg_type as tp on tp.typelem = attr.atttypid
  where 
    cls.relkind in ('r', 'v', 'm')
    and ns.nspname not in ('pg_catalog', 'pg_toast', 'information_schema')
    and not attr.attisdropped 
    and attr.attnum > 0
  order by 
    ns.nspname,
    cls.relname,
    attr.attnum
`;

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
    };
    const client = new pg.Client(connectConfig);
    return new Promise((resolve, reject) => {
      client.connect((error) => {
        if (error) {
          reject(error);
          client.end();
        }
        client.query(sql, (err, result) => {
          const { rows = [] } = result || {};
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          client.end();
        });
      });
    });
  };

  static getSchema = async (connection) => {
    const rows = await this.runSQL(SCHEMA_SQL, connection);
    const formatedResult = formatSchemaQueryResults(rows);
    return formatedResult;
  };
}

export default Postgres;
