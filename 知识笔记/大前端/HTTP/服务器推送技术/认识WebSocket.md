# 认识WebSocket

## 概述

#### 为什么需要 WebSocket？

	需要WebSocket这个协议的原因：HTTP 协议有一个缺陷，通信只能由客户端发起

* HTTP协议只能单向请求，也就是客户端请求服务端，这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用`轮询`：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

> 轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。WebSocket协议因此诞生

#### WebSocket简介

	WebSocket最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

**特点**

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL

## WebSocket应用

#### WebSocket简单使用

**一个网页脚本的例子**

``` js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};
```

#### 客户端使用

	客户端的 API

1. WebSocket 构造函数

	用于新建 WebSocket 实例

2. webSocket.readyState

	readyState属性返回实例对象的当前状态

3. webSocket.onopen

	用于指定连接成功后的回调函数

4. webSocket.onclose

	用于指定连接关闭后的回调函数

5. webSocket.onmessage

	用于指定收到服务器数据后的回调函数

6. webSocket.send()

	实例对象的send()方法用于向服务器发送数据

7. webSocket.bufferedAmount

	实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束

8. webSocket.onerror

	实例对象的onerror属性，用于指定报错时的回调函数

#### 服务端实现

###### 常用的 Node 实现

> [µWebSockets](https://github.com/uWebSockets/uWebSockets)

> [Socket.IO](http://socket.io/)

> [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

> 参考：[WebSocket 教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
