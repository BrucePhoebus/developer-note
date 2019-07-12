# CMD规范

## 概述

#### CMD规范简介

	CMD（Common Module Definition）规范的前身是Modules/Wrappings规范
	在 CMD 规范中，一个模块就是一个文件

#### 语法格式

``` js
define(factory)

// factory 为对象
define({ "foo": "bar" });
// factory 为函数
define(function(require, exports, module) {
// 模块代码
});
```

**说明**

* factory 为对象/字符串时：表示模块的接口就是该对象/字符串。
	
* factory 为函数时：表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。factory默认会传入三个参数：require、exports 和 module。



