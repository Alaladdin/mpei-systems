const Koa = require('koa');
const util = require('node:util');
const childProcess = require('node:child_process');
const helmet = require('koa-helmet');
const bodyParser = require('koa-body-parser');
const path = require('path');
const moment = require('moment');
const { webhookMiddleware } = require('../middleware');
const { log } = require('../helpers');

const app = new Koa();
const exec = util.promisify(childProcess.exec);

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(bodyParser());
app.use(webhookMiddleware);

app.on('repository-updated', async () => {
  log('REPO UPDATE STARTED');

  const updateStart = moment();
  const restartDirPath = path.resolve(__dirname, '../../docker');
  const restartFilePath = path.resolve(restartDirPath, 'restart-docker-compose.sh');

  exec(`bash "${restartFilePath}"`, { cwd: restartDirPath })
    .then(() => {
      const buildDuration = moment.duration(moment() - updateStart).asMinutes();
      const buildDurationText = `${buildDuration.toFixed(2)} min`;

      log('REPOS REBUILDED', buildDurationText);
    })
    .catch((err) => {
      log('REPOS REBUILD ERROR', err, true);
    });
});

app.use(async (ctx, next) => {
  const commitMessage = JSON.parse(ctx.request.body?.payload)?.head_commit?.message;

  log('commitMessage', commitMessage);

  // if (!commitMessage.includes('[skip-build]'))
  //   ctx.app.emit('repository-updated');

  ctx.body = { result: true };

  await next();
});

app.on('error', (err) => {
  log('SERVER ERROR', err, false);
});

module.exports = app;
