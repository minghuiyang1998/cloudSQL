/* eslint-disable no-unused-vars */
// import enum database  connection package in here
import { Context } from 'koa';
import { StatusCode, StatusMsg } from '../constant/status';
import { driversConfig, drivers } from '../drivers';

export async function getSchemaInfos(ctx: Context) {
  const { body: connection = {} } = ctx.request || {};
  const { type = '' } = connection;
  const driver = driversConfig[type] || null;

  if (!driver) {
    ctx.body = {
      code: StatusCode.DB_INVALID,
      msg: 'database is not supported',
    };
    return;
  }

  try {
    const result = await driver.getSchema(connection);
    ctx.body = {
      code: StatusCode.SUCCESS,
      msg: StatusMsg.SUCCESS,
      data: result,
    };
  } catch (e) {
    ctx.body = {
      code: StatusCode.DB_ERROR,
      msg: e,
    };
  }
}

export async function runSQL(ctx: Context) {
  const { body = {} } = ctx.request || {};
  const { sql = '', connection = {} } = body || {};
  const { type = '' } = connection;
  const driver = driversConfig[type] || null;

  if (!driver) {
    ctx.body = {
      code: StatusCode.IDB_INVALID,
      msg: 'database is not supported',
    };
    return;
  }

  try {
    const result = await driver.runSQL(sql, connection);
    ctx.body = {
      code: StatusCode.SUCCESS,
      msg: `sql${StatusMsg.SUCCESS}`,
      data: result,
    };
  } catch (e) {
    ctx.body = {
      code: StatusCode.DB_ERROR,
      msg: `test connection fail, ${e}`,
    };
  }
}

export async function connectDB(ctx: Context) {
  const { body: connection = {} } = ctx.request || {};
  const { type = '' } = connection;
  const driver = driversConfig[type] || null;

  if (!driver) {
    ctx.body = {
      code: StatusCode.DB_INVALID,
      msg: 'database is not supported',
    };
    return;
  }

  try {
    const result = await driver.testConnection(connection);
    ctx.body = {
      code: StatusCode.SUCCESS,
      msg: `test connection ${StatusMsg.SUCCESS}`,
    };
  } catch (e) {
    ctx.body = {
      code: StatusCode.DB_ERROR,
      msg: `test connection fail, ${e}`,
    };
  }
}

export async function getDrivers(ctx: Context) {
  const all = drivers();
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: all,
  };
}
