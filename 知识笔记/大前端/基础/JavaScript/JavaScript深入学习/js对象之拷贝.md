# js对象之拷贝

	原则上我们一般对引用类型(对象) 的拷贝都是浅拷贝， 但是很多现实场景都需要深拷贝的需求， 并且这也是没艺术， 必须掌握

## 浅拷贝

#### 简单浅拷贝

**引用对象等号赋值拷贝**

```js
let obj = {};
let newObj = obj;
console.log(obj === newObj); // true
```

> 这是最简单也是最常用的拷贝， 但这种拷贝只是引用拷贝， 他们实际上是同一个值， 虽然堆存储地址不同， 但是堆的值是一样的， 指向同一个栈空间， 这样就到这对象的值是同一个值， 如果一方修改， 另一方也会跟着变化， 而有些场景却是要我们创建同样值的不同对象， 这就是深拷贝需求。

**一层拷贝**

``` js
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};
```

> 如果引用对象只有一层还好，但是往往现实问题没那么简单，并且考虑到复用问题，往往使用最完整的深拷贝

## 深拷贝

#### 实现深拷贝

###### 引用类型复制，合并另一个对象的内容

	传入两个对象，将A对象的内容拷贝到B对象中，然后返回B对象

```js
function deepClone(oldObj, newObj) {
	// 如果传入的是普通类型，则直接返回
	if (typeof oldObj !== 'object') {
		return oldObj;
	}

	// 允许传入指定类型拷贝，例如对象、数组。。。默认为对象
	newObj = newObj || {};

	// 递归遍历对象，进行深拷贝
	for (let key in oldObj) {
		// 如果键是对象，并且类型不是null，进行递归深入
		if (typeof key === 'object' && typeof key !== 'null') {
			// 判断引用类型是对象还是数组，针对进行处理
			if (Array.isArray(oldObj[key])) {
				deepClone(oldObj[key], []);
			} else {
				deepClone(oldObj[key], {})
			}
		} else {
			// 如果键为普通类型，则直接复制
			newObj[key] = oldObj[key];
		}
	}
	return newObj;
}

let A = {
	name: 'ff',
	car: [1, 2, 3],
	son: {
		first: 'son1',
		second: 'son2'
	}
},
	B = {};
console.log(deepClone(A, B));
/*
* {
* 	car: (3) [1, 2, 3]
* 	name: "ff"
* 	son: {first: "son1", second: "son2"}
* }
* */

A = [1, 2, [1, 2, 3], {name: '33'}];
B = [];
console.log(deepClone(A, B));
/*
* [
* 	0: 1
* 	1: 2
* 	2: (3) [1, 2, 3]
* 	3: {name: "33"}
* ]
* */
```

#### 参考深拷贝

```js
// 深拷贝
function deepClone(objOrArr, target) {
    if (typeof objOrArr !== 'object') {
        return objOrArr;
    }
    target = target || {};
    for (let key in objOrArr) {
        if (typeof key === 'object' && typeof key !== 'null') {
            if (Array.isArray(objOrArr[key])) {
                deepClone(objOrArr[key], []);
            } else {
                deepClone(objOrArr[key], {});
            }
        } else {
            target[key] = objOrArr[key];
        }
    }
    return target;
}

console.log(deepClone({
    name: 'ff',
    car: [1, 2, 3],
    son: {
        first: 'son1',
        second: 'son2'
    }
}, {}));
console.log(deepClone([1, 2, [1, 2, 3], {
    name: '33'
}], []));
```

## 汇总

#### 方案一：JSON处理

	兼容性良好，如果极端的需要IE7-的自行强烈注意兼容性，当然解决也简单，加个json2.js即可

> [json2.js](https://github.com/douglascrockford/JSON-js)

``` js
JSON.parse(JSON.stringify())
```

* 原理

	* 先使用`JSON.stringify()`将对象转化为字符串(序列化)，再使用`JSON.parse()`转化为JSON对象(反序列化)
	* 这个过程会产生一个新对象存储转化后的JSON对象

**测试**

``` js
var oldObj = {
	name: 'ff',
    car: [1, 2, 3],
    son: {
        first: 'son1',
        second: 'son2'
    }
},
newObj = {};

newObj = JSON.parse(JSON.stringify(oldObj));
console.log(newObj);
/* 
	{name: "ff", car: Array(3), son: {…}}car: (3) [1, 2, 3]name: "ff"son: {first: "son1", second: "son2"}__proto__: Object
 */
console.log(newObj === oldObj);	// false
console.log(newObj.car === oldObj.car);	// false
console.log(newObj.son === oldObj.son);	// false
oldObj.name = 'oldObj';	// "oldObj"
newObj.name;	// "ff"	可以看出这个对象的修改互不影响，也就是他们已经完全是两个对象了，包括内部的引用类型
```

> 此方法适用于大部分应用场景，简单的生成新的对象，操作对象数据不影响旧的对象，完全没有问题

**存在的问题**

* 参考后文对它的性能测试可以发现，它的性能算是比较差的，如果场景对性能有一定要求，那么可能就要选择更好的实现

#### 方案二：递归实现深拷贝

	完整的深拷贝需要考虑对象、数组、多维引用、循环引用等问题

* 对象、数组最好解决，直接加个if判断就能解决

* 但是多维引用也就是，引用对象包含引用对象，这样多维的情况我们使用递归无限深入比较好解决

* 最后比较少的问题是循环引用，也就是子对象引用了父对象，最后造成了循环引用，这样需要针对解决

	解决方案也就是使用map判断是否已克隆过，如果克隆过就直接返回该引用，表示循环引用

``` js
// 深克隆函数
function clone(target, map = new Map()) {
	// 判断引用类型的对象还是基本类型
    if (typeof target === 'object') {
		// 判断引用类型是对象还是数组
        let cloneTarget = Array.isArray(target) ? [] : {};
		// map判断是否已克隆，是就返回引用
        if (map.get(target)) {
            return map.get(target);
        }
		// 如果未克隆则保存着map中，记录
        map.set(target, cloneTarget);
		// 循环递归克隆
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```

> 这种实现基本可以满足大部分情况了

**极端优化**

	也就是还是存在其他可能的问题，例如function、null等引用类型的问题，也就是很多时候我们需要封装一个判断引用类型到底是什么类型的函数

``` js
// 判断是什么类型：这里可以判断所以类型，包括基础类型和引用类型，我们可以针对常用的类型进行处理
function getType(target) {
    return Object.prototype.toString.call(target);
}

// 判断是否为可深克隆的引用类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

if (!isObject()) {
	return target;
}
```

> 对于一些不可深克隆(遍历)的引用类型，我们只能判断后直接返回处理

#### 方案三：供参考最完全的深拷贝封装

``` js
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// 判读引用类型是否是可深克隆(循环)的类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// 获取当前对象类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

/* 
 * clone主方法
 * target是需要克隆的对象
 * map是WeakMap实例，弱引用类型，会自动解决内存释放的问题，map主要是用来解决循环引用的问题，缓存已克隆的对象
 */

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

// 模块化封装
module.exports = {
    clone
};
```

> 后续可以深入了解：[JSON序列化与反序列化](知识笔记/大前端/基础/JavaScript/JavaScript深入学习/JSON序列化与反序列化.md)


> [如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1) | [详解关于JSON.parse()和JSON.stringify()的性能小测试](https://www.jb51.net/article/157795.htm)
