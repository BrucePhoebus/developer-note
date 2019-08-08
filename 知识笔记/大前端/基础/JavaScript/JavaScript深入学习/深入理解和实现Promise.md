# 深入理解和实现Promise

## 概述

#### 简述下什么是Promise

* Promise是一种异步编程方案，ES6原生支持了 Promise 对象，解决了异步嵌套的问题，避免了`回调地狱`，流程化的异步控制让我们的异步编程更接近于同步操作

  + Promise有三个状态

    - 初始状态：pending
    - 完成：fulfilled
    - 失败：rejected

``` js
var promiseObj = new promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('success');
    }, 300)
})

promiseObj.then(function(value) {
    // 成功回调
    console.log(value); // "success"
})

promiseObj.catch(function(error) {
    // 失败回调
})
```

> 虽然有点代码冗余，但是的确是异步编程而且实现异步流程化拆分，多个异步操作我们还可以实现并发操作，而且这种代码冗余我们在新版本的ES规范得到一定的简化，不过它也有了新的替代方案： `async/await` 

**言归正传：看个例子**

	假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果

``` js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    var p1 = 1,
        p2, p3;
    step1(p1)
        .then((param) => step2(p1, p2 = param))
        .then((param) => step3(p1, p2, p3 = param))
        .then((param) => {
            console.log('result is', param);
        });
}

doIt();
```

> 可以看出，promise也可以很简洁的实现比较不错的异步编程

**当然，Promise还是出现一些问题的，所以才有新版async异步编程**

* promise一旦执行，无法中途取消

* promise的错误无法在外部被捕捉到，只能在内部进行预判处理

* promise的内部如何执行，监测起来很难

#### 基本API

* Promise.resolve()

	标识异步完成

* Promise.reject()

	标识异步失败

* Promise.prototype.then(fn())

	异步成功后回调执行

* Promise.prototype.catch(fn())

	异步失败后回调执行

* Promise.all() 

	所有的完成才返回，实现并行操作

``` js
var p = Promise.all([p1, p2, p3]);
```

* Promise.race() 

	竞速，谁先完成就以谁为准返回Promise对象回调

#### promise存在或会遇到的问题

* Promise 确保结果一定是异步的，不会出现 `release Zalgo` 的问题

	* 这个问题跟callback一样，结果不可控(如果接口100%是异步的就没问题)，因为存在一种情况：接口一会儿是异步的（第一次网络请求），一会儿是同步的（直接返回本地 Cache）或调用好几次回调

* 存在问题的除法程序

	``` js
	// 一个简单的除法程序
	function divide(numerator, denominator) {

		if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
			throw new TypeError('Must be number!');
		}
	
		if (denominator === 0) {
			// throw 只是一个同步的语句
			throw new Error("Cannot divide by 0!");
		}
	
		return new Promise((resolve, reject) => {
			resolve(numerator / denominator);
		});
	}

	// 用着挺好
	divide(3, 1)
		.then(res => console.log(`Get: ${res}`))
		.catch(err => console.log(`Failed: ${err}`)) 
	
	// Get: 3

	// 测试下错误情况
	divide(3, 0)
		.then(res => console.log(`Get: ${res}`))
		.catch(err => console.log(`Failed: ${err}`))
	
	// Error: Cannot divide by 0!	...
	```

	> 可以看出问题是在同步的异常不会被返回`promise对象`，也就是不会被`divide().catch()`捕获了

	* 正解

	``` js
	function divide(numerator, denominator) {
  
		return new Promise((resolve, reject) => {
			if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
				reject(new TypeError('Must be number!'));
			}
		
			if (denominator === 0) {
				// reject是异步回调
				reject(new Error("Cannot divide by 0!"));
			}
		
			resolve(numerator / denominator);
		});
	}
	```

	> 这样才会被promise对象捕获，并返回后被`divide().catch()`捕获

!> 当我们自己着手设计一个返回 Promise 对象的函数时，请尽量都采用立即返回 new Promise 的形式

