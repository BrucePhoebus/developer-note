# axios入门

	基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用

## 概述

#### 功能特性

1. 在浏览器中发送 XMLHttpRequests 请求

2. 在 node.js 中发送 http请求

3. 支持 Promise API

4. 拦截请求和响应

5. 转换请求和响应数据

6. 自动转换 JSON 数据

7. 客户端支持保护安全免受 XSRF 攻击

8. 取消请求

## 安装使用

#### 引入方式

```js
// 利用npm安装 
$ npm install axios	// 国外镜像
$ cnpm install axios	// 淘宝镜像

// 利用bower安装
$ bower install axios

// VUE引入
import axios from 'axios';	// 这个一般前提也是npm安装

// 直接利用cdn引入
<script src="https:/*unpkg.com/axios/dist/axios.min.js"></script>
```

#### 简单使用

**GET请求**

```js
/* 向具有指定ID的用户发出请求 */
axios.get('/user?ID=12345')
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });

/* 也可以通过 params 对象传递参数*/
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });
```

**POST请求**

```js
axios.post('/user', {
    firstName: 'Phoebus',
    lastName: 'Z'
  })
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });
```

#### 复杂应用

**多个并发请求**

```js
functiongetUserAccount(){
  return axios.get('/user/12345');
}
functiongetUserPermissions(){
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
    /* 两个请求现已完成 */
  .then(axios.spread(function(acct, perms){

  })
);
```

## 请求配置

	axios请求中只有url是必需的。如果未指定方法，请求将默认为GET。
	比如请求头，baseURL，一般我们都是封装，实现各种配置

**参考配置**

```js
// config
import Qs from 'qs'
{
  // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '/user',

  // 请求方法同上
  method: 'get', // default
  // 基础url前缀
  baseURL: 'https:// some-domain.com/api/',
　　
　　　　
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
　　data = Qs.stringify({});
    return data;
  }],

  transformResponse: [function (data) {
    // 这里提前处理返回的数据

    return data;
  }],

  // 请求头信息
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // parameter参数
  params: {
    ID: 12345
  },

  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {
    firstName: 'Fred'
  },

  // 设置超时时间
  timeout: 1000,
  // 返回数据类型
  responseType: 'json', // default

}
```

**配置后使用起来就方便很多**

```js
axios.post(url,{},config)
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
// axios请求返回的也是一个promise,跟踪错误只需要在最后加一个catch就可以了。
// 下面是关于同时发起多个请求时的处理

axios.all([get1(), get2()])
  .then(axios.spread(function (res1, res2) {
    // 只有两个请求都完成才会成功，否则会被catch捕获
  }));
```

**当然，其实我们项目中一般会选择全局配置**

```js
axios.defaults.baseURL = 'https:// api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 当然还可以这么配置
var instance = axios.create({
  baseURL: 'https:// api.example.com'
});
```
