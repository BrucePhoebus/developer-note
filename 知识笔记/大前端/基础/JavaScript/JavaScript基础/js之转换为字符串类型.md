<!--
 * @Description: js之转换为字符串类型
 * @Date: 2021-04-20 00:51:02
 * @LastEditors: phoebus
 * @LastEditTime: 2021-04-20 01:06:32
 * @tags: 类型转换
-->
# js之转换为字符串类型

### 常规实现

``` JS
(123).toString();	// '123'
({}).toString();// '[object Object]'
([]).toString();	// ''
(true).toString();	// 'true'
(null).toString();	// Cannot read property 'toString' of null
(undefined).toString();	// Cannot read property 'toString' of undefined
(NaN).toString();	// 'NaN'
```

> 可以看出，这缺陷还是比较多的，很多数据都无法处理，需要预防的有点多

### 快捷升级版 - 自动转换

``` JS
console.log('' + 123);	// ‘123’	
console.log('' + {});	// '[object Object]'	
console.log('' + []);	// ''	
console.log('' + null);	// 'null'	
console.log('' + true);	// 'true'	
console.log('' + undefined);	// 'undefined'	
console.log('' + NaN);	// 'NaN'	
```

> 可以看出，这里除了对象我们没办法处理，其他都处理得比较好，而对象，可以结合JSON处理

### JSON.stringify

``` JS
console.log(JSON.stringify(123));	// '123'
console.log(JSON.stringify({}));	//	'{}' 
console.log(JSON.stringify([]));	// '[]'
console.log(JSON.stringify(null));	// 'null'
console.log(JSON.stringify(true));	// 'true'
console.log(JSON.stringify(NaN));	// 'null'
console.log(JSON.stringify(undefined));	// 'undefined'
```

> 可以看出，JSON.stringify除了`NaN`这个特殊的类型其余的类型都能很好的进行转换
