<!--
 * @Description: Array.prototype.slice.call()方法详解
 * @Date: 2019-09-04 11:33:22
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-04 14:43:21
 -->

# Array.prototype.slice.call()方法详解

## 基础认识

#### 前言

* 我们经常会看到 `Array.prototype.slice.call()` 的使用，或 `[].slice.call(...)` ，说真的，这个问题我弄了很久

``` js
var args = []; 
var obj = {0:"www",1:"jianshu",2:"com",length:3};
for (var i = 0; i < obj.length; i++) { 
    args.push(obj[i]);
}
console.log(args);  // ["www","jianshu","com"]
// 等价于以下的写法
console.log([].slice.call(obj));  // ["www","jianshu","com"]
```

> 注：为了提高性能，减少一层对原型链的追溯，一般我们会采用以下的写法

``` js
Array.prototype.slice.call(arguments);
```

###### slice什么意思？

* 首先 `Array` 就是数组对象，在js里表示一个类， `slice` 是它的一个方法

``` bash
arrayObject.slice(start, [end]) 
```

* `slice()` 方法的作用跟它的英文含义一样： `截取` ，意思是截取数组

``` js
var arr = ["a", "b", "c", "d"];
arr.slice(1); // ["b", "c", "d"];
```

> 这里arr数组被截取掉第一个元素，就剩下后面的三个

###### call()什么意思？

* `call()` 方法的作用是修改this作用域

``` bash
# thisObj是一个对象的方法 
# arg1 ~ argN是参数
call([thisObj[,arg1[arg2[[argN]]]]]) 
```

**实例：call修改this**

``` js
var a = function(){
     console.log(this);
     console.log(typeof this);
     console.log(this instanceof String);
}
a();
/* 
	Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
	Object
	false
 */

a.call('Phoebus');
/* 
	String {"Phoebus"}
	Object
	true
 */
```

###### 综合起来

* `Array.prototype.slice.call(arguments,1)` 就是 `把调用方法的参数截取出来` 

``` js
function test(a, b, c, d) {
    var arg = Array.prototype.slice.call(arguments, 1);
    alert(arg);
}
test("a", "b", "c", "d"); // b,c,d
```

#### 为什么要这么复杂而不直接调用slice？

	参考jqFloat插件实例

``` js
if (element.data('jDefined')) {
    if (options && typeof options === 'object') {
        methods.update.apply(this, Array.prototype.slice.call(arguments, 1));
    }
} else {
    methods.init.apply(this, Array.prototype.slice.call(arguments, 1));
}
```

**有个问题就是：**

?>多次用到 Array.prototype.slice.call(arguments, 1)，不就是等于 arguments.slice(1) 吗？为什么不直接调用？

* 因为 `arguments` 不是真正的数组，不能直接调用数组的 `slice()` 方法

* 所以我们借助 `call()` ， `Array.prototype.slice.call(arguments, 1)` 可以理解成是让arguments转换成一个数组对象，也就是让 `arguments` 可以调用slice()方法了，而直接调用会报错

``` js
typeof arguments === "Object" // true 不是"Array"
```

## 原理理解

#### slice方法内部实现 

``` js
Array.prototype.slice = function(start,end){
     var result = new Array();
     start = start || 0;
     end = end || this.length; // this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
     for(var i = start; i < end; i++){
        result.push(this[i]);
     }
     return result;
}
```

#### 所以意思结合理解就很简单

* `Array.prototype.slice.call(arguments)` 能将具有 `length属性` 的对象转成 `数组` 

!> 除了IE下的节点集合（因为IE下的DOM对象是以COM对象的形式实现的，js对象与COM对象不能进行转换）

``` js
var a = {
    length: 2,
    0: 'first',
    1: 'second'
}; // 类数组,有length属性，长度为2，第0个是first，第1个是second
// 直接将对象转化为数组
console.log(Array.prototype.slice.call(a, 0)); // ["first", "second"],调用数组的slice(0);

var a = {
    length: 2,
    0: 'first',
    1: 'second'
};
console.log(Array.prototype.slice.call(a, 1)); // ["second"]，调用数组的slice(1);

var a = {
    0: 'first',
    1: 'second'
};	// 去掉length属性，返回一个空数组
console.log(Array.prototype.slice.call(a, 0)); // []

function test() {
    console.log(Array.prototype.slice.call(arguments, 0)); // ["a", "b", "c"]，slice(0)
    console.log(Array.prototype.slice.call(arguments, 1)); // ["b", "c"],slice(1)
}
test("a", "b", "c");
```

## 应用

#### 将函数的实际参数转化为数组

###### 方法一

``` js
var args = Array.prototype.slice.call(arguments)
// 或
var args = Array.prototype.slice.call(arguments, 0)
```

###### 方法二

``` js
var args = [].slice.call(arguments, 0);
```

###### 方法三

	直接for循环转，不过多维应该使用递归，道理简单

``` js
var args = []; 
for (var i = 1; i < arguments.length; i++) { 
    args.push(arguments[i]);
}
```

###### 方法四

	Array.from()方法将一个类似数组或可迭代的对象进行浅拷贝，创建一个新的数组实例

``` js
Array.from(obj);
```

**示例**

``` js
console.log(Array.from('foo'));	// Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));	// [2, 4, 6]
```

###### 通用函数

``` js
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0, len = s.length; i < len; i++){
			arr[i] = s[i];
        }
         return arr;
    }
}
```

> 参考：[Array.prototype.slice.call()方法详解](https://www.cnblogs.COM/dingxiaoyue/p/4948166.html)
