# 认识requireJS

## 概述

> [官网](https://requirejs.org/docs/download.html)

#### requireJS简述

	requireJS是一直前端模块化实现方案，也用于解决页面加载<script>的问题

#### requireJS解决什么问题

**为什么要用require.js？**

	现在我们项目中虽然进行的模块化拆分，也就是将js拆分为多个文件，然后再通过<script>导入HTML页面中

``` html
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<script src="4.js"></script>
<script src="5.js"></script>
<script src="6.js"></script>
```

* 但是这会导致一个很明显的问题，也就是页面会停止渲染，虽然我们可以把js文件放到页面最后加载，但是依然对页面渲染有影响，加载文件越多，网页失去响应的时间就会越长

* 其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的1.js要在2.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难

> 这个问题的解决方案就是：require.js

	用于解决以下两个问题

1. 实现js文件的异步加载，避免网页失去响应；

2. 管理模块之间的依赖性，便于代码的编写和维护。

## requireJS的加载使用

#### requireJS的使用

1. 第一步当然是去[官网下载](https://requirejs.org/docs/download.html)啦！

	下载完后放到项目中，通过<script\>导入

``` html
<script src="js/require.js"></script>
```

> 当然，使用这个加载也会导致页面停止渲染，所以我们一般放到页面底部，或异步加载

``` html
<script src="js/require.js" defer async="true" ></script>
```

> async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上

2. 加载项目js

	加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，那么我们可以通过 data-main 加载

``` html
<script src="js/require.js" data-main="js/main"></script>
```

> `data-main`属性的作用是：指定网页程序的主模块。在这个例子中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

* 一般我们就导入这个main.js主模块文件，然后在主模块文件中通过requireJS异步导入其他我们需要的js文件，也就是相关依赖文件，这样就能把所有需要的js文件导入，又不影响页面的渲染

#### 主模块的写法

	这个主模块也就是我们通过require.js在页面导入的模块，通过这个主模块我们能实现将所有需要导入的js导入到页面中

``` js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
	// some code here
});
```

> 主模块依赖其他模块，我们使用[AMD规范](知识笔记/规范标准/模块化规范/AMD规范.md)定义的的require()函数

**说明**

	require()函数接受两个参数。

1. 第一个参数是一个数组，表示所依赖的模块；

	在这里例子中，['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；


2. 第二个参数是一个回调函数

	当前面指定的模块都加载成功后，它将被调用

> 加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块

!> require()异步加载moduleA，moduleB和moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

**示例**

	假定主模块依赖jquery、underscore和backbone这三个模块，main.js就可以这样写

``` js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
	// some code here
});
```

#### 模块的加载

* 如果我们要导入的子模块文件跟主模块在同一路径下，我们当然可以直接通过模块文件名导入，requireJS能够直接识别，但是往往我们的模块名和文件位置比较比较复杂，这个时候我们往往需要进行`模块加载的自定义`

**require.config的path指定文件路径和别名**

``` js
// 模块别名
require.config({
	paths: {
		"jquery": "jquery.min",
		"underscore": "underscore.min",
		"backbone": "backbone.min"
	}
});

// 指定子模块路径
require.config({
	paths: {
		"jquery": "lib/jquery.min",
		"underscore": "lib/underscore.min",
		"backbone": "lib/backbone.min"
	}
});

// 上面可以通过baseUrl抽取路径
require.config({
	baseUrl: "js/lib",
	paths: {
		"jquery": "jquery.min",
		"underscore": "underscore.min",
		"backbone": "backbone.min"
	}
});

// 或者指定文件服务器路径
require.config({
	paths: {
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
	}
});
```

> 一般这个require.config是放在main.js主模块的顶部

> 另外，require.js要求每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。因此，require.js提供了一个优化工具，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。

#### AMD模块的写法

	require.js加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写

> [AMD规范](知识笔记/规范标准/模块化规范/AMD规范.md)

**示例**

	假设主模块main.js有一个子模块math.js，那么math模块必须按照AMD规范写法

``` js
// math.js
define(function (){

	var add = function (x,y){
		return x+y;
	};

	return {
		add: add
	};
});
```

* 当然main.js加载方式跟之前说的一样

``` js
// main.js
require(['math'], function (math){
	console.log(math.add(1,1));
});
```

**复杂场景下，子模块还会依赖子模块**

	如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性

``` js
define(['myLib'], function(myLib){

	function foo(){
		myLib.doSomething();
	}
	return {
		foo : foo
	};

});
```

> 当require()函数加载上面这个模块的时候，就会先加载myLib.js文件，这里又会将myLib.js作为参数参入

#### 加载非规范的模块

	理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块，并且有不少库已经符合了AMD规范；
	但是实际上以前的很多库都不是AMD规范，或使用其他规范，所以requireJS也规范了加载非规范的模块的方法

> 这样的模块在用require()加载之前，要先用`require.config()`方法，定义它们的一些特征

**举例**

	underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

``` js
require.config({

	shim: {
		'underscore':{
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});
```

> require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

* 例如jQuery的插件定义

``` js
require.config({
	shim: {
		'jquery.scroll': {
			deps: ['jquery'],
			exports: 'jQuery.fn.scroll'
		}
	}
})
```

#### requireJS插件

	require.js还提供一系列插件，实现一些特定的功能

###### domready插件

	可以让回调函数在页面DOM结构加载完成后再运行

``` js
require(['domready!'], function (doc){
	// called once the DOM is ready
});
```

###### text和image插件

	允许require.js加载文本和图片文件

``` js
define(
	[
		'text!review.txt',
		'image!cat.jpg'
	],

	function(review,cat){
		console.log(review);
		document.body.appendChild(cat);
	}

);
```

> 参考：[阮一峰的网络日志-Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
