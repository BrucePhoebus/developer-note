# CSS3动画原理

## 概述

#### 浏览器实现动画模式

* js动画

	js通过修改元素的style实现动画效果，都是实实在在的元素变化，CSS一点点的变化，我们可以轻易的获取每个阶段的状态值

* CSS3动画

	CSS3的animate(动画)也就是使用CSS3的animation属性和transition动画属性

#### 关键词说明

* keyframes(关键帧)

	关键帧这个技术是用来提高开发效率的，原来没有关键帧技术，假设动画帧率为25，即每秒要播放25张画面，如果现在要制作1秒的动画，那么就需要手动制作25张画面，这是比较恐怖的事情，而关键帧的出现使得我们只需要画2张画面，中间的23张画面自动计算完成，极大的提升开发效率。

* transition(过渡)

	transition是实现元素持续变化的一种过渡动画效果，只要我们设定添加的CSS效果和指定效果的过渡时间，计算机就会帮我们计算出这个动画过程

``` css
div:hover {
	width:300px;
}

div {
    transition: width 2s;
    -moz-transition: width 2s; /* Firefox 4 */
    -webkit-transition: width 2s; /* Safari and Chrome */
}
```

#### CSS3动画实现过程

###### animation动画

1. @keyframes(关键帧)定义动画

	这一步是创建关键帧的过程，要设置好播放动画的基本属性

	一般常用的属性有：位移属性(position)、旋转属性(rotation)、缩放属性(scale)、透明度(opacity)、音效(audio)等

> 通过@keyframes规则我们可以创建动画，原理就是将一套 CSS 样式逐渐变化为另一套样式

``` css
div {
	width:100px;
	height:100px;
	background:red;
	position:relative;
	animation:moveAnim 5s infinite;
	-moz-animation:moveAnim 5s infinite; /* Firefox */
	-webkit-animation:moveAnim 5s infinite; /* Safari and Chrome */
}

@keyframes moveAnim {
	0% {top:0px;}
	25% {top:200px;}
	75% {top:50px}
	100% {top:100px;}
}

@-moz-keyframes moveAnim {	/* Firefox */
	0% {top:0px;}
	25% {top:200px;}
	75% {top:50px}
	100% {top:100px;}
}

@-webkit-keyframes moveAnim {	/* Safari and Chrome */
	0% {top:0px;}
	25% {top:200px;}
	75% {top:50px}
	100% {top:100px;}
}
```

2. 设置要播放动画的参数 

	关键帧我们制作完成之后，但是我们的动画时长播放多久，哪一秒播放对应的关键帧，这些都是我们要考虑的问题。 
	例如我们想要在延迟2s后再将我们的宽度边长，延迟4s后再显示文字

