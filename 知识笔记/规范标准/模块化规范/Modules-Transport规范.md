# Modules-Transport规范

## 概述

#### Transport规范简介

	SeaJS 只支持 CMD 模块的话，没法实现 JS 文件的合并了，所以SeaJS 还支持一种 Transport 格式，也就是Modules-Transport规范
	Transport 格式其实就是加上了名字的 CMD 模块，SeaJS 在遇到这种模块时通过定义的 id 来缓存模块

#### 语法格式

``` js
define(id?, deps?, factory)
```

**说明**

* id：模块标识。
* deps：一个数组，表示模块依赖。

> 在用普通压缩工具压缩时，如果项目需要支持 IE，务必写上第一个参数id或通过工具提取 id；而且如果项目对性能有要求，上线后需要合并文件，也确保手工写上 id 参数。