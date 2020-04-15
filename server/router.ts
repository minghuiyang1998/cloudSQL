const Router = require('koa-router');
const router = new Router();

router.get('/a', async ctx => {
  ctx.body = 'a'
})

router.get('/b', async ctx => {
  ctx.body = 'b'
})

export default router

