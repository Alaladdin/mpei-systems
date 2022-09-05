const { Telegraf } = require('telegraf');
const { token, adminChatId } = require('../../config').telegramBot;

const bot = new Telegraf(token);

module.exports = {
  sendMessage: async (text) => {
    await bot.telegram.sendMessage(adminChatId, `\`${text}\``, { parse_mode: 'Markdown' });
  },
};
