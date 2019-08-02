# 常用jQuery方法

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

## 事件方法

#### 其它事件

###### ready(fn)

	$(document).ready()
	在每个页面中可以有很多个函数被加载执行，按照fn的顺序来执行

> 注意在body中没有onload事件，否则该函数不能执行

###### bind( type, [data], fn )

	为每一个匹配元素的特定事件（像click）绑定一个或多个事件处理器函数

* 可能的事件属性：

	blur, focus, load, resize, scroll, unload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, keyup, error

###### one( type, [data], fn )

	为每一个匹配元素的特定事件（像click）绑定一个或多个事件处理器函数

> 在每个对象上，这个事件处理函数只会被执行一次。其他规则与bind()函数相同

###### trigger( type, [data] )

	在每一个匹配的元素上触发某类事件

###### triggerHandler( type, [data] ) 

	这一特定方法会触发一个元素上特定的事件(指定一个事件类型)，同时取消浏览器对此事件的默认行动

###### unbind( [type], [data] ) - 取消事件绑定

	从每一个匹配的元素中删除绑定的事件

``` js
$("p").unbind() 移除所有段落上的所有绑定的事件
$("p").unbind( "click" ) 移除所有段落上的click事件
```

###### $().hover(over, out)

	鼠标移入移出事件执行回调函数：当鼠标移入时执行over回调函数，当鼠标移出时执行out事件回调函数

``` js
$("p").hover(
	// 移入时触发回调
	function(){
		$(this).addClass("over");
	},
	// 移出时触发回调
	function(){
		$(this).addClass("out");
	}
);
```

###### toggle( fn, fn ) 

	如果点击了一个匹配的元素，则触发指定的第一个函数，当再次点击同一元素时，则触发指定的第二个函数，一般用做反转操作

``` js
$("p").toggle(
	function(){
		$(this).addClass("selected");
	},
	function(){
		$(this).removeClass("selected");
	}
);
```

#### 元素事件

###### change() 

	用户改变域的内容 input, textarea, select

###### click() 

	鼠标点击某个对象 几乎所有元素

###### dblclick() 

	鼠标双击某个对象 几乎所有元素

###### load( fn ) 

	某个页面或图像被完成加载 window, img

###### error() 

	当加载文档或图像时发生某个错误 window, img

###### focus() 

	元素获得焦点 a, input, textarea, button, select, label, map, area

###### blur() 

	元素失去焦点 a, input, textarea, button, select, label, map, area

###### keydown() 

	某个键盘的键被按下 几乎所有元素

###### keypress() 

	某个键盘的键被按下或按住 几乎所有元素

###### keyup() 

	某个键盘的键被松开 几乎所有元素

###### mousedown( fn ) 

	某个鼠标按键被按下 几乎所有元素

###### mousemove( fn ) 

	鼠标被移动 几乎所有元素

###### mouseout( fn ) 

	鼠标从某元素移开 几乎所有元素

###### mouseover( fn ) 

	鼠标被移到某元素之上 几乎所有元素

###### mouseup( fn ) 

	某个鼠标按键被松开 几乎所有元素

###### resize( fn ) 

	窗口或框架被调整尺寸 window, iframe, frame

###### scroll( fn ) 

	滚动文档的可视部分时 window

###### select() 

	文本被选定 document, input, textarea

###### submit() 

	提交按钮被点击 form

###### unload( fn ) 

	用户退出页面 window

#### 特效方法

###### show() 

	显示隐藏的匹配元素

###### show( speed, [callback] ) 

	以优雅的动画显示所有匹配的元素，并在显示完成后可选地触发一个回调函数。

###### hide() 

	隐藏所有的匹配元素。

###### hide( speed, [callback] ) 

	以优雅的动画隐藏所有匹配的元素，并在显示完成后可选地触发一个回调函数

###### toggle() 

	切换元素的可见状态。如果元素是可见的，切换为隐藏的；如果元素是隐藏的，切换为可见的。

