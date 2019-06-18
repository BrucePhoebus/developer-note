# JavaScript对象属性底层原理

> [参考](https://www.cnblogs.com/full-stack-engineer/p/9684072.html)

## 对象属性类型

#### 数据属性

* [[Configurable]]

	表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，特性默认值为true

* [[Enumberable]]

	表示能否通过for-in循环返回属性，特性默认值为true

* [[Wtiteable]]

	表示能否修改属性的值，特性默认值为true

* [[Value]]

	包含这个属性的数据值，读取属性值/写入属性值，从这个位置读/把新值保存在这个位置，这个特性的默认值为undefined

#### 访问器属性

* [[configurable]]

	表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，特性默认值为true

* [[Enumberable]]

	表示能否通过for-in循环返回属性，特性默认值为true

* [[Get]]

	在读取属性时调用的函数，默认值为undefined

* [[Set]]

	在写入属性时调用的函数，默认值为undefined

#### 定义对象的访问器属性 - Object.defineProperty

**示例**

```js
var book = {
    _year: 2004,
    edition: 1
};

Object.defineProperty(book, "year", {
    get: function(){
        return 2018;
    },
    set: function(newValue){
        if (newValue > 2004) {
			this._year = newValue;
			this.edition += newValue - 2004;
        }
    }
});
console.log(book.year);	// 2018
book.year = 2005;
console.log(book.year);	// 2018
```

> 对象是通过Object.defineProperty的get和set操作

## 对象创建底层分析

#### 对象创建

**示例**

	为什么下面第一种方式会报错而第二种不会？

```js
//构造函数创建
var object=new Object();
object.x=1;
object.2=1; // Unexpected number
// 字面量创建
var object = {
  x: 1,
  2: 2
};//不报错
```

**分析问题**

```js
window.2=2; // 假设不会出错
2==2;	// 这个地方应该怎么处理？--没法处理
```

**那么字面量为什么不会出错？**

	当启用慢模式时以Hash作为底层存储结构，key为字符串，字面量方式会存在类型转换。

#### 对象属性详解 Chrome(V8)

###### V8中的快速属性

	对象大多数时候表现为Dictionary：以字符串为key，任意object为值。

**命名属性**

	* 存储结构可以是数组也可以是HashMap
	* 具有额外的辅助信息(存储在描述符数组中)

*示例*

```js
{a：'foo'，b：'bar'}
```

**数组索引属性(元素)**

	* 存储结构通常为简单的数组结构。但某些情况下也会切换到Hash结构以节省内存。
	* 可以使用键来推断它们在属性数组中的位置

*示例*

```js
数组['foo'，'bar']有两个数组索引属性：0，值为'foo'; 1，值为'bar'
```

* 数组索引属性和命名属性存储在两个单独的数据结构中

> ![](https://github.com/BrucePhoebus/development-learning/tree/master/知识笔记/images/基础/js对象属性原理.png)



