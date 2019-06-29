# 封装Toast组件

## 即插即用

#### Toast组件实现

**Toast.vue**

```js
<template>
	<div class="Toast" v-if="isShow">
		<div class="Toast-div">{{ text }}</div>
	</div>
</template>
 
<script>
export default{
	data(){
		return {
			text:'内容',
			isShow:true,
			duration:1500
		}
	}
}
</script>
 
<style>
*{
	margin: 0;
	padding: 0;
}
.Toast{
   	position: fixed;
   	left: 50%;
    transform: translate(-50%, 0);
    margin-top: 5rem;
    background: #000000;
    line-height: 0.7rem;
	color: #FFFFFF;
	padding: 0 0.2rem;
	border-radius: 0.2rem;
}
</style>
```

**或通过暴露方法控制**

```js
<template>
	<div class="Toast" v-if="isShow">
		<div class="Toast-div">{{ text }}</div>
	</div>
</template>
 
<script>
export default{
	data(){
		return {
			text: '内容',
			isShow: false,
			duration: 1500
		}
	},
	methods: {
		showToast(text) {
			this.text = text;
			this.isShow = true;
		}
	}
}
</script>
 
<style>
*{
	margin: 0;
	padding: 0;
}
.Toast{
   	position: fixed;
   	left: 50%;
    transform: translate(-50%, 0);
    margin-top: 5rem;
    background: #000000;
    line-height: 0.7rem;
	color: #FFFFFF;
	padding: 0 0.2rem;
	border-radius: 0.2rem;
}
</style>
```

#### 向外暴露Toast组件方法

**Toast.js**

```js
import Vue from 'vue'; 
import Toast from '@/components/Toast';     //引入组件

let ToastConstructor  = Vue.extend(Toast) // 返回一个 扩展实例构造器
 
let myToast = () => {
	let ToastDom = new ToastConstructor({
		el: document.createElement('div')    // 将Toast组件挂载到新创建的div上
	})
	document.body.appendChild( ToastDom.$el )   // 把Toast组件的dom添加到body里
}
export default myToast;
```

**或直接就挂载到原型中比较好**

```js
import Toast from '@/components/Toast';     //引入组件

var $vm
export default {
  install (Vue, options) {
    if (!$vm) {
      const ToastPlugin = Vue.extend(Toast);	// 返回一个 扩展实例构造器
      $vm = new ToastPlugin().$mount();	// 手动地挂载一个未挂载的实例
      document.body.appendChild($vm.$el);	// 挂载到body对象上
    }
    Vue.prototype.$Toast = function (text) {
      $vm.showToast(text);
    }
  }
}
```

#### 组件调用

```js
<template>
  <div class="hello">
    <button @click="showToast">按钮</button>
  </div>
</template>
 
<script>
import Vue from 'vue';
import Toast from './js/Toast';        // 引入Toast函数
Vue.prototype.$Toast = Toast;          // 给Vue对象添加$Toast方法

export default {
  name: 'hello',
  data () {
    return {
      
    }
  },
  methods:{
  	showToast(){
  		this.$Toast();              //现在就可以调用了
  	}
  }
}
</script>
```

**如果通过挂载方法就能直接通过方法控制**

```js
import Toast from './js/Toast';        // 引入Toast函数
import Vue from 'vue'
Vue.use(Toast);

this.$Toast('Toast弹框成功！');
```
