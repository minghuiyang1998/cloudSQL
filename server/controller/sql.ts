/* eslint-disable no-unused-vars */
// import enum database  connection package in here
import { Context } from 'koa';
import { StatusCode, StatusMsg } from '../constant/status';

export async function runSQL(ctx: Context) {
  const { body = {} } = ctx.request || {};
  const { sql = '', connection = {} } = body || {};
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: `sql${StatusMsg.SUCCESS}`,
  };
}

export async function connectDB(ctx: Context) {
  const { body: connection = {} } = ctx.request || {};
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: `test connection ${StatusMsg.SUCCESS}`,
  };
}

export async function getDrivers(ctx: Context) {
  const DB_TYPE_CONFIG = [
    {
      type: 'MySQL',
      list: ['host', 'port', 'account', 'password'],
    },
    {
      type: 'Postgre',
      list: ['host', 'port', 'database', 'account', 'password'],
    },
  ];
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: DB_TYPE_CONFIG,
  };
}
