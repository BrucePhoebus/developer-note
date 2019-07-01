# CSS最佳实践

	问题驱动，针对各个细节存在的问题针对性进行兼容实现

## CSS上

#### a 标签的几种 CSS 状态的顺序

	很多人在写 a 标签的样式，会疑惑为什么写的样式没有效果，或者点击超链接后，hover、active 样式没有效果，其实只是写的样式被覆盖了

**正确的a标签顺序：**

1. link:平常的状态

2. visited:被访问过之后

3. hover:鼠标放到链接上的时候

4. active:链接被按下的时候

#### 清除浮动

```css
.fl { float: left; }
.fr { float: right; }
.clearfix:after { display: block; clear: both; content: ""; visibility: hidden; height: 0; }
.clearfix { zoom: 1; }
```

#### IE6 双倍边距的问题

	设置 IE6 中设置浮动，同时又设置 margin，会出现双倍边距的问题

```css
display: inline;
```

#### 解决 IE9 以下浏览器不能使用 opacity

```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```

#### 解决 IE6 不支持 fixed 绝对定位以及IE6下被绝对定位的元素在滚动的时候会闪动的问题

```css
/* IE6 hack */
*html, *html body {
  background-image: url(about:blank);
  background-attachment: fixed;
}
*html #menu {
  position: absolute;
  top: expression(((e=document.documentElement.scrollTop) ? e : document.body.scrollTop) + 100 + 'px');
}
```

#### 解决 IE6 不支持 min-height 属性的问题

```css
{
	min-height: 350px;
	_height: 350px;
}
```

#### 让 IE7 IE8 支持 CSS3 `background-size`属性

	由于 background-size 是 CSS3 新增的属性，所以 IE 低版本自然就不支持了，但是老外写了一个 htc 文件，名叫 background-size polyfill，使用该文件能够让 IE7、IE8 支持 background-size 属性。其原理是创建一个 img 元素插入到容器中，并重新计算宽度、高度、left、top 等值，模拟 background-size 的效果

```css
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url('img/37.png');
  background-repeat: no-repeat;
  background-size: cover;
  -ms-behavior: url('css/backgroundsize.min.htc');
  behavior: url('css/backgroundsize.min.htc');
}
```

#### IE6、IE7 line-height 失效的问题

	问题：在IE 中 img 与文字放一起时，line-height 不起作用

* 解决：都设置成 float

#### width:100%

	width:100% 这个东西在 IE 里用很方便，会向上逐层搜索 width 值，忽视浮动层的影响

	Firefox 下搜索至浮动层结束，如此，只能给中间的所有浮动层加 width:100%才行

	opera也一样

#### cursor:hand

	显示手型 cursor: hand，ie6/7/8、opera 都支持，但是safari 、 ff 不支持

**实现**

```css
cursor: pointer;
```

#### td 自动换行的问题

	问题：table 宽度固定，td 自动换行

* 解决：设置 `Table`为 `table-layout: fixed`，`td` 为 `word-wrap: break-word`




## HTML上

#### 完美解决 Placeholder

```html
<input type="text" value="Name *" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Name *';}">
```

#### BFC 解决边距重叠问题

	当相邻元素都设置了 margin 边距时，margin 将取最大值，舍弃小值。为了不让边距重叠，可以给子元素加一个父元素，并设置该父元素为 BFC：overflow: hidden;

```html
<div class="box" id="box">
  <p>Lorem ipsum dolor sit.</p>

  <div style="overflow: hidden;">
    <p>Lorem ipsum dolor sit.</p>
  </div>

  <p>Lorem ipsum dolor sit.</p>
</div>
```

#### 解决在 IE6 下，列表与日期错位的问题

	日期<span> 标签放在标题 <a> 标签之前即可

#### 让某层内容显示在 FLASH 之上

	想让一层的内容显示在 flash 上，把 FLASH 设置透明即可

```html
<param name="wmode" value="transparent" />
<param name="wmode" value="opaque"/>
```


## JavaScript

#### IE6 背景闪烁的问题

	问题：链接、按钮用 CSS sprites 作为背景，在 IE6 下会有背景图闪烁的现象。原因是 IE6 没有将背景图缓存，每次触发 hover 的时候都会重新加载

* 解决：可以用 JavaScript 设置 IE6 缓存这些图片

```js
document.execCommand("BackgroundImageCache", false, true);
```

#### 键盘事件 keyCode 兼容性写法

	兼容IE的写法

