# 认识webpack

## 概述

> [Webpack中文网](https://webpack.docschina.org/)

#### Webpack简述

	Webpack是前端资源模块化管理和打包工具，一个模块打包器(bundler)

* 在Webpack看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
它将根据模块的依赖关系进行静态分析，生成对应的静态资源

#### 四个核心概念

* 入口(entry)
	
	指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

* 输出(output)

	告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。

* loader
	
	让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理

* 插件(plugins)

	使用时，require() 引入，然后把它添加到 plugins 数组中

#### 认识一些关键字

###### Module(模块)

	学过ES6或模块规范的就很清楚了，这就是指我们在编码过程中有意识的封装和组织起来的代码片段

* 一独立的功能代码块我们就可以叫做模块

###### Bundle(包)

	这个我们也很熟，因为我们经常需要打包，前端编译打包就是打出一个Bundle，而"包"(bundle) 就是把相关代码(所有模块)都打包进入的单个文件

###### chunk (块)

	块(chunk)的概念跟包(bundle)很类似，因为如果我们打包时不打成一个文件，而是按照某个规则打成多个文件，这每个文件我们就可以叫做一个个的块

* 所有：chunk 指的是按照某种规则的模块集合，chunk 的体积大于单个模块，同时小于整个 bundle

#### Webpack的工作方式

* 把项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件，一般都放到dist文件中

> 而打包的dist文件结构有

* js：放所有打包的js文件

* css：放所有打包的css文件

* image：放所有打包的图片资源

#### Webpack与其他打包工具的区别

	与gulp和grunt相比，Webpack的处理速度更快更直接，能打包更多不同类型的文件，更主要的区别还是 webpack是一个模块化打包工具。

## webpack 打包原理

#### 前言：webpack打包规范

###### UMD规范

* 首先我们需要知道，webpack遵循`UMD`模块打包规范：

	根据当前运行环境的判断，如果是 Node 环境 就是使用 CommonJS 规范， 如果不是就判断是否为 AMD 环境， 最后导出全局变量(这样代码就可以同时运行在nodejs和浏览器环境)

``` js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());
}(this, (function () { 'use strict';})));
```

> 目前大部分库都是打包成UMD规范，Webpack也支持UMD打包

#### Webpack模块打包

###### 问题1：模块规范有这么多，那webpack是如何去解析不同的模块呢？

* webpack根据`webpack.config.js`中的`入口文件`，在入口文件里`识别模块依赖`，不管这里的模块依赖是用`CommonJS`写的，还是`ES6 Module规范`写的，webpack会`自动进行分析`，并通过`转换`、`编译代码`，打包成`最终的文件`。

> 最终文件中的模块实现是基于webpack自己实现的webpack_require（es5代码），所以打包后的文件可以跑在浏览器上

	也就是现在我们可以使用ES6 模块语法、CommonJS、AMD等多种模块化语法混用写代码，而webpack会对各个模块进行语法分析，然后针对不同的语法进行转换编译，最后会统一输出一种格式

**示例说明**

* webpack配置入口和出口文件：webpack.config.js

``` js
const path = require('path');

module.exports = {
    mode: 'development',
  // JavaScript 执行入口文件
  entry: './src/main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  }
};
```

* 一个ES6模块文件

``` js
// src/add
export default function(a, b) {
    let { name } = { name: 'hello world,'} // 这里特意使用了ES6语法
    return name + a + b
}

// src/main.js
import Add from './add'
console.log(Add, Add(1, 2))
```

* 打包后精简成bundle.js文件

	打包后的代码能直接在浏览器上跑

``` js
// modules是存放所有模块的数组，数组中每个元素存储{ 模块路径: 模块导出代码函数 }
(function(modules) {
// 模块缓存作用，已加载的模块可以不用再重新读取，提升性能
var installedModules = {};

// 关键函数，加载模块代码
// 形式有点像Node的CommonJS模块，但这里是可跑在浏览器上的es5代码
function __webpack_require__(moduleId) {
  // 缓存检查，有则直接从缓存中取得
  if(installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // 先创建一个空模块，塞入缓存中
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false, // 标记是否已经加载
    exports: {} // 初始模块为空
  };

  // 把要加载的模块内容，挂载到module.exports上
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  module.l = true; // 标记为已加载

  // 返回加载的模块，调用方直接调用即可
  return module.exports;
}

// __webpack_require__对象下的r函数
// 在module.exports上定义__esModule为true，表明是一个模块对象
__webpack_require__.r = function(exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
};

// 启动入口模块main.js
return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
({
  // add模块
  "./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {
    // 在module.exports上定义__esModule为true
    __webpack_require__.r(__webpack_exports__);
    // 直接把add模块内容，赋给module.exports.default对象上
    __webpack_exports__["default"] = (function(a, b) {
      let { name } = { name: 'hello world,'}
      return name + a + b
    });
  }),

  // 入口模块
  "./src/main.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__)
    // 拿到add模块的定义
    // _add__WEBPACK_IMPORTED_MODULE_0__ = module.exports，有点类似require
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/add.js");
    // add模块内容: _add__WEBPACK_IMPORTED_MODULE_0__["default"]
    console.log(_add__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_add__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 2))
  })
});
```

> webpack通过__webpack_require__ 函数模拟了模块的加载（类似于node中的require语法），把定义的模块内容挂载到module.exports上

	同时__webpack_require__函数中也对模块缓存做了优化，防止模块二次重新加载，优化性能

!> 注：这里我们还有个要注意，这样我们打包出来的代码还是ES6语法的，在低端的浏览器中不支持，这是因为没有对应的loader去解析js代码，webpack把所有的资源都视作模块，不同的资源使用不同的loader进行转换，而一般我们都会使用`babel-loader`将ES6转为ES5

``` js
// webpack.config.js
module.exports = {
  ...,
  module: {
    rules: [
      {
        // 对以js后缀的文件资源，用babel进行处理
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

#### 最后便是webpack模块加载的优化

###### Webpack 模块异步加载

	之前我们使用的都是同步模块加载的方式，实际应用开发中，其实我们比较常用的还是按需加载，也就懒加载

> 通俗讲就是代码执行到异步模块（模块内容在另外一个js文件中），通过网络请求即时加载对应的异步模块代码

**有两种方法可以实现**

	方法一：require.ensure api语法来标记为异步加载模块
	方法二：webpack4 使用import() api

``` js
// main.js
import Add from './add'
console.log(Add, Add(1, 2), 123)

// 按需加载
// 方式1: require.ensure
// require.ensure([], function(require){
//     var asyncModule = require('./async')
//     console.log(asyncModule.default, 234)
// })

// 方式2: webpack4新的import语法
// 需要加@babel/plugin-syntax-dynamic-import插件
let asyncModuleWarp = async () => await import('./async')
console.log(asyncModuleWarp().default, 234)
```

``` js
// async.js
export default function() {
    return 'hello, aysnc module'
}
```

> 这样打包会生成两个chunk文件，分别是主文件main.bundle.js以及异步模块文件0.bundle.js

* webpack实现模块的异步加载有点像jsonp的流程。在主js文件中通过在head中构建script标签方式，异步加载模块信息；再使用回调函数webpackJsonpCallback，把异步的模块源码同步到主文件中，所以后续操作异步模块可以像同步模块一样

**源码具体实现流程：**

1. 遇到异步模块时，使用__webpack_require__.e函数去把异步代码加载进来。该函数会在html的head中动态增加script标签，src指向指定的异步模块存放的文件。

2. 加载的异步模块文件会执行webpackJsonpCallback函数，把异步模块加载到主文件中。

3. 所以后续可以像同步模块一样,直接使用__webpack_require__("./src/async.js")加载异步模块。

## 安装使用

#### 全局安装和项目安装

``` bash
# 全局安装
npm install webpack webpack-cli --g

# 项目开发环境中安装
npm install webpack webpack-cli --save-dev
```

#### 示例

**webpack.config.js文件示例**

``` js
const path = require('path');//path是内置的模块，用来设置路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除之前打包的文件

module.exports = {
    entry: './src/js/entry.js', // 入口文件
    output: { // 输出配置
        filename: 'bundle.js', // 输出文件名
        path: path.resolve(__dirname, 'dist/js')  //输出文件路径配置  __dirname代表根目录
    },
    module: {
        rules: [ //样式 loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { //图片 loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    devServer: {//热部署
        contentBase: 'dist/js/' //若为空 webpack-dev-server默认服务于根目录下的index.html
    },
    plugins: [ //插件列表
        new HtmlWebpackPlugin({template: './index.html'}),
        new CleanWebpackPlugin(['dist']),
    ]
};
```

## 应用

> 参考：[前端自动化构建工具](https://www.cnblogs.com/lihuijuan/p/9296315.html) | [Webpack 模块打包原理](https://juejin.im/post/5c94a2f36fb9a070fc623df4)
