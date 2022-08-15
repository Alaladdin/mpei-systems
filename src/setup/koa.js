const Koa = require('koa');
const util = require('node:util');
const childProcess = require('node:child_process');
const helmet = require('koa-helmet');
const bodyParser = require('koa-body-parser');
const path = require('path');
const { webhookMiddleware } = require('../middleware');
const { log } = require('../helpers');

const app = new Koa();
const exec = util.promisify(childProcess.exec);

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(bodyParser());
app.use(webhookMiddleware);

app.on('repository-updated', async () => {
  log('REPO UPDATE STARTED');

  const restartDirPath = path.resolve(__dirname, '../../docker');
  const restartFilePath = path.resolve(restartDirPath, 'restart-docker-compose.sh');

  exec(`bash "${restartFilePath}"`, { cwd: restartDirPath })
    .then(() => {
      log('REPO UPDATED');
    })
    .catch((err) => {
      log(`REPO UPDATE ERROR${err}`);
    });
});

app.use(async (ctx, next) => {
  ctx.app.emit('repository-updated');
  ctx.body = { result: true };

  await next();
});

app.on('error', (err) => {
  log('SERVER ERROR', err);
});

module.exports = app;