###### slideDown( speed, [callback] ) 

	通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数。
	这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式显示出来。

###### slideUp( speed, [callback] ) 

	通过高度变化（向上减小）来动态地隐藏所有匹配的元素，在隐藏完成后可选地触发一个回调函数。
	这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式隐藏起来。

###### slideToggle( speed, [callback] ) 

	通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。 
	这个动画效果只调整元素的高度，可以使匹配的元素以"滑动"的方式隐藏或显示。

###### fadeIn( speed, [callback] ) 

	通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数。 
	这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。

##### fadeOut( speed, [callback] ) 
	
	通过不透明度的变化来实现所有匹配元素的淡出效果，并在动画完成后可选地触发一个回调函数。 
	这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。

###### fadeTo( speed, opacity, [callback] ) 

	把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数。 
	这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。

###### stop() 

	停止所有匹配元素当前正在运行的动画。如果有动画处于队列当中，他们就会立即开始。

###### queue() 

	取得第一个匹配元素的动画序列的引用(返回一个内容为函数的数组)

###### queue( callback ) 

	在每一个匹配元素的事件序列的末尾添加一个可执行函数，作为此元素的事件函数

###### queue( queue ) 

	以一个新的动画序列代替所有匹配元素的原动画序列

###### dequeue() 

	执行并移除动画序列前端的动画

###### animate( params, [duration], [easing], [callback] ) 

	用于创建自定义动画的函数。

###### animate( params, options ) 

	创建自定义动画的另一个方法。作用同上。

#### 匹配查找方法

###### eq( index ) 

	从匹配的元素集合中取得一个指定位置的元素，index从0开始

###### filter( expr ) 

	返回与指定表达式匹配的元素集合，可以使用","号分割多个expr，用于实现多个条件筛选

###### filter( fn ) 

	利用一个特殊的函数来作为筛选条件移除集合中不匹配的元素。

###### is( expr ) 

	用一个表达式来检查当前选择的元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。

###### map( callback ) 

	将jQuery对象中的一组元素利用callback方法转换其值，然后添加到一个jQuery数组中。

###### not( expr ) 

	从匹配的元素集合中删除与指定的表达式匹配的元素。

###### slice( start, [end] ) 

	从匹配元素集合中取得一个子集，和内建的数组的slice方法相同。

###### add( expr ) 

	把与表达式匹配的元素添加到jQuery对象中。

###### children( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合。可选的过滤器将使这个方法只匹配符合的元素(只包括元素节点，不包括文本节点)。

###### contexts() 

	取得一个包含匹配的元素集合中每一个元素的所有子孙节点的集合(只包括元素节点，不包括文本节点)，如果元素为iframe，则取得其中的文档元素

###### find( expr ) 

	搜索所有与指定表达式匹配的元素。

###### next( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。

###### nextAll( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素所有的后面同辈元素的元素集合

###### parent( [expr] ) 

	取得一个包含着所有匹配元素的唯一父元素的元素集合。

###### parents( [expr] ) 

	取得一个包含着所有匹配元素的唯一祖先元素的元素集合（不包含根元素）。

###### prev( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合。

###### prevAll( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素的之前所有同辈元素的元素集合。

###### siblings( [expr] ) 

	取得一个包含匹配的元素集合中每一个元素的所有同辈元素的元素集合。

###### andSelf() 

	将前一个匹配的元素集合添加到当前的集合中取得所有div元素和其中的p元素，添加border类属性。取得所有div元素中的p元素，添加background类属性

``` js
$("div").find("p").andSelf().addClass("border");
$("div").find("p").addClass("background");
```

###### end() 

	结束当前的操作，回到当前操作的前一个操作找到所有p元素其中的span元素集合，然后返回p元素集合，添加css属性

``` js
$("p").find("span").end().css("border", "2px red solid");
```

#### JQ CSS 方法

