# 渲染函数render

## 简述

	Vue推荐使用template创建HTML， 但有些场景需要JavaScript完全编译的功能， 这个时候就可以使用render函数（ 它比template更接近编译器）

* 使用的原因是特殊情况下， 模版的写法无法满足需求， 或模版的写法比较繁琐， 需要用到js的编程能力， 这样就可以使用render来创建HTML

* 使用 JavaScript （也就是render函数实现）代替模板功能

* 实现自定义指令

* 是对template的优化实现

#### 官网深入渲染函数学习

**Vue使用场景**

	例如我们要生成锚点标题(anchored headings)

* 对于这段HTML

```html
<h1>
    <a name="hello-world" href="#hello-world">
        Hello World!
    </a>
</h1>
```

* 可以这样定义组件接口

```html
<anchored-heading :level="1">Hello World!</anchored-heading>
```

* 当我们开始写一个只能通过 level prop 动态生成 heading 标签的组件时， 直接简单实现是

```html
<h1 v-if="level === 1">
    <slot></slot>
</h1>
<h2 v-else-if="level === 2">
    <slot></slot>
</h2>
<h3 v-e1se-if="1eve1 === 3">
    <slot></slot>
</h3>

<h4 v-else-if="level === 4">
    <slot></slot>
</h4>
<h5 v-e1se-if="1eve1 === 5">
    <slot></slot>
</h5>
<h6 v-else-if="level === 6">
    <slot></slot>
</h6>
```

```js
Vue.component('anchored-heading', {
	 template: '#anchored-heading-template',
	 props: {
		 level: {
			 type: Number,
			 required: true
		 }
	 }
})
```

> 但比较直接的问题是（这种场景中使用 template 并不是最好的选择）
	
	代码冗长， 为了在不同级别的标题中插入锚点元素， 我们需要重复地使用 <slot></slot>

*使用render函数优化*

```js
Vue.component('anchored-heading', {
	 render:function )(createElement) {
		 return createElement(
			 'h' + this.level,	// 标签名称
			 this.$slots.default	// 子元素数组
		 )
	 },
	 props: {
		 level: {
			 type: Number,
			 required: true
		 }
	 }
})
```

这样代码明显简洁很多（前提是熟悉Vue实例属性）。 在这个例子中， 向组件中传递不带 slot 特性的子元素时， 比如 anchored-heading 中的 Hello world!， 这些子元素被存储在组件实例中的 $slots.default 中（参考vm.$slot实例属性）。 
函数式组件（接锚点例子改造）
上述生成锚点标题是比较简单的实现， 没有管理或者监听任何传递给他的状态， 也没有生命周期方法。 它只是一个接收参数的函数。 
而函数式组件， 这意味它是无状态 (没有响应式数据)， 无实例 (没有 this 上下文)， 标记组件为functional。 
就长这样

注： 在 2.3.0 之前的版本中， 如果一个函数式组件想要接受 props， 则 props选项是必须的。 在 2.3.0 或以上的版本中， 你可以省略 props 选项， 所有组件上的特性都会被自动解析为 props。 
单文件组件
在 2.5.0 及以上版本中， 如果你使用了单文件组件， 那么基于模板的函数式组件可以这样声明

不过组件需要的一切东西都需要上下文传递
props： 提供所有 prop 的对象
children: VNode 子节点的数组
slots: 返回所有插槽的对象的函数
scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽以及函数形式的普通插槽的对象。 
data： 传递给组件的数据对象， 作为 createElement 的第二个参数传入组件
parent： 对父组件的引用
listeners: (2.3.0+) 一个包含了所有在父组件上注册的事件侦听器的对象。 这只是一个指向 data.on 的别名。 
injections: (2.3.0+) 如果使用了 inject 选项， 则该对象包含了应当被注入的属性。 
在添加 functional: true 之后， 锚点标题组件的 render 函数之间简单更新增加 context 参数（上下文对象）， this.$slots.default 更新为 context.children， 之后this.level 更新为 context.props.level
注： 因为函数式组件只是一个函数， 所以渲染开销也低很多。 然而， 对持久化实例的缺乏也意味着函数式组件不会出现在 Vue devTools 的组件树里。 
包装组件
如果是包装组件使用渲染函数， 则需要做一些处理
程序化地在多个组件中选择一个
在将 children, props, data 传递给子组件之前操作它们。 
参考实例
一个依赖传入props值的组件

