# 认识Gulp

## 概述

> [Gulp中文官网](https:// www.gulpjs.com.cn/)

#### Gulp简介

	gulp强调的是前端开发的工作流程， 我们可以通过配置一系列的task， 定义task处理的事务（ 例如文件压缩合并、 雪碧图、 启动server、 版本控制等）， 然后定义执行顺序， 来让gulp执行这些task， 从而构建项目的整个前端开发流程。

> 可以理解为：Task Runner

!> 注意：Gulp旨在规范前端开发流程

#### Gulp有什么用

> [解决常见Web开发的大问题](知识笔记/Web开发常见大问题.md)

###### 功能

|gulp插件|功能|
|:---:|:---:|
|gulp-minify-css|文件合并与压缩（css）|
|gulp-uglify和gulp-concat|文件合并与压缩（js）|
|gulp-sass/gulp-less|sass/less预编译|
|gulp-webserver|启动server|
|gulp-rev和gulp-rev-collector|版本控制|

> [Gulp具体API文档](https:// www.gulpjs.com.cn/docs/api/)

#### Gulp安装使用

	安装nodejs - > 全局安装gulp - > 项目安装gulp以及gulp插件 - > 配置gulpfile.js - > 运行任务

> Gulp是一个依赖于 Node.js 的工具. 所以想要使用 Gulp 就必须先[下载和安装 Node.js](http:// nodejs.cn/download/)

**安装**

``` bash
# 全局安装
npm install --global gulp

# 作为项目的开发依赖（devDependencies）安装
npm install --save-dev gulp
```

**使用**

``` js
// 根目录下创建：gulpfile.js
var gulp = require('gulp'); 

gulp.task('default', function() {
	// 默认的任务代码
}); 
```

``` bash
# 运行
gulp

# 运行指定task
gulp <task> <otherTask>
```

#### 插件使用

###### 常见Gulp插件

* gulp-uglify - [压缩js文件](https:// github.com/terinjokes/gulp-uglify)

* gulp-clean-css - [压缩css文件](https:// github.com/scniro/gulp-clean-css)

* gulp-less - [编译less文件](https:// github.com/plus3network/gulp-less)

* gulp-imagemin - [压缩图片](https:// github.com/sindresorhus/gulp-imagemin)

* gulp-watch-path - [检测特定文件以执行命令](https:// github.com/nimojs/gulp-watch-path)

* gulp-autoprefixer - [为css自动添加一些前缀](https:// github.com/sindresorhus/gulp-autoprefixer)

###### 使用Gulp压缩一个js文件

1. 安装插件gulp-uglify

	这个插件就是用于压缩js的

``` bash
npm install gulp-uglify --save-dev
```

2. 在项目中使用gulp-uglify插件

**在gulpfile.js中使用**

``` js
// 获取刚刚安装的gulp
var gulp = require('gulp'); 

// 获取刚刚安装的gulp-uglify模块
var uglify = require('gulp-uglify'); 

// 压缩 js 文件
// 在命令行使用 gulp uglifyscript 启动此任务
gulp.task('uglifyscript', function() {
    // 1. 找到文件
    gulp.src('src/js/*.js')
    	// 2. 压缩文件
        .pipe(uglify())
    	// 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'));
}); 
```

**说明**

* gulp.task(name, fn)：给一个任务起名字, 第一个参数是任务名, 第二个参数一个函数, 定义这个函数要做什么.

* gulp.src(path)：选择文件, 参数是文件路径.

* gulp.dest(path)：输出文件, 参数是文件路径.

* gulp.pipe()：就是把几个任务排队, 然后顺序运行.

3. 执行

``` bash
# 在命令行中执行
gulp uglifyscript
```

> 之后便能在项目根目录下看到 `dist` 文件夹，压缩文件在 `dist/js/...` 

**参考目录**

``` bash
gulpTest/
   ├ dist/
      └ js/
         └ hello.js
   ├ src/
      └ js/
         └ hello.js
   ├ gulpfile.js
   └ package.json
```

4. 优化

	当然，一般我们在项目开发时不会只有干的，因为每次变更都需要手动执行，所以一般我们会使用 自动检查变更 gulp.watch(src, fn)

``` js
// 在之前项目中添加 gulp.watch(src, fn)，使之能监听变化而重新打包
gulp.task('auto', function () {
    // 检查指定目录中的指定文件,如果有发生变动,就执行 "uglifyscript" 命令
    gulp.watch('src/js/*.js', ['uglifyscript'])
})
```

> 运行 `gulp auto` 就能实现实时监听了，只要运行的控制台窗口还在，也就是监听还在就能实时动态打包

!> 一般我们都会讲一些任务放到Gulp的默认执行任务中，也就是输入 gulp 就能执行的任务

``` js
gulp.task('default', function() {
	// 将默认的任务代码放在这
}); 

// 多个任务之间可以用逗号隔开
gulp.task('default', ['uglifyscript', 'auto']); 
```

#### 总结

	Gulp就是一个前端流程管理工具，我们告诉Gulp一个入口，然后告诉他怎么处理这些东西，然后告诉他一个出口，把处理好的东西放到那里去

* 一个入口 : 你需要对哪些文件进行处理

* 要进行什么处理 : 通常都是插件, 上文中的minify(), minify2(), 可以有多个

* 一个出口 : 处理后要把这些文件放在哪里

## 应用

#### 示例

``` js
// 引入的gulp是一个对象
var gulp = require('gulp'); 
// 引入的插件  均为方法
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify'); 
var rename = require('gulp-rename'); 
var less = require('gulp-less'); 
var cssClean = require('gulp-clean-css'); 

// 注册任务(基本语法)
// gulp.task('任务名', function(){
//     // 任务的操作
// 
// })

// 注册 合并压缩js的任务
gulp.task('js', function(){
    return gulp.src('src/js/*.js') // 找到目标源文件，将数据读取到gulp的内存中  *代表全部文件
        .pipe(concat('build.js')) // 参数为 合并后 js文件的名字
        .pipe(gulp.dest('dist/js/')) // 参数为 输出文件到的文件夹  只要还没有操作完说明当前的文件还在内存中
        .pipe(uglify()) // 压缩文件
        .pipe(rename({suffix:".min"}))// 重命名
        .pipe(gulp.dest('dist/js/'));
}); 
// 注册 转换less为css的任务
gulp.task('less', function(){
    // 带上return 为异步 ；不带return 为同步；异步速度快，因为任务可以同时加载，建议用异步
    return gulp.src('src/less/*.less')
        .pipe(less()) // 编译less文件为css文件
        .pipe(gulp.dest('src/css/'))
}); 

// 注册 合并压缩css文件的任务
gulp.task('css', ['less'], function(){ // ['less'] 表示 css任务的执行依赖于less任务，只有当less任务全部执行后，才会开启css任务
    return gulp.src('src/css/*.css') // 找到文件
        .pipe(concat('build.css')) // 合并文件
        .pipe(cssClean()) // 压缩文件
        .pipe(rename({suffix: '.min'})) // 重命名
        .pipe(gulp.dest('dist/css/')); // 输出文件
}); 
// 注册 默认任务
gulp.task('default', ['js', 'less', 'css']); 
```

> 在控制台输入：

* gulp js  会自动执行该 js 任务

* gulp css 会自动执行 该 css 任务

* gulp less 会自动执行该less 任务

* gulp 会自动执行所有任务

##### Gulp项目应用场景

> 参考：[gulp详细入门教程](https://blog.csdn.net/xllily_11/article/details/51393569) | [我又重新认识了Gulp](https://segmentfault.com/a/1190000008073314)

