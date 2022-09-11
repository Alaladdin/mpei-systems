const chalk = require('chalk');
const moment = require('moment');
const bot = require('../setup/telegramBot');

module.exports.log = (title, value, sendMessage = true) => {
  const logTitle = `[${title.toUpperCase()}]`;
  const logValue = value || moment().format('DD.MM - HH:mm:ss');
  const titleFormatted = chalk.bold.magenta(`${logTitle}:`);
  const valueFormatted = chalk.cyan(logValue);

  console.info(chalk.bold.bgGray(`${titleFormatted} ${valueFormatted}`));

  if (sendMessage)
    bot.sendMessage(`${logTitle}: ${logValue}`);
};
