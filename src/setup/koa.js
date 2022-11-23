const Koa = require('koa');
const util = require('node:util');
const childProcess = require('node:child_process');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const moment = require('moment');
const { webhookMiddleware } = require('../middleware');
const { log } = require('../helpers');

const app = new Koa();
const exec = util.promisify(childProcess.exec);
let isUpdating = false;

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(bodyParser());
app.use(webhookMiddleware);

app.on('repository-updated', async () => {
  if (isUpdating) {
    log('CONTAINERS UPDATING ALREADY');
  } else {
    isUpdating = true;

    log('CONTAINERS UPDATE STARTED');

    const updateStart = moment();
    const restartDirPath = path.resolve(__dirname, '../../docker');
    const restartFilePath = path.resolve(restartDirPath, 'restart-docker-compose.sh');

    exec(`bash "${restartFilePath}"`, { cwd: restartDirPath })
      .then(() => {
        const buildDuration = moment.duration(moment() - updateStart).asMinutes();
        const buildDurationText = `${buildDuration.toFixed(2)} min`;

        log('CONTAINERS UPDATED', buildDurationText);
      })
      .catch((err) => {
        log('CONTAINERS UPDATE ERROR', err.message, true);
      })
      .finally(() => {
        isUpdating = false;
      });
  }
});

app.use(async (ctx, next) => {
  const commitMessage = ctx.request.body?.head_commit?.message;

  if (!commitMessage?.includes('[skip-build]'))
    ctx.app.emit('repository-updated');

  ctx.body = { result: true };

  await next();
});

app.on('error', (err) => {
  log('ERROR', err.message || 'unknown error', true);
});

module.exports = app;
