const logger = require('koa-logger')
const Koa = require('koa')
const app = new Koa();
app.use(logger());
app.use(async ctx => {
    ctx.model = {}
    console.log(ctx.model)
})
app.listen(3000);
