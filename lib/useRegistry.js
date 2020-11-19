const chalk = require('chalk');

const getCurrentRegistry = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Yarn, Message } = require('./config');

function useRegistry(name) {
  const allRegistries = getAllRegisties();

  if (allRegistries.hasOwnProperty(name)) {
    const registry = allRegistries[name];

    execCommand(`${Yarn.setRegistry} ${registry.registry}`, (err) => {
      if (err) return exit(err);

      console.log(Message.useRegistry);
      printCurrentRegistry(name, registry.registry);

    });

  } else {
    console.log(replaceMessageName(Message.notFound, chalk.redBright(name)));
  }
}

module.exports = useRegistry;
