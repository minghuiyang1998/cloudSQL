import { config } from '../constant/db';
const MysqlSession = require('koa-mysql-session');
const mysql = require('mysql');

export const mysqlSession = new MysqlSession(config);

type result = { serverStatus: string };
const pool = mysql.createPool(config);
export const query = function (sql, values = 0) {
  return new Promise<result>((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
