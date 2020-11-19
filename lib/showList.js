const { getYarnRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { isSameRegistry } = require('./utils');
const { printRegistryList } = require('./helper');

function showList() {
  getYarnRegistry((cur) => {
    const registryInfoList = [];
    // 获取所有的yarn源包括预定义和用户自定义的
    const allRegistries = getAllRegisties();
    // 循环遍历所有的源
    const allRegistriesKeys = Object.keys(allRegistries);

    allRegistriesKeys.forEach((key) => {
      const item = allRegistries[key];

      const registryInfo = {
        using: isSameRegistry(item.registry, cur),
        name: key,
        registry: item.registry
      };

      registryInfoList.push(registryInfo);
    });

    printRegistryList(registryInfoList);
  });
}

module.exports = showList;