###### css( name ) 

	访问第一个匹配元素的样式属性。

###### css( properties ) 

	把一个"名/值对"对象设置为所有匹配元素的样式属性。

``` css
$("p").hover(
	function () {
		$(this).css({ backgroundColor:"yellow", fontWeight:"bolder" });
	}, 
	function () {
		var cssObj = {
			backgroundColor: "#ddd",
			fontWeight: "",
			color: "rgb(0, 40, 244)"
		}
		$(this).css(cssObj);
	}
);
```

###### css( name, value ) 

	在所有匹配的元素中，设置一个样式属性的值。

###### offset( ) 

	取得匹配的第一个元素相对于当前可视窗口的位置。返回的对象有2个属性，top和left，属性值为整数。这个函数只能用于可见元素。

``` css
var p = $("p:last");
var offset = p.offset();
p.html( "left: " + offset.left + ", top: " + offset.top );
```

###### width( ) 

	取得当前第一匹配的元素的宽度值，

###### width( val ) 

	为每个匹配的元素设置指定的宽度值。

###### height( ) 

	取得当前第一匹配的元素的高度值，

###### height( val ) 

	为每个匹配的元素设置指定的高度值

#### JQ 工具方法

###### jQuery.browser.mise

	true表示IE

###### jQuery.browser.version 

	读取用户浏览器的版本信息

###### jQuery.boxModel 

	检测用户浏览器针对当前页的显示是否基于w3c CSS的盒模型

###### jQuery.isFunction( obj ) 

	检测传递的参数是否为function

``` js
function stub() {}
var objs = [
	function () {},
	{ x:15, y:20 },
	null,
	stub,
	"function"
];
jQuery.each(objs, function (i) {
	var isFunc = jQuery.isFunction(objs[i]);
	$("span:eq( " + i + ")").text(isFunc);
});
```

###### jQuery.trim( str ) 

	清除字符串两端的空格，使用正则表达式来清除给定字符两端的空格

###### jQuery.each( object, callback ) 

	一个通用的迭代器，可以用来无缝迭代对象和数组

###### jQuery.extend( target, object1, [objectN] ) 

	扩展一个对象，修改原来的对象并返回，这是一个强大的实现继承的工具，这种继承是采用传值的方法来实现的，而不是JavaScript中的原型链方式。

``` js
// 合并settings和options对象，返回修改后的settings对象
var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
jQuery.extend(settings, options);	// settings对象已经被修改，也就是合并了options对象属性
```

``` js
// 合并defaults和options对象，defaults对象并没有被修改。options对象中的值代替了defaults对象的值传递给了empty。
var empty = {}
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
var settings = $.extend(empty, defaults, options);
```

###### jQuery.grep( array, callback, [invert] ) 

	通过一个筛选函数来去除数组中的项

``` js
$.grep( [0,1,2], function(n, i){
	return n > 0;
});
```

###### jQuery.makeArray( obj ) 

	将一个类似数组的对象转化为一个真正的数组
	将选取的div元素集合转化为一个数组

``` js
var arr = jQuery.makeArray(document.getElementsByTagName("div"));
arr.reverse(); // use an Array method on list of dom elements
$(arr).appendTo(document.body);
```

###### jQuery.map( array, callback ) 

	使用某个方法修改一个数组中的项，然后返回一个新的数组

###### jQuery.inArray( value, array ) 

	返回value在数组中的位置，如果没有找到，则返回-1

###### jQuery.unique( array ) 

	删除数组中的所有重复元素，返回整理后的数组

#### JQ选择器

###### 基本选择器

* id选择器：$("#myDiv") 

	匹配唯一的具有此id值的元素

* 元素选择器：$("div") 
	
	匹配指定名称的所有元素

* 类选择器：$(".myClass") 

	匹配具有此class样式值的所有元素

* 通配符选择器：$("*") 

	匹配所有元素

* 级联选择：$("div,span,p.myClass") 

	联合所有匹配的选择器

