# CSS实现元素居中

## CSS垂直居中技巧

#### line-height

	单行文字垂直居中技巧

	原理是在于将单行文字的行高设定后，文字会位于行高的垂直中间位置

```html
<div class="content">Lorem ipsam.</div>
```

```css
.content {
    width: 400px;
    background: #ccc;
    line-height: 100px;
    margin: auto;
}
```

#### Line-height + inline-block

	多对象的垂直居中技巧

	既然可以使用第一种方式对行元素达成垂直居中的话，当然没有理由不能做到多行啊！ 但是需要将多个元素或多行元素当成一个行元素来看待，所以我们必须要将这些数据多包一层，并将其设定为inline - block，并在该inline - block对象的外层对象使用inline - block来代替height的设置，如此便可以达到垂直居中的目的了，从使的数据是包含了标题跟内容在内也可以正常的垂直居中了。

```html
<div class="box box2">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    border: 1px solid #f00;
    margin: auto;
    line-height: 200px;
    text-align: center;
}

.box2 .content {
    display: inline-block;
    height: auto;
    line-height: 1;
    width: 400px;
    background: #ccc;
}
```

#### :before + inline-block

	多对象的CSS垂直居中技巧

	    : before 伪类元素搭配 inline - block 属性的写法应该是很传统的垂直居中的技巧了，此方式的好处在于子元素居中可以不需要特别设定高度，我们将利用: before伪类元素设定为100 % 高的inline - block，再搭配上将需要居中的子元素同样设置成inline - block性质后，就能使用vertical - align: middle来达到垂直居中的目的了，此方式在以往其实是个非常棒的垂直居中解决方案，唯独需要特别处理掉inline - block元素之间的4 - 5 px空间这个小缺陷，但也很实用了。

```html
<h2>3.:before + inline-block</h2>
<div class="box box3">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    text-align: center;
}

.box::before {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}

.box .content {
    width: 400px;
    background: #ccc;
    display: inline-block;
    vertical-align: middle;
}
```

#### absolute + margin 负值

	多行文字的垂直居中技巧

	绝对定位在这个例子中会设置top: 50 % 来抓取空间高度的50 % ，接着在将居中元素的margin - top设定为负一半的高度，这样就能让元素居中了

```html
<h2>4.absolute + margin 負值</h2>
<div class="box box4">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    position: relative;
}

.box4 .content {
    width: 400px;
    background: #ccc;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -35px;
}
```

#### absolute + margin auto

	多行文字的垂直居中技巧

	当元素设置为绝对定位后，假设它是抓不到整体可运用的空间范围，所以margin: auto会失效，但当设置了top: 0;
	bottom: 0;
	时，绝对定位元素就抓到了可运用的空间了，这时的margin: auto就生效了（ 神奇吧），如果绝对定位元素需要水平居中于父层，那同样可以设定left: 0;
	right: 0;
	来让绝对定位元素取得空间可运用范围，再让marign - left与margin - right设定为auto即可居中。

> 但此方式的缺点是的定位元素必须有固定的宽高（百分比也算）才能正常居中。 

```html
<h2>5. absolute + margin auto</h2>
<div class="box box5">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    position: relative;
}

.content {
    width: 400px;
    background: #ccc;
    height: 70px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

#### absolute + translate

	多行文字的垂直居中技巧

	在一个绝对定位居中的方式，此方式应该算是最方便的了，因为此居中的定位元素不需要固定的宽高，我们利用绝对定位时的top与right设置元素的上方跟左方各为50 % ，再利用translate(-50 % , -50 % ) 位移居中元素自身宽与高的50 % 就能达成居中的目的了。

```html
<h2>6. absolute + translate(-50%, -50%)</h2>
<div class="box box6">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    position: relative;
}

