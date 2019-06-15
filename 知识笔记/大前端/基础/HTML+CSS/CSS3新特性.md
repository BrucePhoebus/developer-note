# CSS3新特性

> [参考](https://blog.csdn.net/lxcao/article/details/52797914)

1. CSS3的选择器

* E:last-child 匹配父元素的最后一个子元素E。
* E:nth-child(n)匹配父元素的第n个子元素E。 
* E:nth-last-child(n) CSS3 匹配父元素的倒数第n个子元素E。

2. @Font-face 特性

	Font-face 可以用来加载字体样式，而且它还能够加载服务器端的字体文件，让客户端显示客户端所没有安装的字体。

**例如**

```css
@font-face { 
 font-family: BorderWeb; 
 src:url(BORDERW0.eot); 
 } 
 @font-face { 
 font-family: Runic; 
 src:url(RUNICMT0.eot); 
 } 
 .border { FONT-SIZE: 35px; COLOR: black; FONT-FAMILY: "BorderWeb" } 
 .event { FONT-SIZE: 110px; COLOR: black; FONT-FAMILY: "Runic" }
```

**淘宝网使用字体**

```css
 @font-face {
	font-family: iconfont;
	src: url(//at.alicdn.com/t/font_1465189805_4518812.eot);    
 }
```

3. 圆角

	这个用得很多，例如让按钮看得更美观

```css
border-radius: 15px;
```

4. 多列布局 （multi-column layout）

	不过这个因为兼容性的问题，比较少用

```html
<div class="mul-col">
    <div>
        <h3>新手上路</h3>
        <p>新手专区 消费警示 交易安全 24小时在线帮助 免费开店</p>
    </div>
    <div>
        <h3>付款方式</h3>
        <p>快捷支付 信用卡 余额宝 蚂蚁花呗 货到付款</p>
    </div>
    <div>
        <h3>淘宝特色</h3>
        <p>手机淘宝 旺信 大众评审 B格指南</p>
    </div>
</div>
```

```css
.mul-col{
    column-count: 3;
    column-gap: 5px;
    column-rule: 1px solid gray;
    border-radius: 5px;
    border:1px solid gray;
    padding: 10px   ;
}
```

5. 阴影

	这个也是用得很多的，让图片或标题看起来更有立体感，也就是视觉效果更好

```css
 .class1{ 
    text-shadow:5px 2px 6px rgba(64, 64, 64, 0.5); 
}
```

> 很多网站都有使用这效果，例如：[OPPO官网](http://www.oppo.com/cn/products.html)

6. CSS3 的渐变效果 

	这个效果也是用得很多的，可以实现更好的视觉效果

```css
background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),to(#FE280E));
```

> 这里 linear 表示线性渐变，从左到右，由蓝色（#2A8BBE）到红色（#FE280E）的渐变

7. CSS弹性盒子模型'

	这个效果很实在，可以让页面自适应，只要设个最小宽度就行了，让页面效果更好，很多网站都已使用相关技术

```html
<div class="box-container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
```

```css
.box-container { 
    width: 1000px; 
    display: -webkit-box; 
    display: -moz-box; 
    -webkit-box-orient: horizontal; 
    -moz-box-orient: horizontal; 
} 
            
 .item { 
    background: #357c96; 
    font-weight: bold; 
    margin: 2px; 
    padding: 20px; 
    color: #fff; 
    font-family: Arial, sans-serif; 
}
```

8. CSS3制作特效

1. Transition 对象变换时的过渡效果

|属性|说明|
|:---:|:---:|
|transition-property|对象参与过渡的属性|
|transition-duration|过渡的持续时间|
|transition-timing-function|过渡的类型|
|transition-delay|延迟过渡的时间|