```js
var inp = document.getElementById('inp')
var result = document.getElementById('result')

function getKeyCode(e) {
  e = e ? e : (window.event ? window.event : "")
  return e.keyCode ? e.keyCode : e.which
}

inp.onkeypress = function(e) {
  result.innerHTML = getKeyCode(e)
}
```

#### 求窗口大小的兼容写法

```js
// 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
// 1600 * 525
var client_w = document.documentElement.clientWidth || document.body.clientWidth;
var client_h = document.documentElement.clientHeight || document.body.clientHeight;

// 网页内容实际宽高（包括工具栏和滚动条等边线）
// 1600 * 8
var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
// 1600 * 8
var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

// 滚动的高度
var scroll_Top = document.documentElement.scrollTop||document.body.scrollTop;
```

#### DOM 事件处理程序的兼容写法（能力检测）

```js
var eventsHiv = {
    // event兼容
    getEvent: function(event) {
        return event ? event : window.event;
    },
	// <span class="eventsHiv-built_in">type</span>兼容
	getType: <span class="eventsHiv-keyword">function</span>(event) {
		<span class="eventsHiv-built_in">return</span> event.type;
	},

	// target兼容
	getTarget: <span class="eventsHiv-keyword">function</span>(event) {
		<span class="eventsHiv-built_in">return</span> event.target ? event.target : event.srcelem;
	},

	// 添加事件句柄
	addHandler: <span class="eventsHiv-keyword">function</span>(elem, <span class="eventsHiv-built_in">type</span>, listener) {
		<span class="eventsHiv-keyword">if</span> (elem.addEventListener) {
			elem.addEventListener(<span class="eventsHiv-built_in">type</span>, listener, <span class="eventsHiv-literal">false</span>);
		} <span class="eventsHiv-keyword">else</span> <span class="eventsHiv-keyword">if</span> (elem.attachEvent) {
			elem.attachEvent(<span class="eventsHiv-string">'on'</span> + <span class="eventsHiv-built_in">type</span>, listener);
		} <span class="eventsHiv-keyword">else</span> {
			// 在这里由于.与<span class="eventsHiv-string">'on'</span>字符串不能链接，只能用 []
			elem[<span class="eventsHiv-string">'on'</span> + <span class="eventsHiv-built_in">type</span>] = listener;
		}
	},

	// 移除事件句柄
	removeHandler: <span class="eventsHiv-keyword">function</span>(elem, <span class="eventsHiv-built_in">type</span>, listener) {
		<span class="eventsHiv-keyword">if</span> (elem.removeEventListener) {
			elem.removeEventListener(<span class="eventsHiv-built_in">type</span>, listener, <span class="eventsHiv-literal">false</span>);
		} <span class="eventsHiv-keyword">else</span> <span class="eventsHiv-keyword">if</span> (elem.detachEvent) {
			elem.detachEvent(<span class="eventsHiv-string">'on'</span> + <span class="eventsHiv-built_in">type</span>, listener);
		} <span class="eventsHiv-keyword">else</span> {
			elem[<span class="eventsHiv-string">'on'</span> + <span class="eventsHiv-built_in">type</span>] = null;
		}
	},

	// 添加事件代理
	addAgent: <span class="eventsHiv-keyword">function</span> (elem, <span class="eventsHiv-built_in">type</span>, agent, listener) {
		elem.addEventListener(<span class="eventsHiv-built_in">type</span>, <span class="eventsHiv-keyword">function</span> (e) {
			<span class="eventsHiv-keyword">if</span> (e.target.matches(agent)) {
				listener.call(e.target, e); // this 指向 e.target
			}
		});
	},

	// 取消默认行为
	preventDefault: <span class="eventsHiv-keyword">function</span>(event) {
		<span class="eventsHiv-keyword">if</span> (event.preventDefault) {
			event.preventDefault();
		} <span class="eventsHiv-keyword">else</span> {
			event.returnValue = <span class="eventsHiv-literal">false</span>;
		}
	},

	// 阻止事件冒泡
	stopPropagation: <span class="eventsHiv-keyword">function</span>(event) {
		<span class="eventsHiv-keyword">if</span> (event.stopPropagation) {
			event.stopPropagation();
		} <span class="eventsHiv-keyword">else</span> {
			event.cancelBubble = <span class="eventsHiv-literal">true</span>;
		}
	}
};
```

> 参考：[浏览器兼容性问题解决方案 · 总结](https://juejin.im/post/59a3f2fe6fb9a0249471cbb4?utm_source=gold_browser_extension%20%E6%8E%98%E9%87%91%E7%BD%91)
