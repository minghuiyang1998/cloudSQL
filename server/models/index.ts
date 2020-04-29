import { UserModel } from './users'
import { Context } from 'koa'

const models = [
    {
        name:"user",
        model: UserModel
    }
]

export function initModel(ctx: Context){
    models.forEach((m) => {
        const { name = '', model = null } = m || {}
        ctx.models[name] = new model(ctx) 
    })
}