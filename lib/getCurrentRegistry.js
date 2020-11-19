const { Yarn } = require('./config');
const { convertEnd, execCommand } = require('./utils');

/**
 * 获取当前的yarn源
 * @param {Function} cbk 回调函数
 */
function getCurrentRegistry(cbk) {
  execCommand(Yarn.getRegistry, (err, current) => {
    if (err) return;
    cbk(convertEnd(current));
  });
}

module.exports = getCurrentRegistry;
