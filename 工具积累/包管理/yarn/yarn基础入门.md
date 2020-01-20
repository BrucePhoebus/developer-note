# yarn基础入门

## 什么是yarn

* Yarn 就是一个类似于 npm 的包管理工具，它是由 facebook 推出并开源。

* 与 npm 相比，yarn 有着众多的优势，主要的优势在于：速度快、离线模式、版本控制

## 如何安装yarn

1. npm安装yarn

``` BASH
npm install -g yarn
```

> 这是最快捷的方法，但是这个前提是我们要按照npm，也就是相当于安装了node环境

## Yarn 换源

	Yarn 源仓库包下载不稳定

* 先查看yarn使用的源仓库

``` BASH
# 查看 yarn 配置
yarn config get registry
#或者
yarn config list
```

> 默认源仓库：https://registry.yarnpkg.com

* 换成淘宝镜像

``` BASH
yarn config set registry https://registry.npm.taobao.org
```

## 常用命令

#### 安装

* 全局安装(相对项目局部安装的全局系统安装)

``` BASH
yarn global add docsify
# 等同
npm install docsify --global
```


* 安装所有依赖包(根据`package.json`文件配置)

``` BASH
yarn
# 等同
npm install
```

* 安装并保持到`package.json`中

``` BASH
yarn add docsify
# 等同
npm add docsify --save
```

#### 卸载

* 卸载安装的依赖，并从`package.json`中移出

``` BASH
yarn remove docsify
# 等同
npm uninstall docsify --save
```

#### 更新

* 更新所有依赖包

``` BASH
yarn upgrade
# 等同
npm update --save
```

> 注：存在开发环境的包和生产环境包的区分

#### 其他共有

``` BASH
npm init === yarn init
npm init --yes/-y === yarn init --yes/-y
npm link === yarn link
npm outdated === yarn outdated
npm publish === yarn publish
npm run === yarn run
npm cache clean === yarn cache clean
npm login === yarn login
npm test === yarn test
```

#### yarn独有

``` BASH
yarn licenses ls 				# 允许你检查依赖的许可信息
yarn licenses generate 	# 自动创建依赖免责声明 license
yarn why docsify 					# 检查为什么会安装 docsify，详细列出依赖它的其他包
yarn why vuepress 			# 检查为什么会安装 vuepress，详细列出依赖它的其他包
```

> 参考：[Yarn安装与使用详细介绍](https://neveryu.github.io/2018/07/20/yarn/)
