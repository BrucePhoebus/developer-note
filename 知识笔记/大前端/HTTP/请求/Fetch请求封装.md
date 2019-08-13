<!--
 * @Description: Fetch请求封装
 * @Date: 2019-08-13 13:41:29
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 14:37:39
 -->
# Fetch请求封装

## 概述

#### 什么是fetch？

> 参考：<a href="#知识笔记/大前端/HTTP/请求/比较异步请求方案?id=fetch">异步请求方案之fetch</a>

#### 不封装的fetch请求写法

``` js
fetch('http://www.pintasty.cn/home/homedynamic', {
        method: 'POST',
        headers: { //header
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJVLTliZGJhNjBjMjZiMDQwZGJiMTMwYWRhYWVlN2FkYTg2IiwiZXhwaXJhdGlvblRpbWUiOjE0NzUxMTg4ODU4NTd9.ImbjXRFYDNYFPtK2_Q2jffb2rc5DhTZSZopHG_DAuNU'
        },
        body: JSON.stringify({ //参数
            'start': '0',
            'limit': '20',
            'isNeedCategory': true,
            'lastRefreshTime': '2016-09-25 09:45:12'
        })
    })
    .then((response) => response.json()) //把response转为json
    .then((responseData) => { // 上面的转好的json
        console.log(responseData);
    })
    .catch((error) => {
        console.log(error);
    })
}
```

> 很明显，有部分代码是公共部分，例如请求头的token、body的转JSON串、异常处理等，这些都是我们可以提取出来，也就是封装的

#### 封装设计

* 首先，我们一般般都会规定请求参数格式和请求头等，统一格式，这样的话我们就可以将请求参数统一封装处理和统一请求头

	* 最简单的请求参数统一就是使用JSON串对请求参数进行处理
	* 而请求头添加token和Content-Type规定请求数据格式

* 其次是对请求的异常处理和错误日志记录

	* 异常处理就比较多，一些项目也可以不定，但定了会比较好，也就是对404、500等HTTP请求异常做统一格式处理
	* 并且在出现异常的时候，将异常信息写入错误日志
	* 最后是网络异常等非HTTP异常处理，例如网络延迟等问题

## 封装方案

#### Vue实现fetch封装

###### 简单封装

``` js
// 前置拼接url
let api = '****';

// 处理promise和fetch的兼容性以及引入
require('es6-promise').polyfill();
require('isomorphic-fetch');

// 处理get请求，传入参数对象拼接
let formatUrl = obj => {
    let params = Object.values(obj).reduce((a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&` , '?');
    return params.substring(0, params.length - 1);
};

let Fetch = (url, option = {}) => {
    option.headers = option.headers || {};
    option.headers['pl'] = 'admin';

    option.headers['token'] = `${window.localStorage.getItem('token')}` ;
    const m = (option.method || '').toLocaleLowerCase();
    // get query format
    if (m == 'get') {
        if (option.query) {
            url = url + formatUrl(option.query);
        }
    }
    // 对非get类请求头和请求体做处理
    if (m === 'post' || m === 'put' || m === 'delete') {
        option.headers['Content-Type'] = option.headers['Content-Type'] || 'application/json';
        option.body = JSON.stringify(option.body);
        // option.body = qs.stringify(option.body) // 根据后台要求，有时候java请求会用qs转
    }
    return new Promise((resolve, reject) => {
        fetch(api + url, option)
            .then(response => {
                status = response.status;
                if (response.status >= 500) {
                    Fetch.systemError && Fetch.systemError('系统错误');
                }
                return response;
            })
            .then(parseJSON)
            .then(response => {
                response.status = status;
                if (response.status >= 401) {
                    if (response.state == 8888) {
                        // 登陆超时返回状态吗

                        Fetch.overTime && Fetch.overTime(response);
                    }
                    if (response.state == 6666) {
                        // 没有权限返回状态码
                    }
                }
                resolve(response);
            })
            .catch(error => {
                console.log('err', error);
                Fetch.otherError && Fetch.otherError(error.message);
            });
    });
};

