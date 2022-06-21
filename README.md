# yrm -- Yarn Registry Manager
管理所有的yarn包的下载源Registry

[![NPM version][npm-image]][npm-url]

`yrm`可以帮助你轻松地添加、删除、查询、切换所有的Yarn Registries,目前内置`npm`,`cnpm`,`yarn`三个源

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

┌───────┬──────┬─────────────────────────────────┐
│ Using │ name │ Registry                        │
├───────┼──────┼─────────────────────────────────┤
│ -     │ npm  │ https://registry.npmjs.org/     │
│ *     │ cnpm │ https://registry.npmmirror.com/ │
│ -     │ yarn │ https://registry.yarnpkg.com/   │
└───────┴──────┴─────────────────────────────────┘

```

列出当前正在使用的源
```
# 默认查看 yarn  配置的镜像源
$ yrm now
// 查看 npm 配置的镜像源
$ yrm now npm
// 查看 pnpm 配置的镜像源
$ yrm now pnpm
// 查看所有的包管理器的镜像源
$ yrm now all
```

切换 yarn 的镜像源
```
$ yrm use cnpm

Your yarn registry has been set to:

yarn's Current Registry:
   [cnpm](https://registry.npmmirror.com/)
```

往镜像源列表中添加镜像源进行管理
```
$ yrm add swb https://registry.npmjs.org/

You have added swb successfully!
// ....
```

从镜像源列表中删除配置的自定义的镜像源
> 当删除的源正在使用时会指定 yarn 的官方源
```
$ yrm del swb
```

## Usage

```
$ yrm help

Usage: yrm [options] [command]

Options:
  -V, --version                               output the version number
  -h, --help                                  display help for command

Commands:
  list|ls                                     列出所添加的包管理器镜像源，高亮的为 yarn 当前使用的镜像源
  now [packageManagerName]                    显示包管理器当前使用的镜像源, 默认显示 yarn 使用的镜像源, 可以查看比如:npm, pnpm配置的镜像源
  use <registry-name>                         切换 yarn 的当前镜像源
  add <name> <registry> [home]                添加镜像源管理
  del <name>                                  删除指定的镜像源，当删除的源正在使用时会指定 yarn 的官方源
  set <package-manager-name> <registry-name>  给其他包管理器设置 registry 例如: npm, pnpm
  help                                        打印出yrm的命令帮助信息
```

## Default Registries

* [npm](https://registry.npmjs.org/)
* [cnpm](https://registry.npmmirror.com/)
* [yarn](https://registry.yarnpkg.com/)

## LICENSE
MIT


[npm-image]: https://img.shields.io/npm/v/@sunweibin/yrm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@sunweibin/yrm
