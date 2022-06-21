const chalk = require('chalk');
const Grid = require('console-grid');

const grid = new Grid();

const gridData = {
  columns: [
    {
      id: "using",
      name: "Using",
      type: "string",
      maxWidth: 20
    },
    {
      id: "name",
      name: "name",
      type: "string",
      maxWidth: 30
    },
    {
      id: "registry",
      name: "Registry",
      type: "string",
      maxWidth: 80
    },
  ]
};

/**
 * 输出保存的所有的 npm 源列表信息
 */
function printRegistryList(registries) {
  gridData.rows = registries;
  grid.render(gridData);
}


/**
 * 打印添加的 Registry 信息
 */
function printRegistryInfo(registryName, registry) {
  console.log(chalk.yellowBright(`   [${registryName}](${registry})`));
}

/**
 * 打印当前包管理正在使用的 registry
 */
function printManagerRegistryInfo(packageManagerName, registryName, registry) {
  console.log('');
  console.log(`${chalk.greenBright(packageManagerName)}'s Current Registry:`);
  console.log(chalk.yellowBright(`   [${registryName}](${registry})`));
  console.log('');
}


module.exports = {
  printRegistryList,
  printManagerRegistryInfo,
  printRegistryInfo,
};
