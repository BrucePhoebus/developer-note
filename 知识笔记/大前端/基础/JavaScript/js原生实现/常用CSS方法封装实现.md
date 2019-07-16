# 常用CSS方法封装实现

## 前言

	假设封装的对象为Base，将所有相关CSS操作方法都封装到这个对象中

``` js
(function(global) {

	function Base() {};

	var Base = new Base();
	global.Base = global.$ = Base;

	return Base;

})(typeof window !== "undefined" ? window : this)
```


## 基础方法封装

#### 封装getClass()方法

	根据className获取指定class对象数组

``` js
(function(global) {

	function Base() {};

	Base.prototype = {
		// 获取指定class对象数组
		getClass: function(className) {

			// 首先获取所有节点
			var arr = document.getElementByTagName("*");

			// 循环判断当前节点className和传入的className是否一致
			var i,
				len = arr.length;
			for (i = 0; i < len; i++) {

				// 将一致的节点保持到elements数组中，并返回object对象
				this.elements.push(arr[i]);
			}

			return this;
		}
	}

	var Base = new Base();
	global.Base = global.$ = Base;

	return Base;

})(typeof window !== "undefined" ? window : this)
```

**使用**

``` js
$().getClass('red').css("color","blue").html("标题");
```

#### 封装getElement方法

	根据number获取指定getClass()下标的对象

``` js
getElement: function (index) {
	
	// 获取传入的index下标对应的element值
	var element = this.elements[index];	// 注：如果index大于数组长度则值为undefined

	// 情况 this.elements 数组
	this.elements = [];

	// 将获取的element值再加入到数组中,当前数组中只有一个值
    this.elements[0] = element;

    // 返回Base对象
    return this;
}
```

**使用**

``` js
$().getClass('red').getElement(1).css("color","red").html("title");
```






> 参考：[JS实现博客前端页面（二）—— 封装CSS](https://segmentfault.com/a/1190000006866352)
