// 显示当前正在用的源
const getCurrentRegistry= require('./getCurrentRegistry');
const { getAllRegisties } = require('./getRegistryList');
const { printManagerRegistryInfo } = require('./helper');
const { getRegistryName } = require('./utils');

function showCurrent(packageManagerName = 'yarn') {
  const allRegistries = getAllRegisties();

  // 当前市面上主流的包管理器: yarn, npm, pnpm
  if (packageManagerName === 'all') {
    // 表示列出当前所有包管理器的镜像源也就是同时列出 yarn, npm, pnpm 各自的镜像源
    ['yarn', 'npm', 'pnpm'].forEach((item) => {
      getCurrentRegistry(item, (itemRegistry) => {
        const registryName = getRegistryName(allRegistries, itemRegistry);
        printManagerRegistryInfo(item, registryName, itemRegistry);
      })
    });

    return;
  }

  getCurrentRegistry(packageManagerName, (currentRegistry) => {
    const registryName = getRegistryName(allRegistries, currentRegistry);
    printManagerRegistryInfo(packageManagerName, registryName, currentRegistry);
  });
}

module.exports = showCurrent;
