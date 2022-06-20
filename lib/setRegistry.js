const chalk = require('chalk');

const { getNpmRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry, printNpmRegistry } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Yarn, Message, Npm } = require('./config');

function setRegistry(packageManagerName, registryName) {
  const allRegistries = getAllRegisties();

  const packageManagerExsitCommand = `${packageManagerName} --version`;

  execCommand(packageManagerExsitCommand, (err) => {
    if (err) {
      console.log(replaceMessageName(Message.notFoundPackageManger, chalk.redBright(packageManagerName)));
      return exit(err);
    }

    if (allRegistries.hasOwnProperty(registryName)) {
      const registry = allRegistries[registryName];

      const setCommand = `${packageManagerName} config set registry ${registry.registry}`;

      execCommand(setCommand, (err) => {
        if (err) return exit(err);

        console.log(replaceMessageName(Message.setRegistry, chalk.yellowBright(packageManagerName)));

        printCurrentRegistry(registryName, registry.registry, true);
      });

    } else {
      console.log(replaceMessageName(Message.notFoundPackageManger, chalk.redBright(packageManagerName)));
    }

  });
}

module.exports = setRegistry;
