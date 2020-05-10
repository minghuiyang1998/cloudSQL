// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
import { HistoryModel } from './history';
import { UserModel } from './user';

const models = [
  {
    name: 'user',
    Model: UserModel,
  },
  {
    name: 'history',
    Model: HistoryModel,
  },
];

export async function initModel(ctx: Context, next: () => {}) {
  ctx.models = {};
  models.forEach((m) => {
    const { name = '', Model = null } = m || {};
    ctx.models[name] = new Model(ctx);
  });
  // console.log(ctx.models)
  return next();
}
