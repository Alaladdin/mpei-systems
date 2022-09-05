const chalk = require('chalk');
const bot = require('../setup/telegramBot');

const getCurrentDate = () => new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' });

module.exports.log = (title, value, sendMessage) => {
  const titleFormatted = chalk.bold.magenta(`[${title.toUpperCase()}]:`);
  const valueFormatted = chalk.cyan(value || getCurrentDate());
  const message = `${titleFormatted} ${valueFormatted}`;

  console.info(chalk.bold.bgGray(message));

  if (sendMessage)
    bot.sendMessage(message);
};
