/* eslint-disable no-unused-vars */
import { Context } from 'koa';

export class Model {
    ctx: Context;

    constructor(ctx: Context) {
      this.ctx = ctx;
    }
}
