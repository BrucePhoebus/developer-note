# CSS3基础语法详解

## 动画

#### @keyframes 规则

	通过 @keyframes 规则我们可以设定动画，然后让需要的元素进行绑定

* 创建动画的原理是：将一套 CSS 样式逐渐变化为另一套样式

	在动画过程中，我们能够多次改变这套 CSS 样式

* 以动画时长百分比来规定改变发生的时间：0% 和 100%

	或者通过关键词 "from"（与 0% 相同）和"to"（与 100% 相同）

> 0% 是动画的开始时间，100% 动画的结束时间

**示例说明**

*`to`和`from`实现*

``` css
@keyframes move {
	from {
		top: 0px;
	}

	to {
		top: 200px;
	}
}

/* Firefox */
@-moz-keyframes move {
	from {
		top: 0px;
	}

	to {
		top: 200px;
	}
}

/* Safari 和 Chrome */
@-webkit-keyframes move {
	from {
		top: 0px;
	}

	to {
		top: 200px;
	}
}

/* Opera */
@-o-keyframes move {
	from {
		top: 0px;
	}

	to {
		top: 200px;
	}
}
```

> 注：`from`就是初始0%；`to`就是100%（但是不一定只动画介绍，只能说一周期结束，因为存在无限循环周期的动画）

*常规百分比实现*

``` css
@keyframes move {
	0% {
		top: 0px;
	}

	25% {
		top: 200px;
	}

	50% {
		top: 100px;
	}

	75% {
		top: 200px;
	}

	100% {
		top: 0px;
	}
}

/* Firefox */
@-moz-keyframes move {
	0% {
		top: 0px;
	}

	25% {
		top: 200px;
	}

	50% {
		top: 100px;
	}

	75% {
		top: 200px;
	}

	100% {
		top: 0px;
	}
}

/* Safari 和 Chrome */
@-webkit-keyframes move {
	0% {
		top: 0px;
	}

	25% {
		top: 200px;
	}

	50% {
		top: 100px;
	}

	75% {
		top: 200px;
	}

	100% {
		top: 0px;
	}
}

/* Opera */
@-o-keyframes move {
	0% {
		top: 0px;
	}

	25% {
		top: 200px;
	}

	50% {
		top: 100px;
	}

	75% {
		top: 200px;
	}

	100% {
		top: 0px;
	}
}
```

* 因为当前keyframes动画属性很多浏览器都不支持，所以如果考虑浏览器兼容性问题一般我们都会把指定需要兼容的浏览器的写法一并写上，例如chrome浏览器：@-webkit-keyframes

* 初始时绑定move动画的元素的top值为0，当动画运动到25%时top值为200px，这是这样通过动画时间控制动画效果，当然一般还有其它动画效果的影响，一般我们看到的动画都是综合多钟效果实现的

**真实示例1：图片旋转动画**

	名字为gif的@keyframes ，动画完成需要的总时长为1.4s，刚开始的时候图片旋转为0度，动画完成的时候图片旋转360度，使用transform实现过渡效果

``` css
.load-border {
    width: 120px;
    height: 120px;
    background: url(../images/loading_icon.png) no-repeat center center;
    -webkit-animation: gif 1.4s infinite linear;
    animation: gif 1.4s infinite linear; 
}
@keyframes gif {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
```

**真实示例2：移动图片动画**

	名字为move的@keyframes，动画完成需要的总时长为1s，刚开始的时候图片距顶部距离为0px，0.25s后图片距顶部距离为200px，0.5s后图片距顶部的距离为100px，以此类推

``` css
.img {
    width: 120px;
    height: 120px;
    background: url(../images/icon.png) no-repeat center center;
    -webkit-animation: gif 1.4s infinite linear;
    animation: move 1s infinite linear;
}
@keyframes move {
    0%   {top:0px;}
    25%  {top:200px;}
    50%  {top:100px;}
    75%  {top:200px;}
    100% {top:0px;}
}
```

> [复杂点的关键帧动画效果展示](知识笔记/大前端/基础/CSS/CSS3/关键帧动画.html) | [源码](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/基础/CSS/CSS3/关键帧动画.html)
