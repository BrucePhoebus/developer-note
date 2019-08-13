<!--
 * @Description: fixed + vertical-align实现居中
 * @Date: 2019-08-13 15:54:18
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 16:33:22
 -->
# fixed + vertical-align实现居中

## 实现原理思路

#### 实现思路

1. 设置父元素content，使用`fixed布局`，设置充满全屏，`text-align: center;`内部水平居中

2. 给父元素content添加一个after伪类，设置样式：

``` css
.content {
	content: "";
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
```

3. 最后居中元素使用`inline-block`内联和`vertical-align: middle`居中就能实现垂直居中

## 实现代码

#### 简单示例

``` html
<div class="content">
	<div class="showPanel">demo</div>
</div>
```

``` css
.content {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
}

.content:after {
	content: "";
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}

.showPanel {
	display: inline-block;
    vertical-align: middle;
    background-color: black;
    width: 200px;
    color: #fff;
    border-radius: 100%;
    height: 200px;
    line-height: 200px;
    font-size: 16px;
    overflow: hidden;
}
```

> [vertical-align实现居中效果](知识笔记/大前端/基础/CSS/布局/居中效果/vertical-align实现居中.html)

> 参考：[CSS利用vertical-align实现上下居中](https://blog.csdn.net/u012857153/article/details/73469385)
