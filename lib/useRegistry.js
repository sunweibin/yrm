const chalk = require('chalk');

const { getNpmRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry, printNpmRegistry } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Yarn, Message, Npm } = require('./config');

function useRegistry(name, options = {}) {
  const allRegistries = getAllRegisties();

  if (allRegistries.hasOwnProperty(name)) {
    const registry = allRegistries[name];

    const shells = [`${Yarn.setRegistry} ${registry.registry}`];

    if (options.npm) {
      // 默认情况下，不会修改npm的源
      shells.push(`${Npm.setRegistry} ${registry.registry}`);
    }

    execCommand(shells.join(' && '), (err) => {
      if (err) return exit(err);

      console.log(Message.useRegistry);

      printCurrentRegistry(name, registry.registry, true);

      getNpmRegistry(printNpmRegistry);

    });

  } else {
    console.log(replaceMessageName(Message.notFound, chalk.redBright(name)));
  }
}

module.exports = useRegistry;
