// 使用命令行后的提示信息集合
const Message = {
  registryRule: 'Registry must be a full url with "http:\/\/" or "https:\/\/" ',
  hasRegistry: 'You have added [name] registry!',
  notDefineRegistry: 'You do not define [name] registry!',
  notFoundRegistry: 'Not find registry: [name]',
  notFoundPackageManger: 'Not find Package Manager: [name]',
  setRegistry: 'Your Package Manager [name] has been set to: ',
  useRegistry: 'Your [name] registry has been set to:',
  delRegistry: 'You have deleted [name] successfully!',
  delUsingRegistry: 'You are deleting a source in use.',
  addRegistry: 'You have added [name] successfully!',
  customRegistry: 'You can only delete custom registry!',
};


module.exports = {
  Message,
};
