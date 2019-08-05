# Vue语法报错

## Vue警告提示

	Vue警告提示，不影响运行，但部分影响性能，官方也建议处理

#### v-for循环没写key属性

	`IE11`会报警告提示，官方也建议写上key，当然部分浏览器会智能忽略

*解决办法*

直接加上key属性

```vue
v-for="(item, index) in items"
:key="index"
```

#### 子组件修改父组件的值警告

> [官方](https://cn.vuejs.org/v2/guide/reactivity.html)建议子组件不用随意修改父组件的值

> 报错信息：[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "result" (found in component )

> 意思是子组件修改了父组件传给子组件的变量（这个变量是双向绑定的），但是官网建议单项数据流

*解决办法*

*错解1*:

```js
props:{
	isShowDialog: {
		type: Boolean,
		default: false
	}
},
data() {
	return {
		isShowTreeDialog: this.isShowTreeDialog
	}
}
```

> 这样是无法实现双向绑定的，会发现只有第一次有效果

*正解*：

```js
props:{
	isShowDialog: {
		type: Boolean,
		default: false
	}
},
data() {
	return {
		isShowTreeDialog: false
	}
},
watch: {
	isShowDialog(newVal, oldVal) {
		this.isShowTreeDialog = newVal;
	}
},
```

> 直接监听isShowDialog，这样再做中转就能实现单项数据流，并且双向绑定效果

#### 组件回调问题

	想要使用挂载方式注册主键，即通过在原型挂载组件实例，然后将该实例注册到父组件中，但是不知道怎么实现方法回调

*说明*

	组件封装可以使用两种办法，一直是直接写组件，然后直接引用，通过Vue.use()方法使用，这应该不算封装吧；
	第二种方法：使用一个js文件，通过$mount()创建组件实例，然后将组件挂载到对应引用组件上

[具体参考](知识笔记/大前端/框架/Vue/实现组件的方法总结.md)

*解决方法1*：

> 直接创建组件abc，然后导入父组件，通过components中挂载到父组件实例中，然后直接标签使用<a-b-c></a-b-c>，其中参数直接在这个标签中传入，子组件通过props接收父类参数，并且通过this.$emit()实现回调（官网也推荐这样使用）

*参考实现*

```html
<div>
	<a-b-c :isShow="isShowABC" @emitFunc="emitFunc"></a-b-c>
</div>
```

```js
import abc from ''./abc;

components: {
	abc
},
data() {
	return {
		// 传递给子类的参数
		isShowABC: true,
	}
},
methods: {
	// 这样实现回调
	emitFunc('子类传过来的参数') {
		// todo 这里实现回调内容
	}
}
```

*子类接收*

```js
props: {
	// 子类传过来的参数在props属性中接收，并且是双向绑定的
	isShow: {
		type: Boolean,
		default: false
	}
},
data() {
	return: {
		isShowABC: false	// 通过子类自定义自己变量中转父类传过来的变量
	}
},
watch: {
	// 这样实现可以避免双向绑定修改到父类的变量
	isShow(newVal) {
		this.isShowABC = newVal;
	}
}
```

#### 渲染问题

###### [Vue warn]: You may have an infinite update loop in a component render function.

	因为v-for或某个原因倒是无限渲染

**示例**

	在element-ui表格v-for的过程过使用:formatter = "。。。"，正常这是没问题的，但是我又在formatter方法中进行了数组push操作，然后就GG了

	可惜暂时不知道怎么解决，只能不在formatter方法中进行这种操作。。。
