import mysql from 'mysql2';
import { config } from '../constant/db';

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

export const query = (sql, values = 0) => new Promise<result>((resolve, reject) => {
  pool.getConnection((err, connection) => {
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
