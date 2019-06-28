# 深入浅出Weex核心原理

## 前言

	从前，如果我们打算实现某个需求，通常需要三种程序员（IOS, 安卓，前端）写三份代码。这就带来了非常大的开发成本，所以业界也一直在探索跨平台方案——从最早的H5, Hybrid 到现在的weex, React Native。这些方案的本质目的都是，一套代码，多端运行

#### H5和Hybrid的发展

	早期H5和Hybrid方案的本质是：利用客户端App的内置浏览器（也就是`webView`）功能，通过开发前端的H5页面满足跨平台需求

> 该方案提升开发效率，同时也满足了跨端的需求。但有一个问题就是，`前端H5的性能和客户端的性能相差甚远`

#### weex的发展

	于是后来, 业界继续探索可以媲美原生体验app的方案，比如说WEEX，当然，还有react Native 和 Flutter等

> WEEX依旧采取前端H5页面进行开发，同时app在终端的运行体验不输native app。即可以保证快速响应需求，又可以保证用户体验

**那么WEEX是如何实现的？**

	本质来说，WEEX是用客户端Native的能力，去做了部分浏览器（webView）的工作

> 在2016年2月， WeexSDK 发布了v0.10.0版本，在这个版本里面，集成了`v2版本的Vue`。

**为啥是Vue 2.x 版本呢？**

	Vue 2.x加入了 Virtual-DOM 和预编译器的设计，使得该框架在运行时能够脱离 HTML 和 CSS 解析，只依赖 JavaScript；同时 Virtual-DOM 也使得 Vue 2.x 渲染成原生 UI 成为了可能。

## weex 原理探究

#### weex 整体架构

![Weex整体架构图](../../../images/移动端/Weex整体架构图.png)

###### 分析weex的大致工作流程

1. 前端开发可以写熟悉vue语法的单文件，然后打包成出来一份dist —— JS Bundle，然后部署到服务器上

2. 客户端打开某一个页面，通过网络下载JS Bundle，然后在客户端本地执行该JS Bundle

3. 客户端提供了JS的执行引擎(JSCore)用于执行远程加载到JS Bundle

4. JS执行引擎执行JS Bundle，和浏览器的过程类似，JS Bundle 的代码被执行，生成VNode 树进行patch，找出最小操作DOM节点的操作，把对DOM节点的操作转变为Native DOM API, 调用WXBridge 进行通信

5. WXBridge将渲染指令分发到native（Android、iOS）渲染引擎，由native渲染引擎完成最终的页面渲染

> 看完上述整体流程后，可以大致理解为何WEEX可以达到媲美原生的体验，因为其页面渲染并不是像H5方案一样使用浏览器的渲染能力，而是原生渲染，所以本质上渲染出来的页面就是一个native页面

###### 具体流程分析

**第一步：生成 JS bundle**

	JS bundle 是前端写好代码后打包出来的dist

> 前端同学在.vue 的单文件中，写`<template>`，`<style>`和`<script>`标签，然后把这些标签转换为JS Bundle用于部署在服务端，之后客户端会去请求这些JS Bundle

*转换示例*

	比如说，下图中左边是vue源代码，右边是打包出来到JS Bundle

![vue文件转换JS_Bundle图](../../../images/移动端/vue文件转换JS_Bundle图.png)

	右边其实就是Vue打包生成的render 函数

!> 问题是：当客户端获取到如上图右侧的js bundle后，如何进行加载、渲染以及后续的相关逻辑执行？

**第二步：WEEX SDK初始化**

	weex在真正打开一个页面之前，会先做一些准备的初始化工作，这一点有一点像微信小程序

> 在初始化阶段，WEEX SDK 会初始化几样东西

	1. 初始化js的执行环境——`js Core` 或者是 `v8`
	2. 加载`weex-vue-framework` 的代码
	3. 初始化`WXBridge`

![WeexSDK初始化图](../../../images/移动端/WeexSDK初始化图.png)

1. js的执行环境

	在初始化阶段, WEEX SDK 会准备好一个js的执行环境。因为我们是要在客户端跑js 代码的，所以需要一个js执行环境，这个执行环境类似于浏览器的v8 引擎， 在IOS 上，则是客户端自带的 js core

> 这个js执行环境，可以看成是一个在客户端上的沙盒，或者是一个虚拟机

!> 为了提升性能，js 执行环境只用在初始化的时候初始化一次，之后每个页面都无须再初始化了。也就是说不管客户端打开多少个weex页面，多个页面的 JS 都是跑在同一个js执行环境中的

2. weex-vue-framework 框架

?> weex-vue-framework 框架 是什么呢？

	我们可以把 weex-vue-framework 框架当成被改造的Vue.js。语法和内部机制都是一样的，只不过Vue.js最终创建的是 DOM 元素，而weex-vue-framework则是向原生端发送渲染指令，最终渲染生成的是原生组件

	同时，Weex为了提高Native的极致性能，做了很多优化的工作。前端优化性能时，会把业务代码和 vue.js 这类的依赖包分开打包，一个份是业务代码，一份是打包的框架依赖

> weex 把`weex-vue-framework`这类框架依赖`内置`到了`SDK`中，客户端访问Weex页面时，只会`网络请求JS Bundle`。由于JSFramework在本地，所以就减少了JS Bundle的体积，每个JS Bundle都可以减少一部分体积，从而提升了性能

3. WXBridge 通信

	WXBridge 是 weex 实现的一种 js 和 客户端通信的机制

> js 执行环境和客户端是隔离的，为了和外界客户端的世界通信，需要有一个通信的桥梁。weex 实现了 WXBridge, 主要通过 `callJS` 和 `callNative` 两个核心的方法，实现 js 代码和客户端代码`双向通信`

!> 在完成了上面的初始化之后，weex已经做好了准备，只等着下载 JS bundle 就可开始渲染页面了 😄


> 参考：[深入浅出 Weex 核心原理](https://juejin.im/post/5d14619bf265da1b6c5f8747?utm_source=gold_browser_extension&tdsourcetag=s_pctim_aiomsg) | [认识移动端跨平台开发](知识笔记/大前端/移动端/认识移动端跨平台开发.md)
