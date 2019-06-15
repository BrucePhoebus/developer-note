# HTML和css面试题

## CSS常见面试题

> [Web前端试题加答案](https://blog.csdn.net/xm1037782843/article/details/80708533) | [前端全栈试题](https://blog.csdn.net/MingL520/article/details/88549999)

#### 为什么css样式初始化，目的是为了什么

	因为不同浏览器存在兼容问题，不同浏览器对部分标签的默认值是不同的，如果不进行CSS样式初始化会导致浏览器之间页面出现差异

> 目的：解决浏览器兼容问题，重设浏览器样式

#### css弹性布局，哪些地方用到过

	弹性布局可以解决复杂的局部需求
	只需要声明布局应该具有的行为，而不需要给出具体的实现方式，浏览器会负责完成实际的布局
	可以解决多种屏幕尺寸的适配问题，移动端多种屏幕适配、PC端多种屏幕适配，甚至页面从PC端切向移动端也能很好的实现展示效果

> 参考UI框架：bootstrap

**问题**

	在不同浏览器可能出现弹性布局的css不兼容问题，也就是导致展示效果不一样
	这样的话就需要针对各种浏览器做兼容适配

> [参考各大公司样式初始化代码](http://www.cnblogs.com/duke-cui/articles/4779442.html)

#### 一个200*200的div在不同分辨率屏幕上下左右居中，用css实现

```css
div {
	position: absolute;
	width: 200px;
	height: 200px;
	top: 50%;
	left: 50%;
	margin-left: -100px;
	height: -100px;
	z-index: 1000;
}
```

#### 写一个左中右布局占满屏幕，其中左右两块是固定宽度200 ，中间自适应宽，要求先加载中间块，请写出结构及样式

```html
<body>
	<h3>实现三列宽度自适应布局</h3>
	<div id="left">左边</div>
	<div id="right">右边</div>
	<div id="center">中间</div>
</body>
```

```css
html, body {
	margin: 0;

	width: 100%;
}

h3 {
	height: 100px;
	margin: 20px 0 0;
}

#left, #right {
	position: absolute;
	top: 120px;
	width: 200px;
	height: 200px;
	background-color: #ffffff;
}

#left {
	left: 0;
}

#right {
	right: 0;
}

#center {
	height: 200px;
	margin: 2px 210px;
	background-color: #eee;
}
```

#### 阐述清楚浮动的几种方式（常见问题）

* 父级div定义 height

	父级div手动定义height，就解决了父级div无法自动获取到高度的问题。 

**优点**
	
	简单、代码少、容易掌握 

**缺点**

	只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题

* 父级div定义 overflow:hidden

	必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度

**优点**

	简单、代码少、浏览器支持好

4. 结尾处加空div标签 clear:both

	添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度 

**优点**

	简单、代码少、浏览器支持好、不容易出现怪问题

**缺点**

	不少初学者不理解原理；如果页面浮动布局多，就要增加很多空div，让人感觉很不好

#### 解释css sprites ，如何使用？

	CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。

**优点**

	CSS Sprites为一些大型的网站节约了带宽，让提高了用户的加载速度和用户体验，不需要加载更多的图片



## HTML常见面试题

