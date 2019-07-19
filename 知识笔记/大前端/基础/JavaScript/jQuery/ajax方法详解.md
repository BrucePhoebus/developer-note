# ajax方法详解

## 概述

	ajax()方法是作为前后端交互的异步请求方法，当然实际上它也可以实现同步请求，只不过一般没啥人这样做而已

	对于开发者而已，这个就是前端请求后端接口的工具，而jQuery中使用更是便利，功能也着实强大，使用非常简单$.ajax()

> [深入理解AJAX](知识笔记/大前端/HTTP/请求/深入理解AJAX.md)

## 常见参数

#### URL(必填参数)

	要求为String类型的参数，（默认为当前页地址）发送请求的地址

``` js
$.ajax({
	url: 'https://brucephoebus.github.io/developer-note/#/?tdsourcetag=s_pctim_aiomsg'
	...
})
```

> 一般来说这个url是传绝对路径的，也就是`HTTP://...`开头，但是往往我们的项目中会对它进行二次封装，讲一些请求方式设为默认凭借指定或当前域名地址，例如：url值为'post/setContent'，这是接口地址，而我们可以设置拼接的网站，例如：`https://brucephoebus.github.io/`，最后实现的真实请求地址就是：`https://brucephoebus.github.io/post/setContent`

#### type(必填参数)

	要求为String类型的参数
	请求方式（post或get）默认为get。注意其他http请求方法，例如put和delete也可以使用，但仅部分浏览器支持。

> 这个请求方式一般与后端接口对应，无论我们请求方式是GET还是POST，后端都应该有对应介绍请求的接口，一般后端接口都会设定接受是GET还是POST，当然也有一个接口既接受GET请求也接受POST请求；不过必须有对应接收方式，否是便会出现该`HTTP请求404`效果，也就找不到接口

#### data(必填参数)

	要求为Object或String类型的参数，发送到服务器的数据
	get请求中如果data不是字符串，将自动转换为字符串格式，并将附加在url后传参；其中，对象必须为key/value格式，例如{foo1:"bar1",foo2:"bar2"}转换为&foo1=bar1&foo2=bar2。如果是数组，JQuery将自动为不同值对应同一个名称。例如{foo:["bar1","bar2"]}转换为&foo=bar1&foo=bar2。

> 对于这种自动转换的问题可以看：<a href="#知识笔记/大前端/基础/JavaScript/jQuery/ajax方法详解?id=processdata">processData参数系列</a>

#### async

	要求为Boolean类型的参数，默认设置为true，所有请求均为异步请求。
	如果需要发送同步请求，请将此选项设置为false。注意，同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行。

> 一般我们都是设置为true，也就是默认为异步请求，即不写就行，不过也有特殊场景或许需要我们使用同步，当然我没遇到过，有需要就可以设置值为false，表示同步，不过这会影响用户操作便是了

#### dataType

	要求为String类型的参数，预期服务器返回的数据类型。
	如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。

**可用的类型**

* xml：返回XML文档，可用jQuery处理。

* HTML：返回纯文本HTML信息；包含的script标签会在插入DOM时执行。

* script：返回纯文本JavaScript代码。不会自动缓存结果。除非设置了cache参数。注意在远程请求时（不在同一个域下），所有post请求都将转为get请求。

* json：返回JSON数据。

	这是最常用的返回数据类型

* jsonp：JSONP格式。使用JSONP形式调用函数时，例如url?callback=?，jQuery将自动替换后一个“?”为正确的函数名，以执行回调函数。

* text：返回纯文本字符串。

#### success(必填)

	要求为Function类型的参数，请求成功后调用的回调函数，有两个参数。

1. 由服务器返回，并根据dataType参数进行处理后的数据

2. 描述状态的字符串

``` js
function(data, textStatus){
	// data可能是xmlDoc、jsonObj、html、text等等
	// 进行请求成功回调逻辑
	this;  // 调用本次ajax请求时传递的options参数
}
```

#### error

	要求为Function类型的参数，请求失败时被调用的函数。
	该函数有3个参数，即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。

``` js
function(XMLHttpRequest, textStatus, errorThrown){
	// 通常情况下textStatus和errorThrown只有其中一个包含信息
	this;   // 调用本次ajax请求时传递的options参数
}
```

> 跟`success`同级，是请求失败异常处理逻辑实现，一方面方便调试bug等，另一方面也是出了问题可以优化用户体验，当然还存在一些特殊情况

#### contentType

	要求为String类型的参数，当发送信息至服务器时，内容编码类型默认为"application/x-www-form-urlencoded"。该默认值适合大多数应用场合。