.box5 .content {
    width: 400px;
    background: #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

#### Flex + align-items

	多行文字的垂直居中技巧

	只要设定父层display: flex以及设定次轴(cross axis) 属性align - items: center 就好了

> 这个方式的优点是此层不需要设定高度即可自动居中，且原始代码干净无比

```html
<h2>7. Flex + align-items</h2>
<div class="box box7">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Flex + :before + flex-grow

	多行文字的垂直居中技巧

	Flex有多种方式可以让把数据居中，适用Flex - grow的延展特性来达成，这个例子中适用了flex - direction: column直式排法，搭配: before伪元素适用flex - grow伸展值能够取得剩下所有空间的特性，把它设定成一半的剩余空间就能做到把内容数据准确的推到垂直中间位置，算是个传统技法的延伸方式。

```html
<h2>8. Flex + :before + flex-grow</h2>
<div class="box box8">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box:before {
    content: '';
    flex-grow: .5;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Flex + margin

```html
<h2>9. Flex + margin</h2>
<div class="box box9">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: flex;
}

.content {
    width: 400px;
    background: #ccc;
    margin: auto;
}
```

#### Flex + align-self

	多行文字的垂直居中技巧

	align - self基本上就是对flex次轴cross axis 的个别对齐方式只要对单一子层元素设定align - self: center就能达成垂直居中的目的了。

```html
<h2>10. Flex + align-self</h2>
<div class="box box10">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: flex;
    justify-content: center;
}

.content {
    width: 400px;
    background: #ccc;
    align-self: center
}
```

#### Flex + align-content

	多行文字的垂直居中技巧

	在正常的状况下，align - content 仅能对次轴多行flex item做居中，但是当我今天子层元素不确定有多少个时，且有时可能会有单个的情况出现时，此技巧就能用到了（ 当然也能有其他解法），既然是多行子元素才能用，那我们就为单个子组件多加两个兄弟吧，使用: before以及: after 来让子元素增加到多个，这样就能使用flex的align - content属性来居中

```html
<h2>11. Flex + align-content</h2>
<div class="box box11">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
}

.content {
    width: 400px;
    background: #ccc;
}

.box11:before,
.box11:after {
    content: '';
    display: block;
    width: 100%;
}
```

#### Grid + template

	多行文字的垂直居中技巧

	CSS Grid最令人惊讶的就是这个template的功能了，简直就是把块元素当画布在使用，我们仅需要把模板设置成三列，就能搞定垂直居中了

```html
<h2>12. Grid + template</h2>
<div class="box box12">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
        '. . .'
        '. amos .'
        '. . .';
}

.content {
    width: 400px;
    background: #ccc;
    grid-area: amos;
}
```

#### Grid + align-items

	多行文字的垂直居中技巧

	align - items不仅是Flex可用，连CSS Grid也拥有此属性可使用，但在Flex中align - items是针对次轴cross axis作对齐，而在CSS Grid中则是针对Y轴做对齐，可以把它想象成是表格中储存单元格的vertical - align属性看待，就可以很好理解了

```html
<h2>13. Grid + align-items</h2>
<div class="box box13">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    justify-content: center;
    align-items: center;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Grid + align-content

	杜航文字的垂直居中技巧

	CSS Grid的align - content跟Flex的align - content有点差异，CSS Grid对于空间的解释会跟Flex有一些些的落差，所以导致align - content在Flex中仅能针对多行元素起作用，但在Grid中就没这个问题，所以我们可以很开心的使用align - content来对子元素做垂直居中，丝毫不费力气

```html
<h2>14. Grid + align-content</h2>
<div class="box box14">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    justify-content: center;
    align-content: center;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Grid + align-self

	多行文字的垂直居中技巧

	基本上就是对grid Y轴的个别对齐方式，只要对单一子层元素设置为align - self: center就能达成垂直居中的目的了

```html
<h2>15. Grid + align-self</h2>
<div class="box box15">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    justify-content: center;
}

.content {
    width: 400px;
    background: #ccc;
    align-self: center;
}
```

#### Grid + place-items

	多行文字的垂直居中技巧

	此属性是align - items与justify - items的缩写，简单的说就是水平与垂直的对齐方式，想当然的，设定center就能居中

```html
<h2>16. Grid + place-items</h2>
<div class="box box16">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    height: 150px;
    margin: 0 auto;
    place-items: center;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Grid + place-content

	多行文字的垂直居中技巧

	此属性是align - content与justify - content的缩写，简单的说就是水平与垂直的对齐方式，想当然的，设置center就能居中了

```html
<h2>17. Grid + place-content</h2>
<div class="box box17">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
    height: 150px;
    margin: 0 auto;
    place-content: center;
}

.content {
    width: 400px;
    background: #ccc;
}
```

#### Grid + margin

	多行文字的垂直居中技巧

	由于Grid元素对空间解读的特殊性，我们只要在父层元素设定display: grid，接着在需要垂直居中的元素上设置margin: auto即可自动居中。

```html
<h2>18. Grid + margin</h2>
<div class="box box18">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    display: grid;
}