``` js
function promiseFactory() {
    return new Promise((resolve, reject) => {
    	//   ...
    });
}
```

* 所有可能的错误都请用 reject 明确拒绝

	在 Promise 构造器中，除非我们明确知道使用 throw 的正确姿势，否则都使用 reject(同步throw异常无法被上下文捕获，所以异常都应该使用reject 明确拒绝)

``` js
// 检查文件内容 reject 版
function checkFileContent(file, str) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} 
			
			if (!~data.indexOf(str)) {
				// 不能使用同步throw抛出异常，因为无法被捕获/无法更改Promise对象状态
				reject(new Error(`No such content: ${str}`));
			}
			
			resolve(true);
		})
	});  
}

// 检查文件内容 reject 版 + JSON
function checkFileContent(file, str) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => { 
			if (err) {
				reject(err);
			} 
			
			if (!~data.indexOf(str)) {
				reject(new Error(`No such content: ${str}`));
			}
			
			try {
				JSON.parse(data);
			} catch (e) {
				// 使用reject抛出异常，可以被捕获
				reject(e);
			}   
			
			resolve(true);
		})
	});  
}
```

* Promise对象不因外物而变状态(性)，但后续代码依旧会执行

``` js
// 一个简单的除法程序改进版
function divide(numerator, denominator) {
  
    return new Promise((resolve, reject) => {
		if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
			reject(new TypeError('Must be number!'));
			// return reject(new TypeError('Must be number!'));
		}
		console.log('After validating type...');
		if (denominator === 0) {
			reject(new Error("Cannot divide by 0!"));
			// return reject(new Error("Cannot divide by 0!"));
		}
		console.log('After validating non-zero denominator...');
		resolve(numerator / denominator);
		// return resolve(numerator / denominator);
   });
}

divide(3, 0)
    .then(res => console.log(`Get: ${res}`))
    .catch(err => console.log(`Failed: ${err}`))
    
//   > After validating type...
//   > After validating non-zero denominator...
//   > Failed: Error: Cannot divide by 0!
```

> 这里意思是`resolve/reject`不过只是一个回调而已，所谓的不变性只是说，当遇到第一个 resolve/reject 后，便根据其结果给此 Promise 打上了一个 tag，并且不能更改，而后面照样会执行

*解决方法是：在 resolve/reject 之前加上 return 即可*

!> 在 JavaScript 函数中，只有 `return` / `yield` / `throw` 会中断函数的执行，其他的都无法阻止其运行到结束的，这也是所谓的 `Run-to-completion` 特性


#### promise使用场景

* 多异步嵌套嵌套(回调金字塔)/容易出现回调地狱的场景

## 原生实现

#### Promise.prototype.done

	异步 throw，防止未知的错误被 Promise 吞掉，造成程序 Debug 的困难

``` js
Promise.prototype.done = function() {
    return this.catch(function(e) {
		setTimeout(function() {
			throw e;
		}, 0);
    }); 
};
```

## 应用

#### 应用实例

###### Promise 改写Ajax

* 原生Ajax实现

``` js
var ajax = {
    get: function(url, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(fn) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                fn.call(this, JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    },
    post: function(url, fn, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", 'x-www-form-urlencoded');
        xhr.onreadystatechange = function(fn) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                fn.call(this, JSON.parse(xhr.responseText));
            }
        }
        xhr.send(data);
    }
}
```

* promise改写ajax

``` js
const ajaxPromise = (param) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(param.type, param.url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject("error");
                }
            }
        }

    })
}
ajaxPromise({
    type: 'get',
    url: 'goods.json'
}).then(function(data) {
    console.log(data)
})
```

###### Promise实现多图预加载

	图片加载往往是异步的，如果有操作需要等到所有的图片加载完之后再执行，这时候就需要不断的监听所有图片的加载情况

* 先看看ES5实现多图预加载

	通过计数器判断有多少图片加载完成

