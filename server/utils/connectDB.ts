import { config } from '../constant/db';
import { Sequelize } from 'sequelize';
import MysqlSession from 'koa-mysql-session';
import mysql from 'mysql';

// session
export const mysqlSession = new MysqlSession(config);

// mysql
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

// sequenlize
const {database = '', host = '', user = '', password = '', dialect = '', port = 0} = config
const url = `${dialect}://${user}:${password}@${host}:${port}/${database}`
export const sequelize = new Sequelize(url,{
    define:{
        // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
        timestamps: false
    },
    timezone: '+08:00' // 时差区，国内需要加入不然存储的时间会有时差
})

