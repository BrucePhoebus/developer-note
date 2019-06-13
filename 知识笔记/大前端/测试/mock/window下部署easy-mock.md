# window下部署easy-mock

> [参考](https://blog.csdn.net/wxj_ios/article/details/84749700)

## 前置环境

	这个基本环境是nodejs负责管理项目，mongodb作为数据库存在，Redis用作数据缓存

#### 安装node.js

> [nodejs安装](知识笔记/大前端/nodejs/nodejs开发/nodejs入门.md)

#### 安装配置mongodb

> [参考步骤](https://blog.csdn.net/heshushun/article/details/77776706)

**验证运行成功**

```js
访问地址：http://localhost:27017
```

#### 安装Redis

> [参考](http://www.runoob.com/redis/redis-install.html)

> [Redis-x64-3.2.100.zip](https://github.com/microsoftarchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.zip)

	加压缩找个位置放在即可

**根目录下执行运行命令**

```bash
redis-server.exe redis.windows.conf
```

**验证安装**

```bash
redis-cli.exe -h 127.0.0.1 -p 6379

set myKey abc

get myKey
```

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

**访问地址**

http://localhost:7300/

> 具体路径等配置要改可以修改config/default.json文件

!> 注：运行easy-mock项目要保证mongodb数据库和redis服务可用且配置与easy-mock项目配置对应(一般不用改)