<!--
 * @Date: 2021-04-30 17:34:45
 * @LastEditors: 郑烨锟
 * @LastEditTime: 2021-04-30 17:40:55
 * @tags: 	
 *  - 长连接
 *  - socket
-->
# socket.io解决websocket兼容问题

- `websocket`是`socket.io`的一个子集，还有其余的长连接解决方案被封装进去，包含 `Adobe Flash Socket`、`Ajax 长轮询`、`Ajax multipart streaming`、`持久 Iframe`、`JSONP 轮询`等，用于解决兼容性问题

- `socket.io`会自动检测当前环境是否支持`websocket`连接，如果不支持则选择其余最佳的方案实现网络实时通讯

> 这个长连接解决方案是前端的兼容解决方案，与后端无关，后端就是使用`socket`服务支持连接，既可以长连接，也可以一次连接

> 参考：[WebSocket 与 Socket.IO](https://zhuanlan.zhihu.com/p/23467317)
