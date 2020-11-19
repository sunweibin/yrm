// 显示当前正在用的源
const getCurrentRegistry = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry } = require('./helper');
const { isSameRegistry } = require('./utils');

function showCurrent() {
  getCurrentRegistry(function (currentRegistry) {
    const allRegistries = getAllRegisties();

    Object.keys(allRegistries).forEach(function (key) {

      const item = allRegistries[key];

      if (isSameRegistry(item.registry, currentRegistry)) {
        printCurrentRegistry(key, currentRegistry);

        return;
      }
    });
  });
}

module.exports = showCurrent;
