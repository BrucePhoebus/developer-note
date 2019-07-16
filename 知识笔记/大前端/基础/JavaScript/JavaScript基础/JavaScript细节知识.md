# JavaScript细节

## 变量方面

#### null和undefined的区别

* null在Number中会被自动转为0；而undefined则输出NaN

* null表示`没有对象`或说空对象指针，将null赋值给变量，就表示该变量指向空对象；undefined表示缺少值，意思已声明，但未定义，声明一个变量但不初始化，那么它的值就是undefined

> null主要表示一个变量还没有真正保存对象的时候，它的值就应该为null，这是意料之中的空，而undefined通常表示意料之外的内容，如未初始化的变量，一般来说我们不应该显式的使用undefined

> 我们经常使用null来释放一个无用对象

```js
var emp = ['ss','nn'];
emp = null;     // 释放指向数组的引用
```

**null示例**

```js
var person = null;           // 值为 null(空), 但类型为对象
```

**undefined示例**

```js
var person;                  // 值为 undefined(空), 类型是undefined
person = undefined;          // 值为 undefined, 类型是undefined

var person = undefined;     // 值为 undefined, 类型为 undefined
```

**区别**

```js
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```

#### 声明一个函数有哪几种方法？

	构造函数式、匿名函数式、命名函数式

**常见定义方法**

``` js
function func1([参数]){/*函数体*/}	// 最常用，声明的在哪里都能用
var func2 = function([参数]){/*函数体*/};	// 匿名函数式：类似与func1，但是声明之后才能调用，也就是跟变量一样使用，得在后面使用，否则提示未定义
var func3 = function func4([参数]){/*函数体*/};	// 命名函数式：将func4赋给变量func3，调用方法：func3([函数]);或func4([函数]);同样跟func2类似
var func5 = new Function();	// 构造函数式：实例化一个对象，每次都是创建一个新的对象实例
(function func6() {})	// 函数表达式
```

## 事件方法方面

#### bind()和on()的区别

* bind()：为每个匹配元素的特定事件绑定事件处理函数

	语法：bind(type, [data], fn)
	type：含有一个或多个事件类型的字符串，由空格分隔多个事件。比如"click"或"submit"，还可以是自定义事件名。
	data：作为event.data属性值传递给事件对象的额外数据对象
	fn：绑定到每个匹配元素的事件上面的处理函数

* on()：在选择元素上绑定一个或多个事件的事件处理函数

	语法：on(events, [selector], [data], fn)
	events：一个或多个用空格分隔的事件类型和可选的命名空间。如"click"或"keydown.myPlugin" 。
　　selector：一个选择器字符串用于过滤器的触发事件的选择器元素的后代。如果选择的< null或省略，当它到达选定的元素，事件总是触发。
　　data：当一个事件被触发时要传递event.data给事件处理函数。
　　fn：该事件被触发时执行的函数。 false 值也可以做一个函数的简写，返回false。

**区别**

* 从语法上面看，bind()和on()作用基本一样，只是on()函数多了个`[selector]`可以过滤指定元素

* 但是就是这个`[selector]`参数可以让这两个方法产生了最大的区别，因为它可以实现事件委托，`[selector]`是判断是不是那个子元素触发的事件，如果不是，自然就忽略掉了，这样刚好就符合了事件委托的思想。本质上这个属性是作为过滤器存在

*场景举例*

	如果我们使用bind()在parent上绑定了click事件处理函数，当点击a或者b按钮的时候，都会执行事件处理函数。如果我们希望点击a的时候触发，点击b的时候不触发，那么可以使用on

``` js
$("#parent").on("click","#a",function(){
	alert($(this).attr("id"));
});
```

> 所以可以理解为on()方法是bind()的加强版，一般我们都使用on()进行事件绑定，当然bind()也有它的好处，它适用于几乎所有浏览器

> 注：我们有时候会直接使用.click(function(e){})，这个是属于bind()方法的缩写，可以理解为语法糖

#### jQuery的bind()、live()、delegate()和.on()之间的区别

	这几个方法都属于jQuery的事件绑定方式	

###### Bind()方法

	bind直接绑在目标元素(子元素上)，它解决了各种跨浏览器的问题，当使用它来连接事件处理函数时，它仍然非常简洁，但是也存在着一些性能方面的问题：

