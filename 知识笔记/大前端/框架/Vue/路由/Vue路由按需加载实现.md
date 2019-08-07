# Vue路由按需加载实现

## 概述

#### 为什么路由需要按需加载(懒加载)？

	懒加载也叫延迟加载，意思是在需要的时候进行加载

* 以前我们在Vue项目中，一般直接使用`import`导入组件到`router.js`中，这样直接导入的方面会在`webpack打包`的时候出现比较大的问题：所有页面打包成一个文件，这样页面一多，文件就大了，加载就比较慢，延时过长

* 其次还需要异步按需加载，意思是用到的时候加载这个路由组件相关的东西，而不是一股脑所有东西都加载到一个页面，这样十分浪费性能

#### 解决方案

#### require.ensure()

	这是webpack提供的方法，可以实现按需加载
	并且我们可以将多个相同类的组件打包成一个文件，只要给他们指定相同的chunkName即可

``` js
{
	path: '/promiseDemo',
	name: 'promiseDemo',
	component: r => require.ensure([]，() => r(require('../components/promiseDemo'))，'demo')
},
{
	path: '/hello',
	name: 'Hello',
	// component: Hello
	component: r => require.ensure([]，() => r(require('../components/Hello'))，'demo')
}
```

#### Vue异步组件技术(vue-router懒加载)

	这种方法可以实现按需加载，并且一个组件会打包成一个js文件

``` js
{
	path: '/promiseDemo',
	name: 'promiseDemo',
	component: resolve => require(['../components/promiseDemo']，resolve)
}
```

#### ES的import()

	这样定义可以实现被Webpack自动代码分割的异步组件

``` js
const Foo = () => import('./Foo.vue')
```

> 一般如果不设置每个组件都会打包成一个js文件，但是通过一些命名或插件配置把多个组件按一定规则打包到一个文件

``` js
// 这个是把该路由下的所有组件都打包在一个文件中 
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```

> 一般需要`babel`的`syntax-dynamic-import`插件配合使用

#### 最优懒加载方案

###### 方案一：路由页面以及路由页面中的组件全都使用懒加载

* 优点

	* 最大化实现按需加载
	* 团队开发不会因为实现不同造成资源验证浪费

* 缺点

	* 当一个页面中嵌套多个组件时将发送多次的http请求，可能会造成网页显示过慢且渲染参差不齐的问题

###### 方案二：路由页面使用懒加载，而路由页面中的组件按需进行懒加载

	即如果组件不大且使用不太频繁，直接在路由页面中导入组件，如果组件使用较为频繁使用懒加载

* 优点

	* 减少页面http请求
	* 页面现实效果较好

* 需要团队交流对各个组件进行分类

###### 方案三：路由页面使用懒加载，在不特别影响首页显示延迟的情况下，根页面合理导入复用组件，再结合方案2

* 优点

	* 合理解决首页延迟显示问题
	* 最大化减少http请求的同时，其它路由页面显示效果也良好

* 缺点

	统一需要团队交流确认组件分类

## 应用

#### 常见懒加载实现

* 场景1：路由配置

``` js
export default new Router({
    routes: [
        {
            mode: 'history',
            path: '/my',
            name: 'my',
            component:  resolve => require(['../page/my/my.vue']，resolve),	// 这就算懒加载了
        },
    ]
})
```

* 场景2：组件中配置

``` js
components: {
	historyTab: resolve => {require(['../../component/historyTab/historyTab.vue']，resolve)},	// 这也算懒加载
	//historyTab: () => import('../../component/historyTab/historyTab.vue')
}
```

* 场景3：全局注册

``` js
Vue.component('mediaHeader'，() => {
    System.import('./component/header/header.vue')
})
```

#### 异步路由自定义配置

	添加路由加载状态，优化用户体验

* 声明一个基于Vue动态组件工厂函数来返回一个Promise对象

``` js
/**
 * 处理路由页面切换时，异步组件加载过渡的处理函数
 * @param  {Object} AsyncView 需要加载的组件，如 import('@/components/home/Home.vue')
 * @return {Object} 返回一个promise对象
 */
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,
    // 异步组件加载时使用的组件
    loading: require('@/components/public/RouteLoading.vue').default,
    // 加载失败时使用的组件
    error: require('@/components/public/RouteError.vue').default,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 10000
  });
  return Promise.resolve({
    functional: true,
    render (h，{ data，children }) {
      return h(AsyncHandler，data，children);
    }
  });
}
```

``` js
routes: [
    {
        path: '/helloWorld',
        name: 'helloWorld',
        component: () => lazyLoadView(import('@/components/helloWorld'))
    }
]
```

## 问题与解决

#### 多次进出同一个异步加载页面是否会造成多次加载组件

	不会

* 首次需要用到组件的时候浏览器会异步请求加载组件，但是第一次加载完就会被浏览器缓存起来，方便再次调用

#### 在多个地方使用同一个异步组件时是否造成多次加载组件

	同样不会，因为此时组件已被缓存

#### 如果在两个异步加载的页面中分别同步与异步加载同一个组件时是否会造成资源重用？

	会，会造成资源重用

``` js
// a页面
import historyTab from '../../component/historyTab/historyTab.vue';
export default {
    components: {
        historyTab
    },
}

// b页面
export default {
    components: {
        historyTab: resolve => {require(['../../component/historyTab/historyTab.vue']，resolve)},	// 懒加载
    },
}
```

> a页面中会嵌入historyTab组件的代码，b页面中的historyTab组件还是采用异步加载的方式，另外打包chunk(可以自己打包试试)

**问题解决方案**

	组件开发时， 如果根页面没有导入组件的情况下，而是在其他异步加载页面中同时用到组件， 那么为实现资源的最大利用，在协同开发的时候全部人都使用异步加载组件(统一规范)

#### 在异步加载页面中载嵌入异步加载的组件时对页面是否会有渲染延时影响？

	会

* 异步加载的组件将会比页面中的其它元素滞后显示，页面出现闪现问题

**问题解决方案**

	在首次加载组件的时候会有加载时间，出现页面滞后，所以需要合理的进行页面结构设计， 避免首次出现跳闪现象




> 参考：[vue 动态路由按需加载的三种方式](https://www.cnblogs.com/tiangeng/p/10076585.html) | [动态组件 & 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html) | [VUE2组件懒加载浅析](https://www.cnblogs.com/zhanyishu/p/6587571.html)
