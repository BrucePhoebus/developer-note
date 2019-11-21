# HTTP请求方式详解

## 概述

#### HTTP请求方式有哪些？

	GET、POST、PUT、DELETE、HEAD

#### HTTP请求方式有区别？

* 提前总结：看了`get和post的区别`后就知道，这些请求方式本质上都是TCP/IP请求，本质上没有区别，但是我们在应用上对他们区分了应用场景，通过规范、浏览器、服务器、请求过程等进行了各种限制，让他们表现处理就是不一样

> [get和post的区别](知识笔记/大前端/HTTP/请求/get和post的区别.md)

#### 他们表现出哪些不同？


#### DELETE特殊的POST请求

> DELETE请求原理是是使用URL传参的，也就是给GET方式一样将参数放在URL上传递

**例如axios封装的DELETE请求**



