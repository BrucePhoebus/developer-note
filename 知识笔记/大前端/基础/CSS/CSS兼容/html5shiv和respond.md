# html5shiv和respond

## 概述

	html5shiv：用于解决IE9以下版本浏览器对HTML5新增标签不识别，并导致CSS不起作用的问题

		原理：利用脚本document.createElement("")创建对应的脚本，CSS选择器便可正确应用到该标签

	respond：让不支持css3 Media Query的浏览器包括IE6-IE8等其他浏览器支持查询

> [官网](http://code.google.com/p/html5shiv/) | [GitHub项目地址](https://github.com/aFarkas/html5shiv)

#### html5shiv和respond能解决什么问题？

	因为IE6/IE7/IE8还有很大一部分用户，为了让网站浏览者都能正常的访问HTML5网站，解决方案就有下面两个

		1. 为网站创建多套模板，通过程序对User-Agent的判断给不同的浏览器用户显示不同的页面，这样的维护成本比较高，也失去响应式设计的意义

		2. 使用Javascript来使不支持HTML5的浏览器支持HTML标签。目前大多网站采用的这种方式（Bootcss官方例子也是如此）

1. 存在IE6/IE7/IE8的用户群体，需要让HTML5向下兼容，就可以考虑用这个或这类插件解决IE向下兼容问题

## 使用

	考虑到IE9是支持html5的，所以直接在HTML页面的head标签中添加脚本引用即可

```html
<!--[if lt IE 9]>

<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.js"></script>

<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>

<![endif]—>
```




> 参考：[html5shiv.min.js 有什么作用呢？](https://blog.csdn.net/qikule/article/details/65938640)
