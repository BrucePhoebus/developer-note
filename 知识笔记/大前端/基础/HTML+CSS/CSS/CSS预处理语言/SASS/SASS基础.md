# SASS基础

## 概述

#### 官方描述

	Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。
	Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。

#### SASS和SCSS有什么区别？

1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名

2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

## 使用

#### 安装入门

1. 安装卸载SASS

```bash
# 全局安装
npm install sass -g
# 项目安装
npm install sass -D

# 卸载
npm uninstall sass -D
```

> 一般都是安装到`开发环境`中，生产环境只需要编译好的CSS文件

2. 使用SCSS命令转码

``` bash
scss main.scss main.css
```

> 当然，这是练习中`CMD`手动编译，一般我们都是在打包时自动编译到指定文件，一般都是通过webpack打包管理的

#### 基础示例

###### scss语法

``` scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

**编译后**

``` css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

###### 数据类型

* 数字: 如，1、 2、 13、 10px；

* 字符串：有引号字符串或无引号字符串，如，"foo"、 'bar'、 baz；

* 颜色：如，blue、 #04a3f9、 rgba(255,0,0,0.5)；

* 布尔型：如，true、 false；

* 空值：如，null；

* 值列表：用空格或者逗号分开，如，1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif。

> SassScript 也支持其他 CSS 属性值（property value），比如 Unicode 范围，或 !important 声明。然而，Sass 不会特殊对待这些属性值，一律视为无引号字符串 (unquotedstrings)。

###### 普通变量

	类似声明全局变量，当然嵌套的时候相当于声明局部变量

``` css
$fontSize: 12px;
body {
    font-size:$fontSize;
}

div {
    font-size:$fontSize;
}
```

**n编译后**

``` css
body {
	font-size: 12px;
}

div {
    font-size: 12px;
}
```

###### 默认变量

	在需要默认变量的的变量后面使用!default声明

```scss
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default;
body{
    line-height: $baseLineHeight; 
}
```

**编译后**

``` css
body {
    line-height: 2; 
}
```

###### 变量调用

**按钮示例**

```scss
$brand-primary : darken(#428bca, 6.5%) !default; // #337ab7
$btn-primary-color: #fff !default;
$btn-primary-bg : $brand-primary !default;
$btn-primary-border : darken($btn-primary-bg, 5%) !default;

// 按钮变量调用
.btn-primary {
   background-color: $btn-primary-bg;
   color: $btn-primary-color;
   border: 1px solid $btn-primary-border;
}
```

**编译后**

``` css
.btn-primary {
  background-color: #337ab7;
  color: #fff;
  border: 1px solid #2e6da4;
}
```

###### 全局变量与局部变量

	通过嵌套使用就能声明局部变量，貌似可以称作全局变量 $color 的影子，当然这是作用域的知识，对于了解作用域的人来说，这很容易理解

```scss
$color: orange !default;//定义全局变量
.block {
  color: $color;//调用全局变量
}
em {
  $color: red;//定义局部变量（全局变量 $color 的影子）
  a {
    color: $color;//调用局部变量
  }
}
```

###### 声明混合宏

	使用“@mixin”来声明混合宏

```scss
// 不带参数的混合宏
@mixin border-radius{
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

// 带参数的混合宏，属于一个默认值
@mixin border-radius($radius:5px){
    -webkit-border-radius: $radius;
    border-radius: $radius;
}

// 复杂的混合宏
@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else{
    $shadow:0 0 4px rgba(0,0,0,.3);
    @include prefixer(box-shadow, $shadow);
  }
}
```

> 使用@if @else能实现简单的逻辑；当参数为多个的时候可以使用$shadow...，`...`表示参数大于等于1，当然这里表示多个阴影值，反之调用默认的参数值“ 0 0 4px rgba(0,0,0,.3) 

**调用混合宏**

	其实道理跟调用变量完全是一样的

```scss
@mixin border-radius{
    -webkit-border-radius: 3px;
    border-radius: 3px;
}

button {
    @include border-radius;
}
```

**编译后**

``` css
button {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
```

## 问题

#### 混合宏存在问题

	混合宏在实际编码中给我们带来很多方便之处，特别是对于复用重复代码块。但其最大的不足之处是会生成冗余的代码块。

###### 在不同的地方调用一个相同的混合宏时

```scss
@mixin border-radius{
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

.box {
  @include border-radius;
  margin-bottom: 5px;
}

.btn {
  @include border-radius;
}
```

**编译后**

``` css
.box {
  -webkit-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.btn {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
```

> 这里明显可以看出，Sass 在调用相同的混合宏时，并不能智能的将相同的样式代码块合并在一起。这也是 Sass 的混合宏最不足之处。

> 参考：[H小志-SASS学习笔记](https://blog.csdn.net/xiaozhi_2016/article/details/53636788)
