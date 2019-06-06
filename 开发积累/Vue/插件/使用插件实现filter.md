# 使用插件实现filter

## 在v-html中的使用filter

	希望根据不同状态码显示不同的icon图标

> 这个就不同于[这里](知识笔记/大前端/Vue/Vue插件制作.md)的文本过滤了，那里简单的使用 {{ styleStatus | $_filterStyleStatus }} 是利用 v-text 进行渲染，若碰到需要渲染 html 标签就头比较麻烦了

#### 按照朴素的写法

```js
...
<span v-if="item.iconType === 1" class="icon icon-up"></span>
<span v-if="item.iconType === 2" class="icon icon-down"></span>
<span v-if="item.iconType === 3" class="icon icon-left"></span>
<span v-if="item.iconType === 4" class="icon icon-right"></span>
...
```

> 我们可以很明了的看出这个的作用，但无疑太lol了

#### 优雅的实现

	这里选择用插件实现过滤器，使用起来很清爽，看起来档次都是不一样的

**config.js**

	在 config.js 文件中定义一个状态码对应对象，这里将其对应的内容设为 html 段落

```js
export const iconStatus = {
  1: "<span class='icon icon-up'></span>",
  2: "<span class='icon icon-down'></span>",
  3: "<span class='icon icon-left'></span>",
  4: "<span class='icon icon-right'></span>"
}
```

**filter.js**

	过滤器实现状态转义

```js
import { iconStatus } from "./config"
export default {
  $_filterIcon: (value) => {
      return iconStatus[value] || "icon undefined"
  }
}
```


**main.js**

	在 main.js 中引入我们的 filters 方法表示全局注册

```js
import Vue form 'vue'
import filter from "./filters"
Vue.mixin(filter)
```

> 如果按需引入，可以直接在需要的vue模版组件中使用，使用方法一样

**`重点`：使用**

	在模板文件中需要渲染的地方，使用 v-html 来进行渲染

```js
<span v-html="$options.filters.$_filterIcon(item.iconType)"></span>
```

> [$options API](https://cn.vuejs.org/v2/api/#vm-options)
