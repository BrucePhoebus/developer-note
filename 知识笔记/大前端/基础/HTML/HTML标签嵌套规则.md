# HTML标签嵌套规则

## HTML标签有两类

#### 块级元素

	div、h1~h6、address、blockquote、center、dir、dl、dt、dd、fieldset、form、hr、isindex、menu、noframes、noscript、ol、p、pre、table、ul ...

* 特点：总是在新行上开始，高度、行高以及顶和底边距都可控制，宽度缺省是它的容器的100%，除非设定一个宽度

* 功能：主要用来搭建网站架构、页面布局、承载内容

**举例**

```HTML
<div>one</div><div>two</div>
```

**显示效果如下**

```HTML
one
two
```

#### 行内元素

	span、a、abbr、acronym、b、bdo、big、br、cite、code、dfn、em、font、i、img、input、kbd、label、q、s、samp、select、small、strike、strong、sub、sup、textarea、tt、u、var ...

* 特点：和其他元素都在一行上，高、行高及顶和底边距不可改变，宽度就是它的文字或图片的宽度，不可改变

* 功能：用于加强内容显示,控制细节，例如：加粗、斜体等等

**举例**

```HTML
<span>one</span><span>two</span>
```

**显示效果如下**

```HTML
onetwo
```


> 块级元素与行内元素并不是一成不变的，我们可以通过CSS来改变他的特性

	display: inline; //行内元素
	display: block; //块级元素

#### 选择性使用嵌套规则

	虽然HTML标签有很多并且我们在制作页面的时候可以无限的嵌套，但是嵌套也有规则，不能随意的嵌套。有些标签是固定的嵌套规则，比如ul包含li、ol包含li、dl包含dt和dd等等。
	还有很多是独立的标签，我们如何来使用它编写更优秀的页面

* 块级元素与块级元素平级、内嵌元素与内嵌元素平级

```HTML
<div><span></span><p></p></div>  // span是行内元素，p是块级元素，所以这个是错误的嵌套
<div><span></span><a></a></div>  // 对的
```

* 块元素可以包含内联元素或某些块元素，但内联元素不能包含块元素，它只能包含其它的内联元素

```HTML
<div><span></span></div>
<span><span></span></span>
```

* 有几个特殊的块级元素只能包含内嵌元素，不能再包含块级元素

	h1、h2、h3、h4、h5、h6、p、dt

* 块级元素不能放在标签p里面

	li 标签可以包含 div 标签，因为li 和 div 标签都是装载内容的容器

**总结**

	​虽然我们可以嵌套标签，但是为了提高浏览器的渲染效率，我们应该尽少的嵌套标签，扁平化

## 基本规则

1. `body`可以直接包含块状元素、ins、del、script。不可以直接包含行内元素
2. `ins和del`（行内元素）可以包含块状元素或者行内元素，其他任何行内元素都不允许包含块状元素
2. `p、h1-h6`可以直接包含行内元素和文本信息，但是不允许包含块状元素
3. `dl`元素只允许包含dt和dd，同时dt不能包含块状元素，只允许包含行内元素，对于dd可以包含任何元素
4. `form`元素不能够直接包含input元素。原因在于input元素属于行内元素，form元素仅仅能够包含块状元素
5. `table`元素只能够包含caption、colgroup、col、thead、tbody、tfoot，不能够直接包含tr或者其他任何元素