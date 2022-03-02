const { getYarnRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { isSameRegistry } = require('./utils');
const { printRegistryList } = require('./helper');
const chalk = require('chalk');

function showList() {
  getYarnRegistry((cur) => {
    const registryInfoList = [];
    // 获取所有的yarn源包括预定义和用户自定义的
    const allRegistries = getAllRegisties();
    // 循环遍历所有的源
    const allRegistriesKeys = Object.keys(allRegistries);

    allRegistriesKeys.forEach((key) => {
      const item = allRegistries[key];

      const isUsingRegistry = isSameRegistry(item.registry, cur);

      let registryInfo = {
        using: '-',
        name: key,
        registry: item.registry
      };

      if (isUsingRegistry) {
        registryInfo = {
          using: chalk.yellowBright('*'),
          name: chalk.yellowBright(key),
          registry: chalk.yellowBright(item.registry)
        };
      }

      registryInfoList.push(registryInfo);
    });

    printRegistryList(registryInfoList);
  });
}

module.exports = showList;
