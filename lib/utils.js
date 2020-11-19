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
 * 补充字符串空格
 * @param {String} str registry的key
 * @param {Number} len 包含key字符串的总体长度
 */
function padStrSpace(str, len = 10) {
  const spaceCount = Math.max(1, len - str.length);
  return ' ' + str + '*'.repeat(spaceCount).replace(/\*/g, ' ');
}

/**
 * 检测用户输入的 registry 是否以"/"结尾
 * @param {String} url 用户输入的registry
 */
function endWithslash(url) {
  return /\/$/.test(url);
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


module.exports = {
  execCommand,
  padStrSpace,
  endWithslash,
  replaceMessageName,
  isSameRegistry,
  convertEnd,
};
