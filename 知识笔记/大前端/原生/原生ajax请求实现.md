<!--
 * @Date: 2021-04-22 18:56:28
 * @LastEditors: 郑烨锟
 * @LastEditTime: 2021-04-22 19:09:39
 * @tags:
 *  - 原生
 *  - ajax
-->
# 原生ajax请求实现

原生ajax：通过`XmlHttpRequest`对象向服务器发异步请求，从服务器获得数据，然后用`JavaScript`来操作DOM更新页面的技术

### 原生实现

```js
var xhr = new XMLHttpRequest();
xhr.open("post", "http://www.baidu.com");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onreadystatechange() = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    return xhr.responseText;
  }
}
```

### 考察服务器响应的五个状态

* 0：请求未初始化(代理被创建，但尚未调用open()方法) 

* 1：服务器连接已经建立(open函数已经被调用)

* 2：请求已经接收(send函数已经被调用，并且头部和状态已经可以获得)

* 3：请求处理中(下载中，`responseText`属性已经包含部分数据)

* 4：请求已经完成，且响应已就绪(下载操作已经完成)
