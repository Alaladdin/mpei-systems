const Koa = require('koa');
const bodyParser = require('koa-body-parser');
const helmet = require('koa-helmet');
const { webhookMiddleware } = require('../middleware');
const router = require('../router');

const app = new Koa();

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(bodyParser());
app.use(webhookMiddleware);
app.use(router.routes());

app.on('error', (err) => {
  console.error('[SERVER ERROR]', err);
});

module.exports = app;
