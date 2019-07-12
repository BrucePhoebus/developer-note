# JS模块化方案

	JS模块化主要有三种方案：CommonJS、AMD / CMD、ES6

## CommonJS

#### demo

``` js
// module add.js
module.exports = function add (a, b) { return a + b; }

// main.js
var {add} = require('./add.js');
// i hate sync
console.log('1 + 2 = ' + add(1,2);
```


## AMD / CMD

	AMD模块化方案是：define + require
	CMD模块化方案是：exports + require

#### demo

``` js
// module add.js  
define(function () {
  return {
    add: function (a, b) add { return a + b; }
  };
});

// main.js
require(['add'], function (add) {
  //i hate callback
  console.log('1 + 2 = ' + add(1,2);
});
```


## ES6

	ES6模块化方案是：export + import

> 由于ES6本身是原生语言支持实现的模块化，但是现代浏览器大多都还未支持，因此必须使用相应的transpiler工具转换成ES5的AMD/CMD模块，再借助于systemJS/requireJS等模块加载工具才能使用。其中ES6的transpiler（代码转换器）一般是用babel，他的作用是将ES6转换为ES5语法

#### demo

``` js
// module add.js
export function add (a, b) { return a + b; }

// main.js
// i hate static
import {add} from 'add.js';
console.log('1 + 2 = ' + add(1,2);
```


> 参考：[什么才是JS模块化？](https://www.zhihu.com/question/39825164/answer/163458275)
