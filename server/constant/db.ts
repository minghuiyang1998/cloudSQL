import path from 'path'

export const config = {
  database: 'cloud_sql',
  host: 'cdb-f89gq5r8.cd.tencentcdb.com',
  port: 10032,
  user: 'root',
  password: 'cuihuiynh4545rl',
  dialect: 'mysql',
  charset:'utf8',
};

export const mysqlConfig = {
  "name": "default",
  "type": "mysql",
  "host": "cdb-f89gq5r8.cd.tencentcdb.com",
  "port": 10032,
  "username": "root",
  "password": "cuihuiynh4545rl",
  "database": "cloud_sql",
  "schema": "",
  "synchronize": false,
  "entities": [path.resolve(__dirname, "/entities/*.ts")]
}