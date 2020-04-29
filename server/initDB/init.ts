import { config } from '../constant/db';
import mysql from 'mysql2';
const { database = '', host = '', user = '', password = '', dialect = '', port = 0, charset = '' } = config;

// mysql origin used to initDB
type result = { serverStatus: number };
export const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  connectionLimit: 10,
});

export const query = function (sql, values = 0) {
  return new Promise<result>((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          // console.log("query -> err, rows",sql, values, err, rows)
          // TODO: output incorrect
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
