import 'reflect-metadata';
import json from 'koa-json';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import router from './router'
import { mysql } from './utils/mysql';
import { authenticate } from './middleware/authenticate';
import { initModel } from './models';

async function init () {
  const connection = await mysql()
  const app = new Koa();
  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(authenticate);
  app.use(async ctx => {
    ctx.connection = connection
  })
  app.use(async ctx => initModel(ctx))
  
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);
}

init()