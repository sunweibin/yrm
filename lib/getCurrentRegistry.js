const chalk = require('chalk')

const { Message } = require('./config');
const { convertEnd, execCommand, replaceMessageName} = require('./utils');

/**
 * 获取指定的包管理器当前使用的镜像源
 * @param {Function} cbk 回调
 */
function getCurrentRegistry(packageManagerName, cbk) {
  const getRegistryShell = `${packageManagerName} config get registry`;
  execCommand(getRegistryShell, (err, current) => {
    if (err) {
      console.log(replaceMessageName(Message.notFoundPackageManger, chalk.redBright(packageManagerName)));
      return;
    };
    cbk(convertEnd(current));
  });
}

module.exports = getCurrentRegistry;
