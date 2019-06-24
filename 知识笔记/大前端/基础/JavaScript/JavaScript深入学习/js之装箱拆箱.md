# js之基本数据类型与包装数据类型装箱拆箱

	Number类型对应Number对象
	String类型对应String对象
	Boolean类型对应Boolean对象

## 装箱拆箱

	把基本数据类型转换为对应的引用类型的操作称为装箱，把引用类型转换为基本的数据类型称为拆箱。

> 每当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型对象，从而让我们能够调用一些方法来操作这些数据。

#### 装箱

```js
var s1 = "some text";
var s2 = s1.substring(2);
```

> 如上述例子，变量s1是一个基本类型值，它不是对象，所以它不应该有方法。但是js内部为我们完成了一系列处理（即我们称之为装箱），使得它能够调用方法

**实现机制**

	（1）创建String类型的一个实例；

	（2）在实例上调用指定的方法；

	（3）销毁这个实例；

**代码模拟实现**

```js
var s1  = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```

#### 拆箱

	将引用类型对象转换为对应的值类型对象，它是通过引用类型的valueOf()或者toString()方法来实现的。
	如果是自定义的对象，也可以自定义它的valueOf()/toString()方法，实现对这个对象的拆箱。

```js
var objNum = new Number(123);  
var objStr =new String("123");  

console.log( typeof objNum ); //object
console.log( typeof objStr ); //object

console.log( typeof objNum.valueOf() ); //number
console.log( typeof objStr.valueOf() ); //string
console.log( typeof objNum.toString() ); // string 
console.log( typeof objStr.toString() ); // string
```

## 隐式类型转换的场景以及转换原则

> [参考：平野韬 ](https://blog.csdn.net/siboogi/article/details/53669567)

#### js的数据类型隐式转换主要分为三种情况: 

1. 转换为boolean类型 

2. 转换为number类型 

3. 转换为string类型

#### 转换为boolean类型

	数据在 逻辑判断 和 逻辑运算 之中会隐式转换为boolean类型

**转换规则表**

|数据类型|转换之后的值|
|:---:|:---:|
|数字0|false|
|NaN|false|
|空字符""|false|
|null|false|
|undefined|false|
非0数字|true|
|非空字符串|true|
|非null对象类型|true|

!> 注：如果使用new操作符创建的对象隐式转换为boolean类型都是true，哪怕是new String("");

> 提示:连续使用两个非操作符(!!)可以将一个数强制转换为boolean类型，这在开发之中比较实用

#### 转换为string类型和转换为number类型

	转换为string还是number受到运行环境和操作符的影响

###### 运行环境对数据类型隐式转换的影响

	很多内置函数期望传入的参数的数据类型是固定的，如:alert(value)方法，它期望传入的value值是一个string类型，但是如果我们传入的是number类型或者object类型等非string类型的数据的时候，就会发生数据类型的隐式转换。这就是环境运行环境对数据类型转换的影响。

###### 操作符也会影响数据的类型转换

* 当`+`号作为一元操作符操作单操作数的时候，他就会将这个数转换为数字类型

* 当`+`号作为二元操作符时，如果两个操作数中`存在一个字符类型`的话，那么另外一个操作数也会无条件地转换为字符串

* 当`+`号作为二元操作符时，如果两个操作数一个都不是字符串的话，两个操作数会隐式转换成数字类型(如果无法成功转换成数字，则变成NaN，再往下操作)，再进行加法算数操作

* 当算数运算的操作符是`+`号以外的其他操作数时，两个操作数都会转成数字类型进行数字运算。

**总结判断**

1. 首先看该数据是否被操作符操作，如果被操作符操作了，遵循上面操作符对数据转换影响的原则来进行数据的转换 
2. 如果该数据没有被操作符操作，那么就观察它所在具体程序环境之中，如果是alert()这样的参数环境中，如果改数据不是字符串，那就肯定要转换了

###### 数据类型转换成string类型或者number类型

> 数据类型转换成字符串或者数字都会遵循一个原则
	
	如果该数据是简单数据类型，则直接转换成字符串或者数字类型。
	如果该数据是复杂数据类型，那么先通过固定的方法将复杂值转换为简单数据，再转成字符串或者数字。

**简单数据转换字符串对照表**

|原始数据类型|转换之后的值|
|:---:|:---:|
|数字类型|不做任何改变|
|空字符""|0|
|非空字符串|将字符内的数据内容变为数据，如果还有其他符号中文等转为NaN|
|true|1|
|false|0|
|null|0|
|undefined|NaN|
|NaN|NaN|

> 注：NaN表示不是数值，可以通过方法isNaN()判断

###### 复杂对象如何转换为简单值

* 一个复杂对象在转为基础类型的时候会调用`ToPrimitive(hint)`方法来指定其目标类型。

	* 如果传入的`hint值`为`number`，那么就先调用对象的valueOf()方法，调用完valueOf()方法后
		
		* 如果返回的是原始值，则结束ToPrimitive操作
		
		* 如果返回的不是原始值，则继续调用对象的toString()方法，调用完toString()方法之后
			
			* 如果返回的是一个原始值，则结束ToPrimitive操作

			* 如果返回的还是复杂值，则抛出异常。
		
	* 如果传入的hint值为`string`，则先调用toString()方法，再调用valueOf()方法，其余的过程一样。

> 那么复杂对象是以什么标准来判断ToPrimitive(hint)操作传入的hint值到底是number还是string呢？

* 如果运行环境非常明确的需要将一个复杂对象转换为数字则传入number如 Number(value) 和 +value 则传入number

* 如果运行环境非常明确的需要将一个复杂对象转换为字符串则传入string如String(value) 和 alert(value) 则传入string

* 如果是用+号连接两个操作数，操作数在确定确定其中只要有一个为字符串的时候另外一个操作数会转为字符串，ToPrimitive()会传入string，但是如果两个操作数都不能确定是字符串的时候则默认传入number(Date对象是一个例外，它会默认传入string)进行数据类型转换。
