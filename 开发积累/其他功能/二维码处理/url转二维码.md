# url转二维码

## qrcode.min.js插件实现

	这个插件可以将url地址转为二维码显示，让用户可以用手机扫码打开页面

*jsp导入*

```js
// ulr转二维码插件
<script type="text/javascript" src="${ctx}/js/qrcode.min.js"></script>
```

*将二维码绑定到指定ID显示*

```js
new QRCode(document.getElementById(("idName")), {
	width: 100,	// 设置二维码宽
	height: 100,	// 设置二维码高
	colorDark: "#000000",	// 设置二维码线条色
	colorLight: "#ffffff",	// 设置二维码背景色
	text: Url	// 设置二维码的值
});
```

*也可以循环创建多个二维码*

```js
for (var i=0, len=signInfo.length; i < len; i++) {
	// 将该对象的URL转化为二维码显示
	var li,
		p,
		div,
		ul = document.getElementById("qrList");

	li = document.createElement("li");
	li.setAttribute('class', 'new-li');
	// 添加p 描述标签
	p = document.createElement("p");
	p.innerHTML = signInfo[i].Name + ' 扫码签名';
	// 添加img 二维码图片
	div = document.createElement("div");
	div.setAttribute('id', 'qrCode' + i);

	li.appendChild(p);
	li.appendChild(div);
	ul.appendChild(li);

	new QRCode(document.getElementById(("qrCode" + i)), {
		width: 100,
		height: 100,
		colorDark: "#000000",
		colorLight: "#ffffff",
		text: signInfo[i].Url
	});
}
```

> 注：这是因为在jsp中使用，所以直接导入插件js，当然还有其他类似的插件也可以实现差不多的效果；而且移动端可以直接通过npm安装插件使用