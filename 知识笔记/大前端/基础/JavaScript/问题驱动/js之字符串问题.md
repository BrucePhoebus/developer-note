<!--
 * @Description: js处理字符串相关问题
 * @Date: 2019-09-04 17:31:26
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-04 17:35:10
 -->
# js处理字符串相关问题

## 常见基础问题

#### js之获取url参数中文乱码问题

* 这个功能很常见，虽然我们经常使用英文作为文件名，但是依旧有可以存着中文路径

* 而截取url是常规操作了但是如果存在中文时，浏览器会将中文使用`encodeURI`进行编码，这个时候就需要我们进行`decodeURI`处理一下了

``` js
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) {
		return decodeURI(r[2]);
	} 
	
	return null; 
}
```
