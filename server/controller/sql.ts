// import enum database  connection package in here
import { Context } from 'koa';

export async function runSQL(ctx: Context) {
    const { body = {} } = ctx.request || {}
    const  { sql = '', connection = {} } = body || {}
}

export async function connectDB(ctx: Context) {
    const { body: connection = {} } = ctx.request || {}
}