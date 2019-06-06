# Vue插件制作

	插件通常用来为 Vue 添加全局功能

> [参考官网](https://cn.vuejs.org/v2/guide/plugins.html)

## 插件说明

#### 插件的功能范围

	插件的功能范围没有严格的限制

**一般有下面几种**：

1. 添加全局方法或者属性。如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)

2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)

3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)

4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。

5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)


## 插件使用

#### 通过全局方法 Vue.use() 使用插件

	这需要在调用 new Vue() 启动应用之前完成


```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

> 就这样就能引入插件，当然也可以传参

```js
Vue.use(MyPlugin, { someOption: true })
```


#### 包装插件

	包装的插件需要一个 install 的方法将插件装载到 Vue 上

> [参考](https://segmentfault.com/a/1190000014991578)

**Vue.use()**

	如果查看Vue.use()源码我们就可以发很直观的看到Vue.use()这个方法调用了plugin.install方法处理插件

```js
function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}
```

###### 简单实例

**config.js**

```js
export const typeConfig = {
  1: "type one",
  2: "type two",
  3: "type three"
}
```

> 参考[mixin案例](知识笔记/大前端/面试题/网上真实面试题.md)实现插件功能

**muPlugin.js**

```js
import { typeConfig } from "./config"

myPlugin.install = (Vue) => {
  Vue.mixin({
    filters: {
      $_filterType: (value) => {
        return typeConfig[value] || "type undefined"
      }
    }
  })
}
export default myPlugin
```

> 这里封装了一个实现状态码转义的过滤器功能，这就是一个小小的插件了。
> 只要将我们的状态码转义过滤器放入了所有的 Vue 实例中，在 .vue 的模板文件中，我们就可以使用 {{ typeStatus | $_filterType }} 来进行状态码转义了

## 插件开发


