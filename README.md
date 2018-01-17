# yrm -- Yarn Registry Manager
管理所有的yarn包的下载源Registry

[![NPM version][npm-image]][npm-url]

`yrm`可以帮助你轻松地添加、删除、查询、切换所有的Yarn Registries,目前内置`npm`,`taobao`,`yarn`三个源

## Install

```
$ npm install -g @sunweibin/yrm
```

## Example

列出所有Registry
```
$ yrm ls

* npm -----  https://registry.npmjs.org/
  taobao --  https://registry.npm.taobao.org/
  yarn ----  https://registry.yarnpkg.com/

```
切换源
```
$ yrm use yarn  //switch registry to cnpm

    Registry has been set to: https://registry.yarnpkg.com/

```

添加源
```
$ yrm add cnpm http://r.cnpmjs.org/

add registry swb success
```

删除源
```
$ yrm del swb

delete registry swb success
```

## Usage

```
$ yrm help

Usage: yrm [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    ls                           列出所有的yarn源
    current                      当前的yarn源
    use <registry>               切换当前的源
    add <registry> <url> [home]  添加yarn源
    del <registry>               删除yarn源
    help                         打印出yrm的命令帮助信息
```

## Registries

* [npm](https://www.npmjs.org)
* [taobao](http://npm.taobao.org/)
* [yarn](https://registry.yarnpkg.com/)

## LICENSE
MIT


[npm-image]: https://img.shields.io/npm/v/@sunweibin/yrm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@sunweibin/yrm