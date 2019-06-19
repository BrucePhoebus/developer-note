# JavaScript判断数据类型

## typeof操作符

	可以判断基本数据类型，但是对于引用数据类型全部返回Object

**示例**


## instanceof操作符

	obj instanceof Object 检测 Object.prototype 是否存在于参数obj的原型链上，主要用来判断变量是否是某个构造方法的实例

> 但是Object是所有对象的原型，所以在obj instanceof Object中，无论参数obj是数组还是函数都会返回true

**实例**



## constructor

	constructor是prototype对象上的属性，指向构造函数

* 根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就会去原型链找

> 因此，实例对象也是能使用constructor属性的，同样的这个也只能输出构造函数

## 总结

#### 判断基本数据类型

	使用typeof

#### 判断引用数据类型

	使用instanceof和constructor

!> 实际上所有引用类型都是对象，只不过构造函数不同而已
> 强行判断引用类型，要么只是判断常见的集中引用类型，比如数组、函数、Date、正则。。。要么只能输出构造函数

> 准确判断数组类型使用`es5`提供的方法`Array.isArray(value)`
