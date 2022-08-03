const { host, port, githubWebhooks } = require('./config');
const app = require('./src/setup/koa');

if (!githubWebhooks.secrets.length) {
  console.error('No one webhook secret found');
  process.exit();
}

app.listen(port, host, () => {
  console.info(`Listening ${host}:${port}`);
});
