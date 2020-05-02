import { Context } from 'koa'
import { HistoryModel } from './history'
import { UserModel } from './user'

const models = [
    {
        name:"user",
        model: UserModel
    },
    {
        name:"history",
        model: HistoryModel
    },
]

export async function initModel(ctx: Context, next: () => {}){
    ctx.models = {}
    models.forEach((m) => {
        const { name = '', model = null } = m || {}
        ctx.models[name] = new model(ctx) 
    })
    // console.log(ctx.models)
    return next()
}