!> 这是请求头设置，这属于顶层设计了，一般我们项目中都要进行请求二次封装，其中一定要设置这个默认请求头，一般我们就是设置`application/x-www-form-urlencoded`类型，前端POST请求方式就是使用form-data对象传值，这是统一通用的做法。（当然特殊场景特殊对待）

> 这个要深入理解，研究好，对前后端接口如何传值的理解很有帮助

## 其它参数

#### processData


#### timeout

	要求为Number类型的参数，设置请求超时时间（毫秒）。
	此设置将覆盖$.ajaxSetup()方法的全局设置。

> 对于这种超时的设置一般我们都是在二次封装请求的时候进行统一设置的，对所有超时等问题进行统一处理

#### cache

	要求为Boolean类型的参数，默认为true（当dataType为script时，默认为false），设置为false将不会从浏览器缓存中加载请求信息。

> 对于部分经常变动的资源我们可能希望客户端一直都是读取服务端最新的数据，这种时候我们就可以强制要求让浏览器每次都会重新向服务器请求数据，每次都读取最新的数据，而防止浏览器获取缓存数据

#### beforeSend

	要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数，例如添加自定义HTTP头。
	在beforeSend中如果返回false可以取消本次ajax请求。XMLHttpRequest对象是惟一的参数。

``` js
function(XMLHttpRequest){
	this;   // 调用本次ajax请求时传递的options参数
}
```

> 在某些需求请求过滤的情况或登陆验证等拦截的情况，我们就可以通过这个函数进行拦截判断，对不符合要求的情况可以针对性做统一处理

#### complete

	要求为Function类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。
	参数：XMLHttpRequest对象和一个描述成功请求类型的字符串

``` js
function(XMLHttpRequest, textStatus){
	this;    // 调用本次ajax请求时传递的options参数
}
```

> 请求完成的回调，一些情况下我们需要异步请求完成(无论成功失败与否)都执行某些操作，这时候这个方法就很有用了，当然，这效果跟异步等待回调差不多了

#### dataFilter

	要求为Function类型的参数，给Ajax返回的原始数据进行预处理的函数。
	提供data和type两个参数。data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数。函数返回的值将由jQuery进一步处理。

``` js
function(data, type){
	// 返回处理后的数据
	return data;
}
```

> 对于这个方法我没用过，但是看情况是过滤器的存在，应该是有些时候我们要对传输的数据进行多次加密或解密，这种需要统一解密的时候就需要这个方法了，也就是一般都是封装请求的时候设置的

#### global

	要求为Boolean类型的参数，默认为true。表示是否触发全局ajax事件。
	设置为false将不会触发全局ajax事件，ajaxStart或ajaxStop可用于控制各种ajax事件。

#### ifModified

	要求为Boolean类型的参数，默认为false。仅在服务器数据改变时获取新数据。
	服务器数据改变判断的依据是Last-Modified头信息。默认值是false，即忽略头信息。

> 这个有缓存意义，当我们需要提高性能降低服务器压力的时候我们可以这样做，能一定程度上减少请求数

#### jsonp

	要求为String类型的参数，在一个jsonp请求中重写回调函数的名字。
	该值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，例如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

#### username

	要求为String类型的参数，用于响应HTTP访问认证请求的用户名。

> 现在一般服务器都不用这个做认证处理了

#### password

	要求为String类型的参数，用于响应HTTP访问认证请求的密码。

> 现在一般服务器都不用这个做认证处理了

#### scriptCharset

	要求为String类型的参数，只有当请求时dataType为"jsonp"或者"script"，并且type是GET时才会用于强制修改字符集(charset)。通常在本地和远程的内容编码不同时使用。

``` js
$(function(){
    $('#send').click(function(){
         $.ajax({
             type: "GET",
             url: "test.json",
             data: {username:$("#username").val(), content:$("#content").val()},
             dataType: "json",
             success: function(data){
				$('#resText').empty();   //清空resText里面的所有内容
				var html = ''; 
				$.each(data, function(commentIndex, comment){
					html += '<div class="comment"><h6>' + comment['username']
								+ ':</h6><p class="para"' + comment['content']
								+ '</p></div>';
				});
				$('#resText').html(html);
			}
         });
    });
});
```

> 参考：[$.ajax()方法详解](https://www.cnblogs.com/tylerdonet/p/3520862.html) | [$.ajax 中的contentType](https://www.cnblogs.com/htoooth/p/7242217.html) | [ajax中设置contentType的问题](https://blog.csdn.net/ditto_zhou/article/details/73198886)
