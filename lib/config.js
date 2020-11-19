// yarn的命令行字符串对象
const Yarn = {
  getRegistry: 'yarn config get registry',
  setRegistry: 'yarn config set registry',
};

// 使用命令行后的提示信息集合
const Message = {
  hasRegistry: 'You have added [name] registry!',
  notFound: 'Not find registry: [name]',
  useRegistry: 'Your registry has been set to:',
  delRegistry: 'You have deleted [name] successfully!',
  delUsingRegistry: 'You are deleting a source in use.',
  addRegistry: 'You have added [name] successfully!',
  customRegistry: 'You can only delete custom registry!',
};


module.exports = {
  Yarn,
  Message,
};
