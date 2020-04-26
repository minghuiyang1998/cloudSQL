import Router from 'koa-router';
const router = new Router();

/**
 * @name authentication
 */
router.post('/signup', function (ctx, next) {
  ctx.session = {
    user_id: Math.random().toString(36).substr(2),
    count: 0
  };
});

/**
* 认证登出
*/
router.get('/logout', function (ctx, next) {
  ctx.logout();
  ctx.body = 'Y';
});

// 以下为自定义需要身份认证的路由
router.post('/test', function (ctx, next) {
  if (ctx.isAuthenticated()) {
    ctx.body = '认证通过';
  } else {
    ctx.throw(401);
    ctx.body = '非法访问';
  }
});

router.get('/a', async ctx => {
  ctx.body = 'a';
});

router.get('/b', async ctx => {
  ctx.body = 'b';
});

export default router;

