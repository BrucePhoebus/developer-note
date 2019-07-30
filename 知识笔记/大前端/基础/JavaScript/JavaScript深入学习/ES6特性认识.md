# ES6特性认识

## ES6新特性

#### let与const 关键字

	这是ES6新增的变量声明方法，解决之前ES5没有块级作用域的问题
	用let和const声明的变量都会自动产生块级作用域，也就是出了当前作用域，该变量就不存在了

``` js
for (let i = 0; i < 2; i++) console.log(i); //输出: 0,1
console.log(i); //输出：undefined,严格模式下会报错
```

* 其中，let声明块级变量，const声明块级常量。

* 而这样的块级作用域的效果便是解决了var变量声明存在的一系列问题：变量提升、重复声明

#### 箭头操作符

	箭头函数简化的函数的写法，算是匿名函数的近一步简化
	最重要的是它解决了一些情况this指向的问题，箭头函数的作用域会继承上一级的this指向

``` js
var array = [1, 2, 3];
//传统写法
array.forEach(function(v, i, a) {
    console.log(v);
});
//ES6
array.forEach(v = > console.log(v));
```

> 箭头函数内的作用域this指向跟数组array所在作用域this指向的一致的

#### Symbols

	使用Symbols可以创建类似唯一ID的唯一性变量，并且可以实现私有性(不允许外部轻易访问)

###### 使用场景

* 使用Symbol来作为对象属性名(key)

``` js
// 使用Symbol创建的变量具有唯一性
let s1 = Symbol()
let s2 = Symbol('another symbol')
let s3 = Symbol('another symbol')

s1 === s2 // false
s2 === s3 // false

// 可以作为对象的Key存在
const PROP_NAME = Symbol()
const PROP_AGE = Symbol()

let obj = {
  [PROP_NAME]: "一斤代码"
}
obj[PROP_AGE] = 18

obj[PROP_NAME] // '一斤代码'
obj[PROP_AGE] // 18
```

* 使用Symbol来替代常量

``` js
/* const TYPE_AUDIO = 'AUDIO'
const TYPE_VIDEO = 'VIDEO'
const TYPE_IMAGE = 'IMAGE' */

const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()

function handleFileResource(resource) {
  switch(resource.type) {
    case TYPE_AUDIO:
      playAudio(resource)
      break
    case TYPE_VIDEO:
      playVideo(resource)
      break
    case TYPE_IMAGE:
      previewImage(resource)
      break
    default:
      throw new Error('Unknown type of resource')
  }
}
```

> 确保常量的唯一性

* 使用Symbol定义类的私有属性/方法

``` js
let obj = {
   [Symbol('name')]: '一斤代码',
   age: 18,
   title: 'Engineer'
}

Object.keys(obj)   // ['age', 'title']

for (let p in obj) {
   console.log(p)   // 分别会输出：'age' 和 'title'
}

Object.getOwnPropertyNames(obj)   // ['age', 'title']

// 使用针对Symbol的API可以获取
// 使用Object的API
Object.getOwnPropertySymbols(obj) // [Symbol(name)]

// 使用新增的反射API
Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']
```

**实例**

	结合模块化机制实现类的私有变量和方法

``` js
const PASSWORD = Symbol()

class Login {
  constructor(username, password) {
    this.username = username
    this[PASSWORD] = password
  }

  checkPassword(pwd) {
      return this[PASSWORD] === pwd
  }
}

export default Login
```

``` js
// 外部使用
const login = new Login('admin', '123456')

login.checkPassword('123456')  // true

login.PASSWORD  // undefined
login[PASSWORD] // undefined
login["PASSWORD"] // undefined
```

> 可以看出，密码PASSWORD被作为私有变量隐藏了，真正的私有化

* 注册和获取全局Symbol

``` js
let gs1 = Symbol.for('global_symbol_1')  //注册一个全局Symbol
let gs2 = Symbol.for('global_symbol_1')  //获取全局Symbol

gs1 === gs2  // true
```

> 真正实现全局变量，并具有唯一性

#### Promises

	Promises是为解决之前异步嵌套存在的，类似语法糖简化，实现了异步同级存在
	当然一堆then也不好看，不过也有解决方案就是Generator函数

> 具体参考：[深入浅出异步编程](知识笔记/大前端/基础/JavaScript/JavaScript深入学习/深入浅出异步编程.md)

#### 模板字面量(插值型字符串字面量)

	ES6之前我们实现字符串连接是 + 或者 concat()方法，但是模版字面量实现了嵌套表达式，使用占位符实现字符串拼接，这样表达式可以被自动解析求值(这就是 插值)

``` js
// ES6前
var name = "Kyle";
var greeting = "Hello " + name + "!";
console.log( greeting );            // "Hello Kyle!"
console.log( typeof greeting );        // "string"

// ES6：插值型字符串字面量
var name = "Kyle";
var greeting = `Hello ${name}!`;
console.log( greeting );            // "Hello Kyle!"
console.log( typeof greeting );        // "string"
```

#### 模块

#### 类的支持

