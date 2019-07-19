# 认识Canvas

## 概述

#### 简述

	Canvas是HTML5的新特性用于绘制图像（通过脚本，通常是 JavaScript）

!> 注：`<canvas>` 元素本身并没有绘制能力（它仅仅是图形的容器） - 我们必须使用脚本来完成实际的绘图任务

#### 基础语法

###### 属性和方法

* 颜色、样式和阴影

	* 属性

		* fillStyle		设置或返回用于填充绘画的颜色、渐变或模式。
		* strokeStyle	设置或返回用于笔触的颜色、渐变或模式。
		* shadowColor	设置或返回用于阴影的颜色。
		* shadowBlur	设置或返回用于阴影的模糊级别。
		* shadowOffsetX	设置或返回阴影与形状的水平距离。
		* shadowOffsetY	设置或返回阴影与形状的垂直距离。
方法
createLinearGradient() 创建线性渐变（用在画布内容上）。
createPattern()	在指定的方向上重复指定的元素。
createRadialGradient() 创建放射状/环形的渐变（用在画布内容上）。
addColorStop()	规定渐变对象中的颜色和停止位置。

* 线条样式

* 矩形

* 路径

* 转换

* 图像绘制

* 像素操作

* 图像合成

* 其他

	* 方法

		* save()：保存当前环境的状态。
		* restore()	：返回之前保存过的路径状态和属性。
		* createEvent()
		* getContext()：返回一个对象，该对象提供了用于在画布上绘图的方法和属性
		* toDataURL()



## 应用

#### 标签定义和简单使用

	<canvas> 标签通过脚本（通常是 JavaScript）来绘制图形（比如图表和其他图像）


