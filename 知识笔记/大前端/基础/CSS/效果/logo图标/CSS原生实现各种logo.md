<!--
 * @Description: CSS原生实现各种logo
 * @Date: 2019-08-09 10:46:49
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-09 10:49:11
 -->
# CSS原生实现各种logo

## 仿制logo

#### CSS原生仿Google浏览器logo

``` html
<div class="google-logo"></div>
```

``` css
body {
	display: flex;
	background: gray;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.google-logo {
	display: block;
	width: 200px;
	height: 200px;
	border-radius: 100%;
	border: 6px solid white;
	background: radial-gradient(#3e8cf5 26%, white 0, white 30%, transparent 0),
	linear-gradient(60deg, #5dd53a 50%, transparent 0) 0 100%/40% 168%,
	linear-gradient(120deg, #5dd53a 60%, transparent 0) 50% 100%/50% 45%,
	linear-gradient(120deg, red 44%, transparent 0),
	linear-gradient(red, red) 0 0 / 100% 29%,
	linear-gradient(yellow, yellow);
	background-repeat: no-repeat;
}
```

> [CSS原生仿Google浏览器logo效果](知识笔记/大前端/基础/CSS/效果/logo图标/CSS原生仿Google浏览器logo.html)