.content {
    width: 400px;
    background: #ccc;
    margin: auto;
}
```

#### display： table-cell

	多行文字的垂直居中技巧

	这一招的原理在于使用 CSS display属性将div设置成表格的单元格，这样就能利用支持存储单元格对齐的vertical - align属性来将信息垂直居中

```html
<h2>19. display：table-cell</h2>
<div class="box box19">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

.content {
    width: 400px;
    background: #ccc;
    margin: auto;
}
```

#### calc

	多行文字的垂直居中技巧

	calc是计算机英文单词calculator的缩写，这个由微软提出的css 方法，真的是网页开发者的一个福音，从此我们再也不用在那边绞尽脑汁的数学计算了，或是想办法用js来动态计算，我们可以很轻松的利用calc() 这个方法，来将百分比及时且动态的计算出实际要的是什么高度

> 但这个方法需要注意的是大量使用的话，网页性能会是比较差的，所以请谨慎使用。 

```html
<h2>20. calc</h2>
<div class="box box20">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
}

.content {
    width: 400px;
    background: #ccc;
    position: relative;
    top: calc((100% - 70px) / 2);
    margin: auto;
    height: 70px;
}
```

#### Relative + translateY

	多行文字的垂直居中技巧

	这个技巧是利用了top: 50 % 的招式，让我们的元素上方能产生固定百分比的距离，接着让要居中的元素本身使用translateY的百分比来达成垂直居中的需求，translate是一个很棒的属性，由于translate的百分比单位是利用元素自身的尺寸作为100 % ，这样让我们要利用元素自身宽高做事变得方便很多。

```html
<h2>21. Relative + translateY(-50%)</h2>
<div class="box box21">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
}

.content {
    width: 400px;
    background: #ccc;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
}
```

#### padding

	多行文字的垂直居中技巧

	这的确也算是一种垂直居中的方式，不可讳言的这方式真的是简单过头了，以至于有些开发者认为这种方式都不能算是一种垂直居中的技巧，但同样的你无法反驳的是，我的数据的确垂直居中啦。。。

```html
<h2>22. padding</h2>
<div class="box box22">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    border: 1px solid #f00;
    margin: auto;
    height: auto;
    padding: 50px 0;
}

.content {
    width: 400px;
    background: #ccc;
    margin: auto;
}
```

#### write-mode

	多行文字的垂直剧种技巧

	使用write - mode将一整个文字容器变成直书，接着将此容器利用text - align: center来达到垂直居中的目的，白话一点的解说就是，把原本横排的文字变成竖排，所以原本横排用到的水平对齐方式，就变成了控制直排的中间了，原理就是这么简单。 但要特别注意的是浏览器对此语法的支持度来说，需要拆开写法才行，不然某些浏览器的语法不同，可能会让网页在某些浏览器上看起来无效，这会是最需要注意到的

```html
<h2>23. write-mode</h2>
<div class="box box23">
    <div class="content">
        立马来看实际完成的
        <a href="http://csscoke.com/2015/07/31/nth-child_rwd_album/">CSS3精美相册效果</a>
        效果吧！別忘了拖拉一下窗口看看 RWD 效果喔！
    </div>
</div>
```

```css
h2 {
    text-align: center;
}

.box {
    width: 500px;
    height: 250px;
    border: 1px solid #f00;
    margin: auto;
    writing-mode: tb-lr;
    /* for ie11 */
    writing-mode: vertical-lr;
    text-align: center;
    margin: 0 auto;
}

.content {
    width: 400px;
    background: #ccc;
    display: inline-block;
    /* for ie & edge */
    width: 100%;
    writing-mode: lr-tb;
    margin: auto;
    text-align: left;
}

.box .txt {
    width: 80%;
    margin: auto;
}
```

