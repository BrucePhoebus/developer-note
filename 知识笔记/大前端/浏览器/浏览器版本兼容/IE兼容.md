# IE兼容说明

## 各种针对性兼容问题

#### 解决IE8及低版本浏览器不支持HTML5标签属性

	html5新标签<head>、<nav>、<footer>兼容性

**兼容处理**

	IE8或更早的版本不支持HTML5的<nav>标签和媒介查询（MediaQuery）。我们需要引用css3-mediaqueries.js（或者respond.js）和html5shim.js来提供支持。如果不打算使用html5shim.js，可以把<nav>标签用<div>代替。

```html
<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/files/css3-mediaqueries.js"></script>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

> [CSS各种兼容实现汇总](知识笔记/大前端/基础/HTML+CSS/CSS/各种兼容实现汇总.md)


## js判断浏览器是不是IE

```js
function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
	}
} else {
    return false;
}
```


