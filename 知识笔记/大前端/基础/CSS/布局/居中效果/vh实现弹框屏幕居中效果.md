<!--
 * @Description: vh实现弹框屏幕居中效果
 * @Date: 2019-08-13 15:29:07
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 16:29:13
 -->
# vh实现弹框屏幕居中效果

## 实现思路

1. 首先，要有个控制的图片，图片在弹框中，弹框还有标题和关闭按钮，弹框效果是通过绝对布局体现出来，加个背景色就很明显了，弹框大小根据图片大小撑开(方便放大缩小图片)

	* 具体实现需要设置绝对布局，通过背景色 + 弹框样式微调(可以加阴影)实现弹框效果
	* 重要是居中的实现：这里使用父元素content + :after实现内部元素居中

2. 关于控制图片宽度大小需要一个进度条或输入框控制，通过监听值的变动修改图片的宽度，再加上个动画，实现图片放大效果，而居中效果因为绝对定位，所以是不会变的

## 实现代码

``` html
<!-- 用于修改图片宽度 -->
<div class="demo">
    <p style="width:400px; position:relative; z-index:11; background-color:#fff;">图片宽度（目前<span id="imageWidth">521</span>像素）： 128
        <input type="range" value="512" min="128" max="1024" step="32"> 1024</p>
    <p><button id="testButton" type="button">点击我出现图片弹框</button></p>
</div>
<!-- 图片弹框 -->
<div id="dialogContainer" class="dialog_container">
    <div id="dialogBox" class="dialog_box">
        <div id="dialogTitle" class="dialog_title">尺寸动态可变图片</div>
        <a href="javascript:" id="dialogClose" class="dialog_close">[关闭]</a>
        <div id="dialogBody" class="dialog_body">
            <img src="https://image.zhangxinxu.com/image/study/s/s512/mm1.jpg" class="demo_image" />
        </div>
    </div>
</div>
```

``` css
.dialog_container {
	display: none;
	/* 高宽100%充满全屏 */
	/*width: 100%;*/
	width: 100vw;
	/*height: 100%;*/
	height: 100vh;
	/* 显示时添加灰背景色 */
	background-color: rgba(0, 0, 0, .35);
	/* 简单内部水平居中 */
	text-align: center;
	/* fixed布局 */
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}

/* 伪类实现上下居中的方式 */
.dialog_container:after {
	display: inline-block;
	content: '';
	width: 0;
	height: 100%;
	vertical-align: middle;
}

.dialog_box {
	/* 对应父类伪类的inline-block，实现垂直居中 */
	display: inline-block;
	vertical-align: middle;
	/* 添加立体效果 */
	border: 1px solid #ccc;
	text-align: left;
	/* 相对定位，用于内部按钮标题等定位 */
	position: relative;
}

/* 设置弹框标题样式 */
.dialog_title {
	line-height: 28px;
	padding-left: 5px;
	padding-right: 5px;
	border-bottom: 1px solid #ccc;
	background-color: #eee;
	font-size: 12px;
	text-align: left;
}

/* 设置关闭按钮位置 */
.dialog_close {
	position: absolute;
	top: 5px;
	right: 5px;
}

.dialog_body {
	/* 添加弹框背景色 */
	background-color: #fff;
}


.demo_image {
	/* 图片放大缩小动画，0.3s */
	-webkit-transition: width .3s;
	-moz-transition: width .3s;
	transition: width .3s;
}
```

``` js
(function() {
	// 要求支持 window.screenX 属性
	if (typeof window.screenX === "number") {
		// 获取当前页面所有DOM元素
		var $ = function(selector) {
			return document.querySelector(selector);
		};

		var eleWidth = $("#imageWidth"),	// 获取当前图片宽度元素
			eleRange = $("input[type='range']"),    // 修改图片宽度的元素
			eleBtn = $("#testButton"),	// 显示图片按钮元素
			eleDialog = $("#dialogContainer");	// 控制弹框元素

		// 点击现实图片弹窗
		eleBtn.addEventListener("click", function() {
			$("#dialogBody img").style.width = eleRange.value + "px";
			eleDialog.style.display = "inline";
		});

		// 监听图片宽度的修改(放大缩小)
		eleRange.addEventListener("click", function() {
			eleWidth.innerHTML = this.value;
			$("#dialogBody img").style.width = this.value + "px";
		});

		// 弹窗图片关闭事件
		$("#dialogClose").addEventListener("click", function() {
			eleDialog.style.display = "none";
			return false;
		});
	} else {
		alert("浏览器版本过低。。。建议使用IE9+或Chrome 20+浏览器~~");
	}
})();
```

> 因为是绝对布局，所以一般不会影响原有布局

> [vh实现弹框屏幕居中效果](知识笔记/大前端/基础/CSS/布局/居中效果/vh实现弹框屏幕居中效果.html)

> 参考：[视区相关单位vw, vh..简介以及可实际应用场景](https://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/)
