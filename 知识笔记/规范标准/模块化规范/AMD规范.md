# AMD规范

## 概述

#### AMD规范简述

	AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。

	requireJS就是使用AMD规范，一直模块化开发规范

	它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

> 另外还有CommonJS规范和CMD规范，其中CommonJS规范比较偏向于后端，也就是NodeJS使用；而AMD和CMD规范是前端使用

#### AMD规范诞生背景

> 前言：[CommonJS规范](知识笔记/规范标准/模块化规范/CommonJS规范.md)

* 这里说了CommonJS规范是给服务端使用的，主要是他的require()模块加载是同步的，在服务器同步时间就是硬盘读取时间

* 但是在浏览器，我们模块加载快慢都是基于网速，在需要加载的模块很大或网速很慢的情况下，如果使用同步加载，这样就会导致浏览器处于`假死`状态

> 所以，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

#### AMD使用

* AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数

``` js
require([module], callback);
```

**说明**

1. 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；

2. 第二个参数callback，则是加载成功之后的回调函数。

**示例**

	还是加载math模块

``` js
require(['math'], function (math) {
	math.add(2, 3);
});
```

> math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

> 参考：[Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
