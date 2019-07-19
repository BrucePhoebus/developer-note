# HTML5新特性

## 1. 语义化标签

	语义化标签使得页面的内容结构化， 见名知义

**好处**

* 使代码结构清晰， 便于阅读

* 便于SEO

* 无障碍阅读

* 便于后期的维护与开发

**具体**

|标签|描述|
|:---:|:---:|
|<hrader\><\/header>|定义了文档的头部区域|
|<footer\><\/footer>|定义了文档的尾部区域|
|<nav\><\/nav>|定义文档的导航|
|<section\><\/section>|定义文档中的节（section、 区段）|
|<article\><\/article>|定义页面独立的内容区域|
|<aside\><\/aside>|定义页面的侧边栏内容|
|<detailes\><\/detailes>|用于描述文档或文档某个部分的细节|
|<summary\><\/summary>|标签包含 details 元素的标题|
|<dialog\><\/dialog>|定义对话框， 比如提示框|

> 当然， 因为兼容性问题和代码规范等原因， 这个很多公司都没有使用， 当然footer标签貌似经常用

## 2. 智能表单

	html5中提供了多个新的类型的input类型， 让表单更多功能， 可以完成更多种多样的需求

	* color
	* datatime
	* data4.tel
	* e-mail
	* number
	* range
	* search

**具体**

|输入类型|描述|
|:---:|:---:|
|color|主要用于选取颜色|
|date|从一个日期选择器选择一个日期|
|datetime|选择一个日期（UTC 时间）|
|datetime-local|选择一个日期和时间 (无时区)|
|email|包含 e-mail 地址的输入域|
|month|选择一个月份|
|number|数值的输入域|
|range|一定范围内数字值的输入域|
|search|用于搜索域|
|tel|定义输入电话号码字段|
|time|选择一个时间|
|url| URL 地址的输入域|
|week|选择周和年|

**新增表单元素**

|表单元素|描述|
|:---:|:---:|
|<datalist\>|元素规定输入域的选项列表<br>使用 <input\> 元素的 list 属性与 <datalist\> 元素的 id 绑定|
|<keygen\>|提供一种验证用户的可靠方法<br>标签规定用于表单的密钥对生成器字段|
|<output\>|用于不同类型的输出<br>比如计算或脚本输出|

**新增表单属性**

|表单属性|类型|描述|
|:---:|:---:|:---:|
|placehoder|属性|简短的提示在用户输入值前会显示在输入域上。 即我们常见的输入框默认提示， 在用户输入后消失|
|required|属性|是一个 boolean 属性。 要求填写的输入域不能为空|
|pattern|属性|描述了一个正则表达式用于验证<input\> 元素的值|
|min 和 max|属性|设置元素最小值与最大值|
|step|属性|为输入域规定合法的数字间隔|
|height 和 width|属性|用于 image 类型的 <input\> 标签的图像高度和宽度|
|autofocus|属性|是一个 boolean 属性。 规定在页面加载时， 域自动地获得焦点|
|multiple|属性|是一个 boolean 属性。 规定<input\> 元素中可选择多个值|

## 3. 音频（audio）和视频（video）

	HTML5 提供了播放音频文件的标准， 即使用 < audio\ > 元素， 并规定了一种通过 video 元素来包含视频的标准方法

**audio示例**

	control 属性供添加播放、 暂停和音量控件
	在 < audio > 与 < /audio> 之间你需要插入浏览器不支持的<audio>元素的提示文本  <
	    audio > 元素允许使用多个 < source > 元素. < source > 元素可以链接不同的音频文件， 浏览器将使用第一个支持的音频文件

```html
<audio controls>
    <source src="horse.ogg" type="audio/ogg">
    <source src="horse.mp3" type="audio/mpeg">
    您的浏览器不支持 audio 元素。
</audio>
```

> <audio\>元素支持三种音频格式文件: MP3、 Wav和Ogg

**video示例**

	control 提供了 播放、 暂停和音量控件来控制视频。 也可以使用dom操作来控制视频的播放暂停， 如 play() 和 pause() 方法
	同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度， 所需的视频空间会在页面加载时保留。 如果没有设置这些属性， 浏览器不知道大小的视频， 浏览器就不能再加载时保留特定的空间， 页面就会根据原始视频的大小而改变
	与 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的

```html
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持Video标签。
</video>
```

> video 元素支持多个source元素. 元素可以链接不同的视频文件。 浏览器将使用第一个可识别的格式（MP4, WebM, 和 Ogg）

## 4. canvas

#### Canvas - 图形

