# CommonJS规范

## 概述

#### 前言：Javascript模块化编程的诞生

* 2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程，这标志"Javascript模块化编程"正式诞生。

> 在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。

* node.js的模块系统，就是参照CommonJS规范实现的。

#### CommonJS规范使用

	在CommonJS中，有一个全局性方法require()，用于加载模块

**示例**

	假定有一个数学模块math.js需要加载

``` js
// CommonJS规范加载
var math = require('math');

math.add(2,3); // 5
```
