<!--
 * @Description: 
 * @Date: 2019-08-10 01:46:28
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-15 18:01:48
 -->
# JavaScript之数组相关

## 常用

#### 数组方法之去重

###### 传入数组，返回已去重的数组

	传入数组，返回已去重的数组，元素顺序不变

``` js
function unique(array) {
    var newArr = [];
    var obj = {};
	var i,
		len = array.length;
	for (i = 0; i < len; i++) {
		if (!obj[array[i]]) {
			newArr.push(array[i]);
			obj[array[i]] = 1;
		}
	}

	return newArr;
}
```

#### 数组运算

###### 数组求和

	使用eval + join，先用join()将数组通过运算符连为一个字符串，而使用eval()方法能直接执行这个字符串表达式

``` js
let arr = [1, 2, 3, 4];
eval(arr.join('+'));	// 10
```

**同样的方法可以实现其他运算**

``` js
let arr = [4, 3, 2, 1];
eval(arr.join('*'));	// 24
eval(arr.join('/'));	// 0.6666...
eval(arr.join('-'));	// -2
eval(arr.join('^'));	// 4
// ...
```

#### 数组合并与展开

###### 数组完全展开(数组降维)

	就是将多维数组展开为一维数组存在

* 最简单朴素的做法

	这个最直接，但是不优雅，傻瓜式操作，这是对两位数组降维

``` js
function arrayToFlat(arr) {
    var reduced = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            reduced.push(arr[i][j]);
        }
    }
    return reduced;
}
```

* concat转换实现

	如果concat方法的参数是一个元素，该元素会被直接插入到新数组中；如果参数是一个数组，该数组的各个元素将被插入到新数组中
	使用concat()方法直接将子数组展开插入到新的数组中，这是对上一种方法的优化

``` js
function reduceDimension(arr) {
    var reduced = [];
    for (var i = 0; i < arr.length; i++){
        reduced = reduced.concat(arr[i]);
    }
    return reduced;
}
```

* 两位数组优雅降维

``` js
function arrayToFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
```

> arr作为apply方法的第二个参数，本身是一个数组，数组中的每一个元素（还是数组，即二维数组的第二维）会被作为参数依次传入到concat中，效果等同于`[].concat([1,2], [3,4], [5,6])`；利用apply方法，我们将单重循环优化为了一行代码

* 多维数组优雅降维

``` js
function arrayToFlat(arr) {
	// 判断数组之中是否还存在数组
	while (arr.some(t => Array.isArray(t))) {
		/* 
			如果存在，此时arr是上个arr的子数组的值，concat()方法把子数组展开返回，递归操作一层层展开
		 */
		arr = ([]).concat.apply([], arr);
		/* 
			console.log(arr);
			输出：
			(11) [1, 2, 3, Array(1), 5, 6, 7, 8, Array(3), 13, 14]
			(13) [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(2), 12, 13, 14]
			(14) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			(14) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
		 */
	}
	return arr;
}

var testArray = [1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14]; 
console.log(arrayToFlat(testArray));	// (14) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```
