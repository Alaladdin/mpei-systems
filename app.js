const childProcess = require('node:child_process');
const util = require('node:util');
const path = require('path');
const { port } = require('./config');
const app = require('./src/setup/koa');

const exec = util.promisify(childProcess.exec);

app.on('repository-updated', async () => {
  const dirPath = path.resolve(__dirname, 'docker');
  const filePath = path.resolve(dirPath, 'restart-docker-compose.sh');

  exec(filePath, { cwd: dirPath })
    .then(() => {
      const now = new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' });

      console.info('[REPO UPDATED]:', now);
    })
    .catch((err) => {
      console.error('[REPO UPDATE ERROR]:', err);
    });
});

app.listen(port);