向子元素或子组件传递特性和事件
在普通组件中
没有被定义为 prop 的特性会自动添加到组件的根元素上， 将现有的同名特性替换或与其智能合并。 
函数式组件要求我们显式定义该行为
向 createElement 通过传入 context.data 作为第二个参数， 我们就把 my-functional-button 上面所有的特性和事件监听器都传递下去了。 事实上这是非常透明的， 那些事件甚至并不要求 .native 修饰符。 

如果使用基于模板的函数式组件， 那么你还需要手动添加特性和监听器。 因为我们可以访问到其独立的上下文内容， 所以我们可以使用 data.attrs 传递任何 HTML 特性， 也可以使用 listeners (即 data.on 的别名) 传递任何事件监听器。 

slots() 和 children 对比（使用场景）
slots().default 不是和 children类似， 但是有些场景我们需要同时使用它们
例如

对于这个组件， children 会给你两个段落标签， 而 slots().default 只会传递第二个匿名段落标签， slots().foo 会传递第一个具名段落标签。 同时拥有 children和 slots() ， 因此你可以选择让组件通过 slot() 系统分发或者简单的通过 children 接收， 让其他组件去处理。 
节点、 树以及虚拟 DOM
浏览器的工作原理
在深入渲染函数之前， 可以参考一下浏览器的工作原理， 看看浏览器是怎么渲染的
浏览器是怎么渲染这段HTML代码？ 

当浏览器顺序读到这些代码时， 浏览器会创建一个“DOM节点”树来保持追踪（也也就是关系树）
生成的HTML的DOM树

看生成的DOM树就就知道： 每个元素都是一个节点。 每片文字也是一个节点。 甚至注释也都是节点。 一个节点就是页面的一个部分。 具备非常明确的关联关系、 层次关系。 
高效的更新所有这些节点会是比较困难的， 不过Vue已经解决这些问题
只要我们告诉Vue页面上的HTML是什么， 例如在一个模版中

也可以在一个渲染函数中

因为Vue是数据驱动， 实现数据双向绑定， 所有能很容易自动保持页面的更新， 自动更新元素以及内容的更改
虚拟 DOM
参考浏览器的实现原理， Vue则是通过创建一个虚拟DOM树来保持对真实DOM发生的追踪（也就是模拟生成DOM树）
例如这段代码， createElement 这个创建节点的方法会返回什么？ 其实不是创建一个实际的DOM元素。 如果重新命名， 或许可以叫做createNodeDescription， 这个方法包含的信息会告诉Vue页面上需要渲染什么样的节点（包括其子节点）。 因为不是真实的DOM节点， 所有叫做“虚拟节点”： “虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。 

createElement 参数
然后我们需要知道的是createElement这个方法是怎么生成模版的？ 
根据createElement方法接收的参数

深入 data 对象
在createElement VNode的时候， 有些内容是需要注意的： 正如在模板语法中， v-bind:class 和 v-bind:style， 会被特别对待一样， 在 VNode 数据对象中， 下列属性名是级别最高的字段。 这些对象也允许我们绑定普通的 HTML 特性， 就像 DOM 属性一样， 比如 innerHTML (这会取代 v-html 指令)。 

完整实例
当有了基础渲染知识后， 就可以开始着手用render实现组件

约束--约定注意事项
VNodes 必须唯一， 其实就是同一个VNode只能用在一个地方。 
这是无效的， 因为不能指向同一个VNode对象

解决： 用于重复创建多次组件/元素， 使用工厂函数实现

模版编译
科普： Vue 的模板实际是编译成了 render 函数（然后再由render函数创建虚拟DOM等一些操作）。 
举例模版编译细节
使用Vue.compile编译字符串
demo
<div>
<header>
<h1>I'm a template!</h1>
</header>
<p v-if="message">
{{ message }}
</p>
<p v-else>
No message.
</p>
</div>
render
function anonymous(
) {
with(this){return _c('div', [_m(0), (message)?_c('p', [_v(_s(message))]):_c('p', [_v("No message.")])])}
}
staticRenderFns
_m(0): function anonymous(
) {
with(this){return _c('header', [_c('h1', [_v("I'm a template!")])])}
}
Vue渲染函数 VS JSX
上述已经讲到了Vue渲染函数， 但实际上如果我们使用render函数一堆代码只是创建了一个简单的模版
复杂又长的代码

生成简单的模版

所以就出现了一个插件： Babel插件， 用于在Vue中使用JSX语法
直接使用更加接近模版的语法实现render函数

