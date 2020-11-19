const chalk = require('chalk');

const { Message } = require('./config');
const { endWithslash, replaceMessageName, startWithHttp } = require('./utils');
const { printCurrentRegistry } = require('./helper');
const { getCustomRegistries, writeRegistryToFile } = require('./getRegistryList');

function addRegistry(name, registry, home) {
  const customRegistries = getCustomRegistries();

  if (customRegistries.hasOwnProperty(name)) {
    // 如果已经添加过该源地址了，则提示
    console.log(replaceMessageName(Message.hasRegistry, chalk.yellowBright(name)));

    return;
  }

  if (!startWithHttp(registry)) {
    // 如果不是以 http:// 或者 https:// 开头，则提示用户
    console.log(Message.registryRule);

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

    printCurrentRegistry(name, registry)
  });
}

module.exports = addRegistry;
