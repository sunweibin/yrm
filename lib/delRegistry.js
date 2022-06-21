const chalk = require('chalk');

const { Message } = require('./config');
const { replaceMessageName, isSameRegistry } = require('./utils');
const { getCustomRegistries, writeRegistryToFile, getAllRegisties } = require('./getRegistryList');
const getCurrentRegistry = require('./getCurrentRegistry');
const useRegistry = require('./useRegistry');
const showList = require('./showList');

function delRegistry(name) {
  const customRegistries = getCustomRegistries();
  const allRegistries = getAllRegisties();

  const isExitRegistry = allRegistries.hasOwnProperty(name);
  const isCustomRegistry = customRegistries.hasOwnProperty(name);

  if (!isExitRegistry) {
    console.log(replaceMessageName(Message.notFoundRegistry, chalk.redBright(name)));
    return;
  };

  if (!isCustomRegistry) {
    console.log(replaceMessageName(Message.customRegistry, chalk.redBright(name)));
    return;
  }

  getCurrentRegistry('yarn', (currentRegistry) => {
    // 如果删除的是当前正在使用的，成功后需要指定默认 yarn 的源
    if (isSameRegistry(currentRegistry, customRegistries[name].registry)) {
      // TODO: 删除正在使用中的源时，后期添加一个 询问是否删除该源
      useRegistry('yarn');
    }

    delete customRegistries[name];

    writeRegistryToFile(customRegistries, function (err) {
      if (err) return exit(err);

      console.log(replaceMessageName(Message.delRegistry, chalk.redBright(name)));
      console.log('');
      console.log('Current Registries:')
      showList();
    });
  });
}

module.exports = delRegistry;
