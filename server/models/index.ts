import { UserModel } from './users'
import { Context } from 'koa'

const models = [
    {
        name:"user",
        model: UserModel
    }
]

export async function initModel(ctx: Context){
    console.log('111')
    models.forEach((m) => {
        const { name = '', model = null } = m || {}
        ctx.models[name] = new model(ctx) 
    })
    console.log(ctx.models)
}