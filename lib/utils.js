// node的子进程
const childProcess = require('child_process');

/**
 * 执行命令行
 * @param {String} command 所需要执行的命令行字符串
 * @param {Function} cbk 回调函数
 */
function execCommand(command, cbk) {
  childProcess.exec(command, cbk);
}

/**
 * 检测用户输入的 registry 是否以"/"结尾
 * @param {String} url 用户输入的registry
 */
function endWithslash(url) {
  return /\/$/.test(url);
}

/**
 * 检测用户输入的 registry 是否以"http:// 或者 https://"开头
 * @param {String} url 用户输入的registry
 */
function startWithHttp(url) {
  return /^http(s)?\:\/\//.test(url);
}

/**
 * 替换字符串
 * @param {String} msg 需要替换的信息字符串
 * @param {String} name 替换的信息
 */
function replaceMessageName(msg, name) {
  return msg.replace(/\[name\]/g, name);
}

/**
 * 比对两个Registry源地址字符串是否一样
 * @param {String} left registry源地址字符串
 * @param {String} right registry源地址字符串
 */
function isSameRegistry(left, right) {
  const reg = /\//g;
  return left.replace(reg, '') === right.replace(reg, '');
}

/**
 * 将行末尾的换行符号转换
 * @param {String} str 需要转化的字符串
 */
function convertEnd(str) {
  return str.replace(/\r|\n/g, '');
}

/**
 * 获取不同平台下的 Home 环境配置值
 */
function getHomeDir() {
  return process.env.HOME || process.env.USERPROFILE;
}

/**
 * 找到当前管理的镜像源的名称
 * @params {Object} regsitryConfig 配置的所有镜像源信息
 * @params {String} registry 需要查找的镜像源名称
 * @returns {String} 配置的镜像源名称
 */
function getRegistryName(regsitryConfig, registry) {
  return Object.keys(regsitryConfig).find(registryName => {
    const registryItem = regsitryConfig[registryName];
    return isSameRegistry(registryItem.registry, registry);
  })
}


module.exports = {
  execCommand,
  endWithslash,
  startWithHttp,
  replaceMessageName,
  isSameRegistry,
  convertEnd,
  getHomeDir,
  getRegistryName,
};
