# CSS实现旋转放大动画

## 普通实现

```html
<!DOCTYPE html>
<!--
	旋转放大动画：360°旋转 放大1.2倍、180°旋转 放大1.5倍、90°旋转 放大2倍、45°旋转 放大5倍
-->
<html>
<head>
	<meta charset="UTF-8">
</head>
<style>
	.box {
		height: 100px;
		width: 100px;
		background-color: #c1c1c1;
	}

	.box1 {
		position: absolute;
		height: 100px;
		width: 100px;
		background-color: #c1c1c1;
		top: 50%;
		left: 50%;
		margin-top: -50px;
		margin-left: -50px;
	}

	.rotate-scale {
		transition: All 0.4s ease-in-out;
		-webkit-transition:All 0.4s ease-in-out;
		-moz-transition:All 0.4s ease-in-out;
		-o-transition:All 0.4s ease-in-out;
	}

	.rotate-scale360-1-2:hover {
		transform:rotate(360deg) scale(1.2);
		-webkit-transform:rotate(360deg) scale(1.2);
		-moz-transform:rotate(360deg) scale(1.2);
		-o-transform:rotate(360deg) scale(1.2);
		-ms-transform:rotate(360deg) scale(1.2);
	}

	.rotate-scale180-1-5:hover {
		transform:rotate(180deg) scale(1.5);
		-webkit-transform:rotate(180deg) scale(1.5);
		-moz-transform:rotate(180deg) scale(1.5);
		-o-transform:rotate(180deg) scale(1.5);
		-ms-transform:rotate(180deg) scale(1.5);
	}

	.rotate-scale90-2:hover {
		transform:rotate(90deg) scale(2);
		-webkit-transform:rotate(90deg) scale(2);
		-moz-transform:rotate(90deg) scale(2);
		-o-transform:rotate(90deg) scale(2);
		-ms-transform:rotate(90deg) scale(2);
	}

	.rotate-scale45-5:hover {
		transform:rotate(45deg) scale(5);
		-webkit-transform:rotate(45deg) scale(5);
		-moz-transform:rotate(45deg) scale(5);
		-o-transform:rotate(45deg) scale(5);
		-ms-transform:rotate(45deg) scale(5);
	}
</style>
<body>
<div class="rotate-scale rotate-scale360-1-2 box1">旋转360° 放大1.2倍</div>
<div class="rotate-scale rotate-scale360-1-2 box">旋转360° 放大1.2倍</div>
<div class="rotate-scale rotate-scale180-1-5 box">旋转180° 放大1.5倍</div>
<div class="rotate-scale rotate-scale90-2 box">旋转90° 放大2倍</div>
<div class="rotate-scale rotate-scale45-5 box">旋转45° 放大5倍</div>
</body>
</html>
```

## 动态语法改造

#### SCSS改造

```css
/* 执行动画以及执行时间设定 */
@mixin dz($time:0.25s){
    -webkit-transition: all $time ease-in-out;
    -moz-transition: all $time ease-in-out;
    -o-transition: all $time ease-in-out;
    -ms-transition: all $time ease-in-out;
    transition: all $time ease-in-out;
}

/* 旋转放大动画 */
@mixin rotateAndScale($deg:360,$s1:1.2){
    transform:rotate($deg+deg) scale($s1);
    -webkit-transform:rotate($deg+deg) scale($s1);
    -moz-transform:rotate($deg+deg) scale($s1);
    -o-transform:rotate($deg+deg) scale($s1);
    -ms-transform:rotate($deg+deg) scale($s1);
}
```

**使用方式**

```css
#rotateAndScaleDiv {
    @include dz();
    &:hover {
        @include rotateAndScale(360, 2);
    }
}
```
