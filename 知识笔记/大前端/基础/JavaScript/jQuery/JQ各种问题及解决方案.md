# JQ各种问题及解决方案

## 常见

#### 请求问题

###### ajax获取数据中文乱码问题解决方案

	使用scriptCharset即可解决问题，用contentType就不一定可以

``` js
$.ajax({ 
	url: testUrl, 
	dataType: 'jsonp', 
	type: 'post', 
	scriptCharset: 'utf-8'
});
```

> 这里的`UTF-8`表示跟服务端一致的中文编码类型

**至于contentType方案**

``` js
jQuery(form).ajaxSubmit({ 
	url: "ajax.aspx?a=memberlogin", 
	type: "post", 
	dataType: "json", 
	contentType: "application/x-www-form-urlencoded; charset=utf-8", 
	success: showLoginResponse 
});
```

###### ajax处理跨域的三大方式


> 参考：[jquery中ajax处理跨域的三大方式](https://www.jb51.net/article/77470.htm)
