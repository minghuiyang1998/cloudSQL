export const authenticate = ctx => {
  ctx.session.count = ctx.session.count + 1;
};