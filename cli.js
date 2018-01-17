#!/usr/bin/env node

// node的路径包
const path = require('path');
// node的文件系统包
const fs = require('fs');
// 用来添加命令行的工具包
const cmd = require('commander');
// node的子进程
const childProcess = require('child_process');
const extend = require('extend');

const registries = require('./registries.json');
const pkg = require('./package.json');
const yrmrc = path.join(process.env.HOME, '.yrmrc');

// yarn的命令行字符串对象
const yarn = {
  get: 'yarn config get registry',
  set: 'yarn config set registry',
};

// 使用命令行后的提示信息集合
const message = {
  hasRegistry: 'You have add [name] registry',
  notFound: 'Not find registry: [name]',
  useRegistry: 'Your registry has been set to: [name]',
  delRegistry: 'delete registry [name] success',
  addRegistry: 'add registry [name] success',
  customer: 'You can only delete customRegistry',
};

// yrm的版本号
cmd.version(pkg.version);

// 列出所有的yarn的源
cmd
  .command('ls')
  .description('列出所有的yarn源')
  .action(showList);

// 输出当前的源
cmd
  .command('current')
  .description('当前的yarn源')
  .action(showCurrent);

// 切换当前的yarn源
cmd
  .command('use <registry>')
  .description('切换当前的源')
  .action(onUse);

// 添加yarn源
cmd
  .command('add <registry> <url> [home]')
  .description('添加yarn源')
  .action(onAdd);

// 删除yarn源
cmd
  .command('del <registry>')
  .description('删除yarn源')
  .action(onDel);

// 打印yrm的帮助信息
cmd
  .command('help')
  .description('打印出yrm的命令帮助信息')
  .action(onHelp);

cmd.parse(process.argv);
if (process.argv.length === 2) {
  cmdOutputHelp();
}


///////////////////////////
//                       //
//     使用到的函数       //
//                       //
///////////////////////////

/**
 * 输出命令行帮助信息
 */
function cmdOutputHelp() {
  cmd.outputHelp();
}

/**
 * 获取用户自定义的yarn源
 * 用户自定义的源写在.yrmrc配置文件中
 */
function getCustomRegistry() {
  return fs.existsSync(yrmrc) ? JSON.parse(fs.readFileSync(yrmrc, 'utf-8')) : {};
}

/**
 * 获取所有的yarn源
 * 将预定义的源和用户自定义的源合并
 */
function getAllYarnRegisties() {
  return extend({}, registries, getCustomRegistry());
}

/**
 * 获取当前的yarn源
 * @param {Function} cbk 回调函数
 */
function getCurrentRegistry(cbk) {
  execCommand(yarn.get, (err, current) => {
    if (err) return;
    cbk(current);
  });
}

function showList() {
  getCurrentRegistry((cur) => {
    const info = [''];
    // 获取所有的yarn源包括预定义和用户自定义的
    const allRegistries = getAllYarnRegisties();
    console.log('1111> allRegistries > ', JSON.stringify(allRegistries));
    // 循环遍历所有的源
    const allRegistriesKeys = Object.keys(allRegistries);
    allRegistriesKeys.forEach((key) => {
      const item = allRegistries[key];
      const prefix = isSameRegistry(item.registry, cur) ? '* ' : '  ';
      info.push(prefix + key + line(key, 8) + item.registry);
    });
    info.push('');
    printMsg(info);
  });
}

function showCurrent() {
  getCurrentRegistry(function (cur) {
    const allRegistries = getAllYarnRegisties();
    Object.keys(allRegistries).forEach(function (key) {
      const item = allRegistries[key];
      if (isSameRegistry(item.registry, cur)) {
        printMsg([key]);
        return;
      }
    });
  });
}

function onUse(name) {
  const allRegistries = getAllYarnRegisties();
  if (allRegistries.hasOwnProperty(name)) {
    const registry = allRegistries[name];
    execCommand(`${yarn.set} ${registry.registry}`, (err, out) => {
      if (err) return exit(err);
      getCurrentRegistry((current) => printMsg(replaceName(message.useRegistry, current)));
    });
  } else {
    printMsg(replaceName(message.notFound, name));
  }
}

function onDel(name) {
  const customRegistries = getCustomRegistry();
  if (!customRegistries.hasOwnProperty(name)) {
    printMsg(message.customer);
    return;
  };
  getCurrentRegistry((cur) => {
    // 删除之后需要指定一个yarn的源
    if (cur === customRegistries[name].registry) {
      onUse('yarn');
    }
    delete customRegistries[name];
    setCustomRegistry(customRegistries, function (err) {
      if (err) return exit(err);
      printMsg(replaceName(message.delRegistry, name));
    });
  });
}

function onAdd(name, url, home) {
  const customRegistries = getCustomRegistry();
  if (customRegistries.hasOwnProperty(name)) {
    printMsg(replaceName(message.hasRegistry, name));
    return;
  }
  const config = customRegistries[name] = {};
  if (!endWithslash(url)) url += '/';
  config.registry = url;
  if (home) {
    config.home = home;
  }
  setCustomRegistry(customRegistries, function (err) {
    if (err) return exit(err);
    printMsg(replaceName(message.addRegistry, name));
  });
}

function setCustomRegistry(config, cbk) {
  fs.writeFile(yrmrc, JSON.stringify(config), cbk);
}

function onHelp() {
  cmdOutputHelp();
}

///////////////////////////
//                       //
//     辅助函数           //
//                       //
///////////////////////////

/**
 * 执行命令行
 * @param {String} command 所需要执行的命令行字符串
 * @param {Function} cbk 回调函数
 */
function execCommand(command, cbk) {
  childProcess.exec(command, cbk);
}

/**
 * 输出错误信息
 */
function printErr(err) {
  console.error('an error occured: ' + err);
}

/**
 * 输出普通信息
 */
function printMsg(infos) {
  // 判断info是否是数组
  const msgIsArray = Array.isArray(infos);
  if (msgIsArray) {
    infos.forEach((info) => console.log(info));
  } else {
    console.log(infos);
  }
}

/**
 * 退出程序
 */
function exit(error) {
  printErr(error);
  process.exit(1);
}

/**
 * 显示registry的时候的字符串格式
 * @param {String} str registry的key
 * @param {Number} len 包含key字符串的总体长度
 */
function line(str, len = 8) {
  const line = new Array(Math.max(1, len - str.length)).join('-');
  return ' ' + line + ' ';
}

/**
 * 检测用户输入的registry是否以"/"结尾
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
function replaceName(msg, name) {
  return msg.replace(/\[name\]/g, name);
}

/**
 * 比对两个Registry源地址字符串是否一样
 * @param {String} one registry源地址字符串
 * @param {String} other registry源地址字符串
 */
function isSameRegistry(one, other) {
  const reg = /\//g;
  return one.replace(reg, '') === other.replace(reg, '');
}
