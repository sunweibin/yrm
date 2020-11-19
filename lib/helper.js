const chalk = require('chalk');

const { padStrSpace } = require('./utils');

/**
 * registry 名称的最大显示长度，找到最长的名称，并且在这个最大的名称上加 3 个空格的长度
 * 来确保在控制台显示时，名称占据的宽度一样，保证了展示时的对齐
 */
function getRegistryNamePlaceLength(registries) {
  const namesLength = registries.map(item => item.name.length);
  const nameMaxLenth = Math.max(...namesLength);

  return nameMaxLenth + 3;
}

/**
 * 输出保存的所有的 npm 源列表信息
 */
function printRegistryList(registries) {
  console.log('');
  const namePlaceHolderLength = getRegistryNamePlaceLength(registries);
  registries.forEach((item) => {
    const { using, name, registry } = item;
    const nameStr = padStrSpace(name, namePlaceHolderLength);
    if (using) {
      console.log(chalk.yellowBright(` * ${nameStr}- ${registry}`));
    } else {
      console.log(`   ${nameStr}- ${registry}`);
    }
  });
  console.log('');
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
  getRegistryNamePlaceLength,
  printRegistryList,
};
