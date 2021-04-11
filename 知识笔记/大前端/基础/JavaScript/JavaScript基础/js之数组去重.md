<!--
 * @Description: js之数组去重
 * @Date: 2021-04-11 18:13:44
 * @LastEditors: phoebus
 * @LastEditTime: 2021-04-11 21:48:54
 * @tags: leetCode
-->
# js之数组去重

### 原始去重法

###### 双重for循环去重

``` JS
// 双重循环比较，相同就去除
function unique(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr;
}
console.log(unique([1, 2, 1, 3, 2, 2, 5, 3]));	// [1, 2, 3, 5]
```

###### 利用indexOf去重

``` JS
// 比较不存在的相同的值就存进去
function unique(arr) {
	if (!Array.isArray(arr)) {
		console.log("type error！");
		return;
	}
	var array = [];
	for (var i = 0; i < arr.length; i++) {
		if (array.indexOf(arr[i]) === -1) {
			array.push(arr[i])
		}
	}
	return array;
}
console.log(unique([1, 2, 1, 3, 2, 2, 5, 3]));	// [1, 2, 3, 5]
```

###### ES6的Array.from与set去重

``` JS
// Array.from将一个对象转化为你一个数组
// Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
// 转换为Set对象的过程中实现自动去重，然后把Set对象转化回数组
function unique (arr) {
	if (!Array.isArray(arr)) {
		console.log("type error！");
		return;
	}
	return Array.from(new Set(arr))
}
console.log(unique([1, 2, 1, 3, 2, 2, 5, 3]));	// [1, 2, 3, 5]
```