``` js
var count = 0, // 计数器
    images = [];

/*
 * （Array）source 图片url
 * （Fun）cb 回调
 */
function preLoadImg(source, cb) {
    source.forEach(function(url, i) {
        images[i] = new Image();
        images[i].onload = function() {
            if (++count === source.length) {
                cb && cb();
            }
        }
        images.src = url;
    })
}
```

* promise实现

``` js
 // 预处理图片
 function preLoadImg(source) {
     let pr = [];
     source.forEach(url => { // 预加载图片
         let p = loadImage(url)
             .then(img => this.images.push(img))
             .catch(err => console.log(err))
		// 为了防止有图片加载失败，阻塞后续操作，为每一个p添加catch，捕获reject，Promise.all就接受不到了
         pr.push(p);
     })

     // 图片全部加载完时Promise对象状态才为resolved
     Promise.all(pr)
         .then(() => {
           	// 当所有图片加载完成后，才会执行then中的函数
         });

 }
 // 预加载图片
 function loadImage(url) {
     return new Promise((resolve, reject) => {
         let img = new Image();
         img.onload = () => resolve(img);	// 
         img.onerror = reject;
         img.src = url;
     })
 }
```

###### 原生兼容封装 Promise + Callback

* 简单版

``` js
function readFile2(filename, fn) {
    if (typeof fn === 'function') {
      	return fs.readFile(filename, fn);
    }
    return new Promise((resolve, reject) => {
		fs.readFile(filename, function(err, data) {
			if (err) return reject(err);
			resolve(data);
		});
    });
}
```

> 这里根据是否传入第二个参数`fn`作为回调函数判断，这样实现比较简单，更加复杂的场景可以增加参数实现

* 兼容第三方库版本

	越来越多常用的三方库都支持直接返回一个 Promise 对象，例如 mongoose，这时，如果我们要包装一个同时支持两者的 API 就变得简单了。我们可以利用 Promise 的链式特性，直接在 Promise 的结尾添加相关逻辑，而无需在中间步骤中反复调用 callback(null, data) 或者 callback(err, null)（这不仅仅是麻烦的问题，还会因为逻辑不严谨导致 callback 调用多次的问题）

``` js
// 一个简单的除法程序改进版 提前 return
function divide(numerator, denominator) {

	return new Promise((resolve, reject) => {
		if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
			return reject(new TypeError('Must be number!'));
		}
		console.log('After validating type...');
		if (denominator === 0) {
			return reject(new Error("Cannot divide by 0!"));
		}
		console.log('After validating non-zero denominator...');
		return resolve(numerator / denominator);
	});
}

function divide2(numerator, denominator, callback) {
    var promise = divide(numerator, denominator);
    if (typeof callback === 'function') {
		promise.then(res => {
			callback(null, res);
		}, err => {
			callback(err, null);
		});
    } else {
      	return promise;
    }
}
```

* 抽象一个函数，对于那些非可变参数的 Promise 工厂函数添加 Callback 返回

``` js
var nodify = require('promise-nodify');

function divide(numerator, denominator) {
  
    return new Promise((resolve, reject) => {
		if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
			return reject(new TypeError('Must be number!'));
		}
		
		if (denominator === 0) {
			return reject(new Error("Cannot divide by 0!"));
		}
		
		return resolve(numerator / denominator);
   });
}
  
  
// 拥抱 promise-nodify 的三代目
function divide3(numerator, denominator, callback) {
  
    var promise = divide(numerator, denominator);
   
    if (typeof callback === 'function') {
      	return nodify(promise, callback);
    } else {
      	return promise;
    }
}

divide3(3, 0, (err, data) => {
	console.log(err, data);
});
// > [Error: Cannot divide by 0!] null
```

> 参考：[Javascript 中的神器——Promise](https://www.jianshu.com/p/063f7e490e9a) | [Promise应用实例](https://www.cnblogs.com/zhangyubao/p/7003746.html) | [Promise 陷阱](https://www.jianshu.com/p/9e4026614fbe)

