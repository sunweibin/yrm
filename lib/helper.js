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
 * 打印当前 Yarn 正在使用的 registry
 */
function printCurrentRegistry(name, registry, showTitle = false) {
  console.log('');
  if (showTitle) {
    console.log(`Current Yarn Registry:`);
  }
  console.log(chalk.yellowBright(`   [${name}](${registry})`));
  console.log('');
}

/**
 * 打印当前 NPM 正在使用的 registry
 */
function printNpmRegistry(registry) {
  console.log('');
  console.log('Current NPM Registry:');
  console.log('   ' + chalk.yellowBright(registry));
  console.log('');
}


module.exports = {
  printCurrentRegistry,
  printNpmRegistry,
  printRegistryList,
};
