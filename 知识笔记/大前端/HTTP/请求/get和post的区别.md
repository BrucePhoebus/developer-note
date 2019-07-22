# get和post的区别

## 概述

#### 首先先看看什么是HTTP的GET和POST请求

###### 普通理解

* GET请求：是把参数放在`URL`中请求传递的请求方式

* POST请求：是把参数放在`request body`中传参的请求方式

###### 实际上呢？

* 提前总结：GET和POST请求本质上是一样的，都是TCP/IP连接，但是因为应用过程的各种限制和规范，导致了他们其实看起来就是不一样的(主要是应用场景不同)

#### GET和POST请求的区别

###### 官方标准答案

* GET在浏览器回退时是无害的，而POST会再次提交请求(当然浏览器会告知用户数据会被重新提交)

* GET产生的URL地址可以被Bookmark(书签可收藏)，而POST不可以

* GET请求会被浏览器主动cache，而POST不会，除非手动设置

* GET请求只能进行url编码，而POST支持多种编码方式

	* GET编码类型application/x-www-form-url；POST编码类型encoded application/x-www-form-urlencoded 或 multipart/form-data，为二进制数据使用多重编码

* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留

* GET请求在URL中传送的参数是有长度限制的，而POST木有

	当发送数据时，GET 方法向 URL 添加数据，URL 的长度是受限制的(浏览器限制，URL 的最大长度是 2048 个字符)

* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制(也允许二进制数据)

* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

	在发送密码或其他敏感信息时绝不要使用 GET ！POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。

* GET参数通过URL传递(对所有人可见)，POST放在`Request body`中

#### 正确姿势

	来个本质的认识：GET和POST本质上没有区别

* HTTP的底层是TCP/IP，所以GET和POST的底层也是TCP/IP，所以说：GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。我们要给GET加上`request body`，给POST带上url参数，技术上是完全行的通的。 

* 首先，HTTP请求方式分类是属于专业化语义化处理，针对不同的需求场景对于执行针对性的请求方式，所以我们GET, POST, PUT, DELETE，HEAD等这些请求方式其实会在请求的时候打个TAG，规范化，同时告诉别人这是什么什么请求方式，别人就可以使用针对的格式处理

* 而关于URL参数限制，（大多数）浏览器通常都会限制url长度在2K个字节，而（大多数）服务器最多处理64K大小的url，而超过的部分，服务端不做处理。那么技术上我们是可以可以在GET请求时将一堆参数放进`request body`中，但是因为不同浏览器处理方式不同，之前说了HTTP会根据不同请求方式打TAG，所以大多服务器对于GET请求的request body数据可能会不做处理(忽略了)，因为人家遵循了HTTP行业通信标准。

> 所以总结出来，其实GET和POST请求本质上是没有区别的，都是TCP/IP连接，但是因为HTTP规范/浏览器限制/服务端现在，所以体现出来它就有区别了

* 上面只说了本质和规范，实际上应用又是一回事：GET和POST的请求过程也是不一样的

!> GET和POST还有一个重大区别：GET产生一个TCP数据包；POST产生两个TCP数据包

	对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200并返回数据(发一次数据包)；
	而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200并返回数据(发两次数据包)。

* 因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效

	所以原则上说GET请求会比POST请求快，而当页面请求数过多的时候，我们可以考虑使用GET请求来替代一些POST请求

* 其次，虽然上面说的是常规的，但是凡事总有例外和需警惕的问题：

	* GET与POST都有自己的语义，不能随便混用

	* 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点

	* 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次

> 参考：[99%的人都理解错了HTTP中GET与POST的区别](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)
