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
