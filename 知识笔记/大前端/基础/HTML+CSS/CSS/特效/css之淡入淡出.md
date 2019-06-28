# css之淡入淡出

## 淡入

#### 扭曲淡入

```html
<div id="box_action_skew">扭曲淡入</div>
<button id="action_skew">扭曲淡入</button>
```

```css
	div {
		background: red;
		width: 100px;
		height: 100px;
		display: none;
		/*transform-origin:0 0;以某点为中心进行变形，默认center center*/
	}

	@keyframes action_skew {
		0% {
			transform: skew(-40deg);
			opacity: 0;
		}

		50% {
			transform: skew(40deg);
			opacity: 0.2;
		}

		100% {
			transform: skew(0deg);
			opacity: 1;
		}
	}

```



## 淡出


> [css弹框淡入淡出效果](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/基础/HTML+CSS/CSS/特效/css弹框淡入淡出.html)
