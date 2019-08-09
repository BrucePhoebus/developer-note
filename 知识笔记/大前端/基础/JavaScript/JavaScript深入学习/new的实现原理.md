<!--
 * @Description: 深入浅出new的实现原理
 * @Date: 2019-08-09 11:32:53
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-09 13:58:55
 -->
# new的实现原理

## 概述

#### 简述new的存在

	new操作符是用来实例化一个对象(类)，实现JavaScript面对对象编程

**但是在JavaScript中，一切皆对象，我们为什么还需要通过 new 来产生对象？**

## 原理

#### 实现原理

* 创建一个空对象，构造函数中的 this 指向这个空对象

* 这个新对象被执行 `[[原型]]` 连接

* 执行构造函数方法，属性和方法被添加到 this 引用的对象中

* 如果构造函数中没有返回其它对象，那么返回 this，即创建的这个的新对象，否则，返回构造函数中返回的对象

``` js
function _new() {
    // 创建新的对象
    let target = {};
    // 第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    // 执行 [[原型]] 连接 ;target 是 constructor 的实例
    target.__proto__ = constructor.prototype;
    // 执行构造函数，将属性或方法添加到创建的空对象上
    let result = constructor.apply(target, args);
    if (result && (typeof(result) == "object" || typeof(result) == "function")) {
        // 如果构造函数执行的结构返回的是一个对象，那么返回这个对象
        return result;
    }
    // 如果构造函数返回的不是一个对象，返回创建的新对象
    return target;
}
```

#### 实例解析

``` js
// 创建了一个函数Animal，并在其 this 上定义了属性：name，name的值是函数被执行时的形参
function Animal(name) {
    this.name = name;
}
// 在 Animal 对象（Animal本身是一个函数对象）上定义了一个静态属性:color,并赋值“black”
Animal.color = "black";
// 在 Animal 函数的原型对象 prototype 上定义了一个 say() 方法，say方法输出了 this 的 name 值
Animal.prototype.say = function() {
    console.log("I'm " + this.name);
};
// 通过 new 关键字创建了一个新对象 cat
var cat = new Animal("cat");

//  cat 对象尝试访问 name 和 color 属性，并调用 say 方法
console.log(
    cat.name, //cat
    cat.color, //undefined
);
cat.say(); //I'm cat

// Animal 对象尝试访问 name 和 color 属性，并调用 say 方法
console.log(
    Animal.name, //Animal
    Animal.color //back
);
Animal.say(); //Animal.say is not a function
```

* 首先是关键行代码：`var cat = new Animal("cat");`

	* Animal 本身是一个普通函数，但当通过new来创建对象时，Animal 就是构造函数

	* JS引擎执行这句代码时，在内部做了很多工作，用伪代码模拟其内部流程如下：

	``` js
	new Animal('cat') = {
		var obj = {};
		obj.__proto__ = Animal.prototype;
		var result = Animal.call(obj,"cat");
		return typeof result === 'object'? result : obj;
	}
	```

	* 这些步骤对于new原理的四个步骤

		1. 创建一个空对象`obj`

		2. 把 obj 的__proto__ 指向构造函数 Animal 的原型对象 prototype，此时便建立了 obj 对象的原型链：`obj -> Animal.prototype -> Object.prototype -> null`

		3. 在 obj 对象的执行环境调用 Animal 函数并传递参数"cat" 。 相当于：`var result = obj.Animal("cat")`

			当这句执行完之后，obj 便产生了属性 name 并赋值为 "cat"
		
		4. 判断第 3 步的返回值，如果无返回值 或者 返回一个非对象值，则将 obj 作为新对象返回；否则会将 result 作为新对象返回
	
		> 其中我们声明的`cat`其实就是第四步的返回值；我们可以知道：

			cat 的原型链是：cat -> Animal.prototype -> Object.prototype -> null
			cat上新增了一个属性：name

* 分析输出结果

	* cat.name - 在new创建对象中，obj 对象就产生了 name 属性。因此 `cat.name` 就是这里的 `obj.name`
	* cat.color - cat 对象先查找自身的 color，`没有找到便会沿着原型链查找`，在上述例子中，我们仅在 Animal 对象上定义了 color，并没有在其原型链上定义，因此`找不到`
	* cat.say -  cat会先查找自身的 say 方法，没有找到便会沿着原型链查找，在上述例子中，我们在 Animal 的 prototype 上定义了say，因此在原型链上`找到了say 方法`

	> 还有，在 say 方法中还访问 this.name，这里的 this 指的是其调用者 obj，因此输出的是 obj.name 的值

	* 而，对于Animal对象来说，理解就比较简单了，直接访问属性和方法就能找到并输出(查找方法也遵循上述：`先找自身，没有找到便会沿着原型链查找`)

	*  Animal 的原型链： `Animal -> Function.prototype -> Object.prototype -> null`

		由于 Animal 的原型链上也没有定义 say 方法，因此返回异常提示

**理解cat和Animal对象的关系**

* 首先，很容易理解`cat`对象继承了`Animal`对象，也就是它们是继承关系

* 但我们之前说new操作符是把Animal当做构造函数创建的新实例，那么`cat是Animal的实例对象？`

	* 我们直接用js提供的判断实例对象关系的方法：`A instanceof B`

	``` js
	cat instanceof Animal;	// true
	```

	> 可以看出，JavaScript认为`cat对象`的确是`Animal对象`的实例

*instanceof是怎么做判断的？*

``` js
// instanceof 的内部原理
var L = A.__proto__;
var R = B.prototype;
if(L === R)
    return true;
```

> 这里可以看出：如果`A的__proto__` 等价于 `B 的 prototype`，就返回 true

	而在 new 的过程2中，cat的 __proto__ 指向了Animal的prototype，所以 cat 和 Animal 符合 instanceof 的判断结果

!> 因此，通过 new 创建的 对象 和 构造函数 之间建立了一条原型链，原型链的建立，让原本孤立的对象有了依赖关系和继承能力，让JavaScript 对象能以更合适的方式来映射真实世界里的对象，这是面向对象的本质

## 应用

#### 简单实例

###### 涉及 new 、this、以及原型链的例子

``` js
function Foo(){
    getName = function(){
        console.log(1)
    }
    return this;
}
Foo.getName = function(){
    console.log(2)
}
Foo.prototype.getName = function(){
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName(){
    console.log(5)
}

Foo.getName();	// 2
getName();	// 4
Foo().getName();	// 1
getName();	// 1
new Foo.getName();	// 2
new Foo().getName();	// 3
new new Foo().getName();	// 3 	Foo.getName {}
```

> 参考：[深入理解 new 操作符](https://www.cnblogs.com/onepixel/p/5043523.html)
