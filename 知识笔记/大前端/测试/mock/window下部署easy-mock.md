# window下部署easy-mock

> [参考](https://blog.csdn.net/wxj_ios/article/details/84749700)

## 前置环境

	这个基本环境是nodejs负责管理项目，mongodb作为数据库存在，Redis用作数据缓存

#### 安装node.js

> [nodejs安装](知识笔记/大前端/nodejs/nodejs开发/nodejs入门.md)

#### 安装配置mongodb

> [参考](https://blog.csdn.net/heshushun/article/details/77776706)


#### 安装Redis

> [参考](http://www.runoob.com/redis/redis-install.html)

## 安装easy-mock

#### 安装两个库

	守护运行

```bash
npm i -g cross-env pm2
```

#### 拉取项目运行

```bash
git clone https://github.com/easy-mock/easy-mock.git
cd easy-mock
cnpm install
```

**直接运行**

```bash
npm run dev
```

**打包运行**

```bash
npm run build

cross-env NODE_ENV=production pm2 start app.js
```

