import router from './router';
import { authenticate } from './utils/authenticate';
import json from 'koa-json';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import Koa from 'koa';

const app = new Koa();

app.use(koaBody());
app.use(json());
app.use(logger());

// TODO: connect database & database related and
// other request operation write in service dir/
// create table and key directely don't code a database here
// and this database can be used to test the program

// TODO: authority check
app.use(async ctx => {
  // 读取session信息
  authenticate(ctx);
});

// TODO: inject router
app.use(router.routes());

// TODO: start server
app.listen(3000);

module.exports = app;
