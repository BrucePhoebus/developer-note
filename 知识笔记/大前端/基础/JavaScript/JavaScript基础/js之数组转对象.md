<!--
 * @Description: js之数组转对象
 * @Date: 2021-04-16 00:45:59
 * @LastEditors: phoebus
 * @LastEditTime: 2021-04-16 00:55:39
 * @tags: leetCode
-->
# js之数组转对象

### 简单循环处理

	朴素实现方案，无技术含量可言

``` JS
var obj = {};
var arr = [null, undefined, 0, 1, -1];
for (var key in arr) {
	obj[key] = arr[key]
}
console.log(obj)	// {0: null, 1: undefined, 2: 0, 3: 1, 4: -1}
```

### 语法糖实现

	ES6三点解构语法实现，高效有用

``` JS
const arr = [null, undefined, 0, 1, -1]
console.log({...arr})	// {0: null, 1: undefined, 2: 0, 3: 1, 4: -1}
```
