# HTML meta标签总结与属性使用

> [引用](https://segmentfault.com/a/1190000004279791)

## 说明

	之前前端学习和应用过程中，经常在HTML页面的head标签处加meta标签，但是一直不知道作用是什么，当然其实也知道一部分，也就是指定当前文件文字保存指定类型、关键字索引之类的，但是具体有哪些功能作用就不是很清楚了

	而随便打开一些网页，点下F12看看head处代码，都会发现一堆meta标签

```html
<meta charset="UTF-8">
```
#### 官方说明

	The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.

> 其中的关键是metadata，中文名叫元数据，是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。

**用处**

	Meta elements are typically used to specify page description, keywords, author of the document, last modified, and other metadata.

	The metadata can be used by browsers (how to display content or reload page), search engines (keywords), or other web services

> meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

## meta结构

	meta标签共有两个属性，分别是http-equiv属性和name属性。

#### name属性

	name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。

**语法格式**

```html
<meta name="参数" content="具体的描述">
```

###### name属性参数

	常用属性：keywords(关键字)、description(网站内容的描述)、viewport(移动端的窗口)

1. keywords(关键字)

	用于告诉搜索引擎，你网页的关键字

```html
<meta name="keywords" content="develop, 博客, 文科生, 前端">
```

2. description(网站内容的描述)

	用于告诉搜索引擎，你网站的主要内容

```html
<meta name="description" content="前端开发者，这是我的开发笔记"> 
```

3. viewport(移动端的窗口)
	
	控制页面是否可以缩放，主要用于移动端。在用bootstrap、AmazeUI等框架时候都有用过viewport。

**说明**

	在移动端的布局中，css中的1px并不等于物理上的1px，现在手机屏幕的分辨率已经越来越高，高像素但是屏幕尺寸却没有发生太大变化，这就说明一个物理像素点实际上塞入了好几个像素。
	
	所以在做移动端开发时，为了使移动端的页面在不同的手机上同样的大小来显示，我们可以将页面的宽度固定，然后获取设备的宽度，可以得到我们之前设定的宽度与设备宽度的比例，再使用HTML5新增的viewport来对页面进行缩放，并固定不允许用户再重新缩放。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
```

|参数|说明|
|:---:|:---:|
|width|设置layout viewport 的宽度，为一个正整数，使用字符串`width-device`表示设备宽度|
|initial-scale|设置页面的初始缩放值，为一个数字，可以带小数|
|minimum-scale|允许用户的最小缩放值，为一个数字，可以带小数|
|maximum-scale|允许用户的最大缩放值，为一个数字，可以带小数|
|user-scalable|是否允许用户进行缩放，值为”no”或”yes”, no 代表不允许，yes代表允许|

4. robots(定义搜索引擎爬虫的索引方式)

	robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
	
	content的参数有all、none、index、noindex、follow、nofollow。默认是all。

```html
<meta name="robots" content="none">
```

|参数|参数说明|
|:---:|:---:|
|none|搜索引擎将忽略此网页，等价于noindex，nofollow|
|noindex|搜索引擎不索引此网页|
|nofollow|搜索引擎不继续通过此网页的链接索引搜索其它的网页|
|all|搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow|
|index|搜索引擎索引此网页|
|follow|搜索引擎继续通过此网页的链接索引搜索其它的网页|

5. author(作者)

	用于标注网页作者

```html
<meta name="author" content="zyk, 841380530@qq.com"> 
```

6. generator(网页制作软件)

	用于标明网页是什么软件做的

```html
<meta name="generator" content="Visual Studio Code"> 
```

7. copyright(版权)

	用于标注版权信息

```html
<!-- 代表该网站为phoebus个人版权所有 -->
<meta name="copyright" content="phoebus"> 
```

8. revisit-after(搜索引擎爬虫重访时间)

	如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。

```html
<meta name="revisit-after" content="7 days" >
```

9. renderer(双核浏览器渲染方式)

	renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。

```html
<!-- 默认webkit内核 -->
<meta name="renderer" content="webkit">
<!-- 默认IE兼容模式 -->
<meta name="renderer" content="ie-comp">
<!-- 默认IE标准模式 -->
<meta name="renderer" content="ie-stand">
```

#### http-equiv属性

	equiv的全称是"equivalent"，http-equiv顾名思义，相当于http的文件头作用。

**语法格式**

```html
<meta http-equiv="参数" content="具体的描述">
```

###### http-equiv属性参数

1. content-Type(设定网页字符集)(推荐使用HTML5的方式)

	用于设定网页字符集，便于浏览器解析与渲染页面

```html
<!-- 旧的HTML，不推荐 -->
<meta http-equiv="content-Type" content="text/html;charset=utf-8"> 

<!-- HTML5设定网页字符集的方式，推荐使用UTF-8 -->
<meta charset="utf-8">
```

2. X-UA-Compatible(浏览器采取何种版本渲染当前页面)

	用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见）

```html
<!-- 指定IE和Chrome使用最新版本渲染当前页面 -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
```

3. cache-control(指定请求和响应遵循的缓存机制)

**用法1**

	指导浏览器如何缓存某个响应以及缓存多长时间。

```html
<meta http-equiv="cache-control" content="no-cache">
```

|参数|说明|
|:---:|:---:|
|no-cache先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存|
|no-store|不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）|
|public|缓存所有响应，但并非必须。因为max-age也可以做到相同效果|
|private|只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）|
|max-age|表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒|

**用法2 禁止百度自动转码**

	用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在head中加入例子中的那句话，就可以避免百度自动转码了。

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```

4. expires(网页到期时间)

	用于设定网页的到期时间，过期后网页必须到服务器上重新传输。

```html
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```

5. refresh(自动刷新并指向某页面)

	网页将在设定的时间内，自动刷新并调向设定的网址。


```html
<!-- 意思是2秒后跳转至指定地址 -->
<meta http-equiv="refresh" content="2；URL=https://brucephoebus.github.io/developer-note/#/?tdsourcetag=s_pctim_aiomsg">
```

6. ~~Set-Cookie~~(cookie设定)

	如果网页过期。那么这个网页存在本地的cookies也会被自动删除

```html
<!-- 格式 -->
<meta http-equiv="Set-Cookie" content="name, date">

<!-- 具体范例 -->
<meta http-equiv="Set-Cookie" content="User=phoebus; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT">
```

7. Window-target(设置显示窗口的默认设定)

	强制改变页面在当前窗口的显示方式为独立显示，可以用来防止别人在框架里调用自己的页面。

```html
<meta http-equiv="Window-target" content="_top">
```

8. ~~content-Language~~（显示语言的设定）

```html
<meta http-equiv="Content-Language" content="zh-cn"/>
```

## 其他

#### WebApp(全屏模式：伪装app，离线应用)

```html
<!-- 启用 WebApp 全屏模式 -->
<meta name="apple-mobile-web-app-capable" content="yes" />
```

#### 在移动端的用法

```html
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
```

#### 其他

1. telephone=no

	忽略数字自动识别为电话号码

```html
<meta content="telephone=no" name="format-detection" />
```

2. email=no

	忽略识别邮箱

```html
<meta content="email=no" name="format-detection" />
```

3. <base\> 标签

	<base\> 标签为页面上的所有链接规定默认地址或默认目标

```HTML
<base href="连接地址">
```

- 为页面上所有链接指定默认打开方式(和meta的Window-target有作用相似)

```HTML
<base target="_self">
```

>  target指定页面中所有标签都是本页打开

