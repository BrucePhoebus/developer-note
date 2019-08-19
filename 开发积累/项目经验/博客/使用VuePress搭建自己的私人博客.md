<!--
 * @Description: 使用VuePress搭建自己的私人博客
 * @Date: 2019-08-16 09:55:00
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-19 14:19:44
 -->
# 使用VuePress搭建自己的私人博客

## 前言

> [VuePress官方文档](https://vuepress.vuejs.org/zh/) | [Github](https://github.com/vuejs/vuepress)

#### VuePress是什么？

* VuePress是以`Vue驱动`的`静态网站生成器`，是一个由Vue、Vue Router和webpack驱动的`单页应用`

* 在VuePress中我们可以使用Markdown书写文档，然后生成对应的静态网页

* 每一个由VuePress生成的页面都带有预渲染好的HTML，也因此具有非常好的加载性能和搜索引擎优化

* 一旦页面被加载，Vue将接管这些静态内容，并将其转换成一个完整的单页应用，其他的页面则会只在用户浏览到的时候才按需加载

> 因为是生成静态网页，所以SEO比较好；因为用Vue管理，所以交互也不错，并且页面更新加载得到了优化，也就是会比较快(相对GitBook)；最后它以内容为中心，也就是最重要是适用Markdown实现我们想要的内容，方便项目文档等实现，这也是初衷。

#### VuePress相比其它技术的优劣

###### Nuxt

* VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

###### Docsify / Docute

* 这两个项目同样都是基于 Vue，然而它们都是完全的运行时驱动，因此对 SEO 不够友好

* 如果我们并不关注 SEO，同时也不想安装大量依赖，它们仍然是非常好的选择！

###### Hexo

	Hexo 一直驱动着 Vue 的文档。

* Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，而我们十分希望能够好好地利用 Vue 来处理我们的布局和交互

* 同时，Hexo 的 Markdown 渲染的配置也不是最灵活的。

###### GitBook

* GitBook 最大的问题在于当文件很多时，每次编辑后的重新加载时间长得令人无法忍受。

* 它的默认主题导航结构也比较有限制性，并且，主题系统也不是 Vue 驱动的。

* GitBook 背后的团队如今也更专注于将其打造为一个商业产品而不是开源工具。

###### 总结

* 如果我们关注`内容`、关注`交互`、关注`SEO`，同时它灵活而又简单，轻快而且支持`github托管`，一般来说VuePress就是我们目前最好的选择

* 当然这个还是需要看需求场景，以为很多场景使用`Docsify`等也是能满足并解决问题的，所以着重点还是在于业务需求，但是如果不清除的话，`VuePress`无疑是个首选

#### VuePress搭建博客的流程

###### 1. 环境搭建/安装

``` bash
# 全局安装
yarn global add vuepress 
# 或者：
npm install -g vuepress
```

###### 2. 创建项目

``` bash
# 创建项目目录
mkdir project
cd project

# npm管理初始化
yarn init -y # 或者 npm init -y

# 新建docs文件夹：docs文件夹作为项目文档根目录，主要放置Markdown类型的文章和.vuepress文件夹
mkdir docs

# docs下创建.vuepress目录：主要用于存放VuePress相关的文件
cd docs
mkdir .vuepress

# .vuepress下创建config.js：config.js是VuePress必要的配置文件，它导出y一个javascript对象
cd .vuepress
touch config.js

# .vuepress下创建public文件夹：此文件夹主要放静态资源文件，例如favicons和 PWA的图标
mkdir public

# 最后项目结构
project
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

###### 3. 配置(重点)

**package.json配置**

	这个主要是修改npm命令

``` js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",	// 本地运行
    "docs:build": "vuepress build docs"	// 打包生成静态文件
  }
}
```

**比较基础和重要的config.js配置**

	主要配置包括网站的标题、描述等基本信息，以及主题的配置

``` js
module.exports = {	
    title: '个人主页', 	// 网站标题
    description: '我的博客',	// 网站描述
    head: [	// 额外的需要被注入到当前页面的HTML"head"中的标签，其中路径的"/"就是public资源目录
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ]
}
```

**主题配置config.js**

``` js
module.exports = {
	// ...
    themeConfig: {
        nav: [	// 导航栏配置，此配置主要用于配置导航栏的链接
            {
                text: '主页', link: '/',	// 主页这里默认项目根目录下的README.md
            },
            {
                text: '博文',
                items: [
                    {text: 'Web', link: '/web/'}
                ]
            },
            {text: '关于', link: '/项目笔记/'},
            {text: 'Github', link: 'https://github.com/BrucePhoebus'},
        ],
        sidebar: {	// sidebar：侧边栏配置，Markdown的.md文件
            '/项目笔记/': [	// docs文件夹下的 项目笔记 目录，也表示路由
                '',	// 表示项目笔记默认主页为项目笔记下的README.md
                '使用VuePress搭建自己的私人博客',	// 项目笔记目录下的某个文件，会在选择项目笔记的时候在侧边栏出现
            ],
            '/web/': [
                '',
                '什么是web'
            ],
        },
        sidebarDepth: 2,	// 嵌套的标题链接深度，默认的深度为1
        lastUpdated: 'Last Updated',	// 最后更新时间
    },
}
```

``` bash
# 参考项目目录
project
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
│	└── 博文
│       ├── README.md
│       └── 什么是web.md
│	└── 项目笔记
│       ├── README.md
│       └── 使用VuePress搭建自己的私人博客.md
└── package.json
```

> 这个时候配置好就能运行了：`npm run docs:dev`

!> 还可以设置PWA开启serviceWorker离线缓存和自定义页面(首页)

###### 4. 部署上线

	由于构建的时候生成静态页面，所以将dist文件夹中的内容可以部署在gitHub的pages或者coding的pages都可以，比较简单的实现是直接使用脚本部署到github上去

* 在project下创建deploy.sh

``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:BrucePhoebus/BrucePhoebus.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
* 设置package.json

``` bash
{
    "scripts": {
    	"deploy": "bash deploy.sh"
    },
}
```

> 运行`npm run deploy`即可自动构建部署到github上



#### VuePress使用场景(还有哪些用途？)


> 参考：[VuePress从零开始搭建自己专属博客](https://segmentfault.com/a/1190000015237352)
