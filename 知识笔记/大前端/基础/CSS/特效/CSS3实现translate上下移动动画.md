# CSS3实现translate上下移动动画

## 普通实现

```html
<!DOCTYPE html>
<!--
	上下左右移动：修改translate(x轴，y轴)
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

	.translate {
		transition: All 0.4s ease-in-out;
		-webkit-transition:All 0.4s ease-in-out;
		-moz-transition:All 0.4s ease-in-out;
		-o-transition:All 0.4s ease-in-out;
	}

	.translate-top10:hover {
		translate: translate(0, 10px);
		-webkit-transform:translate(0, 10px);
		-moz-transform:translate(0, 10px);
		-o-transform:translate(0, 10px);
		-ms-transform:translate(0, 10px);
	}

	.translate-bottom-10:hover {
		translate: translate(0, -10px);
		-webkit-transform:translate(0, -10px);
		-moz-transform:translate(0, -10px);
		-o-transform:translate(0, -10px);
		-ms-transform:translate(0, -10px);
	}

	.translate-left-10:hover {
		translate: translate(-10px, 0);
		-webkit-transform:translate(-10px, 0);
		-moz-transform:translate(-10px, 0);
		-o-transform:translate(-10px, 0);
		-ms-transform:translate(-10px, 0);
	}

	.translate-right10:hover {
		translate: translate(10px, 0);
		-webkit-transform:translate(10px, 0);
		-moz-transform:translate(10px, 0);
		-o-transform:translate(10px, 0);
		-ms-transform:translate(10px, 0);
	}
	
	.translate1010:hover {
		translate: translate(10px, 10px);
		-webkit-transform:translate(10px, 10px);
		-moz-transform:translate(10px, 10px);
		-o-transform:translate(10px, 10px);
		-ms-transform:translate(10px, 10px);
	}

</style>
<body>
<div class="translate translate1010 box1">上移10px 右移10px</div>
<div class="translate translate-right10 box">右移10px</div>
<div class="translate translate-left-10 box">左移10px</div>
<div class="translate translate-bottom-10 box">下移10px</div>
<div class="translate translate-top10 box">上移10px</div>
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

/* 移动动画 */
@mixin moveDiv($s1:0,$s2:0){
    transform:translate($s1,$s2);
    -webkit-transform:translate($s1,$s2);
    -moz-transform:translate($s1,$s2);
    -o-transform:translate($s1,$s2);
    -ms-transform:translate($s1,$s2);
}
```

**使用方式**

```css
#moveDiv {
    @include dz();
    &:hover {
        @include moveDiv(10px, -10px);
    }
}
```
