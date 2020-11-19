const chalk = require('chalk');

const { getNpmRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry } = require('./helper');
const { execCommand, replaceMessageName } = require('./utils');
const { Yarn, Message, Npm } = require('./config');

function useRegistry(name, cmd) {
  const allRegistries = getAllRegisties();

  if (allRegistries.hasOwnProperty(name)) {
    const registry = allRegistries[name];

    const shells = [`${Yarn.setRegistry} ${registry.registry}`];

    if (cmd.npm) {
      // 默认情况下，会直接连npm的源也一并修改掉
      shells.push(`${Npm.setRegistry} ${registry.registry}`);
    }

    execCommand(shells.join(' && '), (err) => {
      if (err) return exit(err);

      console.log(Message.useRegistry);

      printCurrentRegistry(name, registry.registry, true);

      getNpmRegistry((currentRegistry) => {
        console.log('Current NPM Registry:');
        console.log('   ' + chalk.yellowBright(currentRegistry));
      });

    });

  } else {
    console.log(replaceMessageName(Message.notFound, chalk.redBright(name)));
  }
}

module.exports = useRegistry;
