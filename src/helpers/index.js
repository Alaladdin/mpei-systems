const chalk = require('chalk');

const getCurrentDate = () => new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' });

module.exports.log = (text, type = 'info') => {
  const title = chalk.bold.magenta(`[${text.toUpperCase()}]:`);
  const value = chalk.cyan(getCurrentDate());

  console[type](chalk.bold.bgGray(`${title} ${value}`));
};