###### 层叠选择器

* 后代选择器：$("form input") 

	选择form的所有input子孙节点

* 子选择器：$("#main > *") 

	选择#main的所有子节点

* 临选择器(直接兄弟选择器)：$("label + input") 

	label的下一个节点是input的元素

* 同胞(兄弟)选择器：$("#prev ~ div") 

	选择prev的所有是div的兄弟节点

###### 基本过滤选择器

* $("tr:first") 

	匹配第一个选择的元素

* $("tr:last") 

	匹配最后一个选择的元素

* $("input:not(:checked) + span")

	从原元素集合中过滤掉匹配selector的所有元素（这里有是一个临选择器）

* $("tr:even") 

	匹配集合中偶数位置的所有元素(从0开始)

* $("tr:odd") 

	匹配集合中奇数位置的所有元素(从0开始)

* $("td:eq(2)") 

	匹配集合中指定位置的元素(从0开始)，这里eq(2)就是匹配第三个

* $("td:gt(4)") 

	匹配集合中指定位置之后的所有元素(从0开始)

* $("td:gl(4)") 

	匹配集合中指定位置之前的所有元素(从0开始)

* $(":header") 

	匹配所有标题

* $("div:animated") 

	匹配所有正在运行动画的所有元素

###### 内容过滤选择器

* $("div:contains('John')") 

	匹配含有指定文本的所有元素

* $("td:empty") 

	匹配所有空元素(只含有文本的元素不算空元素)

* $("div:has(p)") 

	从原元素集合中再次匹配所有至少含有一个selector的所有元素

* $("td:parent") 

	匹配所有不为空的元素(含有文本的元素也算)

* $("div:hidden") 

	匹配所有隐藏的元素，也包括表单的隐藏域

* $("div:visible") 
	
	匹配所有可见的元素

###### 属性过滤选择器

* $("div[id]") 

	匹配所有具有指定属性的元素

* $("input[name='newsletter']") 

	匹配所有具有指定属性值的元素

* $("input[name!='newsletter']") 

	匹配所有不具有指定属性值的元素

* $("input[name^='news']") 

	匹配所有指定属性值以value(news)开头的元素

* $("input[name$='letter']") 

	匹配所有指定属性值以value(letter)结尾的元素

* $("input[name*='man']") 

	匹配所有指定属性值含有value字符的元素

* $("input[id][name$='man']") 

	匹配同时符合多个选择器的所有元素

###### 子元素过滤选择器

* $("ul li:nth-child(2)")、$("ul li:nth-child(odd)")、$("ul li:nth-child(3n + 1)")

	匹配父元素的第n个子元素

* $("div span:first-child") 

	匹配父元素的第1个子元素

* $("div span:last-child") 

	匹配父元素的最后1个子元素

* $("div button:only-child") 

	匹配父元素的唯一1个子元素

###### 表单元素选择器

* $(":input") 

	匹配所有的表单输入元素，包括所有类型的input, textarea, select 和 button

* $(":text") 

	匹配所有类型为text的input元素

* $(":password") 

	匹配所有类型为password的input元素

* $(":radio") 

	匹配所有类型为radio的input元素

* $(":checkbox") 

	匹配所有类型为checkbox的input元素

* $(":submit") 

	匹配所有类型为submit的input元素

* $(":image") 

	匹配所有类型为image的input元素

* $(":reset") 

	匹配所有类型为reset的input元素

* $(":button") 

	匹配所有类型为button的input元素

* $(":file") 

	匹配所有类型为file的input元素

* $(":hidden") 

	匹配所有类型为hidden的input元素或表单的隐藏域

###### 表单元素过滤选择器

* $(":enabled") 

	匹配所有可操作的表单元素

* $(":disabled") 

	匹配所有不可操作的表单元素

* $(":checked") 

	匹配所有已点选的元素

* $("select option:selected") 

	匹配所有已选择的元素

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
