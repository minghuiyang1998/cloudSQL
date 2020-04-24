import router from './router';
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');



app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  sameSite: null,
};

app.use(session(CONFIG, app));
app.use(ctx => {
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = `${n } views`;
});


app.use(router.routes());
app.listen(3000);

module.exports = app;