> bind()方法将会把事件处理函数连接到所有匹配的标签，这些操作非常浪费，因为这些相同的事件处理函数是被一遍一遍地重复添加到所有匹配的标签上。

``` js
// .bind()方法将事件类型和一个事件处理函数直接注册到了被选中的DOM元素中。
$("#members li a").bind("click",function(e){});
// .click()方法只是.bind()方法的简写
$("#members li a").click(function(e){});
```


**优点**

1. 适用于各种浏览器

2. 连接事件处理函数非常方便快捷

3. 可以使用.click(),.hover()等简写方法来更方便地连接事件处理函数

4. 对于一个简单的ID选择器，使用.bind()方法不仅可以很快地连接事件处理函数，而且当事件被触发时，事件处理函数几乎是马上就被调用了

**缺点**

1. 这样的方法会将所有的事件处理函数附加到所有匹配的元素

2. 不可以动态地匹配相同选择器的元素

3. 当操作大量匹配的元素时会有性能方面的问题

4. 附加操作是在前期完成的，这可能导致页面加载时存在性能问题

###### live()方法

	live()方法使用了事件委托的概念，将与事件处理函数关联的选择器和事件信息一起附加到文档的根元素(document)上，这个事件处理函数将允许所有冒泡到document的事件调用它。 

> jQuery会根据选择器或者事件的元数据来决定哪一个事件处理函数应该被调用，如果这个事件处理函数存在的话。这个额外的工作将会在用户交互时对性能方面造成一定的影响，但是初始化注册时间的过程很快。

``` js
$("#members li a").live("click",function(e){});
```

**优点**

1. 所有的事件处理函数都只会被注册一次，而不是像bind()那样进行多次注册

**缺点**

1. 这个方法在jQuery 1.7以后的版本中被弃用了

2. 使用链式操作没有得到正确的支持，可能会出现某些错误

3. 无法有效使用event.stopPropagation()

4. 因为所连接的事件总是被委托到document上，如果DOM层级很深的话，会导致一定的性能问题

###### Delegate()方法

	delegate()方法与live()方法实现方式类似，也是使用事件委托的原理，但它不是将选择器或者事件信息附加到document上，而是要指定附加的元素。

``` js
//.delegate()方法会将选择器和事件信息("li a","click")附加到指定的元素上("#members")。
$("#members").delegate("li a","click",function(e){});
```

**优点**

1. 可以选择将选择器或事件信息附加到指定的元素上

2. 匹配操作实际上在前面并没有执行，而是用来注册到指定的元素

3. 可以在文档加载完之前连接事件处理函数

4. 链式操作可以得到正确的支持

5. jQuery仍然需要迭代选择器或事件信息来匹配元素，但筛选的量大幅减少

6. 因为使用了事件委托机制，可以匹配到被动态地添加到DOM的元素

**缺点**

1. 从bind()方法不可以直接升级到.delegate()方法

2. jQuery仍然需要使用matchesSelector方法在附加到指定根元素的选择器或者事件信息中筛选决定哪一个事件处理函数会被调用

3. 当操作大量匹配的元素时会有性能方面的问题

4. 附加操作是在前期完成的，这可能导致页面加载时存在性能问题

###### on()方法

	on()方法可以完全做到其它三个方法同样的效果

``` js
//bind
$("#members li a").bind("click",function(e){});
$("#members li a").on("click",function(e){});

//live
$("#members li a").live("click",function(e){});
$(document).on("click","#members li a",function(e){});

//delegate
$("#members").delegate("li a","click",function(e){});
$("#members").on("click","li a",function(e){});
```

**优点**

1. 使各种事件绑定方法一致

2. 这种方式仍然提供了使用delegate()方法的优点，并且仍然提供对bind()方法的支持

**缺点**

1. 使用时会带来一些疑惑，因为方法的实际执行方式将根据如何调用方法而改变

###### 总结

* 一言蔽之：用on()方法就好，想要其他方法的效果也可以使用on()方法实现

> 并且，现在对于常用的事件绑定，完全可以使用`.事件名()`进行绑定

``` js
$(...).事件名(function(e){})
```

> 参考：[jQuery的.bind() .live() .delegate()和.on()之间的区别](https://blog.csdn.net/weixin_38840741/article/details/80272203)
