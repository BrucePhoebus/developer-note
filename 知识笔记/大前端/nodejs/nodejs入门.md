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

#### 创建 Node.js 应用

1. 步骤一、引入 required 模块

	使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http
	 http = require("http");

2. 步骤二、创建服务器（完成一个可以工作的 HTTP 服务器）

	接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据
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

	node server.js //Server running at http://127.0.0.1:8888/

4. 浏览器访问

	打开浏览器访问 http://127.0.0.1:8888/，可以看到一个写着 "Hello World"的网页

5. 分析Node.js 的 HTTP 服务器

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

	查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
		npm ls -g --depth=0
	删除全局 node_modules 目录
		rm -rf /usr/local/lib/node_modules
	删除 node
		rm /usr/local/bin/node
	删除全局 node 模块注册的软链
		cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm

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

	node *.js

9. 运行服务

	node server.js

10. 关闭NodeJS服务

	1、直接关掉CMD
	2、通过管理员运行CMD，找到对应运行端口（关掉node.exe）
		netstat –ano;
		tasklist|findstr "18552"
		taskkill /f /t /im node.exe; 