**步骤1： **

	创建一个画布， 一个画布在网页中是一个矩形框， 通过 < canvas > 元素来绘制。 默认情况下 元素没有边框和内容。

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>
```

**步骤2： **

	使用Javascript来绘制图像， canvas 元素本身是没有绘图能力的。 所有的绘制工作必须在 JavaScript 内部完成

```html
<script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
</script>
```

> getContext("2d") 对象是内建的 HTML5 对象， 拥有多种绘制路径、 矩形、 圆形、 字符以及添加图像的方法。 

> 设置 fillStyle 属性可以是CSS颜色， 渐变， 或图案。 fillStyle默认设置是#000000（黑色）。 fillRect(x, y, width, height) 方法定义了矩形当前的填充方式。 意思是： 在画布上绘制 150x75 的矩形， 从左上角开始 (0, 0)。 

#### Canvas - 路径

	在Canvas上画线， 我们可以使用以下两种方法
	moveTo(x, y) 定义线条开始坐标
	lineTo(x, y) 定义线条结束坐标
	绘制线条我们必须使用到 "ink"
	的方法， 就像stroke()。

**例如**

	定义开始坐标(0, 0), 和结束坐标(200, 100).然后使用 stroke() 方法来绘制线条

```html
<script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
</script>
```

#### Canvas - 文本

	使用 canvas 绘制文本， 重要的属性和方法如下

	font - 定义字体
	fillText(text, x, y) - 在 canvas 上绘制实心的文本
	strokeText(text, x, y) - 在 canvas 上绘制空心的文本

**例如： fillText()**

	使用 "Arial"
	字体在画布上绘制一个高 30 px 的文字（ 实心）

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
```

#### Canvas - 渐变

	渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。

	以下有两种不同的方式来设置Canvas渐变：

	createLinearGradient(x, y, x1, y1) - 创建线条渐变
	createRadialGradient(x, y, r, x1, y1, r1) - 创建一个径向 / 圆渐变

> 当我们使用渐变对象， 必须使用两种或两种以上的停止颜色

	addColorStop() 方法指定颜色停止， 参数使用坐标来描述， 可以是0至1.

**示例**

	使用渐变， 设置fillStyle或strokeStyle的值为渐变， 然后绘制形状， 如矩形， 文本， 或一条线。

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);
```

> 效果： 创建了一个线性渐变， 使用渐变填充矩形

#### Canvas - 图像

**示例**

	把一幅图像放置到画布上, 使用 drawImage(image, x, y) 方法

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);
```

> 效果： 把一幅图像放置到了画布上

## 5. svg

	SVG是指可伸缩的矢量图形

## 4-5. SVG 与 Canvas两者间的区别

* SVG 是一种使用 XML 描述 2D 图形的语言。 

* Canvas 通过 JavaScript 来绘制 2D 图形。 

* *SVG 基于 XML， 这意味着 SVG DOM 中的每个元素都是可用的。 您可以为某个元素附加 JavaScript 事件处理器。 

* *在 SVG 中， 每个被绘制的图形均被视为对象。 如果 SVG 对象的属性发生变化， 那么浏览器能够自动重现图形。 

* *Canvas 是逐像素进行渲染的。 在 canvas 中， 一旦图形被绘制完成， 它就不会继续得到浏览器的关注。 如果其位置发生变化， 那么整个场景也需要重新绘制， 包括任何或许已被图形覆盖的对象。 

## 6. 地理地位

	HTML5 Geolocation（ 地理定位） 用于定位用户的位置

```js
window.navigator.geolocation {
    getCurrentPosition: fn, // 用于获取当前的位置数据
    watchPosition: fn, // 监视用户位置的改变
    clearWatch: fn // 清除定位监视
}
```

**获取用户定位信息**

```js
navigator.geolocation.getCurrentPosition(
    function(pos) {
        console.log('用户定位数据获取成功')
        //console.log(arguments);
        console.log('定位时间：', pos.timestamp)
        console.log('经度：', pos.coords.longitude)
        console.log('纬度：', pos.coords.latitude)
        console.log('海拔：', pos.coords.altitude)
        console.log('速度：', pos.coords.speed)
    }, //定位成功的回调
    function(err) {
        console.log('用户定位数据获取失败')
        //console.log(arguments);
    } //定位失败的回调
)
```

## 7. 拖放的API

	拖放是一种常见的特性， 即抓取对象以后拖到另一个位置。 在 HTML5 中， 拖放是标准的一部分， 任何元素都能够拖放。

　　拖放的过程分为源对象和目标对象。 源对象是指你即将拖动元素， 而目标对象则是指拖动之后要放置的目标位置。 

* 拖放的源对象(可能发生移动的)可以触发的事件——3个

1. dragstart： 拖动开始

2. drag： 拖动中

3. dragend： 拖动结束

> 整个拖动过程的组成： dragstart*1 + drag*n + dragend*1

* 拖放的目标对象(不会发生移动)可以触发的事件——4个： 

1. dragenter： 拖动着进入

2. dragover： 拖动着悬停

3. dragleave： 拖动着离开

4. drop： 释放

> 整个拖动过程的组成1： dragenter*1 + dragover*n + dragleave*1

> 整个拖动过程的组成2： dragenter*1 + dragover*n + drop*1

