<!--
 * @Description: Vue弹窗和提示框组件实现
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-15 10:35:40
 * @LastEditTime: 2019-08-15 10:55:50
 -->
# Vue弹窗和提示框组件实现

## 实现代码

#### 重要的CSS

	实现了居中效果

``` css
p,
h4 {
    margin: 0;
}

.tip-popup {
    width: 100vw;
    width: 100%;
    height: 100vh;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.tip-popup:after {
    display: inline-block;
    content: '';
    width: 0;
    height: 100%;
    vertical-align: middle;
}

.modal {
    position: relative;
    width: 480px;
    display: inline-block;
    text-align: left;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .3);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .5);
}

.modal-header {
    color: #fff;
    background: cadetblue;
    border-radius: 6px 6px 0 0;
    padding: 15px;
    border-bottom: 1px solid #5e9fa1;
}

.modal-content div {
    padding: 15px 10px;
}

.modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
}

.btn {
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    background-color: #f7f7f7;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -moz-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -o-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -ms-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    height: 28px;
    line-height: 28px;
    padding: 0 20px;
    cursor: pointer;
    display: inline-block;
    color: #666666;
    margin-right: 5px;
    outline: none;
}

.full-confirm-btn {
    width: 100%;
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    background-color: #f7f7f7;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -moz-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -o-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -ms-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    height: 28px;
    line-height: 28px;
    padding: 0 20px;
    cursor: pointer;
    display: inline-block;
    color: #666666;
    margin-right: 5px;
    outline: none;
}

.blue {
    border: 1px solid #5e9fa1;
    background-color: #5e9fa1;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#74c4c6), to(#5e9fa1));
    background: -moz-gradient(linear, 0 0, 0 100%, from(#74c4c6), to(#5e9fa1));
    background: -o-gradient(linear, 0 0, 0 100%, from(#74c4c6), to(#5e9fa1));
    background: -ms-gradient(linear, 0 0, 0 100%, from(#74c4c6), to(#5e9fa1));
    color: #FFFFFF;
}
```

> 虽然CSS可以调整，但是像居中效果、设计色、像素级设计等还是比较基础但是很重要的，反正个人手写不了

#### 中间简单的template

``` html
<div id="app">
    <input type="button" class="btn blue" value="click hard me，呼唤神龙(弹窗)" v-if="isHidePopup" @click="isHidePopup=!isHidePopup">
	
    <!-- 弹框信息 -->
    <popup-component v-if="!isHidePopup" modal-title="温馨提示" ok-btn="确认购买" cancel-btn="去意已决" @on-ok="ok" @on-cancel="cancel">
        <div slot="modal-content">
           尊敬的用户，您购买的商品将于支付成功后3-7个工作日内发货，敬请周知。祝您购物愉快！尊敬的用户，您购买的商品将于支付成功后3-7个工作日内发货，敬请周知。祝您购物愉快！尊敬的用户，您购买的商品将于支付成功后3-7个工作日内发货，敬请周知。祝您购物愉快！
        </div>
    </popup-component>

    <!-- 提示弹框 -->
	<tip-popup-component v-if="!isHideTip" @confirm="confirm">
        <div slot="tip-popup-content">
            感谢您购买本产品
        </div>
    </tip-popup-component>
</div>
```

> 这个设计很简单，一个按钮显示弹框，一个弹框组件，一个提示框组件

#### 最重要组件js实现

###### 弹窗组件实现

``` js
/*
 props：
   modalTitle: 弹窗标题
   okBtn: 确认按钮
   cancelBtn: 取消按钮
   注意事项：传参时候使用烤串的书写方式xx-xxx
 slot:
   modal-content: 内容区域
   modal-footer： 页脚按钮区域
 methods: 
   okHandle: 触发确认on-ok自定义事件
   cancelHandle： 触发取消on-cancel自定义事件
*/
Vue.component('popup-component', {
	props: {
		modalTitle: {
			type: String,
			default: '标题区域'
		},
		okBtn: {
			type: String,
			default: '确认'
		},
		cancelBtn: {
			type: String,
			default: '取消'
		}
	},
	template: `
		<div class="tip-popup">
		   <div class="modal">
				<div class="modal-header">
				  <h4>{{ modalTitle }}</h4>
				</div>
				<div class="modal-content">
				  <div>
				    <slot name="modal-content">弹框内容区域</slot>
				  </div>
				</div>
				<div class="modal-footer">
				    <input class="btn blue" type="button" v-model="okBtn" @click="okHandle" />
				    <input class="btn" type="button" v-model="cancelBtn" @click="cancelHandle" />
				</div>
		   </div>
		</div>
	`,
	methods: {
		// 确认回调
		okHandle() {
			this.$emit("on-ok");
		},
		// 取消回调
		cancelHandle() {
			this.$emit("on-cancel");
		}
	}
})
```

> 这是最简单的实现，之所以这样写是方便写在一个`HTML页面`中(看最后面的实现)，改成`Vue页面`也简单，

``` js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
```

###### 提示框组件实现

``` js
/*
	props：
		modalTitle: 弹窗标题
		okBtn: 确认按钮
		注意事项：传参时候使用烤串的书写方式xx-xxx
	slot:
		modal-content: 内容区域
		modal-footer： 页脚按钮区域
	methods: 
		confirm: 触发确认confirm自定义事件
*/
Vue.component('tip-popup-component', {
	props: {
		modalTitle: {
			type: String,
			default: '提示'
		},
		okBtn: {
			type: String,
			default: '确认'
		}
	},
	template: `
	   	<div class="tip-popup">
			<div class="modal">
				<div class="modal-header">
				  <h4>{{ modalTitle }}</h4>
				</div>
				<div class="modal-content">
				  <div>
				    <slot name="tip-popup-content">提示内容区域</slot>
				  </div>
				</div>
				<div class="modal-footer">
				    <input class="full-confirm-btn blue" type="button" v-model="okBtn" @click="confirm" />
				</div>
		   </div>
		</div>
	`,
	methods: {
		// 确认回调
		confirm() {
			this.$emit("confirm");
		},
	}
})
```

> 这个大部分样式直接引用弹窗组件，可以单独抽离出来

###### 全局实例中逻辑实现

``` js
new Vue({
	el: "#app",
	data: {
		isHidePopup: true,
		isHideTip: true
	},
	methods: {
		// 弹框确认回调
		ok() {
			this.isHideTip = false;
		},
		// 弹框取消回调
		cancel() {
			this.isHidePopup = !this.isHidePopup;
		},
		// 提示框确认回调
		confirm() {
			this.isHideTip = true;
		}
	}
})
```

> <a href="#知识笔记/大前端/框架/Vue/Vue组件/vue弹窗和提示框组件.html" target="_blank">vue弹窗和提示框组件效果</a> | [github代码](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/框架/Vue/Vue组件/vue弹窗和提示框组件.html)
