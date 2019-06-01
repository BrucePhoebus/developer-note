# PC端PDF预览实现文档

## viewer插件实现PDF预览

> 这种实现方式拥有多种操作功能，查看、下载等

#### blob文件路径

> 这种实现方式因为IE识别不了，所以需要对IE浏览器做兼容处理

*base64 pdf转blob文件*

```js
// data问base64加密的PDF流
var blob = electronSignature.base64ToBlob(response.data, 'application/pdf');

// 把base64的PDF文件流转为blob
base64ToBlob: function (base64Data, type) {
	var byteString = window.atob(base64Data); //base64 解码
	var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
	var intArray = new Uint8Array(arrayBuffer); //创建视图

	for (var i = 0; i < byteString.length; i++) {
		intArray[i] = byteString.charCodeAt(i);
	}
	return new Blob([intArray], {type: type});
}
```

*插件引入*

> 这个插件使用非常简单，直接将blob生成的url传入viewer.html文件中，就可以生成PDF预览，然后使用window.open()方法在新标签页打开即可，当然在子标签页打开和在当前页面实现预览也是可以的

```js
window.open('/pubWeb/static/web/viewer.html?file=' + encodeURIComponent(window.URL.createObjectURL(blob)));
```

*IE兼容处理*

> 因为IE无法直接使用blob路径的文件，所以只能使用微软提供的方法window.navigator.msSaveOrOpenBlob()做转换处理，但是这个方法貌似只能下载到本地查看

```js
if (isIE()) {
	window.navigator.msSaveOrOpenBlob(blob, '申请书电子签名.pdf');
}

// 判断是不是IE浏览器
isIE: function() {
	var ua = navigator.userAgent.toLocaleLowerCase();
	if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
		return true;
	} else {
		return false;
	}
}
```

> window.navigator.msSaveOrOpenBlob()方法参数为blob文件和文件名

#### 本地或服务器url

> 这个使用viewer插件实现PDF预览就非常方便了，只需要将url传入viewer.html处理，就可以实现pdf预览，IE11也可用（具体版本兼容不清楚），同样在子标签页打开和在当前页面实现预览也是可以的

```js
window.open('/pubWeb/static/web/viewer.html?file=' + url);
```

