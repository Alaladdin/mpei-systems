const chalk = require('chalk');

const getCurrentDate = () => new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' });

module.exports.log = (title, value) => {
  const titleFormatted = chalk.bold.magenta(`[${title.toUpperCase()}]:`);
  const valueFormatted = chalk.cyan(value || getCurrentDate());

  console.info(chalk.bold.bgGray(`${titleFormatted} ${valueFormatted}`));
};
