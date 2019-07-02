# CSS3实现波浪线效果

## 常见波浪线效果

> [普通波浪线实现](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/基础/HTML+CSS/CSS/效果/普通波浪线实现.html) | [普通波浪线效果](知识笔记/大前端/基础/HTML+CSS/CSS/效果/常用波浪线.html)

> [各种变形波浪线](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/基础/HTML+CSS/CSS/效果/各种变形波浪线.html) | [各种变形波效果](知识笔记/大前端/基础/HTML+CSS/CSS/效果/各种变形波浪线.html)

```css
/* CSS3实现 */
.wavy-line::before {
    content: '';
    position: absolute;
    top: 30px;
    width: 100%;
    height: 0.25em;

    background:
        linear-gradient(135deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%),
        linear-gradient(45deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%);
    background-size: 0.5em 0.5em;
    background-repeat: repeat-x, repeat-x;
}
```

> linear-gradient：常见用于创建一个表示两种或多种颜色线性渐变的图片

## 变形

#### 波浪线 加粗

```css
.wavy-line-bold::before {
		content: '';
		position: absolute;
		top: 30px;
		width: 100%;
		height: 0.5em;

		background:
			linear-gradient(135deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%),
			linear-gradient(45deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%);
		background-size: 1em 1em;
		background-repeat: repeat-x, repeat-x;
	}
```

> 这个就更简单了，只要将background-size变大就行，所以根源还是要会基础的波浪线实现

#### 波浪线变形 xxx

```css
.wavy-line-change::before {
	content: '';
	position: absolute;
	top: 30px;
	width: 100%;
	height: 0.5em;

	background:
		linear-gradient(135deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%),
		linear-gradient(45deg, transparent, transparent 45%, #008000, transparent 55%, transparent 100%);
	background-size: 0.5em 0.5em;
	background-repeat: repeat-x, repeat-x;
}
```

> 很明显，对比代码我们能看出通过调整`height`可以让波浪线变形

#### 不规则圆，旋转实现波浪效果

	这个变形就比较大，但原理是一样的

```css
.wavy-line-circle {
	width: 200px;
	height: 200px;

	background: #009A61;
	border-radius: 45%;
	color: white;
	text-align: center;
	line-height: 200px;

	animation: rotateOne 2s linear infinite;
}

@keyframes rotateOne {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(180deg);
	}
}
```

> 这个是通过CSS3的transform动画实现的，效果也不错

#### 水杯中水的波动

```css
.wavy-line-water {
	height: 100vh;
	align-items: center;
	position: relative;
	border: 1px solid red;
	background-color: rgb(118, 218, 255);
	overflow: hidden;
}

.wavy-line-water::before,
.wavy-line-water::after {
	content: "";
	position: absolute;
	left: 50%;
	min-width: 300vw;
	min-height: 300vw;
	background: #fff;
	animation: rotateOne 10s linear infinite;
}

.wavy-line-water::before {
	bottom: 15vh;
	border-radius: 45%;
}

.wavy-line-water::after {
	bottom: 12vh;
	opacity: 0.5;
	border-radius: 47%;
}

@keyframes rotateOne {
	0% {
		transform: translate(-50%, 0) rotateZ(0deg);
	}

	50% {
		transform: translate(-50%, -2%) rotateZ(180deg);
	}

	100% {
		transform: translate(-50%, 0%) rotateZ(360deg);
	}
}
```

#### 圆水球晃动效果

```css
.container {
	position: absolute;
	width: 200px;
	height: 200px;
	padding: 5px;
	border: 5px solid rgb(118, 218, 255);
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	overflow: hidden;
}

.circle-water {
	width: 200px;
	height: 200px;
	position: relative;

	background-color: rgb(118, 218, 255);
	border-radius: 50%;
	overflow: hidden;
}

.circle-water::before,
.circle-water::after {
	content: "";
	position: absolute;
	left: 50%;
	min-width: 400px;
	min-height: 400px;
	background: #fff;
	animation: rotateOne 10s linear infinite;
}

.circle-water::before {
	bottom: 50px;
	border-radius: 45%;
}

.circle-water::after {
	bottom: 40px;
	opacity: 0.5;
	border-radius: 47%;
}

@keyframes rotateOne {
	0% {
		transform: translate(-50%, 0) rotateZ(0deg);
	}

	50% {
		transform: translate(-50%, -2%) rotateZ(180deg);
	}

	100% {
		transform: translate(-50%, 0%) rotateZ(360deg);
	}
}
```

> 参考：[天马3798-Css3实现波浪效果](https://www.cnblogs.com/tianma3798/p/9718297.html)
