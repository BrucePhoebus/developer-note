# 认识Canvas

## 概述

#### 简述

	Canvas是HTML5的新特性用于绘制图像（通过脚本，通常是 JavaScript）

* canvas 是一个二维网格

* canvas 的左上角坐标为 (0, 0)

!> 注：`<canvas>` 元素本身并没有绘制能力（它仅仅是图形的容器） - 我们必须使用脚本来完成实际的绘图任务

#### 基础语法

###### 属性和方法

* 颜色、样式和阴影

	设置图像基本样式

	* 属性

		* fillStyle		设置或返回用于填充绘画的颜色、渐变或模式。
		* strokeStyle	设置或返回用于笔触的颜色、渐变或模式。
		* shadowColor	设置或返回用于阴影的颜色。
		* shadowBlur	设置或返回用于阴影的模糊级别。
		* shadowOffsetX	设置或返回阴影与形状的水平距离。
		* shadowOffsetY	设置或返回阴影与形状的垂直距离。
	
	* 方法

		* createLinearGradient() 	创建线性渐变（用在画布内容上）。
		* createPattern()			在指定的方向上重复指定的元素。
		* createRadialGradient() 	创建放射状/环形的渐变（用在画布内容上）。
		* addColorStop()			规定渐变对象中的颜色和停止位置。

* 线条样式

	* 属性

		* lineCap		设置或返回线条的结束端点样式。
		* lineJoin		设置或返回两条线相交时，所创建的拐角类型。
		* lineWidth		设置或返回当前的线条宽度。
		* miterLimit	设置或返回最大斜接长度。

* 矩形

	绘制矩形图

	* 方法

		* rect()	创建矩形。
		* fillRect()	绘制"被填充"的矩形。
		* strokeRect()	绘制矩形（无填充）。
		* clearRect()	在给定的矩形内清除指定的像素。

* 路径操作

	* 方法

		* fill()				填充当前绘图（路径）。
		* stroke()				绘制已定义的路径。
		* beginPath()			起始一条路径，或重置当前路径。·
		* moveTo()				把路径移动到画布中的指定点，不创建线条。
		* closePath()			创建从当前点回到起始点的路径。
		* lineTo()				添加一个新点，然后在画布中创建从该点到最后指定点的线条。
		* clip()				从原始画布剪切任意形状和尺寸的区域。
		* quadraticCurveTo() 	创建二次贝塞尔曲线。
		* bezierCurveTo()		创建三次贝塞尔曲线。
		* arc()					创建弧/曲线（用于创建圆形或部分圆）。
		* arcTo()				创建两切线之间的弧/曲线。
		* isPointInPath()		如果指定的点位于当前路径中，则返回 true，否则返回 false。

* 转换

	绘制旋转图像

	* 方法

		* scale()			缩放当前绘图至更大或更小。
		* rotate()			旋转当前绘图。
		* translate()		重新映射画布上的 (0,0) 位置。
		* transform()		替换绘图的当前转换矩阵。
		* setTransform()	将当前转换重置为单位矩阵。然后运行 transform()。

* 文本

	绘制文本操作

	* 属性

		* font			设置或返回文本内容的当前字体属性。
		* textAlign		设置或返回文本内容的当前对齐方式。
		* textBaseline	设置或返回在绘制文本时使用的当前文本基线。
	
	* 方法

		* fillText()	在画布上绘制"被填充的"文本。
		* strokeText()	在画布上绘制文本（无填充）。
		* measureText() 返回包含指定文本宽度的对象。

* 图像绘制

	* 方法

		* drawImage()	向画布上绘制图像、画布或视频。

* 像素操作

	图像的像素级别操作

	* 属性

		* width		返回 ImageData 对象的宽度。
		* height	返回 ImageData 对象的高度。
		* data		返回一个对象，其包含指定的 ImageData 对象的图像数据。

	* 方法
		
		* createImageData() 创建新的、空白的 ImageData 对象。
		* getImageData()	返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。
		* putImageData()	把图像数据（从指定的 ImageData 对象）放回画布上。

* 图像合成

	可以将多个图像绘制合并到一起

	* 属性

		* globalAlpha				设置或返回绘图的当前 alpha 或透明值。
		* globalCompositeOperation 	设置或返回新图像如何绘制到已有的图像上。

* 其他

	* 方法

		* save()：保存当前环境的状态。
		* restore()	：返回之前保存过的路径状态和属性。
		* createEvent()
		* getContext()：返回一个对象，该对象提供了用于在画布上绘图的方法和属性
		* toDataURL()

###### 基础用法

* fillRect 方法拥有参数 (0, 0, 150, 75)

	意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)

* 在Canvas上画线方法

	* moveTo(x,y) 	定义线条开始坐标
	* lineTo(x,y)	定义线条结束坐标

* 绘制圆使用方法

	arc(x, y, r, start, stop)

> 实际上我们在绘制圆形时使用了 "ink" 的方法, 比如 stroke() 或者 fill()

* 使用 canvas 绘制文本的方法

	* font					定义字体
	* fillText(text,x,y)	在 canvas 上绘制 实心 的文本
	* strokeText(text,x,y)	在 canvas 上绘制 空心 的文本

* 使用Canvas设置渐变颜色

	渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色

	* createLinearGradient(x, y, x1, y1)		创建 线条 渐变
	* createRadialGradient(x, y, r, x1, y1, r1)	创建一个 径向/圆 渐变

