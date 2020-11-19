// node的文件系统包
const fs = require('fs');
// node的路径包
const path = require('path');
// .yrmrc 文件地址
const yrmrc = path.join(process.env.HOME, '.yrmrc');

const registries = require('./registries.json');

/**
 * 获取用户自定义的yarn源
 * 用户自定义的源写在.yrmrc配置文件中
 */
function getCustomRegistries() {
  return fs.existsSync(yrmrc) ? JSON.parse(fs.readFileSync(yrmrc, 'utf-8')) : {};
}

/**
 * 获取所有的yarn源
 * 将预定义的源和用户自定义的源合并
 */
function getAllRegisties() {
  return { ...registries, ...getCustomRegistries() };
}

/**
 * 将源地址配置写到 .yrmrc 文件中
 * @param {*} config 地址源的配置
 * @param {Function} cbk 写成功后回调
 */
function writeRegistryToFile(config, cbk) {
  fs.writeFile(yrmrc, JSON.stringify(config), cbk);
}

module.exports = {
  getCustomRegistries,
  getAllRegisties,
  writeRegistryToFile,
};
