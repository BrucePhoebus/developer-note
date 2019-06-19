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