* dataTransfer： 用于数据传递的“拖拉机”对象； 

1. 在拖动源对象事件中使用e.dataTransfer属性保存数据： 

	e.dataTransfer.setData(k, v)

2. 在拖动目标对象事件中使用e.dataTransfer属性读取数据： 

	var value = e.dataTransfer.getData(k)

## 8. web worker

	当在 HTML 页面中执行脚本时， 页面的状态是不可响应的， 直到脚本已完成。

　　web worker 是运行在后台的 JavaScript， 独立于其他脚本， 不会影响页面的性能。 我们可以可以继续做任何愿意做的事情： 点击、 选取内容等等， 而此时 web worker 在后台运行。 

* 首先检测浏览器是否支持 Web Worker

```js
if (typeof(Worker) !== "undefined") {
    // 是的! Web worker 支持!
    // 一些代码.....
} else {
    // //抱歉! Web Worker 不支持
}
```

> 检测是否存在 worker， 如果不存在， 则创建一个新的 web worker 对象， 然后运行 "demo_workers.js" 中的代码

```js
if (typeof(w) == "undefined") {
    w = new Worker("demo_workers.js");
}
```

* 然后我们就可以从 web worker 发送和接收消息了。 向 web worker 添加一个 "onmessage" 事件监听器

```js
w.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;
};
```

> 当 web worker 传递消息时， 会执行事件监听器中的代码。 event.data 中存有来自 event.data 的数据。 当我们创建 web worker 对象后， 它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。 

> 如需终止 web worker， 并释放浏览器/计算机资源， 使用 terminate() 方法。 

**完整的 Web Worker 实例代码**

```html
<!DOCTYPE html>
<html>

<body>

    <p>Count numbers: <output id="result"></output></p>
    <button onclick="startWorker()">Start Worker</button>
    <button onclick="stopWorker()">Stop Worker</button>
    <br><br>

    <script>
        var w;

        function startWorker() {
            if (typeof(Worker) !== "undefined") {
                if (typeof(w) == "undefined") {
                    w = new Worker("demo_workers.js");
                }
                w.onmessage = function(event) {
                    document.getElementById("result").innerHTML = event.data;
                };
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
            }
        }

        function stopWorker() {
            w.terminate();
        }
    </script>
</body>

</html>
```

**创建的计数脚本： demo_workers.js**

```js
var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()", 500);
}

timedCount();
```

## 9. web storage

	使用HTML5可以在本地存储用户的浏览数据。 早些时候, 本地存储使用的是cookies。 但是Web 存储需要更加的安全与快速.这些数据不会被保存在服务器上， 但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据， 而不影响网站的性能。 数据以 键 / 值 对存在, web网页的数据只允许该网页访问使用。

> 客户端存储数据的两个对象为： 

	localStorage - 没有时间限制的数据存储

	sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后， 数据会被删除。

> 在使用 web 存储前, 应检查浏览器是否支持 localStorage 和sessionStorage

```js
if (typeof(Storage) !== "undefined") {
    // 是的! 支持 localStorage  sessionStorage 对象!
    // 一些代码.....
} else {
    // 抱歉! 不支持 web 存储。
}
```

> 不管是 localStorage， 还是 sessionStorage， 可使用的API都相同

**常用的有如下几个（以localStorage为例）： **

* 保存数据： localStorage.setItem(key, value); 

* 读取数据： localStorage.getItem(key); 

* 删除单个数据： localStorage.removeItem(key); 

* 删除所有数据： localStorage.clear(); 

* 得到某个索引的key： localStorage.key(index); 

## 10. web socket

	WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。 在WebSocket API中， 浏览器和服务器只需要做一个握手的动作， 然后， 浏览器和服务器之间就形成了一条快速通道。 两者之间就直接可以数据互相传送。 浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求， 连接建立以后， 客户端和服务器端就可以通过 TCP 连接直接交换数据。 当你获取 Web Socket 连接后， 你可以通过 send() 方法来向服务器发送数据， 并通过 onmessage 事件来接收服务器返回的数据。

**完整示例**

```html
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>W3Cschool教程(w3cschool.cn)</title>

    <script type="text/javascript">
        function WebSocketTest() {
            if ("WebSocket" in window) {
                alert("您的浏览器支持 WebSocket!");

                // 打开一个 web socket
                var ws = new WebSocket("ws://localhost:9998/echo");

                ws.onopen = function() {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    ws.send("发送数据");
                    alert("数据发送中...");
                };

                ws.onmessage = function(evt) {
                    var received_msg = evt.data;
                    alert("数据已接收...");
                };

                ws.onclose = function() {
                    // 关闭 websocket
                    alert("连接已关闭...");
                };
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        }
    </script>
</head>

<body>
    <div id="sse">
        <a href="javascript:WebSocketTest()">运行 WebSocket</a>
    </div>
</body>

</html>
```
