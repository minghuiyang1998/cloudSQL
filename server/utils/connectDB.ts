import { config } from '../constant/db';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

// session
const {
  database = '', 
  host = '', 
  user = '', 
  password = '', 
  dialect = '', 
  port = 0, 
  charset = ''
} = config

const connection = mysql.createConnection({
  host,
  port,
  user,
  password,
  database,
})

type result = { serverStatus: Number };
// 执行sql脚本对数据库进行读写 
// export const query = function (sql, values = 0) {
//   connection.query(sql,  (error, results, fields) => {
//     if (error) throw error
//     // connection.release() 
//   });
// }

// // mysql
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
          //TODO: output incorrect
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

// sequenlize
// const url = `${dialect}://${user}:${password}@${host}:${port}/${database}`
// export const sequelizeDB = new Sequelize(url,{
//     define:{
//         // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
//         timestamps: false
//     },
//     timezone: '+08:00' // 时差区，国内需要加入不然存储的时间会有时差
// })

