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

#### Webpack的工作方式

* 把项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件，一般都放到dist文件中

> 而打包的dist文件结构有

* js：放所有打包的js文件

* css：放所有打包的css文件

* image：放所有打包的图片资源

#### Webpack与其他打包工具的区别

	与gulp和grunt相比，Webpack的处理速度更快更直接，能打包更多不同类型的文件，更主要的区别还是 webpack是一个模块化打包工具。

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

> 参考：[前端自动化构建工具](https://www.cnblogs.com/lihuijuan/p/9296315.html)
