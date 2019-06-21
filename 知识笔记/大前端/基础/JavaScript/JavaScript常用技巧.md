# JavaScript常用技巧

> [参考掘金](https://juejin.im/post/5cef46226fb9a07eaf2b7516)

1. 判断对象的数据类型

> [参考](知识笔记/大前端/基础/JavaScript/JavaScript判断数据类型.md)

	使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活

```js
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array');
console.log(isArray([]));	// true

const isObject = isType('Object');
console.log(isObject({}));	// true
```

> 注：传入 type 参数时首字母大写

!> 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上，因为 call 会将第一个参数进行装箱操作

2. 循环实现数组 map 方法

```js
const selfMap = function(fn, context) {
	let arr = Array.prototype.slice.call(this);
	let mappedArr = Array(arr.length - 1);
	for (let i = 0; i < arr.length; i++) {
		// 判断稀疏数组的情况
		if (!arr.hasOwnProperty(i)) {	// 对稀疏数组的处理，通过 hasOwnProperty 来判断当前下标的元素是否存在与数组中
			continue;			
		}
		mappedArr[i] = fn.call(context, arr[i], i, this);
	}
	return mappedArr;
}
```

> 注：map 的第二个参数为第一个参数回调中的 this 指向，如果第一个参数为箭头函数，那设置第二个 this 会因为箭头函数的词法绑定而失效


3. 使用 reduce 实现数组 map 方法

```js
const selfMap2 = function(fn, context) {
	let arr = Array.prototype.slice.call(this);
	return arr.reduce((pre, cur, index) => {
		return [...pre, fn.call(context, cur, index, this)];
	}, []);
}
```

4. 循环实现数组 filter 方法

```js
const selfFilter = function(fn, context) {
	let arr = Array.prototype.slice.call(this);
	let filteredArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (!arr.hasOwnProperty(i)) {
			continue;			
		}
		fn.call(context, arr[i], i, this) && filteredArr.push(arr[i]);
	}
	return filteredArr;
}
```

5. 使用 reduce 实现数组 filter 方法

```js
const selfFiler2 = function(fn, context) {
	return this.reduce((pre, cur, index) => {
		return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre];
	}, []);
}
```

6. 循环实现数组的 some 方法

	执行 some 方法的数组如果是一个空数组，最终始终会返回 false，而另一个数组的 every 方法中的数组如果是一个空数组，会始终返回 true

```js
const selfSome = function(fn, context) {
	let arr = Array.prototype.slice.call(this);
	
	if (!arr.length) {
		return false;		
	}

	for (let i = 0; i < array.length; i++) {
		if (!arr.hasOwnProperty(i)) {
			continue;				
		}
		let res = fn.call(context, arr[i], i, this);
		if (res) {
			return true;			
		}
	}
	return false;
}
```

7. 循环实现数组的 reduce 方法

```js
Array.prototype.selfReduce = function(fn, initialValue) {
	let arr = Array.prototype.slice.call(this),
		res,
		startIndex;
	if(initialValue === undefined) {
		// 找到第一个非空单元（真实）的元素和下标
		for (let i = 0; i < arr.length; i++) {
			if (!arr.hasOwnProperty(i)) {
				continue;				
			}
			startIndex = i;
			res = arr[i];
			break;
		}
	} else {
		res = initialValue;
	}

	for (let i = ++startIndex || 0; i < arr.length; i++) {
		if (!arr.hasOwnProperty(i)) {
			continue;			
		}
		res = fn.call(null, res, arr[i], i, this);
	}
	return res;
}
```

> 因为可能存在稀疏数组的关系，所以 reduce 需要保证跳过稀疏元素，遍历正确的元素和下标

8. 使用 reduce 实现数组的 flat 方法

```js
const selfFlat = function(depth = 1) {
	let arr = Array.prototype.slice.call(this);
	if(depth === 0) {
		return arr;
	}
	
}
```

