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
			text: '内容',
			isShow: true,
			duration: 1500
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
			isShow: true,
			duration: 1500
		}
	},
	methods: {
		showToast(text, duration) {
			this.text = text;
			duration = duration ? duration : this.duration;
			setTimeout(()=>{
				this.isShow = false;  
			}, duration);
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
let ToastConstructor  = Vue.extend(Toast) // 返回一个“扩展实例构造器”
 
let myToast = (text,duration)=>{
	let toastDom = new ToastConstructor({
		el:document.createElement('div')    //将toast组件挂载到新创建的div上
	})
	document.body.appendChild( toastDom.$el )   //把toast组件的dom添加到body里
	
    toastDom.text = text;
    toastDom.duration = duration;
 
    // 在指定 duration 之后让 toast消失
    setTimeout(()=>{
        toastDom.isShow = false;  
    }, toastDom.duration);
}
export default myToast;
```

> 这里给他设置两个传入参数，一个是显示的内容，一个是显示的时间

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
    Vue.prototype.$Toast = function (text, duration) {
      $vm.showToast(text, duration);
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

> 参考：[在vue中封装可复用的组件](https://blog.csdn.net/qq_38563845/article/details/77524934)
