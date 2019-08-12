<!--
 * @Description: 深入浅出基于JWT的Token认证
 * @Date: 2019-08-12 15:27:08
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-12 16:03:08
 -->
# 深入基于JWT的Token认证

## 概述

> [常见登陆认证方式](知识笔记/大前端/前端安全/登录认证/常见登陆认证方式.md)

## 概述

#### 前言

* 首先，其实对于开发来说token认证更重于第三方认证，毕竟第三方认证是别人的，虽然我们得会，但是大部分公司其实都希望建立自己稳定的用户群体，也就是希望用户注册账号，而token认证就是当代流行的解决方案

* 其次一般我们将 `token认证` 跟别的认证方式比较一般就是 `cookie认证` ，第三方只能说是补充，一种便捷的登录信息授权方案，本质上还是以 `token认证` (或更好的认证)为基础

* 最后看看 `Cookie认证机制` 的优劣：[常见登陆认证方式](知识笔记/大前端/前端安全/登录认证/常见登陆认证方式.md)

> 简单的说， `Cookie认证机制` 已经过时了，现在移动互联网时代，各种场景问题层出不穷， `Cookie认证机制` 存在一些比较不方便且不安全的问题让我寻求更好更方便的认证机制，而 `token认证` 就是更好的， `第三方认证` 就是更方便的

#### Token Auth的优劣

**Token机制相对于Cookie机制又有什么好处呢？**

* 支持跨域访问

	Cookie是不允许垮域访问的，这一点对Token机制是不存在的，前提是传输的用户认证信息通过HTTP头传输.

* 无状态(也称：服务端可扩展行)

	Token机制在服务端不需要存储session信息，因为Token 自身包含了所有登录用户的信息，只需要在客户端的cookie或本地介质存储状态信息.

* 更适用CDN

	可以通过内容分发网络请求我们服务端的所有资料（如：javascript，HTML,图片等），而我们的服务端只要提供API即可.

* 去耦

	不需要绑定到一个特定的身份验证方案。Token可以在任何地方生成，只要在我们的API被调用的时候，我们可以进行Token生成调用即可.

* 更适用于移动应用

	当我们的客户端是一个原生平台（iOS, Android，Windows 8等）时，Cookie是不被支持的（我们需要通过Cookie容器进行处理），这时采用Token认证机制就会简单得多。

* CSRF

	因为不再依赖于Cookie，所以我们就不需要考虑对CSRF（跨站请求伪造）的防范。

* 性能

	一次网络往返时间（通过数据库查询session信息）总比做一次HMACSHA256计算 的Token验证和解析要费时得多.

* 不需要为登录页面做特殊处理

	如果我们使用Protractor 做功能测试的时候，不再需要为登录页面做特殊处理.

* 基于标准化

	我们的API可以采用标准化的 JSON Web Token (JWT). 这个标准已经存在多个后端库（.NET, Ruby, Java,Python, PHP）和多家公司的支持（如：Firebase,Google, Microsoft）

## 基于JWT的Token认证机制实现

	JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息

#### JWT的组成

	一个JWT实际上就是一个字符串，它由三部分组成，头部、载荷与签名

###### 载荷（Payload）

``` js
{
    "iss": "Online JWT Builder",	// JWT的签发者，可选
    "iat": 1416797419,	// issued at)，在什么时候签发的(UNIX时间)，可选
    "exp": 1448333419,	// expires)，什么时候过期，这里是一个Unix时间戳，可选
    "aud": "www.example.com",	// 接收该JWT的一方，可选
    "sub": "phoebus@example.com",	// JWT所面向的用户，可选
    "GivenName": "Johnny",
    "Surname": "Rocket",
    "Email": "phoebus@example.com",
    "Role": ["Manager", "Project Administrator"],
}
```

> 还有nbf (Not Before)：如果当前时间在nbf里的时间之前，则Token不被接受；一般都会留一些余地，比如几分钟；，可选

* 将上面的JSON对象进行`[base64编码]`可以得到下面的字符串，这个字符串我们将它称作JWT的Payload（载荷）

``` bash
eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9
```

###### 头部（Header）




> 参考：[基于Token的WEB后台认证机制](https://www.cnblogs.com/xiekeli/p/5607107.html)

