import 'reflect-metadata';
import json from 'koa-json';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import router from './router'
import { mysql } from './utils/mysql';
import { initModel } from './models';

async function init () {
  const connection = await mysql()
  const app = new Koa();
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    ctx.connection = connection
    return next()
  })
  app.use(async (ctx, next) => initModel(ctx, next))
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);
}

init()