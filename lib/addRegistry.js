const chalk = require('chalk');

const { Message } = require('./config');
const { endWithslash, replaceMessageName, startWithHttp } = require('./utils');
const { printRegistryInfo } = require('./helper');
const { getCustomRegistries, writeRegistryToFile } = require('./getRegistryList');
const showList = require('./showList');

function addRegistry(name, registry, home) {
  const customRegistries = getCustomRegistries();

  if (customRegistries.hasOwnProperty(name)) {
    // 如果已经添加过该源地址了，则提示
    console.log(replaceMessageName(Message.hasRegistry, chalk.yellowBright(name)));
    console.log(chalk.redBright('Please use another registry name!'));

    return;
  }

  if (!startWithHttp(registry)) {
    // 如果不是以 http:// 或者 https:// 开头，则提示用户
    console.log(chalk.redBright(Message.registryRule));

    return;
  }

  const config = customRegistries[name] = {};

  if (!endWithslash(registry)) {
    registry += '/';
  }

  config.registry = registry;

  if (home) {
    config.home = home;
  }

  writeRegistryToFile(customRegistries, function (err) {
    if (err) return exit(err);

    console.log(replaceMessageName(Message.addRegistry, chalk.yellowBright(name)));

    printRegistryInfo(name, registry)

    console.log('');
    console.log('Current Registries:')
    showList();
  });
}

module.exports = addRegistry;
