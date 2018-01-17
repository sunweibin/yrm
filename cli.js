#!/usr/bin/env node

// node的路径包
var path = require('path');
// node的文件系统包
var fs = require('fs');
// 用来添加命令行的工具包
var cmd = require('commander');
var yarn = require('yarn');
var ini = require('ini');
var echo = require('node-echo');
var extend = require('extend');
var open = require('open');
var async = require('async');
var request = require('request');
var only = require('only');

var registries = require('./registries.json');
var pkg = require('./package.json');
var yrmrc = path.join(process.env.HOME, '.yrmrc');

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
  program.outputHelp();
}

/**
 * 获取用户自定义的yarn源
 * 用户自定义的源写在.yrmrc配置文件中
 */
function getCustomRegistry() {
  return fs.existsSync(yrmrc) ? ini.parse(fs.readFileSync(yrmrc, 'utf-8')) : {};
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
  yarn.load(function (err, conf) {
    if (err) return exit(err);
    cbk(yarn.config.get('registry'));
  });
}

function showList() {
  getCurrentRegistry(function (cur) {
    var info = [''];
    var allRegistries = getAllYarnRegisties();

    Object.keys(allRegistries).forEach(function (key) {
      var item = allRegistries[key];
      var prefix = item.registry === cur ? '* ' : '  ';
      info.push(prefix + key + line(key, 8) + item.registry);
    });

    info.push('');
    printMsg(info);
  });
}

function showCurrent() {
  getCurrentRegistry(function (cur) {
    var allRegistries = getAllYarnRegisties();
    Object.keys(allRegistries).forEach(function (key) {
      var item = allRegistries[key];
      if (item.registry === cur) {
        printMsg([key]);
        return;
      }
    });
  });
}

function onUse(name) {
  var allRegistries = getAllYarnRegisties();
  if (allRegistries.hasOwnProperty(name)) {
    var registry = allRegistries[name];
    yarn.load(function (err) {
      if (err) return exit(err);
      yarn.commands.config(['set', 'registry', registry.registry], function (err, data) {
        if (err) return exit(err);
        console.log('                        ');
        var newR = yarn.config.get('registry');
        printMsg([
          '', '   Registry has been set to: ' + newR, ''
        ]);
      })
    });
  } else {
    printMsg([
      '', '   Not find registry: ' + name, ''
    ]);
  }
}

function onDel(name) {
  var customRegistries = getCustomRegistry();
  if (!customRegistries.hasOwnProperty(name)) {
    printMsg(['你只能删除自定义的yarn源，不能删除预定义的yarn源']);
  };
  getCurrentRegistry(function (cur) {
    if (cur === customRegistries[name].registry) {
      onUse('yarn');
    }
    delete customRegistries[name];
    setCustomRegistry(customRegistries, function (err) {
      if (err) return exit(err);
      printMsg([
        '', '    delete registry ' + name + ' success', ''
      ]);
    });
  });
}

function onAdd(name, url, home) {
  var customRegistries = getCustomRegistry();
  if (customRegistries.hasOwnProperty(name)) return;
  var config = customRegistries[name] = {};
  if (url[url.length - 1] !== '/') url += '/'; // ensure url end with /
  config.registry = url;
  if (home) {
    config.home = home;
  }
  setCustomRegistry(customRegistries, function (err) {
    if (err) return exit(err);
    printMsg([
      '', '    add registry ' + name + ' success', ''
    ]);
  });
}

function setCustomRegistry(config, cbk) {
  echo(ini.stringify(config), '>', yrmrc, cbk);
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
 * 输出错误信息
 */
function printErr(err) {
  console.error('an error occured: ' + err);
}

/**
 * 输出普通信息
 */
function printMsg(infos) {
  infos.forEach(function (info) {
    console.log(info);
  });
}

/**
 * 退出程序
 */
function exit(error) {
  printErr(error);
  process.exit(1);
}

function line(str, len) {
  var line = new Array(Math.max(1, len - str.length)).join('-');
  return ' ' + line + ' ';
}