> 至少使用两种颜色使用addColorStop()方法实现颜色停止

## 应用

#### 标签定义和简单使用

	<canvas> 标签通过脚本（通常是 JavaScript）来绘制图形（比如图表和其他图像）

#### 简单实例

###### 绘制线条

	定义开始坐标(0,0), 和结束坐标 (200,100)。然后使用 stroke() 方法来绘制线条

``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>绘制简单线条</title>
</head>
<body>
	<canvas id="canvasId" width="200" height="100" style="border:1px solid #d3d3d3;">
		您的浏览器不支持 HTML5 canvas 标签。
	</canvas>

	<script>
		// 通过js进行canvas绘制
		var c = document.getElementById("canvasId");	// 获取	canvasId 元素对象
		var ctx = c.getContext("2d");	// 绘制canvas实例并绑定到id为canvasId中
		ctx.moveTo(0,0);	// 绘制线条开始坐标：0, 0坐标开始
		ctx.lineTo(200,100);	// 绘制结束坐标线条
		ctx.stroke();	// 使用stroke()方法绘制：结果就是一条对角线
	</script>
</body>
</html>
```

> 注：`<canvas>` 元素中的任何文本将会被显示在不支持 `<canvas>` 的浏览器中；默认情况下 `<canvas>` 元素没有边框和内容。

###### 使用 arc() 方法 绘制一个圆

``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>使用 arc() 方法 绘制一个圆</title>
</head>
<body>
	<canvas id="canvasId" width="200" height="100" style="border:1px solid #d3d3d3;">
		您的浏览器不支持 HTML5 canvas 标签。
	</canvas>
	
	<script>
		var c = document.getElementById("canvasId");
		var ctx = c.getContext("2d");	// 获取画布绘制的操作对象
		ctx.beginPath();	// 设置起始路径
		ctx.arc(95, 50, 40, 0, 2*Math.PI);	// 设置圆大小、半径等值
		ctx.stroke();	// 开始绘制圆
	</script>
</body>
</html>
```

###### 使用 fillText() 绘制实心字体

	使用 "Arial" 字体在画布上绘制一个高 30px 的文字（实心）

``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>使用 fillText() 绘制实心字体</title>
</head>
<body>
	<canvas id="canvasId" width="200" height="100" style="border:1px solid #d3d3d3;">
		您的浏览器不支持 HTML5 canvas 标签。
	</canvas>

	<script>
	var c = document.getElementById("canvasId");
	var ctx = c.getContext("2d");
	ctx.font = "30px Arial";	// 设置字体大小和类型
	ctx.fillText("Hello World", 10, 50);	// 设置字体内容和相对画布坐标
	</script>
</body>
</html>
```

###### 使用 strokeText() 绘制空心字体

	使用 "Arial" 字体在画布上绘制一个高 30px 的文字（空心）

``` js
var c=document.getElementById("canvasId");
var ctx=c.getContext("2d");
ctx.font="30px Arial";
ctx.strokeText("Hello World", 10, 50);	// 使用这个方法绘制出来的字体就是 空心 的
```

###### 使用 createLinearGradient() 绘制线条渐变颜色

	创建一个线性渐变。使用渐变填充矩形

``` js
var c = document.getElementById("canvasId");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);	// 设置线条渐变对象
grd.addColorStop(0, "red");	// 给对象设置坐标 0 的渐变停止颜色为red
grd.addColorStop(1, "white");	// 给对象设置坐标 1 的渐变停止颜色为white
// Fill with gradient
ctx.fillStyle = grd;	// 通过fillStyle对象讲渐变对象设置到画布实例上去
ctx.fillRect(10, 10, 150, 80);	// 从坐标(10, 10)开始绘制150*80px的渐变颜色填充矩形
```

###### 使用 createRadialGradient() 绘制 径向/圆 的渐变颜色

	创建一个径向/圆渐变。使用渐变填充矩形

``` js
var c = document.getElementById("canvasId");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);	// 获取	径向/圆 渐变设置对象
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;	// 给画布实例绑定渐变设置
ctx.fillRect(10, 10, 150, 80);	// 使用渐变颜色填充 圆
```

###### Canvas在画布上绘制图像

	把一幅图像放置到画布上
	语法：drawImage(image, x, y)

``` js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>把一幅图像放置到画布上</title>
</head>
<body>
	<p>Image to use:</p>
	<img id="scream" src="img_the_scream.jpg" alt="The Scream" width="220" height="277">
	<p>Canvas:</p>

	<canvas id="canvasId" width="250" height="300" style="border:1px solid #d3d3d3;">
		您的浏览器不支持 HTML5 canvas 标签。
	</canvas>

	<script>
		var c = document.getElementById("canvasId");
		var ctx = c.getContext("2d");
		var img = document.getElementById("scream");	// 获取图像元素对象
		img.onload = function() {
			ctx.drawImage(img, 10, 10);	// 将图像绘制于画布中，坐标(10, 10)开始
		}
	</script>
</body>
</html>
```

###### 使用 JavaScript 来绘制一个红色的矩形

``` js
var c = document.getElementById('canvasId');	// 获取canvas元素对象
var ctx = c.getContext('2d');	// 获取画布对象
ctx.fillStyle = '#FF0000';	// 设置画布颜色：这里是红色
ctx.fillRect(0, 0, 80, 100);	// 从坐标(0, 0)开始绘制填充矩形，大小80*100px
```