#### 增强的对象字面量(扩展、简化写法)

	ES6的对象字面量对对象、方法等字面量进行了很大的简化

``` js
// 对象简化：以前是 x:x
var x = 2, y = 3,
    o = {
        x,
        y
    };

// 方法简化：省去function
var o = {
    x() {
        // ..
    },
    y() {
        // ..
    }
}

/* 
	匿名简约
 */
function runSomething(o) {
    var x = Math.random(),
        y = Math.random();
    return o.something( x, y );
}
// 简化
runSomething( {
    something: function something(x,y) {
        if (x > y) {
            // 使用相互对调的`x`和`y`来递归地调用
            return something( y, x );
        }
        return y - x;
    }
} );
```

#### 字符串模板

#### 解构

	解构是对参数、返回值进行解构，我们可以通过一一对应的参数进行接收赋值，从而避免了多余的 temp 变量出现

``` js
function foo() {
    return [1,2,3];
}

function bar() {
    return {
        x: 4,
        y: 5,
        z: 6
    };
}

var [ a, b, c ] = foo();
var { x: x, y: y, z: z } = bar();	// 这里可以重命名变量
console.log( a, b, c );                // 1 2 3
console.log( x, y, z );                // 4 5 6
```

> 这样我们可以很清楚的实现批量赋值，这就是解构语法，避免了多余临时变量的存在，并且减少了复杂对象的存在(当然，也不容易看)

#### 参数默认值，展开运算符

	展开运算符，也被叫做三点运算符，或扩散（spread） 或 剩余（rest）操作符

* 首先`参数默认值`可以解决一些参数传入的问题，并且可以使用表达式计算赋值实现更复杂的功能

``` js
function foo(x = 11, y = 31) {
    console.log( x + y );
}
foo();                    	// 42
foo( 5, 6 );            	// 11
foo( 0, 42 );            	// 42
foo( 5 );                	// 36
foo( 5, undefined );    	// 36 <-- `undefined`是缺失
foo( 5, null );            	// 5  <-- null强制转换为`0`
foo( undefined, 6 );    	// 17 <-- `undefined`是缺失
foo( null, 6 );            	// 6  <-- null强制转换为`0`
```

* 展开运算符可以实现多数组结合，而在之前我们一般用Array的 concat() 方法；并且可以实现可变参数，结合解析赋值实现参数赋值成数组；还有ES6之前我们使用`arguments`接收不定参数，而现在我们可以使用这个三点运算符接收

``` js
// 数组合并
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);	// Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

// 结合解析赋值实现参数赋值成数组
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);	// 20.17 18.67 1.5 (4) ["cheese", "eggs", "milk", "bread"]

// ...nums 替换 arguments
function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

**前后对比下**

``` js
// 使用新的ES6方式
function foo(...args) {
    // `args`已经是一个真正的数组了
    // 丢弃`args`中的第一个元素
    args.shift();
    // 将`args`的所有内容作为参数值传给`console.log(..)`
    console.log( ...args );
}

// 使用老旧的前ES6方式
function bar() {
    // 将`arguments`转换为一个真正的数组
    var args = Array.prototype.slice.call( arguments );
    // 在末尾添加一些元素
    args.push( 4, 5 );
    // 过滤掉所有奇数
    args = args.filter( function(v){
        return v % 2 == 0;
    } );
    // 将`args`的所有内容作为参数值传给`foo(..)`
    foo.apply( null, args );
}
bar( 0, 1, 2, 3 );                    // 2 4
```

> 可以明显看出使用使用这ES6语法，我们代码将会变得近一步简介，功能强大，并且可读性强

#### for of 值遍历

	JavaScript新的循环方式，结合了兄弟循环形式 for 循环和 for...in 循环的优势，可以实现任何类型数据的迭代(对象除外，对象不可迭代)

**前言**

* for 循环的最大缺点是需要跟踪计数器和退出条件(并且主要适合数组类型)

* for...in 循环依然需要使用 index 来访问数组的值

	当你需要向数组中添加额外的方法（或另一个对象）时，for...in 循环会带来很大的麻烦。因为 for...in 循环循环访问所有可枚举的属性，意味着如果向数组的原型中添加任何其他属性，这些属性也会出现在循环中

``` js
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

**for...of循环**

	for...of 循环用于循环访问任何可迭代的数据类型

* for...of 循环的编写方式和 for...in 循环的基本一样，只是将 in 替换为 of，可以忽略索引

* 结合了`for循环`和`for...in循环`的优点，可以使用`continue`中止循环，又不用担心向对象中添加新的属性

``` js
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

> for...of 循环将只循环访问对象中的值

#### iterator, generator

#### Map，Set 和 WeakMap，WeakSet

#### Proxies

#### Math，Number，String，Object 的新API

> 参考：[ES6新特性概览](https://www.cnblogs.com/Wayou/p/es6_new_features.html) | [理解和使用ES6中的Symbol](https://www.jianshu.com/p/f40a77bbd74e) | [你不懂JS：ES6与未来(You Dont Know JS)](https://www.bookstack.cn/read/You-Dont-Know-JS-es6-beyond/ch2.6.md)

