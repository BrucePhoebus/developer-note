<!--
 * @Description: js之多用三元表达式
 * @Date: 2021-04-17 01:09:20
 * @LastEditors: phoebus
 * @LastEditTime: 2021-04-17 01:14:40
 * @tags: leetCode
-->
# js之多用三元表达式

	经验的意义基于保障代码效率的同时，更多的是体现于代码精准简洁

### 菜鸟老方法

``` JS
const isCN = true;
let feeling;
if (isCN) {
	feeling = '小菜鸟！';
} else {
	feeling = '老司机！';
}
console.log(feeling);	// '小菜鸟！'
```

### 多用三元表达式

``` JS
const isCN = true;
let feeling = !isCN ? '小菜鸟！' : '老司机！';
console.log(feeling);	// '老司机！'
```


