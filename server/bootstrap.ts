import 'reflect-metadata';
import json from 'koa-json';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import router from './router'
import { mysql } from './utils/mysql';
import { authenticate } from './utils/authenticate';
import { initModel } from './models';
import { User } from './entities/User';

async function init () {
  const connection = await mysql()
  const user = connection.getRepository(User)
  console.log("init -> user", user)
  const app = new Koa();
  app.use(async ctx => {
    authenticate(ctx);
  });

  app.use( ctx => ctx.connection = connection )
  app.use( ctx => initModel(ctx))

  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);
}

init()