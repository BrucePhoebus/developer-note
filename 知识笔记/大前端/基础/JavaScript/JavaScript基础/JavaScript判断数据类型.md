# JavaScript判断数据类型

## 基础

#### typeof操作符

	可以判断基本数据类型，但是对于引用数据类型`全部`返回Object，但是function还是返回function

**示例**

```js
typeof "John"                // string 
typeof 3.14                  // number
typeof false                 // boolean
typeof [1,2,3,4]             // object
typeof {name:'John', age:34} // object

typeof null					// object
typeof function(){}		   // function
```

#### instanceof操作符

	obj instanceof Object 检测 Object.prototype 是否存在于参数obj的原型链上，主要用来判断变量是否是某个构造方法的实例

> 但是Object是所有对象的原型，所以在obj instanceof Object中，无论参数obj是数组还是函数都会返回true

**实例**

```js
console.log(Object instanceof Object);//true 
console.log(Function instanceof Function);//true 
console.log(Number instanceof Number);//false 
console.log(String instanceof String);//false 
 
console.log(Function instanceof Object);//true 
 
console.log(Foo instanceof Function);//true 
console.log(Foo instanceof Foo);//false
```

```js
var stringObject = new String("hello world"); 
console.log(stringObject instanceof String);   // true

// 判断 foo 是否是 Foo 类的实例
function Foo(){}
var foo = new Foo();
console.log(foo instanceof Foo);	// true
```

```js
// 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
function Aoo(){} 
function Foo(){} 
Foo.prototype = new Aoo();//JavaScript 原型继承
var foo = new Foo(); 
console.log(foo instanceof Foo)//true 
console.log(foo instanceof Aoo)//true
```

#### constructor

	constructor是prototype对象上的属性，指向构造函数

* 根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就会去原型链找

> 因此，实例对象也是能使用constructor属性的，同样的这个也只能输出构造函数

**示例**

```js
console.log((2).constructor === Number);				// true
console.log((true).constructor === Boolean);			// true
console.log(('str').constructor === String);			// true
console.log(([]).constructor === Array);				// true
console.log((function() {}).constructor === Function);	// true
console.log(({}).constructor === Object);				// true
```

> 暂时看来很完美，但是如果我创建一个对象，更改它的原型，这种方式也变得不可靠了

```js
function Fn(){};
 
Fn.prototype=new Array();
 
var f=new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true 
```

#### Object.prototype.toString.call()

	使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子，借用Object的 toString  方法

	这个能正确显示我们需要的数据类型，哪怕我们修改了，也能显示正确的

```js
var a = Object.prototype.toString;
 
console.log(a.call(2));				// [object Number]
console.log(a.call(true));			// [object Boolean]
console.log(a.call('str'));			// [object String]
console.log(a.call([]));			// [object Array]
console.log(a.call(function(){}));	// [object Function]
console.log(a.call({}));			// [object Object]
console.log(a.call(undefined));		// [object Undefined]
console.log(a.call(null));			// [object Null]
```

#### 总结

###### 判断基本数据类型

	使用typeof

###### 判断引用数据类型

	使用instanceof和constructor

!> 实际上所有引用类型都是对象，只不过构造函数不同而已
> 强行判断引用类型，要么只是判断常见的集中引用类型，比如数组、函数、Date、正则。。。要么只能输出构造函数

> 准确判断数组类型使用`es5`提供的方法`Array.isArray(value)`

## 应用

#### 判断传入值是否数值类型

``` js
function isNumeric(obj) {
	return !isNaN(parseFloat(obj)) && isFinite(obj);
}

function isNumeric(str) {
	if (str === '' || str == null) return false;
	const num = Number(str);
	return num < Infinity && num > -Infinity;
}

console.log(isNumeric('1000'));
console.log(isNumeric('-100.'));
console.log(isNumeric('.1'));
console.log(isNumeric('-3.2'));
console.log(isNumeric('001'));
console.log(isNumeric('+4.5'));
console.log(isNumeric('1e3'));
console.log(isNumeric('1e-3'));
console.log(isNumeric('-100e-3'));

console.log(!isNumeric('++3'));
console.log(!isNumeric('-100..'));
console.log(!isNumeric('3abc'));
console.log(!isNumeric('abc'));
console.log(!isNumeric('-3e3.2'));
console.log(!isNumeric('Infinity'));
console.log(!isNumeric('-Infinity'));
console.log(!isNumeric(''));

console.assert(isNumeric('1000'));
console.assert(isNumeric('-100.'));
console.assert(isNumeric('.1'));
console.assert(isNumeric('-3.2'));
console.assert(isNumeric('001'));
console.assert(isNumeric('+4.5'));
console.assert(isNumeric('1e3'));
console.assert(isNumeric('1e-3'));
console.assert(isNumeric('-100e-3'));

console.assert(!isNumeric('++3'));
console.assert(!isNumeric('-100..'));
console.assert(!isNumeric('3abc'));
console.assert(!isNumeric('abc'));
console.assert(!isNumeric('-3e3.2'));
console.assert(!isNumeric('Infinity'));
console.assert(!isNumeric('-Infinity'));
console.assert(!isNumeric(''));
```

