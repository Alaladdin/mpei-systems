const Router = require('koa-router');

const router = new Router();

router.post('/webhook', async (ctx, next) => {
  await next();

  ctx.app.emit('repository-updated');

  ctx.body = { result: true };
});

module.exports = router;
