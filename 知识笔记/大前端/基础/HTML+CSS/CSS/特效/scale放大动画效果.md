# scale放大动画效果

```html
<!DOCTYPE html>
<!--
	放大 修改scale：放大1.5倍、2倍、5倍、scale倍
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

	.scale {
		transition: All 0.4s ease-in-out;
		-webkit-transition:All 0.4s ease-in-out;
		-moz-transition:All 0.4s ease-in-out;
		-o-transition:All 0.4s ease-in-out;
	}

	.scale1-5:hover {
		transform: scale(1.5);
		-webkit-transform: scale(1.5);
		-moz-transform: scale(1.5);
		-o-transform: scale(1.5);
		-ms-transform: scale(1.5);
	}
	
	.scale2:hover {
		transform: scale(2);
		-webkit-transform: scale(2);
		-moz-transform: scale(2);
		-o-transform: scale(2);
		-ms-transform: scale(2);
	}
	
	.scale5:hover {
		transform: scale(5);
		-webkit-transform: scale(5);
		-moz-transform: scale(5);
		-o-transform: scale(5);
		-ms-transform: scale(5);
	}
	
	.scale10:hover {
		transform: scale(10);
		-webkit-transform: scale(10);
		-moz-transform: scale(10);
		-o-transform: scale(10);
		-ms-transform: scale(10);
	}
</style>
<body>

<div class="scale scale1-5 box1">放大1.5倍</div>
<div class="scale scale1-5 box">放大1.5倍</div>
<div class="scale scale2 box">放大2倍</div>
<div class="scale scale5 box">放大5倍</div>
<div class="scale scale10 box">放大10倍</div>

</body>
</html>
```
