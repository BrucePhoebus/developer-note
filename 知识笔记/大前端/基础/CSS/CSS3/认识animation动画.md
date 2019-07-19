# 认识animation动画

## 概述

#### animation 属性

* animation-name

	指定 @keyframes 动画的名称，也就是绑定具体的运动动画效果

* animation-duration

	指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0
	当我们指定动画时间，则这个动画便会在这个时间完成，至于动画速度便是这个跟动画的运动距离有关

* animation-timing-function

	指定动画计时函数，即动画的速度曲线，默认是 "ease"
	效果就是指定运动曲线，是曲的还是线性的

* animation-delay(动画延迟)

	指定动画延迟时间，即动画何时开始，默认是 0

* animation-iteration-count

	指定动画播放的次数，默认是 1
	我们可以通过设置这个值来做到循环运动动画效果

* animation-direction

	指定动画播放的方向。默认是 normal
	可以设置单向，或来回循环等

* animation-play-state

	指定动画播放状态，正在运行或暂停。默认是 running
	我们可以通过这个设置进度条效果

* animation-fill-mode

	指定动画填充模式。默认是 none
	即规定动画在播放之前或之后，其动画效果是否可见

## 应用

#### 基础示例

###### 小球移动动画

	一个小球从向右匀速移动 200px，然后向左移动回来，再向右移动过去，最后停留在右侧 200px 处

``` css
div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0ff;
    animation: move 2s linear 3 alternate both;
}

@keyframes move {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(200px, 0);
    }
}
```

**分析**

* animation是animation8个属性的缩写，具体顺序是

	1. animation-name指定keyframes绑定的动画效果(这里是transform左右移动200px过渡动画)
	2. animation-duration表示移动的时间，这里是2秒
	3. animation-timing-function表示移动曲线，这里是线性匀速移动
	4. animation-iteration-count动画播放次数，这里3次，也就最后移动到右边200px处
	5. animation-direction表示动画播放的方向，这里是表示来回交替运动
	6. animation-fill-mode设置动画填充模式为both(填充效果both值表示会停留在最终状态)

	7. 其实还有animation-delay和animation-play-state，前者动画延迟使用默认0，也就是不延迟；后者使用默认running，它可以控制动画运行或暂停，可以做进度条效果

* keyframes绑定动画效果，这里使用过渡属性transform，translate表示平移动画，从0到100%，从0移动到200px，然后又根据animation来回移动3次共2秒，最后实现右左右移动而停留在右侧200px处

![animation8个属性缩写图](../images/animation8个属性缩写图.png)

###### 进度条动画实现

``` css
div{  
	height: 10px; 
	border: 1px solid;  
	background: linear-gradient(#0ff,#0ff);  
	background-repeat: no-repeat;  
	background-size: 0;  
	animation: move 2s linear forwards;
}

@keyframes move{  
	100%{    
		background-size: 100%;  
	}
}
```

**说明**

* animation：`move`值是`@keyframes`绑定动画效果，`2s`意思是动画时常为2秒，`linear`表示为线性匀速动画，`forwards`表示保存最后一帧的状态，也就是停留在动画的最后一个状态保持不变

> 另说`animation-delay`可以设置延时，在这个进度条看来，假如设置延时是-1s，我们就可以看到进度条是从1/2也就是50%开始进行到100%的；还有进行暂停进度条，我们可以设置属性`animation-play-state`的值为`paused`实现暂停效果；还有，我们经常在网上看到无限无序的动画，我们可以通过设置`animation-iteration-count`值为`infinite`表示无限播放，然后设置运动效果和触发效果

###### 实现如意金箍棒动画效果

``` css
div {
	margin: 200px;
	height: 20px;
	border: 1px solid;
	animation: rotate 2.5s infinite, color 2s infinite, width 3s infinite;
	animation-direction: normal, normal, alternate;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes color {
	20% {
		background-color: #f91;
	}

	80% {
		background-color: #0ff
	}
}

@keyframes width {
	0% {
		width: 40%;
	}

	100% {
		width: 70%;
	}
}
```

**说明**

* `rotate`表示动画到100%的时候`旋转360°`；`color`表示动画到20%的时候设置背景颜色为`#f91`，而到80%的时候背景颜色变为`#0ff`；width则


> 参考：[2019年了，你还不会CSS动画？](https://juejin.im/post/5cdd178ee51d456e811d279b)
