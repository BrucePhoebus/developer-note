# W3C规范

## W3C代码标准规范

> [W3C 代码标准规范](https://www.w3cschool.cn/xuexiw3c/xuexiw3c-standards.html)

## 概述

#### 为啥要遵守W3C规范？

	现在是互联网世界，为啥有它的出现，很大程度上是我们都遵循了TCP/IP协议，这让我们可以实现万物互联；
	同样的，经历过浏览器兼容的人就知道，为啥那么多兼容问题，就因为浏览器厂商们开战了，各用各的标准，虽然现在越来越统一，但历史遗留问题依然让很多开发者要掌握各种兼容知识(大前端越来越大，都要学不动了，以后估计是越来越专业化了)
	所以总结了之后，规范化、统一化才是光明大道，不然大家都搞自己的一套，玩什么互联网呢

> 实际上，遵守W3C规范还是有很多世纪的好处，看后面：<a href="#/知识笔记/规范标准/W3C规范/W3C规范?id=使用w3c标准的好处">使用W3C标准的好处</a>

#### 简述规范标准

###### 1. 需要声明（DOCTYPE）

	DOCTYPE（document type）文档类型的简写，用来说明我们用的XHTML或者HTML是什么版本。

* 其中DTD叫文档类型定义，里面包含了文档的规则，浏览器就根据我们定义的DTD来解释页面的标识，并展现出来

* 要建立符合标准的网页，DOCTYPE声明是必不可少的关键组成部分；除非我们的XHTML确定了一个正确的DOCTYPE，否则我们的标识和css都不会生效。 有过度的（Transitional）、严格的（strict）、框架的（frameset）

###### 2. 需要定义语言编码

	如果忘记了定义语言编码，可能会出现页面乱码现象

``` html
<meta http-equiv=“Content-Type” content=“text/html; charset=UTF-8 />
```

###### 3. JavaScript定义

	Js必须要用<script language="javascript" type="text/javascript">来开头定义
	
> 以保证在不支持js的浏览器上直接显示出来

###### 4. CSS定义

	CSS必须要用<style type=“text/css”>开头来定义

* 为保证各浏览器的兼容性，在写CSS时都写上数量单位

**例如**

``` css
/* 错误： */
.space_10{
	padding-left: 10
} 

/* 正确： */
.space_10 {
	padding-left: 10px
}
```

###### 5. 使用注释

	正确的应用等号或者空格替换内部的虚线

``` html
<!-- 无效的： -->
<!--这里是注释-----------这里是注释-->

<!-- 正确的： -->
<!--这里是注释============这里是注释-->
```

###### 6. 所有标签的元素和属性名字都必须使用小写

	与HTML不一样，XHTML对大小写是敏感的，<title>和<TITLE>是不同的标签。XHTML要求所有的标签和属性的名字都必须使用小写

**例如**

``` bash
<BODY>必须写成<body>。大小写夹杂也是不被认可的
```
> 通常DreamWeaver自动生成的属性名字"onMouseOver"也必须修改成"onmouseover"

###### 7. 所有属性值必须用引号括起来（"" ''）双引号或单引号

**例如**

``` bash
<height=80>必须修改为：<height="80">
```

> 特殊情况：我们需要在属性值里使用双引号，我们可以用"，单引号可以使用&apos;

``` html
<alt="say&apos;hello&apos;">
```

###### 8. 把所有特殊符号用编码表示

	任何小于号（<），不是标签的一部分，都必须被编码为 &lt;
	任何大于号（>），不是标签的一部分，都必须被编码为 &gt;
	任何与号（&），不是实体的一部分的，都必须被编码为 &amp; 

``` bash
# 错误：
http://club.china.alibaba.com/forum/thread/search_forum.html?action=SearchForum&doSearchForum=true&main=1&catcount=10&keywords=mp3 

# 正确：
http://club.china.alibaba.com/forum/thread/search_forum.html?action=SearchForum&amp;doSearchForum=true&amp;main=1&amp;catcount=10&amp;keywords=mp3
```

###### 9. 所有属性必须有属性值

	XHTML规定所有属性都必须有一个值，没有值的就重复本身

``` html
<!-- 错误： -->
<td nowrap><input type="checkbox" name="shirt" value="medium" checked>

<!-- 必须修改为： -->
<td nowrap="nowrap"><input type="checkbox" name="shirt" value="medium" checked="checked" />
```

> 这个value就是要求的默认值

###### 10. 命名空间 namespace

	通常我们HTML4.0的代码只是<html>，但是其实我们看以前的网站，经常会发现html标签处有xmlns这个属性，带有长长的一串值

``` html
<html xmlns="http://www.w3.org/1999/xhtml" lang="gb2312">
```

	而这个"xmlns"是XHTML namespace的缩写，叫做"命名空间"声明

> XHTML是HTML向XML过渡的标识语言，它需要符合XML文档规则，因此也需要定义名字空间。又因为XHTML1.0不能自定义标识，所以它的名字空间都相同，就是"http://www.w3.org/1999/xhtml"。目前阶段我们只要照抄代码就可以了

	当然实际上我们现在使用HTM5都是没有这个的，或者说我们省略掉了，HTML5不需要刻意声明，但是如果我们使用HTML4.0，就需要加上去，强制使用这个HTML版本规范

###### 11. 所有的标记都必须有相应的结束标记

	XHTML要求有严谨的结构，所有标签必须关闭，有双标记关闭方式和单标记闭合方式

``` html
<!-- 双标记： -->
<div></div> 

<!-- 单标记： -->
<img />

<!-- 错误： -->
Document.write("<td width=\"300\"><a href=\"1.html\">ok</a></td>");
<!-- 正确: -->
Document.write("<td width=\"300\"><a href=\"1.html\">ok<\/a><\/td>");
```

> 在js中，原已结束的标签需要再转义再结束

###### 12. 所有的标记都必须合理嵌套 

	同样因为XHTML要求有严谨的结构，因此所有的嵌套都必须按顺序，也就是合理的标签结构

``` html
<!-- 错误： -->
<p><b></p></b>
<!-- 必须修改为： -->
<p><b></b></p> 

<!-- 错误： -->
<table><tr><form><td></td></form></tr></table>
<!-- 正确： -->
<form><table><tr><td></td></tr></table></form>
```

###### 13. 图片添加有意义的alt属性

	图片加载失败时可以用alt属性表明图片内容。同理添加文字链接的title属性，帮助显示不完整的内容显示完整

``` html
<a href="#" target="_blank" title="新闻新闻新闻新闻">新闻新闻…</a>
```

> 在一些限定字数的内容展示尤为重要，帮助显示不完成的内容显示完整，而不用考虑页面会因此而撑大

###### 14. 在form表单中增加label，以增加用户友好度 

``` html
<form action="http://somesite.com/prog/adduser" method="post">
	<label for="firstName">first name: </label>
	<input type="text" id="firstName" />
	<label for="lastName">last name: </label>
	<input type="text" id="lastName" />
</form>
```

#### 使用W3C标准的好处

1. 标签规范可以提高搜索引擎对页面的抓取效率，对SEO（搜索引擎优化）很有帮助

2. 尽量使用外链css样式表和js脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验

3. 样式尽量少用行间样式表，使结构与表现分离，标签的id和class等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版

!> 特别强调：jQuery不符合W3C标准

> 参考：[前端面试——W3C标准及规范](https://blog.csdn.net/erdfty/article/details/81363893) | [W3CSchool](https://www.w3cschool.cn/xuexiw3c/xuexiw3c-standards.html)