注： 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例， 实际上也是 JSX 所要求的。 从 Vue 的 Babel 插件的 3.4.0 版本开始， 我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 const h = this.$createElement， 这样你就可以去掉 (h) 参数了。 对于更早版本的插件， 如果 h 在当前作用域中不可用， 应用会抛错。 
简单的说 ， Vue默认支持render渲染函数实现虚拟DOM的创建， 用于管理数据和真实DOM元素， 方面页面DOM重新渲染（同步更新）， 而后使用的render实现又出现较高复杂度的问题（一堆复杂代码只为实现一个简单的模版）， 而JSX语法本身就是解决模版的书写形式， 所有就出现插件解决render的书写问题， 让render的实现更贴近于模版的书写（单纯的简化， 同样实现相同的功能， 虽然底层获取还是复杂， 不过不予理会）。 
Vue渲染函数的应用
简单例子
将HTML使用render实现
HTML
<div id="container">
<h1>
<a href="#" rel="external nofollow" rel="external nofollow" >
Hello world!
</a>
</h1>
</div>
render实现
<! DOCTYPE html>
<html>
<head>
<title>演示Vue</title>
<style>
</style>
</head>
<body>
<div id="container">
<tb-heading :level="1">
<a href="#" rel="external nofollow" rel="external nofollow" >Hello world!</a>
</tb-heading>
</div>
</body>
<script src="./vue.js"></script>
<script type="text/x-template" id="templateId">
<h1 v-if="level === 1">
<slot></slot>
</h1>
<h2 v-else-if="level === 2">
<slot></slot>
</h2>
</script>
<script>
Vue.component('tb-heading', {
template: '#templateId', 
props: {
level: {
type: Number, 
required: true
}
}
}); 
new Vue({
el: '#container'
}); 
</script>
</html>
v-if、 v-for替代实现
模版写法
<ul v-if="items.length">
<li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
render函数实现
props: ['items'], 
render: function (createElement) {
if (this.items.length) {
return createElement('ul', this.items.map(function (item) {
return createElement('li', item.name)
}))
} else {
return createElement('p', 'No items found.')
}
}
v-model替代实现
props: ['value'], 
render: function (createElement) {
var self = this
return createElement('input', {
domProps: {
value: self.value
}, 
on: {
input: function (event) {
self.$emit('input', event.target.value)
}
}
})
}
工作问题
生成多层次不同样式的button按钮组
问题描述
在工作中， 创建了一个button组件， 又创建了一个button-group组件
button组件较为简单， 就是一个可以输入type/size/icon等属性的button
渲染后结果

然后， 创建button-group组件， 目标结果为
不仅要在最外层包裹一层div， 还要在每个button组件外层包裹一层p标签

在此处， 就需要使用render函数了
注： 既然有了render函数， 就不再需要template标签了， vue文件中只需要script标签（该组件style是全局的）
细节
button-group.vue
<script>
export default {
name: "XButtonGroup", 
props: {
compact: { //自定义的button-group属性， 影响其classname
type: Boolean, 
default: true
}
}, 
render(createElement) {
//此处创建element
}, 
computed: {
groupClass() {
const className = ["field"]; //通过计算属性监听compact属性传入className
className.push(this.compact ? "has-addons" : "is-grouped"); 
return className; 
}
}
}; 
</script>
其中render函数中的createElement方法有三个参数。 第一个参数为外层标签名， 第二个为外层标签的属性对象， 第三个为外层标签中的内容
render方法
render(createElement) {
return createElement(
'div', 
{
class: this.groupClass
}, 
'内容', 
)
}
渲染结果

render函数的第三个参数除了字符串， 还可以传入VNode的数组。 VNode就是vue中的节点
通过this.$slots.default获取所有插入到button-group组件内默认slot的button节点
render(createElement) {
return createElement(
'div', 
{
class: this.groupClass
}, 
this.$slots.default, 
)
}, 
渲染结果

button已经正确渲染到了外层div中。 而createElement会创建新的VNode， 而render函数第三个参数需要VNode数组， 所以我们需要传入一个由createElement返回值组成的数组。 
render(createElement) {
//遍历每一个VNode, 用createElement函数在外层包裹class为control的p标签， 组成新的VNode数组
const array = this.$slots.default.map(VNode => {
return createElement(
'p', 
{
class: 'control'
}, 
[VNode])
})
return createElement(
'div', 
{
class: this.groupClass
}, 
array, 
)
}, 
渲染结果

并且根据button-group的compact属性可以切换不同的class， 生成不同的效果
<x-button-group :compact="true">
<x-button v-for="(item, index) in buttonType" :key="index" :type="item">{{item}}</x-button>
</x-button-group>
<x-button-group :compact="false">
<x-button v-for="(item, index) in buttonType" :key="index" :type="item">{{item}}</x-button>
</x-button-group>
