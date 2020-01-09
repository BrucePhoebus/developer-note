<!--
 * @Description: 参考omit.js的实现过滤对象属性
 * @Date: 2020-01-09 15:27:17
 * @LastEditors  : phoebus
 * @LastEditTime : 2020-01-09 15:32:10
 -->

# 实现对象属性过滤

``` JS
/**
 * 学习omit实现对象属性过滤
 * params obj: Object 		需要过滤的对象
 * params fields: Array 	需要过滤的属性
 */
function omit(obj = {}, fields = []) {
	const shallowCopy = {
		...obj;
	}
	for (let i = 0; i < fields.length; i++) {
		const key = fields[i];
		delete shallowCopy[key];
	}
	return shallowCopy;
}
export default omit;
```
