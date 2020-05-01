import { COOKIE_NAME, checkToken } from "../utils/token";
import { Context } from 'koa';

export async function authenticate (ctx:Context, next:() => Promise<any> ) {
    const token = ctx.cookies.get(COOKIE_NAME)
    const isValid = checkToken(token)
    if (isValid) {
        return next()
    } else {
        ctx.response.status = 401
    }
}