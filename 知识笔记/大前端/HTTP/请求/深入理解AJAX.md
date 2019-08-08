# 深入理解AJAX

## 请求参数详解

#### 请求头设置

###### 各种数据格式

* json格式数据

``` js
xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
```

* 表单数据( `推荐使用` )

	模仿form表单，即form-data格式

``` js
ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
```

* 纯文本（默认值）

``` js
xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
```

* html文本

``` js
xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
```

> 注：编码和大小写无所谓

``` js
// 不带字符编码写法
xhr.setRequestHeader("Content-type", "application/json");

// 无所谓大小写
xhr.setRequestHeader("Content-type", "Application/JSON; charset=utf-8");
```

###### 原生ajax请求头设置

	使用setRequestHeader函数

**原生ajax请求流程**

1. 创建XMLHTTPRequest对象

``` js
// 1.创建AJAX对象
var xhr = new XMLHttpRequest();
```

2. 先调用open方法创建http请求，并设置请求地址

``` js
xhr.open("post", "/save");
```

3. 设置数据发生格式，开始与服务端交互

	一般都建议使用表单传值方式

``` js
ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
```

4. 注册事件

	发生请求

``` js
// get请求
ajax.send(null);

// post请求
ajax.send(info); // 这里使用仿表单传值，所以info为表单对象
```

5. 获取响应并更新界面

``` js
function doResponse(xhr) {
    // 原生ajax请求的响应逻辑处理
    console.log(xhr); // 从xhr对象中获取响应数据，在这做相应处理
}
```

###### jQuery的ajax方法设置请求头

	通过ajax的contentType参数设置请求头

**全局设置**

	所有的ajax请求都会加上这个请求头

``` js
 $(document).ajaxSend(function(event, xhr) {
     xhr.setRequestHeader("custom-header", "custom-info"); // 增加一个自定义请求头
     xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded"); // 设置请求数据格式
 });
```

**局部**

1. 在方法beforeSend()中设置

``` js
$('xxx').ajax({
    // ...
    contentType: "application/x-www-form-urlencoded", // 设置请求数据格式
    beforeSend: function(jqXHR, options) {
        jqXHR.setRequestHeader("custom-header", "custom-info"); // 增加一个自定义请求头
    }
    // ...
});
```

2. 在headers对象参数中设置

``` js
$('xxx').ajax({
    // ...
    contentType: "application/x-www-form-urlencoded", // 设置请求数据格式
    headers: {
        "Referer": "http:// www.365mini.com", // 有些浏览器不允许修改该请求头       
        "User-Agent": "newLine", // 有些浏览器不允许修改该请求头        
        "X-Power": "newLine",
        "Accept-Language": "en-US"
    }
    // ...
});
```

## ajax异步请求方式

#### 简单使用语法

* load(url, [data], [callback])

``` js
$("#test").load("test.php", {
    limit: 1
}, function() {
    alert("yes!");
});
```

* $.getJSON(url, [data], [callback])

``` js
$.getJSON("test.php", {
    name: "phoebus"
}, function(data) {
    alert("JSON");
});
```

> 这参数可以单独写，也可以直接写在URL后面

* $.get(url, [callback])

``` js
$.get("test.php?msg=参数一般写在这里", {
    name: "phoebus"
}, function(data) {
    alert("JSON");
});
```

> 虽然参数也可以直接单独写在`request body`中，但是遵循HTTP协议规范，GET方法参数我们还是写在URL上好

* $.post(url, [data], [callback])

``` js
$.post("test.php", {
    name: "phoebus"
}, function(data) {
    alert("JSON");
});
```

> 虽然参数也可以写在URL后面，但是遵循HTTP协议规范，POST方法的参数还是写在`request body`好

* $.ajax()

``` js
$.ajax({
	type: "GET", // 请求方式为get或者post
	url: "test.json", // 请求的url(一般为后台接口)
	data: {
		user: "phoebus"
	}, // 发送到服务器的参数
	dataType: "json", // 服务器响应的数据类型
	success: function(data) { // 请求成功后返回的数据，赋值给变量'data'
		// 对data进行操作        
	}
})
```

> 上述这些方法基本等价于`$.ajax()`方法，所有我们基本使用它比较多，当然也有基于它的二次封装

> 参考：[Ajax请求头设置Content-type](https://blog.csdn.net/xiazeqiang2018/article/details/81319785)

