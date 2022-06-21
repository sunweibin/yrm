const chalk = require('chalk');

const { getAllRegisties } = require('./getRegistryList');
const { printRegistryInfo } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Message } = require('./config');

function setRegistry(packageManagerName, registryName) {
  const allRegistries = getAllRegisties();

  const packageManagerExsitCommand = `${packageManagerName} --version`;

  execCommand(packageManagerExsitCommand, (err) => {
    if (err) {
      console.log(replaceMessageName(Message.notFoundPackageManger, chalk.redBright(packageManagerName)));
      return;
    }

    if (allRegistries.hasOwnProperty(registryName)) {
      const registry = allRegistries[registryName];

      const setCommand = `${packageManagerName} config set registry ${registry.registry}`;

      execCommand(setCommand, (err) => {
        if (err) return exit(err);

        console.log(replaceMessageName(Message.setRegistry, chalk.yellowBright(packageManagerName)));

        printRegistryInfo(registryName, registry.registry);
      });

    } else {
      console.log(replaceMessageName(Message.notDefineRegistry, chalk.redBright(registryName)));
    }

  });
}

module.exports = setRegistry;
