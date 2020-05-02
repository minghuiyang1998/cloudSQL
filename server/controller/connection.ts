import { Context } from 'koa';
import { v4 } from 'uuid';

export async function createConnection(ctx:Context) {
    const { body: connection = {} } = ctx.request || {};
    const { uuid = '' } = ctx.user || {}
    const _connection = {
        cid: v4(),
        ...connection,
    }
    const newHistory = await ctx.models.history.historyCreate(uuid, _connection)
    // error也200返回表示
    ctx.body = newHistory
}

export async function modifyConnectionInfos(ctx:Context) {
    const { params = {}, body: connection = {} } = ctx.request || {}
    const { cid = '' } = params || {};
    const { uuid = '' } = ctx.user || {}
    const newHistory = await ctx.models.history.historyUpdate(uuid, cid, connection)
    ctx.body = newHistory
}

export async function deleteConnection(ctx:Context) {
    const { params = {} } = ctx.request || {}
    const { cid = '' } = params || {};
    const { uuid = '' } = ctx.user || {}
    const newHistory = await ctx.models.history.historyDelete(uuid, cid)
    ctx.body = newHistory
}
