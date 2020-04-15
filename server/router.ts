const Router = require('koa-router');
const router = new Router();

router.get('/a', async ctx => {
  ctx.respond = false
})

router.get('/b', async ctx => {
  ctx.respond = false
})

export default router

