const { Yarn, Npm } = require('./config');
const { convertEnd, execCommand } = require('./utils');

/**
 * 获取当前的yarn源
 * @param {Function} cbk 回调函数
 */
function getYarnRegistry(cbk) {
  execCommand(Yarn.getRegistry, (err, current) => {
    if (err) return;
    cbk(convertEnd(current));
  });
}
/**
 * 获取当前的npm源
 * @param {Function} cbk 回调函数
 */
function getNpmRegistry(cbk) {
  execCommand(Npm.getRegistry, (err, current) => {
    if (err) return;
    cbk(convertEnd(current));
  });
}

module.exports = {
  getYarnRegistry,
  getNpmRegistry,
};
