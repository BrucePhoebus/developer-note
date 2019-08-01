# 理解和实现bind、call和apply三个函数

## 概述

#### bind、call和apply的一些基本认识

	call、apply、bind的作用是改变函数运行时this的指向

#### bind、call和apply都是干什么用的(解决什么问题？)

	看它们的作用就知道，解决this指向的问题(当然不止如此)

**问题：**

	首先，我们要知道this是表示事件源DOM，对象，也可以说上下文对象，但是在有些时候，因为JavaScript的this机制，this的指向或许不想我们想像的那样

``` js
var a = 1;
function f1(fn){
    fn();
    console.log(a);	// 1
}
f1(f2);

function f2(){
    var a = 2;
}
```

> 在这个例子中或许我们想打印的是f2方法中的a值2，但是实际上输出的却是1，因为这个a其实是调用全局对象的a值1，但是我们可以通过call()方法绑定this为f1方法域：`fn1.call(f2)`，修改this作用域(指向)

* 或者说

``` js
var a = 1;
var obj = {
    a: 2,
    fn: function(){
        console.log(this.a);	// 2
    }
}
```

> 我们可以看出这里的this指向obj对象；obj.fn()可以理解为obj.fn.call(obj)，也就是谁调用这个对象(函数)，那么这个this就是谁


* 还有我们经常遇到的setTimeout的this指向问题

``` js
document.addEventListener('click', function(e){
    console.log(this);	// document
    setTimeout(function(){
        console.log(this);	// window
    }, 200);
}, false);  
```

> 第一个this指向很简单，就是click事件源DOM对象，但是setTimeout中的对象就不是了，它其实可以这么理解：f1.call(null, f2)，如果call传null或undefined就说明这个this指向window全局对象

* 当然，这个三个修改this指向的方法都有点稍微不同，例如：call()

	call方法第一个参数是要绑定给 this 的值，后面传入的是一个参数列表

	> 注：如果第一个参数传如null或undefined就说明这个this指向window全局对象

* 首先，是参数是要参数列表，也就是一个个值组成

``` js
var arr = [1, 2, 3, 89, 46]
var max = Math.max.call(null, arr[0], arr[1], arr[2], arr[3], arr[4]);	// 89
```

* 然后看看this指向的修改，很简单

``` js
var obj = {
    message: 'My name is: '
}

function getName(firstName, lastName) {
    console.log(this.message + firstName + ' ' + lastName);	// My name is: Dot Dolby
}

getName.call(obj, 'Dot', 'Dolby');
```

> 我们可以看出，这里传入的this对象是obj对象，也就是将会传入obj对象作为this指向，那么这个`this.message`的值其实就是`obj.message`的值了

* 同样的apply()函数作用一样，但是它的第二个参数是一个参数数组

``` js
var arr = [1,2,3,89,46]
var max = Math.max.apply(null, arr);	// 89
```

> 很简单，用法基本跟call一样，只是参数传递方式不同而已

``` js
var obj = {
    message: 'My name is: '
}

function getName(firstName, lastName) {
    console.log(this.message + firstName + ' ' + lastName);
}

getName.apply(obj, ['Dot', 'Dolby']);	// My name is: Dot Dolby
```

> 不过这里还是可以看出，虽然传入的是一个数组，但是接收的时候还是要对应变量接收，否则接收不到的

**特殊用法**

	call和apply可用来借用别的对象的方法

``` js
var Person1  = function () {
    this.name = 'Dot';
}
var Person2 = function () {
    this.getName = function () {
        console.log(this.name);
    }
    Person1.call(this);
}
var person = new Person2();
person.getName();       // Dot
```

> 可以看出，这里通过call()方法修改了this指向的方法，使用 Person1 对象代替 this 对象，这样就可以使用Person1对象的属性和方法

* 至于bind()方法，作用和call类似，可以实现this指向的问题，但是它的功能更加强大，可以返回一个改变了上下文 this 后的函数(也就是修改后的函数)，当然，参数跟call一样

``` js
var obj = {
    name: 'Dot'
}

function printName() {
    console.log(this.name)
}

var dot = printName.bind(obj)
console.log(dot) // function () { … }
dot()  // Dot
```

> 这里可以比较直接的看出，一方面`bind()`方法修改了`printName()`函数的this指向，使得printName()可以使用obj对象的属性name，另外，它将修改后的函数整体返回，赋值给了dot，这样我们就能保存这个结果，方便之后的使用

``` js
function fn(a, b, c) {
    console.log(a, b, c);
}
var fn1 = fn.bind(null, 'Dot');

fn('A', 'B', 'C');            // A B C
fn1('A', 'B', 'C');           // Dot A B
fn1('B', 'C');                // Dot B C
fn.call(null, 'Dot');      // Dot undefined undefined
```

> 这里，call 是把第二个及以后的参数作为 fn 方法的实参传进去(没有就是undefined)，而 fn1 方法的实参实则是在 bind 中参数的基础上再往后排



## 应用

#### bind、call和apply的应用场景

