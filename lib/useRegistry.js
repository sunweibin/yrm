const chalk = require('chalk');

const { getAllRegisties } = require('./getRegistryList');
const { printManagerRegistryInfo } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Message } = require('./config');

function useRegistry(registryName) {
  const allRegistries = getAllRegisties();

  if (allRegistries.hasOwnProperty(registryName)) {
    const registryItem = allRegistries[registryName];

    const yarnSetRegistry = `yarn config set registry ${registryItem.registry}`;

    execCommand(yarnSetRegistry, (err) => {
      if (err) return exit(err);

      console.log(replaceMessageName(Message.useRegistry, 'yarn'));

      printManagerRegistryInfo('yarn', registryName, registryItem.registry);
    });

  } else {
    console.log(replaceMessageName(Message.notFoundRegistry, chalk.redBright(registryName)));
  }
}

module.exports = useRegistry;
