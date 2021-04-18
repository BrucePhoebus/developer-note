<!--
 * @Description: js之转换为数字类型
 * @Date: 2021-04-17 01:15:18
 * @LastEditors: phoebus
 * @LastEditTime: 2021-04-19 00:50:47
 * @tags: leetCode
-->
# js之转换为数字类型

### 常规实现方案

	parseInt() 、 Number()

``` JS
const age = "26"
const ageConvert = parseInt(age)
const ageConvert2 = Number(age)
console.log(ageConvert, typeof ageConvert);	// 26 number
console.log(ageConvert2, typeof ageConvert2)	// 26 number
```
### 小技巧：+ 自动类型转换

``` JS
const age = "26"
const ageConvert = +age
console.log(ageConvert, typeof ageConvert);	// 26 number
```
