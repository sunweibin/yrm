// 显示当前正在用的源
const { getYarnRegistry, getNpmRegistry } = require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printCurrentRegistry, printNpmRegistry } = require('./helper');
const { isSameRegistry } = require('./utils');

function showCurrent(options) {
  getYarnRegistry((currentRegistry) => {
    const allRegistries = getAllRegisties();

    Object.keys(allRegistries).forEach((key) => {

      const item = allRegistries[key];

      if (isSameRegistry(item.registry, currentRegistry)) {
        printCurrentRegistry(key, currentRegistry, true);

        if (options.npm) {
          // 打印出 npm 的源
          getNpmRegistry(printNpmRegistry);
        }

        return;
      }
    });
  });
}

module.exports = showCurrent;
