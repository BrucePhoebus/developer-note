<!--
 * @Date: 2021-04-22 10:54:06
 * @LastEditors: 郑烨锟
 * @LastEditTime: 2021-04-22 11:03:33
 * @tags: 	
 *  - 分享
 *  - 小技巧
-->

# 修改url但是不刷新页面

> 应用场景：主要是用户检索之后可能会复制URL链接引用给别人，以实现分享效果，这样的话参数变更之后就需要变更URL参数，但这个时候是没有必要刷新页面的

### js改变URL地址但不刷新

使用浏览器的`pushState`可以实现对URL的操作

```js
// 参考实现
var url = window.location.href;
var noParamsUrl = url.split("?")[0];
// 使用新的值更换当前窗口url
window.history.pushState({}, 0, noParamsUrl);
```
