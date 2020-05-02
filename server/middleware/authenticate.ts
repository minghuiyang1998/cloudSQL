import { COOKIE_NAME, checkToken } from "../utils/token";
import { Context } from 'koa';

export async function authenticate (ctx:Context, next:() => Promise<any> ) {
    const token = ctx.cookies.get(COOKIE_NAME)
    const { username = '', uuid = ''} = checkToken(token)
    if (username && uuid) {
        ctx.user = {
            username,
            uuid
        }
        return next()
    } else {
        ctx.response.status = 401
    }
}