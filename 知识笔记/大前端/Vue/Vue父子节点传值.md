# Vue父子节点传值

## 简单父子组件传值

#### 父组件给子组件传值

###### 嵌入式子组件

	这种组件相当于父组件的一部分，这种组件我们可以在引用的时候进行传值，而子组件通过 props 属性接收

* 弹框组件示例

**引入组件**

```js
<create-tree-dialog :isShowDialog="isShowTreeDialog" :dialogTitle="'收件人列表'" :checkedNodeIdList="selectedList.selectedListId" 	
	:treeData="treeData" @confirmCallback="confirmCallback" @cancelCallback="cancelCallback"></create-tree-dialog>

import createTreeDialog from '../../util/createTreeDialog/createTreeDialog'

components: {
	createTreeDialog
},
```

> 这样就可以实现把`isShowTreeDialog`等一堆变量(数据)传递给子组件

**子组件接收**

```js
props:{
	treeData: {
		type: Array,
		default: () => []
	},
	dialogTitle: {
		type: String,
		default: ''
	},
	checkedNodeIdList: {
		type: Array,
		default: () => []
	},
	isShowDialog: {
		type: Boolean,
		default: false
	},
	isAppendToBody: {
		type: Boolean,
		default: false
	},
	modal: {
		type: Boolean,
		default: true
	},
	isShowCheckBox: {
		type: Boolean,
		default: true
	}
},
```

> 子组件通过`props`属性接收后就能直接使用，在方法中通过this引用，data属性中和template模版中则是直接使用

!> 当父组件的值发生改变，子组件的视图也会同步被更新。

> 当然，原则上不建议子组件直接修改父组件的值，但是可以通过[中转变量修改](开发积累/Vue/组件封装/树形弹框组件.md)，然后通过`$emit`通知父组件更改

###### 插件式子组件

	这种组件一般我们只能使用它暴露的方法，调用之后就只能修改子组件自己提供的功能，很难跟父组件形成交互，也就是子组件有什么功能就是啥功能，参考PDF预览插件

* pdf预览示例

```js
import pdf from '../../utils/pdf'
import Vue from 'vue'
Vue.use(pdf);

this.$showPDF({ data: 'data:application/pdf;base64,' + atob(response.cqxx) });	// 这里穿pdf或URL
```


