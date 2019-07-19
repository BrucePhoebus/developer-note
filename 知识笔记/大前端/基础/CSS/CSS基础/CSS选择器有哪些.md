# CSS选择器有哪些

	通用选择器、ID选择器、类选择器、元素选择器、属性选择器、伪类选择器、层级选择器

## 常用选择器

* 通用选择器：*

	选择所有元素，不参与计算优先级*，兼容性IE6+

* id选择器：#idName

	选择指定id值元素，兼容性：IE6+

* 类选择器：.className

	选择所有class为XXX的元素，兼容性：IE6+

* 后代选择器：X Y

	选择满足X选择器的后代节点中满足Y选择器的元素，兼容性：IE6+

* 元素选择器：a/p/div

	选择标所有签为X的元素，兼容性：IE6+

* :link，:visited，:focus，:hover，:active链接状态

	选择特定状态的链接元素，顺序LoVe HAte，兼容性: IE4+

* X:after, X::after：after伪元素

	选择元素虚拟子元素（元素的最后一个子元素），CSS3中::表示伪元素。兼容性:after为IE8+，::after为IE9+

* :hover

	鼠标移入状态的元素，兼容性a标签IE4+， 所有元素IE7+

* :not(selector)

	选择不符合selector的元素。不参与计算优先级，兼容性：IE9+

* X:first-child

	伪类，选择满足X选择器的元素，且这个元素是其父节点的第一个子元素。兼容性IE7+

* X:last-child

	伪类，选择满足X选择器的元素，且这个元素是其父节点的最后一个子元素。兼容性IE9+

## 其它

* 直接兄弟选择器：X + Y

	在X之后第一个兄弟节点中选择满足Y选择器的元素，兼容性： IE7+

* 子选择器：X > Y

	选择X的子元素中满足Y选择器的元素，兼容性： IE7+

* 兄弟选择器：X ~ Y

	选择X之后所有兄弟节点中满足Y选择器的元素，兼容性： IE7+

* [attr]

	选择所有设置了attr属性的元素，兼容性IE7+

* [attr=value]

	选择属性值刚好为value的元素

* [attr~=value]

	选择属性值为空白符分隔，其中一个的值刚好是value的元素

* [attr|=value]

	选择属性值刚好为value或者value-开头的元素

* [attr^=value]

	选择属性值以value开头的元素

* [attr$=value]

	选择属性值以value结尾的元素

* [attr*=value]

	选择属性值中包含value的元素

* [:checked]

	选择单选框，复选框，下拉框中选中状态下的元素，兼容性：IE9+

* ::first-letter

	伪元素，选择块元素第一行的第一个字母，兼容性IE5.5+

* ::first-line

	伪元素，选择块元素的第一行，兼容性IE5.5+

* :nth-child(an + b)

	伪类，选择前面有an + b – 1个兄弟节点的元素，其中n >= 0， 兼容性IE9+

* :nth-last-child(an + b)

	伪类，选择后面有an + b – 1个兄弟节点的元素 其中n >= 0，兼容性IE9+

* X:nth-of-type(an+b)

	伪类，X为选择器，解析得到元素标签，选择前面有an + b – 1个相同标签兄弟节点的元素。兼容性IE9+

* X:nth-last-of-type(an+b)

	伪类，X为选择器，解析得到元素标签，选择后面有an+b-1个相同标签兄弟节点的元素。兼容性IE9+

* X:only-child

	伪类，选择满足X选择器的元素，且这个元素是其父元素的唯一子元素。兼容性IE9+

* X:only-of-type

	伪类，选择X选择的元素，解析得到元素标签，如果该元素没有相同类型的兄弟节点时选中它。兼容性IE9+

* X:first-of-type

	伪类，选择X选择的元素，解析得到元素标签，如果该元素 是此此类型元素的第一个兄弟。选中它。兼容性IE9+

> 参考：[羽筠 - CSS选择器有哪些](https://blog.csdn.net/qq_16494241/article/details/51364190)
