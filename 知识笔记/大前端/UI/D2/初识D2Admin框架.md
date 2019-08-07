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

## 应用

#### 安装与使用


#### 各个功能

###### vuex

###### 路由

###### CRUD图表

###### 权限控制

* 第一步，在 mock 中添加用户信息，以及不同的用户对应的不同的权限，并保存至本地的sessionStorage中

* 第二步，在 src/API 中定义调用 mock 中 API 的接口，取到用户信息

* 第三步，在 router/index.js 中添加钩子函数

* 第四步，在 store 中根据权限处理数据

* 第五步，渲染页面后，即可看到当前用户具体有哪些操作权限

###### 数据持久化

	D2Admin 数据持久化依赖浏览器的 LocalStorage，使用 lowdb API 加自己的取值包装实现了便捷的的操作和取值方法，通过不同的接口可以访问到持久化数据不同的内容
	例如不同用户独有的存储区域，系统存储区域，公用存储，根据路由自动划分的存储区域等

> [官网：数据持久化](https://doc.d2admin.fairyever.com/zh/sys-db/#%E6%80%BB%E8%A7%88)

###### 请求封装

	看项目结构就知道，D2Admin对axios有自己的封装格式

* 

> [vue-d2admin-axios异步请求登录，先对比一下Jquery ajax, Axios, Fetch区别](https://www.cnblogs.com/landv/p/11091450.html)

###### cli 和 webpack 配置

* 关于`webpack配置`就是直接在`vue.config.js`进行插件颗粒化配置，配置简短也不难

* 重点还有国际化配置之类的

> 参考：[D2Admin基本使用](https://www.cnblogs.com/izbw/p/11077815.html)
