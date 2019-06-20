# JavaScript基础

## JavaScript基础语法

#### JavaScript数据类型

1. String

2. Number

	基于 IEEE 754 标准的双精度 64 位二进制格式的值——数字、±Infinity、NaN

> 强调一下，js的数值类型没有整型，只有浮点型，浮点数和整数都是使用双精度浮点数保存，当然这样也就会出现点[问题](((知识笔记/大前端/基础/JavaScript/JavaScript数值类型.md)))

> NaN 也属于 number 类型，并且 NaN 不等于自身；其实NaN表示不是数值类型，如果判断是不是数值类型可以用NaN判断，而判断NaN则使用`isNaN()`方法判断

3. Boolean

4. null

	js中的数据在底层是以二进制存储，如果前三位为0，那么就会判定为object，而null的所有都为0

	空对象

5. undefined

	声明未定义

6. Object

	javascript的引用数据类型是保存在堆内存中的对象

	* Function
	
	* Object
	
	* Array

	* Data

	* null

> 对象引用类型主要场景的问题还是[浅拷贝与深拷贝的问题](知识笔记/大前端/基础/JavaScript/js对象之拷贝.md)

7. Symbol
	
	ECMAScript 6 新定义，实例是唯一且不可改变的

8. BigInt

	18年出版，chrome 67+开始支持BigInt，V8 6.7版本，nodejs要10以上(10内置V8版本是6.6)

> `BigInt`是 JavaScript 中的一个新的数字基本(`primitive`)类型，可以用`任意精度表示整数`

	使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

**目的**

	补充Number作为浮点数处理大数的问题

**如：当数字过大时，Number的问题就出现了**

```js
var plusOne1 = function(digits) {
    (Number(digits.join(''))+1).toString().split('')
    return digits
};
var plusOne2 = digits => {
  return (BigInt(digits.join('')) + 1n).toString().split('');
};

plusOne1([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])
// [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,0,0,0]

plusOne2([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])
// [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]

再来下面的就更清晰了
Number([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3].join('')) = 6145390195186705000
BigInt([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3].join('')) = 6145390195186705543n
```

**理解**

	Number是双精度浮点数，它可以表示的最大安全范围是正负9007199254740991，也就是2的53次方减一， 比2^53大的所有数字则可以使用BigInt表达。

**使用**

1. 要创建一个BigInt，在数字后面添加n后缀即可，例如，123变成123n

2. 全局BigInt(number)函数可以用来将Number转换成BigInt。换句话说，BigInt(123) === 123n。

```js
// BigInt(value);	//  value是创建对象的数值。可以是字符串或者整数。

const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);	// ↪ 9007199254740991n

const hugeButString = BigInt('9007199254740991');	// ↪ 9007199254740991n
```

**问题**

	很明显，使用要求有点高，估计很久之后项目中才能使用，毕竟现在还需要兼容低版本

####
