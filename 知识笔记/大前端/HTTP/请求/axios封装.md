# axios封装

## 移动端axios封装实现

#### js封装处理

```js
import axios from 'axios';
import moment from 'moment';
// cookie解析模块
import Cookies from 'js-cookie';
// 登出接口
import {
    LOG_OUT
} from '../constants/index.js';

let activeId = sessionStorage.getItem('activeId');
// 新增request请求
const REQUEST_TIMEOUT = 300000;

const BASE_URL = '';	// 抽取公共部分，request请求需凭借指定接口路径

const HEADERS = {
    'X-Requested-With': 'XMLHttpRequest',
    'x-csrf-token': Cookies.get('csrfToken') || undefined,
};

// 添加请求拦截器
var axiosFilter = function() {
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        // 拦截post请求
        if (config.method === 'post') {
            let paramStr = config.data.strJson;
            if (paramStr != null) {
                var toJSON = JSON.parse(paramStr);
                var reg = /(^\s*)|(\s*$)/g;
                for (var key in toJSON) {
                    if (toJSON[key] !== undefined && typeof toJSON[key] == 'stirng') {
                        toJSON[key] = toJSON[key].replace(reg, '');
                    }
                }
                config.data.strJson = JSON.stringify(toJSON);
            }
        } else if (config.method === 'get') {
            // 拦截get请求
            /* if (config.params.strJson != null) {
              var toJSON = JSON.parse(config.params.strJson);
              var reg = /^\s*(.*?)\s*$/;
              for (var key in toJSON) {
            	toJSON[key].replace(reg, "");
              }
              config.params.strJson = JSON.stringify(toJSON);
            } */
        }
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
};
export const AxiosFilter = new axiosFilter();

export const request = ({
    method = 'post',
    baseURL = BASE_URL,
    timeout = REQUEST_TIMEOUT,
    headers,
    url,
    data,
    success,
    fail,
}) => {
    const defaultParams = {
        _: moment().valueOf(),
    };
    const params = data ? {
        ...defaultParams,
        ...data,
    } : defaultParams;
    axios({
            method,
            url,
            params: method === 'get' ? params : undefined,
            data: method !== 'get' ? params : undefined,
            timeout,
            baseURL,
            headers: {
                ...HEADERS,
                ...headers,
            },
        })
        .then(response => {
            success && success(response.data);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data) {
                    fail && fail({
                        msg: error.response.data.msg,
                        status: error.response.status,
                        data: error.response.data,
                    });
                } else {
                    fail && fail({
                        msg: error.message,
                        status: error.response.status,
                    });
                }
            } else {
                fail && fail({
                    msg: error.message
                });
            }
        });
};

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                if (response.data.Status == -2) {
                    window.location.href = LOG_OUT + '?activeId=' + activeId;
                } else {
                    resolve(response.data);
                }
            }, err => {
                reject(err);
            });
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                if (response.data.Status == -2) {
                    window.location.href = LOG_OUT + '?activeId=' + activeId;
                } else {
                    resolve(response.data);
                }
            }, err => {
                reject(err);
            });
    });
}
```

**constants/index.js**

	统一接口管理

```js
const BASE_URL = 'http://';
// export const BASE_URL ='' ;
export const GET_HOUSE_URL = BASE_URL + '/api/House/getFormRoomList?activeId=2'; //获取房源列表
export const GET_HOME_URL = BASE_URL + '/api/House/getProjectInfo'; //获取首页项目信息
export const GET_COLLECT_LIST = BASE_URL + '/api/Collect/getCollectList'; //获取收藏列表
export const SET_COLLECT_HOUSE = BASE_URL + '/api/Collect/setCollectHouse'; //收藏和取消收藏
export const GET_NOBUY_COLLECT = BASE_URL + '/api/Collect/getNotBuyCollectList'; //获取未购买收藏列表
export const GET_HOUSEINFO_URL = BASE_URL + '/api/House/getHouseDetail'; //获取房源详情
export const SET_COLLECT_UP_DOWN = BASE_URL + '/api/Collect/setCollectUpDowm'; //收藏上移下移
export const GET_USER_URL = BASE_URL + '/api/account/UserInfo'; //获取用户信息
export const POST_ORDER_SUBMIT = BASE_URL + '/api/Order/submitOrder'; //提交订单
export const GET_BUY_STATUS = BASE_URL + '/api/Order/QueryBuyStatus'; //是否购买
export const GET_ORDER_LIST = BASE_URL + '/api/Order/getOrderList'; //获取订单列表
export const GET_ORDER_DETAIL = BASE_URL + '/api/Order/getOrderDetail'; //获取订单详情
export const GET_ACTIVE_TIME = BASE_URL + '/api/House/getActiveDateTime'; //获取活动时间
export const GET_ACTIVE_STATS_INFO = BASE_URL + '/api/Stats/getActiveStatsInfo'; //活动分析
export const GET_USER_INFO_LIST = BASE_URL + '/api/Stats/getUserInfoList'; //客户分析列表
export const LOG_OUT = BASE_URL + '/Wechat/LogOut'; //退出
```

#### 全局注册

	在main.js中全局注册，全局使用

```js
import Vue from 'vue';
import { request, post, fetch, patch, put } from './utils/http';

Vue.prototype.$jsonp = jsonp;
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
```

> 通过Vue挂载到全局实例作为原型方法，全局都可以通过$post、$fetch调用，还有一个request请求则需要按需引入

#### 使用方式

**$post**

```js
this.$post(url, data, config).then(response => {
	// 请求成功，处理响应逻辑
}).catch(error => {
	// 请求失败，处理响应逻辑
	console.log(error);
});
```

> url为post请求地址；data是请求数据，常见请求参数有json、formdata、String等；config是请求头，常见添加请求头有header： { headers: { 'Content-Type': 'charset=UTF-8;multipart/form-data' } }，表示当前请求参数格式

**$request**

	这个请求实现跟$post差不多，都是post请求，但是request是特殊处理的post请求，它需要按需引入，会拼接配置的BASE_URL地址

```js
import { request } from '../../utils/http'

request({
	url: '/SubmitYYInfo',
	data: { strJson: JSON.stringify(value) },
	success (response) {
		// 请求成功，处理响应逻辑
	},
	fail (error) {
		// 请求失败，处理响应逻辑
		console.log(error);
	},
})
```

**$fetch**

```js
this.$fetch(url).then(response => {
	// 请求成功，处理响应逻辑
}).catch(error => {
	// 请求失败，处理响应逻辑
	console.log(error);
});
```

> url为get请求地址(一般是相对接口地址，拼接域名和端口变成全路径请求)；response是响应数据，我们一般根据响应数据做近一步逻辑处理

> 至于其它请求，个人不常用，貌似都没用过，就不说了
