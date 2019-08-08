# 初识D2Admin框架

## 概述

> [GitHub](https://github.com/d2-projects/d2-admin) | [官方文档](https://doc.d2admin.fairyever.com/) | [官方示例](https://d2admin.fairyever.com/#/index)

#### 什么是D2Admin？

	D2Admin框架 - 基于 vue.js 和 ElementUI 的管理系统前端解决方案

* 基于vue cli 3.0以上的一个(中)后台管理系统开源框架

* 是对ElementUI框架的继承和拓展，二次封装，实现代码更简短，实现效果更好

###### D2Admin功能

	使用 vue-cli3 构建
	首屏加载等待动画
	五款主题
	内置 UEditor 富文本编辑器
	详细的文档
	登录和注销
	分离的路由和菜单设置
	可折叠侧边栏
	多国语
	富文本编辑器
	Markdown 编辑器
	全屏
	Fontawesome 图标库
	图标选择器
	自动注册 SVG 图标
	模拟数据
	剪贴板封装
	图表库
	时间日期计算工具
	导入 Excel （ xlsx + csv ）
	数据导出 Excel （ xlsx + csv ）
	数据导出文本
	数字动画
	可拖拽调整大小的区块布局
	可拖拽调整大小和位置的网格布局
	开箱即用的页面布局组件
	加载并解析 markdown 文件
	GitHub 样式的 markdown 显示组件
	markdown 内代码高亮
	为 markdown 扩展了百度云链接解析和优化显示
	右键菜单组件
	自定义滚动条和滚动控制
	公用样式抽离，方便的主题定制
	支持临时菜单配置
	系统功能展示模块 1.1.4 +
	多标签页模式 1.1.4 +
	美化滚动条 1.1.4 +
	json view 1.1.4 +
	cookie 封装 1.1.5 +
	多标签页全局控制 API 1.1.5 +
	菜单全局控制 API 1.1.5 +
	多标签页关闭控制支持右键菜单 1.1.10 +
	模块化全局状态管理 1.2.0 +
	多种数据持久化方式：区分用户，区分路由，页面数据快照功能 1.2.0 +
	支持跳出外部链接的菜单系统 1.2.0 +
	支持菜单 svg 图标 1.3.0 +
	日志记录和错误捕捉 1.3.0 +
	全局菜单搜索 1.3.0 +
	自定义登录重定向 1.3.0 +
	切换全局基础组件尺寸 1.4.0 +
	页面载入进度条 1.4.1 +
	自适应的顶部菜单栏 1.4.7 +
	数据导出 xslx 时支持合并单元格 1.5.4 +

#### 什么是D2-Crud？

	D2-Crud是一套基于Vue.js 2.2.0+和Element 2.0.0+的表格组件

> [官方文档](https://doc.d2admin.fairyever.com/zh/ecosystem-d2-crud/#%E4%BB%8B%E7%BB%8D)

* D2-Crud 将 Element 的功能进行了封装(表格常用操作封装)，并增加了表格的增删改查、数据校验、表格内编辑等常用的功能

> 大部分功能可根据配置的json实现，大大简化了开发流程

###### D2-Crud组件的功能

* 继承了 Element 中表格所有功能

* 新增表格数据

* 修改表格数据

* 删除表格数据

* 使用 Element 中的组件渲染表格内容和表单内容

* 表单校验

* 表格内编辑

* 渲染自定义组件

#### 项目结构

``` bash
├─ build
├─ config
├─ docs // 文档
├─ src
│  ├─ assets // 资源
│  │  ├─ icons
│  │  ├─ image
│  │  ├─ library
│  │  └─ style
│  ├─ components // 组件
│  │  ├─ charts
│  │  ├─ core
│  │  └─ demo
│  ├─ i18n // 多国语
│  ├─ menu // 菜单，header标签和左侧目录
│  ├─ mock // 模拟数据
│  ├─ pages // pages/views 页面代码位置
│  ├─ plugin // 插件：这里包括elementUI、功能插件(axios请求过滤封装)
│  ├─ router // 路由
│  ├─ store // vuex，全局状态管理和数据持久化
│  ├─ utils
│  ├─ App.vue
│  └─ main.js
├─ static // 静态资源
├─ .babelrc
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitattributes
├─ .gitignore
├─ .postcssrc.js
├─ LICENSE
├─ README.md
├─ deploy.sh
├─ design.sketch // 设计文件
├─ index.html
└─ package.json
```

#### 安装与使用

## 功能认识

#### vuex

#### 路由

#### CRUD图表

#### 权限控制

* 第一步，在 mock 中添加用户信息，以及不同的用户对应的不同的权限，并保存至本地的sessionStorage中

* 第二步，在 src/API 中定义调用 mock 中 API 的接口，取到用户信息

* 第三步，在 router/index.js 中添加钩子函数

* 第四步，在 store 中根据权限处理数据

* 第五步，渲染页面后，即可看到当前用户具体有哪些操作权限

#### 数据持久化

	D2Admin 数据持久化依赖浏览器的 LocalStorage，使用 lowdb API 加自己的取值包装实现了便捷的的操作和取值方法，通过不同的接口可以访问到持久化数据不同的内容
	例如不同用户独有的存储区域，系统存储区域，公用存储，根据路由自动划分的存储区域等

> [官网：数据持久化](https://doc.d2admin.fairyever.com/zh/sys-db/#%E6%80%BB%E8%A7%88)

#### 请求封装

	看项目结构就知道，D2Admin对axios有自己的封装格式，这里看看D2Admin推荐的获取数据方式

* 首先先要知道Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中：[axios入门](知识笔记/大前端/HTTP/请求/axios入门.md)

###### 设置接口地址

* 默认请求地址在`d2-admin/.env`

``` bash
VUE_APP_API=/api/
```

> 也就是会在任何请求接口前加上`/api/`

	例如我们访问 /demo/a 时实际去访问 /api/demo/a

###### 区分不同环境设置接口地址

	这是运行在不同开发环境下使用不同的接口请求地址：d2-admin/.env.development

``` bash
VUE_APP_API=/api-dev/
```

> 这就可以实现开发环境和正式环境有不同的请求地址了(虽然麻烦，但更灵活)

	开发环境访问 /demo/a 时实际去访问 /api-dev/demo/a

###### 通用配置

	这里意思在开发项目前应该做点配置修改，例如针对项目需求对请求封装处理做调整

**修改`d2-admin/src/plugin/axios/index.js`下的设置**

* 默认设置需要遵循固定的数据返回格式

``` js
{
	// 和后台约定的状态码
	code: 0,
	// 后台返回请求状态信息
	msg: '返回信息',
	// data 内才是真正的返回数据
	data: {
		list: [
		...
		]
	}
}
```

* 在响应拦截器中处理完数据后将会返回

``` js
{
	list: [
		...
	]
}
```

* 业务错误处理

	当发生错误时返回的数据示例

``` js
{
	// 和后台约定的状态码
	code: 'unlogin',
	// 后台返回请求状态信息
	msg: '用户没有登录'
}
```

* 响应拦截器

	如果要针对指定错误进行指定统一处理，可以在响应拦截器做拦截判断

``` js
service.interceptors.response.use(
  response => {
    // 成功返回数据，在这里判断和后台约定的状态标识
  }
)
```

> 如果需要针对某个 http 错误指定处理方法，应该在响应拦截器中第二个参数中添加对应的代码

``` js
service.interceptors.response.use(
  response => {},
  error => {
    // 发生 http 错误，在这里判断状态码
  }
)
```


> 一般前后端后需要统一接口请求和返回的格式，包括状态码等等，所以我们可以针对需求做微调

* 非 http 状态

	在默认的设置中，如果我们的接口没有返回 code 字段，将不会进行状态判断，直接返回 axios 请求返回的数据(也就是拦截器判断没有code字段就会直接返回数据，而不继续进行拦截)

``` js
{
  list: [
    // 数据
  ]
}
```

###### 设计API

	假设我们有一个返回数据的 API 接口，想访问它，我们首先应该在 d2-admin/src/api 文件夹内创建合适的文件目录

**例如**

* d2-admin/src/api/demo/business/table/1/index.js，这个文件中应该导出一个或者多个请求

``` js
import request from '@/plugin/axios'

export function BusinessTable1List (data) {
  return request({
    url: '/demo/business/table/1',
    method: 'post',
    data
  })
}
```

* 按照上面方式创建API后，我们需要页面中石油API获取数据

``` js
// <script>
import { BusinessTable1List } from '@/api/demo/business/table/1'
export default {
  methods: {
    handleSubmit (form) {
		// 这个就是从API import出来的一个接口请求，而不是直接调用axios
		BusinessTable1List({
			name: ''
		}).then(res => {
          // 返回数据
        }).catch(err => {
          // 异常情况
        })
    }
  }
}
// </script>
```

> 这样实现接口请求的话，我们需要维护好这个API，也就是要设计好API文件结构

###### 跨域问题

	关于前后端接口跨域问题，可以直接在 d2-admin/vue.config.js 配置本地代理

``` js
devServer: {
  proxy: {
    '/api': {
      target: 'http://47.100.186.132/your-path/api',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

> 意思是请求 /api/login 时转发到 http://47.100.186.132/your-path/api/login

#### cli 和 webpack 配置

* 关于`webpack配置`就是直接在`vue.config.js`进行插件颗粒化配置，配置简短也不难

* 重点还有国际化配置之类的

## 应用



> 参考：[D2Admin基本使用](https://www.cnblogs.com/izbw/p/11077815.html) | [vue-d2admin-axios异步请求登录，先对比一下Jquery ajax, Axios, Fetch区别](https://www.cnblogs.com/landv/p/11091450.html) | [vue-d2admin前端axios异步请求详情](https://cloud.tencent.com/developer/article/1454682)
