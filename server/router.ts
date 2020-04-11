module.exports = (app) => {
    const {
      router,
      controller,
    }: {
      router: any;
      controller: any;
    } = app;

    router.get('/a', async ctx => {
      await app.render(ctx.req, ctx.res, '/b', ctx.query)
      ctx.respond = false
    })

    router.get('/b', async ctx => {
      await app.render(ctx.req, ctx.res, '/a', ctx.query)
      ctx.respond = false
    })
}