###### bind实现函数柯里化

	首先简单认识下函数珂里化：是把接受多个参数的函数变换成接受一个单一参数(原函数第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术

**简单示例**

``` js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);	// 3

addTen(2);	// 12
```

``` js
function original(x){
  this.a = 1;
  this.b = function(){
	return this.a + x;
  }
}
var obj={
  a = 10;
}
var newObj = new(original.bind(obj, 2)); // 传入了一个实参2

console.log(newObj.a);  // 输出1, 说明返回的函数用作构造函数时obj(this的值)被忽略了
console.log(newObj.b()); // 输出3 ，说明传入的实参2传入了原函数original
```

> 注：这是ES5的特性了，函数柯里化：将多个参数的函数变成只带一个参数的函数

###### 求数组中的最大和最小值

``` js
var arr = [1,2,3,89,46]
var max = Math.max.apply(null,arr);	// 89
var min = Math.min.apply(null,arr);	// 1
```

###### 将类数组转化为数组

``` js
var trueArr = Array.prototype.slice.call(arrayLike)
```

###### 数组追加

``` js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var total = [].push.apply(arr1, arr2);//6
// arr1 [1, 2, 3, 4, 5, 6]
// arr2 [4,5,6]
```

###### 判断变量类型(尤其是引用类型)

``` js
function isArray(obj){
    return Object.prototype.toString.call(obj) == '[object Array]';
}
isArray([]) // true
isArray('dot') // false
```

###### 利用call和apply做继承

``` js
function Person(name,age){
    // 这里的this都指向实例
    this.name = name;
    this.age = age;
    this.sayAge = function(){
        console.log(this.age);
    }
}
function Female(){
    Person.apply(this, arguments);	// 将父元素所有方法在这里执行一遍就继承了
}
var dot = new Female('Dot',2);
```

###### 使用 log 代理 console.log

``` js
function log(){
  console.log.apply(console, arguments);
}
```

> 当然也有更方便的 `var log = console.log()`

## 自己实现bind、call和apply

#### call函数

**首先解决一个问题：如何给一个函数传递不定参？ 或者说怎么把不定长的数组转换成多个参数传递给函数？**

	eval、apply或es6的解构语法

``` js
if (!Function.prototype.call) {
	Function.prototype.call = function(obj) {
		if (typeof this !== "function") {	// this是调用者对象，必须是函数调用
			throw new TypeError("Function.prototype.call - what is trying to be bound is not callable");
		}

		// 传入的对象如果为null或undefined时表示是window对象
		obj = obj || window;
		var args = []
			i = 1,
			len = arguments.length;
		for(; i < len; i++) {
			args.push('arguments[' + i + ']');
		}

		obj.fn = this;
		var result = eval('obj.fn('+ args +')’);
		delete obj.fn;
		return result;
	}
}
```

#### apply函数

``` js
if (!Function.prototype.apply) {
	Function.prototype.apply = function(obj) {
		if (typeof this !== "function") {	// this是调用者对象，必须是函数调用
			throw new TypeError("Function.prototype.apply - what is trying to be bound is not callable");
		}

		// 传入的对象如果为null或undefined时表示是window对象
		obj = obj || window;
		obj.func = this;
		var result;
		if(!arr) {
			result = obj.func();
		} else {
			var args = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				args.push('arr[' + i + ']');
			}
			result = eval('obj.func('+ args +')');
		}
		delete obj.func;
		return result;
	}
}
```

#### bind函数

**简单实现**

``` js
// 如果低版本浏览器不存在bind()方法，则原生实现一个，并绑定到Function对象的的原型上
if (!Function.prototype.bind) {
	Function.prototype.bind = function() {
		var self = this,	// 保存原函数this
			context = [].shift.call(arguments),	// 保存需要绑定的的this上下文
			args = [].slice.call(arguments);	// 将剩余的参数转化为数组
		
		// 返回一个新的函数
		return function() {
			self.apply(context, [].concat.call(args, [].slice.call(arguments)));
		}

	}	
}
```

**完善**

``` js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {	// 这个是传入的新对象
    if (typeof this !== "function") {	// this是调用者对象，必须是函数调用
    	throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

	/**
		函数自带的arguments属性并不是一个数组，只是一个类数组，不具有slice这些方法，所以用call方法给slice()指定this为arguments，让arguments也可以实现slice()方法

		后面传入参数1，是slice(start, end)中的一个参数start，表示从arguments的小标为1，即第二个参数开始切割。 这里是将bind函数的参数数组取出来，第一个参数不要（就是不要oThis）也就是要被绑定方法的那个对象

		注：arguments参数只有在函数调用执行的时候才存在，也就是当var func = foo.bind({a:1});的时候，调用了bind，此时aArgs是一个空数组。如果是var func = foo.bind({a:1}, 2)，那么aArgs = [2]；
	 */
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
			// 这里的this指的是调用func()时的执行环境；直接调用func()的时候，this指向的是全局对象，那么结果是oThis/{a:1}，这样就可以让这个fToBind的this指向这个传进来的对象oThis
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window,
				aArgs.concat(Array.prototype.slice.call(arguments)));
			// bind()同时也会传参数：aArgs.concat(Array.prototype.slice.call(arguments))
        };

    fNOP.prototype = this.prototype;	// 创建了一个空对象FNOP，并将这个空对象的原型指向foo的原型
    fBound.prototype = new fNOP();	// 将func/fBound的原型指向一个新的FNOP实例

	/* 
		这个步骤完成了给func/fBound拷贝一个FNOP的prototype即this/foo的prototype
		相当于：fBound.prototype = Object.create(this.prototype);
	 */

    return fBound;
  };
}
```

## 总结

* call函数

	一个this对象参数，多个值，可以自由搭配传参，但是有时候直接穿数组好些，一般参数越少越好

* apply函数

	作用跟call方法完全一样，但是可以直接传一个数组，当然接收还是拆分接收

* bind函数

	除了实现call的功能外，还实现了函数柯里化的功能，返回函数方便后面调用，作用更加强大

> 注：在 ES6 的箭头函数下, call 和 apply 将失效

> 参考：[call、apply和bind方法的用法以及区别](https://www.jianshu.com/p/bc541afad6ee) | [原生JS实现bind()函数](https://www.cnblogs.com/goloving/p/9380076.html)
