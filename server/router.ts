const Router = require('koa-router');
const router = new Router();

/**
 * @name authentication
 */
router.post('/xauth/login', function (ctx, next) {
  return passport.authenticate('local', function (err, user, info, status) {
    if (user) {
      ctx.body = 'Y';
      return ctx.login(user);
    } else {
      ctx.body = info;
    }
  })(ctx, next);
});

/**
* 认证登出
*/
router.get('/xauth/logout', function (ctx, next) {
  ctx.logout();
  ctx.body = 'Y';
});

// 以下为自定义需要身份认证的路由
router.post('/xauth/test', function (ctx, next) {
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

