/*
 * @Description: 实现Promise
 * @Date: 2021-05-08 00:41:55
 * @LastEditors: 郑烨锟
 * @LastEditTime: 2021-05-08 02:21:43
 */
// 首先定义三个状态常量
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class newPromise {
	/*
		构造函数
		callback 回调函数，接收resolve和reject对象给使用者回调处理
	*/
	constructor(callback) {
		// 变量设置，控制状态
		this.state = PENDING;
		// resolve成功存储的信息
		this.success = null;
		// reject失败存储的异常信息
		this.fail = null;
		// 存储异步回调函数，解决异步执行问题
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];

		// 定义resolve函数
		const resolve = (value) => {
			if (this.state === PENDING) {
				this.success = value;
				this.state = FULFILLED;
				this.onFulfilledCallback.map((fn) => fn());
			}
		};

		// 定义reject函数
		const reject = (value) => {
			if (this.state === PENDING) {
				this.fail = value;
				this.state = REJECTED;
				this.onRejectedCallback.map((fn) => fn());
			}
		};

		// callback可能出现异常，需要捕获
		try {
			callback(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled, onRejected) {
		// 解决then回调没有传参问题
		onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (y) => y;
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: (err) => {
						throw err;
				  };

		let promise = null;
		promise = new newPromise((resolve, reject) => {
			if (this.state === PENDING) {
				this.onFulfilledCallback.push(() => {
					// 加一层异步是因为Promise本身是一个异步，属于微任务一列，执行栈执行完必须去执行它
					setTimeout(() => {
						// 拦截可能处在的异常
						try {
							let next = onFulfilled(this.success);
							this.resolvePromise(promise, next, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						try {
							let next = onRejected(this.fail);
							this.resolvePromise(promise, next, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
			}

			if (this.state === FULFILLED) {
				setTimeout(() => {
					try {
						let next = onFulfilled(this.success);
						this.resolvePromise(promise, next, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			}
			if (this.state === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.fail);
						this.resolvePromise(promise, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			}
		});

		return promise;
	}

	/*
		catch				catch方法
		onRejected
	*/
	catch(onRejected) {
		return this.then(null, onRejected);
	}

	/*
		finally				无论如何都会进行的回调
		onRejected
	*/
	finally(fn) {
		return this.then(
			(success) => {
				fn();
				return success;
			},
			(fail) => {
				fn();
				throw fail;
			}
		);
	}

	/*
		resolvePromise 拆解promise对象的内容(then可能返回promise实例)直到不再是promise对象为止，最后取普通值
		promise	上一个返回结果(Promise实例)
		next				当前返回结果
		resolve
		reject
	*/
	resolvePromise(promise, next, resolve, reject) {
		// 避免因为promise是上一个promise.then后的返回结果出现循环引用
		if (promise === next) {
			return reject(new TypeError("循环引用！"));
		}

		// 防止多次调用
		let called = false;

		// 如果x不是null、对象或函数
		if (
			next !== null &&
			(Object.prototype.toString.call(next) === "[object Object]" ||
				Object.prototype.toString.call(next) === "[object Function]")
		) {
			try {
				// next是对象或函数
				let then = next.then;

				if (typeof then === "function") {
					then.call(x, (next2) => {
						// 别人的Promise的then方法可能设置了getter等，使用called防止多次调用then方法
						if (called) return;
						called = true;

						// 成功值next2有可能还是promise或者是具有then方法等，再次resolvePromise，直到成功值为基本类型或者非thenable
						resolvePromise(promise, next2, resolve, reject);
					});
				} else {
					if (called) return;
					called = true;
					resolve(next);
				}
			} catch (e) {
				if (called) return;
				called = true;
				reject(e);
			}
		} else {
			// next就是普通值
			resolve(next);
		}
	}

	/*
		resolve 返回一个始终resolve的对象实例
	*/
	static resolve(val) {
		return new newPromise((resolve, reject) => {
			resolve(val);
		});
	}

	/*
		reject 返回一个始终reject的对象实例
	*/
	static reject(val) {
		return new newPromise((resolve, reject) => {
			reject(val);
		});
	}

	/*
		all 并发处理promise
	*/
	static all(promiseArr) {
		return new newPromise((resolve, reject) => {
			// 统计并发的每个结果
			const result = [];
			// 循环then每个promise，出现异常则失败
			promiseArr.forEach((promise, index) => {
				promise.then((value) => {
					result[index] = value;
					if (result.length === promiseArr.length) {
						resolve(result);
					}
				}, reject);
			});
		});
	}
}

// 测试
const mp1 = newPromise.resolve(1);
const mp2 = newPromise.resolve(2);
const mp3 = newPromise.resolve(3);
const mp4 = newPromise.reject(4);

newPromise.all([mp1, mp2, mp3]).then(
	(x) => {
		console.log(x);
	},
	(err) => {
		console.log("err1", err);
	}
);

var mp = new newPromise((resolve, reject) => {
	console.log(11111);
	setTimeout(() => {
		resolve(22222);
		console.log(3333);
	}, 1000);
});
mp.then(
	(x) => {
		console.log(x);
	},
	(err) => {
		console.log("err2", err);
	}
);
//11111
//[ 1, 2, 3 ]
//3333
//22222
