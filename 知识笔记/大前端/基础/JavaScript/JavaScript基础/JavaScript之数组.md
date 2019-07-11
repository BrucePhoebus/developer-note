# JavaScript之数组相关

## 基础

## 数组方法实现

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

