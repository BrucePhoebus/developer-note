/*
 * @Description: 实现Promise
 * @Date: 2021-05-08 00:41:55
 * @LastEditors: 郑烨锟
 * @LastEditTime: 2021-05-08 01:28:09
*/
// 首先定义三个状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class newPromise {
	/*
		构造函数
		callback 回调函数，接收resolve和reject对象给使用者回调处理
	*/
	constructor (callback) {
		// 变量设置，控制状态
		this.state = PENDING;
		// resolve成功存储的信息
		this.success = null;
		// reject失败存储的异常信息
		this.fail = null;

		// 定义resolve函数
		const resolve = value => {
			if (this.state === PENDING) {
				this.success = value;
				this.state = FULFILLED;
			}
		}

		// 定义reject函数
		const reject = value => {
			if (this.state === PENDING) {
				this.fail = value;
				this.state = REJECTED;
			}
		}

		// callback可能出现异常，需要捕获
		try {
			callback(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled, onRejected) {
		if (this.state === FULFILLED) {
			onFulfilled(this.success)
    }
    if (this.state === REJECTED) {
			onRejected(this.fail)
    }
	}
}

const mp = new newPromise((resolve, reject)=> {
	resolve('******* i love you *******');
})
mp.then((suc)=> {
	console.log(11111, suc);
}, (err)=> {
	console.log('****** 你不爱我了*******', err)
})
