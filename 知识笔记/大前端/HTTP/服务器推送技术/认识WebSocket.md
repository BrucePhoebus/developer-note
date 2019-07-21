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

#### WebSocket 协议

	WebSocket 协议本质上是一个基于 TCP 的协议。

* 为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息`Upgrade: WebSocket`表明这是一个`申请协议升级`的 HTTP 请求

* 服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

###### 协议详解

**客户端请求服务端的头信息**

``` bash
GET /chat HTTP/1.1
Host: server.example.com
# 这个头信息设置就表面要求建立 Websocket 连接
Upgrade: websocket
Connection: Upgrade
# 握手认证信息
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

**服务端响应客户端的头信息**

``` bash
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

> `Upgrade:WebSocket`表示这是一个特殊的 HTTP 请求：请求的目的就是要将客户端和服务器端的通讯协议从 HTTP 协议升级到 WebSocket 协议；其中，客户端的`Sec-WebSocket-Key`和服务器端的`Sec-WebSocket-Accept`就是重要的握手认证信息

###### WebSocket接口定义和调用

**WebSocket JavaScript 接口定义**

``` java
[Constructor(in DOMString url, optional in DOMString protocol)]
interface WebSocket {
	readonly attribute DOMString URL;
	// ready state
	const unsigned short CONNECTING = 0;
	const unsigned short OPEN = 1;
	const unsigned short CLOSED = 2;
	readonly attribute unsigned short readyState;
	readonly attribute unsigned long bufferedAmount;
	
	// networking
	attribute Function onopen;
	attribute Function onmessage;
	attribute Function onclose;
	boolean send(in DOMString data);
	void close();
};
WebSocket implements EventTarget;
```

**大概意思**

* readyState表示连接有四种状态：

* CONNECTING (0)：表示还没建立连接；

* OPEN (1)： 已经建立连接，可以进行通讯；

* CLOSING (2)：通过关闭握手，正在关闭连接；

* CLOSED (3)：连接已经关闭或无法打开；

* url是代表 WebSocket 服务器的网络地址，协议通常是”ws”或“wss(加密通信)”,send 方法就是发送数据到服务器端；

* close 方法就是关闭连接；

* onopen连接建立，即握手成功触发的事件；

* onmessage收到服务器消息时触发的事件；

* onerror异常触发的事件；

* onclose关闭连接触发的事件；

**JavaScript调用浏览器接口**

	上面看看就好，这个是前端需要会的js调用

``` js
var wsServer = 'ws://localhost:8888/Demo'; //服务器地址
var websocket = new WebSocket(wsServer); //创建WebSocket对象
websocket.send("hello");//向服务器发送消息
alert(websocket.readyState);//查看websocket当前状态
websocket.onopen = function (evt) {
	// 已经建立连接，实现通信逻辑
};
websocket.onclose = function (evt) {
	// 已经关闭连接
};
websocket.onmessage = function (evt) {
	// 收到服务器消息，使用evt.data提取
};
websocket.onerror = function (evt) {
	// 产生异常
}; 
```

> 注意：这个WebSocket协议同样遵循握手协议，跟普通三次握手协议一样，当然这个过程浏览器会代劳，不过服务端实现或许比较复杂点，参考开源实现：

	Kaazing WebSocket Gateway(一个 Java 实现的 WebSocket Server)；
    mod_pywebsocket(一个 Python 实现的 WebSocket Server)；
    Netty(一个 Java 实现的网络框架其中包括了对 WebSocket 的支持)；
    node.js(一个 Server 端的 JavaScript 框架提供了对 WebSocket 的支持)；
    WebSocket4Net(一个.net的服务器端实现)；

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

> 参考：[WebSocket 教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2017/05/websocket.html) | [WebSocket使用教程 - 带完整实例](https://www.cnblogs.com/zxtceq/p/6963964.html)
