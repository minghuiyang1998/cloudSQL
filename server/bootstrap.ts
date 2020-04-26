import router from './router';
import { mysqlSession } from './utils/connectDB';
import { authenticate } from './utils/authenticate';
import json from 'koa-json';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import Koa from 'koa';
import session from 'koa-session-minimal';

const app = new Koa();

app.use(koaBody());
app.use(json());
app.use(logger());

// TODO: connect database & database related and
// other request operation write in service dir/
// create table and key directely don't code a database here
// and this database can be used to test the program

// TODO: authority check
// 存放sessionId的cookie配置
const cookie = {
  maxAge: 604800, // cookie有效时长
  overwrite: true, // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
};

app.use(
  session({
    key: 'SESSION_ID',
    store: mysqlSession,
    cookie,
  })
);

app.use(async ctx => {
  // 读取session信息
  authenticate(ctx);
});

// TODO: inject router
app.use(router.routes());

// TODO: start server
app.listen(3000);

module.exports = app;