created() {

    // 请求超时
    Fetch.overTime = msg => {
        // 请求超时的操作。。。。。。。
    };

    Fetch.systemError = msg => {
        // systemError操作
    };

    // other error
    Fetch.otherError = msg => {
        // otherError操作
    };
}

// response 转化
function parseJSON(response) {
    return response.json();
}

export default Fetch;
```

**main.js全局引入**

``` js
// 引入并自己封装的Fetch 方法
import Fetch from './api/fetch';
Vue.prototype.Fetch = Fetch;
```

**Vue组件中使用**

``` js
// get 使用query传入字段，其他请求使用body,这里的get和body是请求参数对象
let res = await this.Fetch('url', {
    method: 'get',
    query: ''
});

let res = await this.Fetch('url', {
    method: 'post',
    body: ''
});
```

#### Promise封装fetch请求

``` js
let common_url = 'http://192.168.1.1:8080/';  // 服务器地址：一般使用相对路径
let token = '';	// 一般获取本地缓存的token

/**
 * 让fetch也可以timeout
 * timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeout_fetch(fetch_promise, timeout = 10000) {
	let timeout_fn = null; 

	//这是一个可以被reject的promise
	let timeout_promise = new Promise(function(resolve, reject) {
		timeout_fn = function() {
			reject('timeout promise');
		};
	});

	// 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
	let abortAble_promise = Promise.race([
		fetch_promise,
		timeout_promise
	]);

	setTimeout(function() {
		timeout_fn();
	}, timeout);

	return abortAble_promise ;
}

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
function fetchRequest(url, method, params = ''){
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        "token": token  // 用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
	// console.log('request url:', url, params);  // 打印请求参数
    if(!params){   // 如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
			// 处理请求超时
	        timeout_fetch(
				fetch(common_url + url, {
					method: method,
					headers: header
				}).then((response) => response.json())
					.then((responseData) => {
						console.log('res:',url,responseData);  // 网络请求成功返回的数据
						resolve(responseData);
					})
					.catch( (err) => {
						console.log('err:',url, err);	  // 网络请求失败返回的数据        
						reject(err);
                });
        	)
		});
    } else {   // 如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
			timeout_fetch(
				fetch(common_url + url, {
					method: method,
					headers: header,
					body:JSON.stringify(params)   // body参数，通常需要转换成字符串后服务器才能解析
				}).then((response) => response.json())
					.then((responseData) => {
						console.log('res:',url, responseData);   // 网络请求成功返回的数据
						resolve(responseData);
					})
					.catch( (err) => {
						console.log('err:',url, err);   // 网络请求失败返回的数据  
						reject(err);
					});
			)
        });
    }
}
```

**index.js暴露接口**

``` js
import Fetch from './fetchRequest.js'

export default Fetch;
```

**使用**

``` js
// GET请求
fetchRequest('app/book','GET')
	.then( res=>{
		// 请求成功
		if(res.header.statusCode == 'success'){
			// 这里设定服务器返回的header中statusCode为success时数据返回成功

		}else{
			// 服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
			console.log(res.header.msgArray[0].desc);
		}
	}).catch( err=>{ 
		// 请求失败
	})

// POST请求
let params = {
    username:'admin',
    password:'123456'	// 正常密码都是加密的
}
fetchRequest('app/signIn', 'POST', params)
	.then( res=>{
		// 请求成功
		if(res.header.statusCode == 'success'){
			// 这里设定服务器返回的header中statusCode为success时数据返回成功

		}else{
			// 服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc 
			console.log(res.header.msgArray[0].desc);
		}
	}).catch( err=>{ 
		//请求失败
	})
```

> 参考：[Fetch请求封装（vue）](https://www.jianshu.com/p/489a627d4ba3) |[React Native 网络请求封装：使用Promise封装fetch请求](https://blog.csdn.net/withings/article/details/71331726)
