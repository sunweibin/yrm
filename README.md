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
或者
$ yrm list

* npm     -  https://registry.npmjs.org/
  taobao  -  https://registry.npm.taobao.org/
  yarn    -  https://registry.yarnpkg.com/

```
列出当前正在使用的源
```
$ yrm now

  [yarn](https://registry.yarnpkg.com/)

```
切换源
```
$ yrm use yarn

  Your registry has been set to:

Current Yarn Registry:
   [taobao](https://registry.npm.taobao.org/)

Current NPM Registry:
   https://registry.npm.taobao.org/

```
只切换Yarn的源，而不切换Npm的源
```
$ yrm use yarn

  Your registry has been set to:

Current Yarn Registry:
   [taobao](https://registry.npm.taobao.org/)

Current NPM Registry:
   https://registry.npm.taobao.org/
```

添加源
```
$ yrm add swb https://registry.npmjs.org/ https://www.npmjs.org

You have added swb successfully!

   [swb](https://registry.npmjs.org/)
```

删除源
```
$ yrm del swb

// 如果删除的并不是正在使用的，显示下面提示
You have deleted swb successfully!
// 如果删除的是正在使用的Registry,则附带显示下面设置默认的Registry
Your registry has been set to:

   [yarn](https://registry.yarnpkg.com/)
```

## Usage

```
$ yrm help

Usage: yrm [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    list|ls                       列出所有的yarn源
    now                           当前使用的源
    use [options] <name>          切换当前的源

        Options:
        -n, --no-npm  不修改npm的源

    add <name> <registry> [home]  添加yarn源
    del <name>                    删除yarn源
    help                          打印出yrm的命令帮助信息
```

## Registries

* [npm](https://www.npmjs.org)
* [taobao](http://npm.taobao.org/)
* [yarn](https://registry.yarnpkg.com/)

## LICENSE
MIT


[npm-image]: https://img.shields.io/npm/v/@sunweibin/yrm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@sunweibin/yrm
