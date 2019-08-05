# 公共组件之header实现

## 移动端header组件实现

#### 简单的实现

```html
<template lang="html">
	<div class="head-box" :class="{ sticky: checkIOS }">
		<header class="head-box-inner" :class="{ sticky: checkIOS }">
			<!-- <div class="title-icon">
				<van-icon name="arrow-left" left-text="返回" color="#1989FA" size="20px" @click="goBack"/>
			</div> -->
			<div class="back-btn">
				<!--<i class="el-icon-arrow-left" @click="goBack()"></i>-->
			</div>
			<div class="title">{{ title }}</div>
		</header>
		<div v-if="!checkIOS" class="empty-block"></div>
	</div>
</template>

<script>
	import { isIOS } from '../../utils/ua'

	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				checkIOS: false,
			}
		},
		mounted() {
			this.checkIOS = isIOS()
		},
		methods: {
			goBack() {
				this.$router.back()
			},
		},
	}
</script>

<style lang="css" scoped>
	.head-box {
		position: static;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		z-index: 2001;
	}

	.head-box.sticky {
		position: -webkit-sticky;
		position: sticky;
	}

	.head-box-inner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		background-color: #fff;
		line-height: 1.2rem;
		font-size: 0.405rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		z-index: 2001;
	}

	.head-box-inner.sticky {
		position: relative;
	}

	.head-box-inner .back-btn {
		position: absolute;
		top: 0;
		left: 0;
		padding-left: 0.225rem;
		width: 0.3rem;
		height: 0.9rem;
		font-size: 0.6rem;
		z-index: 1;
	}

	.head-box-inner .back-btn .el-icon-arrow-left {
		color: #252525;
	}

	.head-box-inner .title {
		text-align: center;
		font-size: 16px;
		color: #252525;
	}

	.empty-block {
		height: 1.2rem;
	}

	.title-icon {
		position: absolute;
		margin-top: 7px;
		margin-left: 5px;
	}

</style>
```

**ua.js**

	移动端实现IOS和安卓判断

```js
export const isWx = () => {
  const ua = window.navigator.userAgent;
  return /micromessenger/i.test(ua);
};

export const isIOS = () => {
  const ua = window.navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

export const isAndroid = () => {
  const ua = window.navigator.userAgent;
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
};
```

> 这个主要是页面头显示页面标题，可以添加个返回图标、面包屑导航、回到首页等功能

#### 组件中使用

```html
<template>
	<page-head title="页面标题"></page-head>
</template>

<script>
	import Head from './head.vue'

	export default {
        components: {
            'page-head': Head,
        }
	}
</script>
```
