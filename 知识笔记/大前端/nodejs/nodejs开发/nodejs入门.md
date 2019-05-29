# nodejs入门

## 概述

	Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境(runtime environment)
	Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效（非常适合在分布式设备上运行数据密集型的实时应用）
	Node.js 的包管理器NPM（Node Package Manager），是全球最大的开源库生态系统
	简单的说 Node.js 就是运行在服务端的 JavaScript
	使用 Node.js 时，我们不仅仅 在实现一个应用，同时还实现了整个 HTTP 服务器

## 安装

> [官网地址](https://nodejs.org/) 

#### window安装

1. 推荐window系统下载msi格式[下载地址](https://nodejs.org/en/download/) 
2. 安装成功了以后打开`cmd`：`node -v`，查看安装情况

###### 配置

1. 查看安装结果与版本
	node -v #查看安装版本
	npm -v #查看npm安装版本
2. 查看Nodejs默认配置
	npm config ls -l
> 注：在环境变量path路径中可以找到对应的安装路径配置

###### `cnpm`(淘宝镜像)安装

	安装完成之后，我们可以选择使用淘宝镜像，下载速度快了一个量级

> 注：`npm`每次下载都是下载外国的包，速度有影响，甚至容易下着下着就报错挂了，原因是网络连接问题或下载超时，反正就是慢，当然优点是全，有些依赖包淘宝镜像可能下载不到，但是九成九淘宝镜像都有

1. 安装完`nodejs`后，默认附带会安装`npm`

	查看`npm`版本：`npm -v`

2. 打开`cmd`输入：`npm install -g cnpm --registry=https://registry.npm.taobao.org`

	这样就连上了淘宝镜像，之后使用淘宝镜像下载包都用`cnpm`命令

3. 使用`cnpm`

```bash
cnpm install xxx
```

> 例：`cnpm install express`

4. [具体npm操作参考](知识笔记/大前端/nodejs/npm入门.md)

## Node.js 基础应用

#### 组成

1. 引入 required 模块

	我们可以使用 require 指令来载入 Node.js 模块

2. 创建服务器

	服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器

3. 接收请求与响应请求

	服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据

#### 使用nodejs

1. 写个hello world程序

*hello.js*

```js
function hello() {
    console.log('Hello World!');
}
hello();
```

2. cmd下执行

```bash
node hello.js
```

> 淳朴的JavaScript程序，直接使用nodejs环境运行（跟chrome浏览器运行一样，都是使用V8引擎环境）

#### 创建 Node.js 应用

1. 步骤一、使用`required`引入`http`模块

	使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http
	http = require("http");

> require函数用于在当前模块中加载和使用别的模块。同样的，也可以通过相对路径引入其他文件

2. 步骤二、创建服务器（完成一个可以工作的 HTTP 服务器）

	接下来使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据
	```js
	var http = require('http');
	http.createServer(function (request, response) {     
		// 发送 HTTP 头部    
		// HTTP 状态值: 200 : OK    
		// 内容类型: text/plain     
		response.writeHead(200, {'Content-Type': 'text/plain'});
			
		// 发送响应数据 "Hello World"     
		response.end('Hello World\n');
	}).listen(8888);

	// 终端打印如下信息
	console.log('Server running at http://127.0.0.1:8888/');
	```

3. 执行

	node server.js	// Server running at http://127.0.0.1:8888/

4. 浏览器访问

	打开浏览器访问 http://127.0.0.1:8888/，可以看到一个写着 "Hello World"的网页

5. 分析`nodejs`的`HTTP`服务器

	第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
	接下来我们调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。

#### NodeJS命令

1. 查看版本
	
	ode -v

2. 查看Nodejs默认配置
	
	npm config ls -l

3. 查看npm当前配置、
	
	npm config ls

4. 卸载已安装到全局的 node/npm

	直接找到安装`nodejs`程序的位置：`nodejs\node_global\node_modules`，直接删掉该文件夹

5. 查看安装信息

	查看所有全局安装的模块

		npm list -g

	查看某个模块的版本号

		npm list grunt

6. 安装模块测试

	npm install express -g	// -g意思是安装到全局目录下
	npm install cordova -g	// -g意思是安装到全局目录下

7. 管理npm源的工具——[nrm](知识笔记/大前端/nodejs/nrm入门.md)

	npm install -g nrm

8. 运行node.js文件

	node *.js	// *.js为项目入口启动文件

9. 运行服务

	node server.js

10. 关闭NodeJS服务

	1、直接关掉CMD

	2、通过管理员运行CMD，找到对应运行端口（关掉node.exe）

		netstat –ano;
		tasklist|findstr "18552"
		taskkill /f /t /im node.exe; 

## nodejs模块知识

	编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。
	`nodejs`是一个JS脚本解析器，任何操作系统下安装`nodejs`本质上做的事情都是把nodejs执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用node命令。
	终端下直接输入node命令可进入命令交互模式，很适合用来测试一些JS代码片段，比如正则表达式。
	`nodejs`使用cmd模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

#### require

	require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以./开头），或者是绝对路径（以/或C:之类的盘符开头）。另外，模块名中的.js扩展名可以省略。

*参考示例*

```js
// foo1至foo4中保存的是同一个模块的导出对象。
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('/home/user/foo');
var foo4 = require('/home/user/foo.js');

// 导入json文件
var data = require('./data.json');

// 导入外部插件
var http = require('http');
```

#### module

	exports对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过 require 函数使用当前模块时得到的就是当前模块的exports对象。

*参考示例*

```js
// 模块默认导出对象被替换为一个函数
exports.hello = function () {
    console.log('Hello World!');
};
```

> 可以通过exports将函数、对象、变量暴露出去，当该文件被使用`require`引入别的文件中时，别的文件可以直接使用该函数、对象或变量（可以暴露多个），相当于代码复用，或数据文件独立出来，或配置文件分开放置

*常用示例*

```js
// 模块默认导出对象被替换为一个函数
exercise = {
	hello: '',
	hello: function () {
    	console.log('Hello World!');
	},
	sayHello: function() {
    	console.log('Hello World!');
	}
}

exports.exercise = exercise;
```

> 一般我们通过创建个变量，通过这样封装好我们想要的功能，然后将整个对象暴露出去。当然这是非常简单的实现，复杂的实现可以参考jquery等库的封装方式。

###### 模块初始化

	这样一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

*主模块*

	一般来说，每个项目都有一个主模块`main.js`，然后有N多个子模块，一般主模块是作为程序的入口或首加载时使用，多个子模块通过`require`方式导入主模块，子模块之间又互相引用，这样实现项目启动

*运行项目*

> node main.js

*参考示例*

1. 项目目录

> - /hello/
>    - util/
>        - counter.js
>    - main.js

2. 代码

`counter.js`

```js
var i = 0;

function count() {
	return ++i;
}

exports.count = count;
```

> 这个模块内部定义了一个私有变量`i`，并实现exports对象导出一个公有方法`count`

`main.js`

```js
var counter1 = require('./util/counter');
var counter2 = require('./util/counter');

console.log(counter1.count());	// 1
console.log(counter2.count());	// 2
console.log(counter2.count());	// 3
```

> 这里可以看出`counter.js`并没有因为被require了两次而初始化两次
