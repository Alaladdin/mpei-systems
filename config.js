require('dotenv').config();

module.exports = {
  port          : process.env.PORT || 9001,
  host          : process.env.HOST || '0.0.0.0',
  githubWebhooks: {
    sigHeaderName   : 'X-Hub-Signature-256',
    sigHashAlgorithm: 'sha256',
    secrets         : [
      process.env.API_WEBHOOK_SECRET,
      process.env.AGRABAH_WEBHOOK_SECRET,
      process.env.TELEGRAM_BOT_WEBHOOK_SECRET,
      process.env.VK_BOT_WEBHOOK_SECRET,
    ],
  },
};
