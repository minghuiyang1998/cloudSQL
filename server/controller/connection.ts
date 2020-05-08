/* eslint-disable no-unused-vars */
import { Context } from 'koa';
import { v4 } from 'uuid';
import { StatusCode, StatusMsg } from '../constant/status';

export async function createConnection(ctx:Context) {
  const { body: connection = {} } = ctx.request || {};
  const { uuid = '' } = ctx.user || {};
  const _connection = {
    cid: v4(),
    ...connection,
  };
  const newHistory = await ctx.models.history.connectionCreate(uuid, _connection);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: newHistory,
  };
}

export async function modifyConnectionInfos(ctx:Context) {
  const { params = {}, body: connection = {} } = ctx.request || {};
  const { cid = '' } = params || {};
  const { uuid = '' } = ctx.user || {};
  const newHistory = await ctx.models.history.connectionUpdate(uuid, cid, connection);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: newHistory,
  };
}

export async function deleteConnection(ctx:Context) {
  const { params = {} } = ctx.request || {};
  const { cid = '' } = params || {};
  const { uuid = '' } = ctx.user || {};
  const newHistory = await ctx.models.history.connectionDelete(uuid, cid);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: newHistory,
  };
}

export async function getHistory(ctx:Context) {
  const { uuid = '' } = ctx.user || {};
  const history = await ctx.models.history.historyGetByUser(uuid);
  ctx.body = {
    code: StatusCode.SUCCESS,
    msg: StatusMsg.SUCCESS,
    data: history,
  };
}
