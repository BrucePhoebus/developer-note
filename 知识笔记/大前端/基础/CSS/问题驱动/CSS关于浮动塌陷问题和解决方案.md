<!--
 * @Description: CSS关于浮动塌陷问题和清除浮动
 * @Date: 2019-08-22 09:34:22
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-22 10:10:25
 -->
# CSS关于浮动塌陷问题和解决方案

## 概述

#### 什么是浮动？

	浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素

* 浮动会脱离文档

	也就是浮动元素悬浮于文档之上，不影响普通元素布局，同样也可能覆盖了普通元素

* 浮动可以内联排列

	多个元素浮动可以页面大小自动换行适配，但同样可能导致页面布局不整齐(也就是被卡住)

* 浮动会导致父元素高度坍塌

	浮动元素脱离父元素，无法撑开父元素，导致父元素高度坍塌的效果

**具体**

* 一个块级元素如果没有设置 height，那么其高度就是由里面的子元素撑开，如果子元素使用浮动，脱离了标准的文档流，那么父元素的高度会将其忽略，如果不清除浮动，父元素会出现高度不够，那样如果设置 border 或者 background 都得不到正确的解析

* 正是因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，也就表现出高度为 0（`高度塌陷`）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度

**参考问题示例**

``` css
.box-wrapper {
  	border: 5px solid red;
}
.box-wrapper .box {
	float: left; 
	width: 100px; 
	height: 100px; 
	margin: 20px; 
	background-color: green;
}
```

``` html
<div class="box-wrapper">
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
</div>
```

> 这个示例可以看出，父元素的高并没有被子元素撑开，也就是子元素脱离父元素浮动，这就是所谓的浮动带来的`父元素高度坍塌问题`

#### 清除浮动的方法

	清除浮动也就是解决浮动带来的负影响，主要是高度坍塌问题

**主流有两种解决方案**

* clear清除浮动

* BFC清除浮动

#### clear清除浮动原理

	clear属性不允许被清除浮动的元素的左边/右边挨着浮动元素

> 底层原理是在被清除浮动的元素上边或者下边添加足够的清除空间

#### BFC清除浮动原理

	BFC全称是块状格式化上下文，它是按照块级盒子布局的

###### BFC的主要特征

*  BFC容器是一个隔离的容器，和其他元素互不干扰，所以我们可以用触发两个元素的BFC来解决垂直边距折叠问题

* BFC可以`包含浮动`；通常用来解决浮动父元素高度坍塌的问题。

> BFC清除浮动原理就是用了`包含浮动`这条特性解决的

###### BFC触发方式

**通过给父元素添加一些元素触发BFC**

* `float` 为 left | right

* `overflow` 为 hidden | auto | scroll

* `display` 为 table-cell | table-caption | inline-block | flex | inline-flex

* `position` 为 absolute | fixed

> 所以我们可以给父元素设置`overflow:hidden`(兼容IE)来简单的实现BFC清除浮动

!> 但是这种解决方案存在一个比较大的问题，谨慎使用

	这样元素阴影或下拉菜单会被截断

#### 浮动使用场景

* 文字环绕效果

	* 在很多新闻、博客等网站常常需要图片被文字环绕的效果，以及我们的试卷等，这些场景还是经常有的

* 页面布局

	* 浮动可以实现常规的多列布局，自适应布局，但是其实现在已经可以使用`inline-block`解决，没必要使用浮动，因为浮动容易破坏布局

## 方案实现

#### clear清除浮动方案

**简单clear属性解决浮动问题**

``` css
.box-wrapper {
  	border: 5px solid red;
}
.box-wrapper .box {
	float: left; 
	width: 100px; 
	height: 100px; 
	margin: 20px; 
	background-color: green;
}
```

``` html
<div class="box-wrapper">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>	
    <div style="clear:both;"></div>
</div>
```

> 可以看出，在最后浮动子元素添加一个`clear:both;`样式的子元素，就能清除子元素浮动带来的坍塌问题

> 注：不能在最后一个浮动元素上加`clear`属性，因为元素本身已经脱离文档，所以加了clear元素是无效的，甚至影响的原有浮动效果

###### clear清除浮动最佳实践

	兼容多种浏览器解决方案

``` css
/* 现代浏览器clearFix方案，不支持IE6/7 */
.clearFix:after {
    display: table;
    content: " ";
    clear: both;
}

/* 
	全浏览器通用的clearFix方案
	引入了zoom以支持IE6/7
 */
.clearFix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearFix{
    *zoom: 1;
}

/* 
	全浏览器通用的clearFix方案【推荐】
	引入了zoom以支持IE6/7
	同时加入:before以解决现代浏览器上边距折叠的问题 
*/
.clearFix:before,
.clearFix:after {
    display: table;
    content: " ";
}
.clearFix:after {
    clear: both;
}
.clearFix{
    *zoom: 1;
}
```

> `clearFix解决方案`完美兼容多种浏览器，优先考虑

#### BFC清除浮动方案

	直接在父元素添加 overflow: hidden; 样式

``` css
.box-wrapper{
  	overflow: hidden;
}
```

> 注：这样处理元素阴影或下拉菜单会被截断

#### 总结

> 一言蔽之：用`clearFix解决方案`就好

> 参考：[CSS中的浮动和清除浮动，梳理一下！](https://www.jianshu.com/p/09bd5873bed4) | [什么时候需要清除浮动，清除浮动有哪些方法？](https://mp.weixin.qq.com/s/SVKMsQtOLNqYXeT_f95FUw)
