# 常用jQuery方法

## 事件操作

#### 鼠标事件

###### $().hover(over, out)

	鼠标移入移出事件执行回调函数：当鼠标移入时执行over回调函数，当鼠标移出时执行out事件回调函数

## jQuery元素操作

#### 同级元素操作

###### $().next()

	获取选中元素的下一个同级元素

``` js
// 获取下一个兄弟节点
while($selectLiYears > firstLiYears){
	$firstLi = $firstLi.next();
	hasExpandClicked = true;
	firstLiYears = $firstLi.data('years');
}
```

###### $().prev()

	获取被选中元素的前一个同级元素

###### $().prevAll()

	获取被选中元素的之前的所有同级元素

###### $().prevUntil()

	获取两个给定参数之间的每个元素之前的所有同级元素

###### $().before(content)

	这里就是将content插入到选中元素前面

``` js
// 在每个 p 元素前插入内容
$("button").click(function(){
	$("p").before("<p>Hello world!</p>");
});
```

###### $().insertBefore(content)

	这里就是将content(HTML 标记或已有的元素)插入到选中元素前面

``` js
// 在每个 p 元素之前插入 span 元素
$("button").click(function(){
	$("<span>Hello world!</span>").insertBefore("p");
});
```

###### $().after(content)

	这里就是将content插入到选中元素后面

###### $().insertAfter(content)

	这里就是将content(HTML 标记或已有的元素)插入到选中元素后面

#### 父子元素操作

###### $().parent()

	获取选中元素的直接父元素对象

###### $().parent()

	获取选中元素的所有父元素对象

###### $().children()

	获取选中元素的所有(指定)子元素

``` js
// 找到类名为 "selected" 的所有 div 的子元素，并将其设置为蓝色
$("div").children(".selected").css("color", "blue");
```

###### $().find()

	获取指定索引的子元素

``` js
var $selectLi = $self.find('li:nth-child('+(srcIndex)+')');
var $firstLi = $self.find('li:first');
$("p:nth-child(3)")
```

* :first表示获取第一个元素
* :last表示获取最后一个元素
* nth-child(3)表示获取第3个元素


###### $().append(content)

	将content插入到父节点(选中元素)的最后一个子节点之后

> 对于JS方法是 appendChild()

``` js
var wrap = $("#wrap");
wrap.append('<p>111111</p>')

// js等同实现
var wrap = document.getElementById('wrap');
wrap.appendChild('<p>111111</p>');
```

###### $().appendTo(content)

	在父节点(content)中的最后一个子节点后面插入

``` js
$('<p>1111</p>').appendTo($('#wrap'));
```

> `<p>1111</p>`插入到`$('wrap')`的子节点的最后面

###### $().prepend(content)

	将content插入到父级元素(选中元素)的最前面

###### $().prependTo(content)

	将选中元素插入到父级元素(content)最前面

#### 元素样式和内容操作

###### $().addClass(css中定义的样式类型)

	给选中元素添加class

###### $().attr({src:"test.jpg",alt:"test Image"})

	给选中元素添加属性/值，使用map对象添加

###### $().attr("src","test.jpg")

	给选中元素添加属性/值，参数为两个：key，value

###### $().attr("title", function() { return this.src });

	给选中元素添加属性/值，同样是两个参数：key，value，但是value可以使用匿名函数实现

###### $().html()

	获得选中元素内的内容（元素，文本等）

###### $().html("<b>new stuff</b>");

	给选中元素设置内容

###### $().text()

	获取选中元素的文本

###### $().text(value)

	设置选中元素的文本值为value

###### $().removeAttr("属性名称")

	根据属性名称移除选中元素的属性

###### $().removeClass("class")

	根据class名称移除选中元素绑定的class样式

###### $().toggleClass(class)

	当元素存在参数中的样式的时候取消，如果不存在就设置此样式

> 即取反

###### $().val()

	选取input选中元素的值

###### $().val(value)

	设置input选中元素的值为value

#### 其它

###### $().remove()

	删除所有选中元素(包括所有文本和子节点)

> 该方法不会把匹配的元素从 jQuery 对象中删除，因而可以在将来再使用这些匹配的元素

**$().remove("exp")**

	删除所有含有exp的元素

###### $().empty()

	清空对应的子节点(选中节点还存在)

###### $().replaceAll()

	用指定的 HTML 内容或元素替换被选元素

``` js
$('#wu').replaceAll($('#shu'));
```

###### $().replaceWith()

	用指定的 HTML 内容或元素替换被选元素

``` js
$('#yu').replaceWith('<li>黄盖</li>');
```

> 与replaceAll()作用一致，但存在语法差异。并且replaceWith() 能够使用函数进行替换

###### $().wrap("html")

	用html来包围选中元素

``` js
$( ".inner" ).wrap( "<div class='new'></div>" );
```

> 例如这里就是将选中元素使用div包含

###### $().wrap(element)

	用element来包围选中元素

> 跟上面理解一样，这个可以使用指定元素对象包含选中元素

###### $().clone(布尔表达式)

	当布尔表达式为true时，克隆元素整体包括事件；为false时，只复制节点本身（包括内部的信息）

``` js
$('#fei').clone(false); //只复制节点本身
$('#fei').clone(true); //复制节点和事件
```

> 无参时，当作true处理

#### 数组操作

###### each()

	$.each()函数不同于JQuery对象的each()方法，它是一个全局函数，不操作JQuery对象，而是以一个数组或者对象作为第1个参数，以一个回调函数作为第2个参数。
	回调函数拥有两个参数：第1个为对象的成员或数组的索引，第2个为对应变量或内容。

``` js
$("span").click(function){
	$("li").each(function(){	// 遍历数组
		$(this).toggleClass("example");	// 对每个数组值进行class：example取反
	});
});
```

## 其它常见

#### ready(fn) {}; $(document).ready() {}

	当页面加载时按顺序执行

> 注意：在body中没有onload事件，否则该函数不能执行。在每个页面中可以有很多个函数被加载执行，按照fn的顺序来执行

#### $(function(){……..})

	执行一个函数

## 应用级

#### ajax()方法

	异步请求方法，用于客户端与服务端交互

> [ajax方法详解](知识笔记/大前端/基础/JavaScript/jQuery/ajax方法详解.md)

#### $.extend(prop)

	用于拓展原有对象方法

``` js
jQuery.extend({
	min: function(a, b) { return a < b ? a : b; },
	max: function(a, b) { return a > b ? a : b; }
});
```

> [JQ的Extend实扩展已经存在的组件](知识笔记/大前端/基础/JavaScript/js原生实现/JQ的Extend实扩展已经存在的组件.md)

> 参考：[jq常用方法](https://blog.csdn.net/lvgaolong/article/details/6663597)
