# JavaScript常用技巧

> [参考掘金](https://juejin.im/post/5cef46226fb9a07eaf2b7516)

## 判断对象的数据类型

> [参考](知识笔记/大前端/基础/JavaScript/JavaScript判断数据类型.md)

	使用 Object.prototype.toString 配合闭包， 通过传入不同的判断类型来返回不同的判断函数， 一行代码， 简洁优雅灵活

```js
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array');
console.log(isArray([])); // true

const isObject = isType('Object');
console.log(isObject({})); // true
```

> 注： 传入 type 参数时首字母大写

!> 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上， 因为 call 会将第一个参数进行装箱操作

## 循环实现数组 map 方法

```js
const selfMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this);
    let mappedArr = Array(arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) { // 对稀疏数组的处理，通过 hasOwnProperty 来判断当前下标的元素是否存在与数组中
            continue;
        }
        mappedArr[i] = fn.call(context, arr[i], i, this);
    }
    return mappedArr;
}
```

> 注： map 的第二个参数为第一个参数回调中的 this 指向， 如果第一个参数为箭头函数， 那设置第二个 this 会因为箭头函数的词法绑定而失效

## 使用 reduce 实现数组 map 方法

```js
const selfMap2 = function(fn, context) {
    let arr = Array.prototype.slice.call(this);
    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur, index, this)];
    }, []);
}
```

## 循环实现数组 filter 方法

```js
const selfFilter = function(fn, context) {
    let arr = Array.prototype.slice.call(this);
    let filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        fn.call(context, arr[i], i, this) && filteredArr.push(arr[i]);
    }
    return filteredArr;
}
```

## 使用 reduce 实现数组 filter 方法

```js
const selfFiler2 = function(fn, context) {
    return this.reduce((pre, cur, index) => {
        return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre];
    }, []);
}
```

## 循环实现数组的 some 方法

	执行 some 方法的数组如果是一个空数组， 最终始终会返回 false， 而另一个数组的 every 方法中的数组如果是一个空数组， 会始终返回 true

```js
const selfSome = function(fn, context) {
    let arr = Array.prototype.slice.call(this);

    if (!arr.length) {
        return false;
    }

    for (let i = 0; i < array.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        let res = fn.call(context, arr[i], i, this);
        if (res) {
            return true;
        }
    }
    return false;
}
```

## 循环实现数组的 reduce 方法

```js
Array.prototype.selfReduce = function(fn, initialValue) {
    let arr = Array.prototype.slice.call(this),
        res,
        startIndex;
    if (initialValue === undefined) {
        // 找到第一个非空单元（真实）的元素和下标
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) {
                continue;
            }
            startIndex = i;
            res = arr[i];
            break;
        }
    } else {
        res = initialValue;
    }

    for (let i = ++startIndex || 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        res = fn.call(null, res, arr[i], i, this);
    }
    return res;
}
```

> 因为可能存在稀疏数组的关系， 所以 reduce 需要保证跳过稀疏元素， 遍历正确的元素和下标

## 使用 reduce 实现数组的 flat 方法

	通过 reduce 遍历数组， 遇到数组的某个元素仍是数组时， 通过 ES6 的扩展运算符对其进行降维（ ES5 可以使用 concat 方法）， 而这个数组元素可能内部还嵌套数组， 所以需要递归调用 selfFlat

```js
const selfFlat = function(depth = 1) {
    let arr = Array.prototype.slice.call(this);
    if (depth === 0) {
        return arr;
    }
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...selfFlat.call(cur, depth - 1)];
        } else {
            return [...pre, cur];
        }
    }, []);
}
```

> 因为 selfFlat 是依赖 this 指向的， 所以在 reduce 遍历时需要指定 selfFlat 的 this 指向， 否则会默认指向 window 从而发生错误

* 原生的 flat 方法支持一个 depth 参数表示降维的深度， 默认为 1 即给数组降一层维度

```js
let arr = [1, 2[3, 4],
        [5, [6, 7]];
        arr.flat();
        /* 输出
        (6) [1, 2, 3, 4, 5, Array(2)]
        0: 1
        1: 2
        2: 3
        3: 4
        4: 5
        5: (2) [6, 7]
         */
```

* 传入 Inifity 会将传入的数组变成一个一维数组

```js
let arr = [1, 2[3, 4],
        [5, [6, 7]];
        arr.flat(Infinity);
        /* 输出
        (7) [1, 2, 3, 4, 5, 6, 7]
        0: 1
        1: 2
        2: 3
        3: 4
        4: 5
        5: 6
        6: 7
         */
```

!> 原理是每递归一次将 depth 参数减 1， 如果 depth 参数为 0 时， 直接返回原数组

## 实现 ES6 的 class 语法

	ES6 的 class 内部是基于寄生组合式继承， 它是目前最理想的继承方式， 通过 Object.create 方法创造一个空对象， 并将这个空对象继承 Object.create 方法的参数， 再让子类（ subType） 的原型对象等于这个空对象， 就可以实现子类实例的原型等于这个空对象， 这个空对象的原型就等于父类原型对象（ superType.prototype） 的继承关系

```js
function inherit(subType, superType) {
    subType.prototype = Object.create(superType.prototype, {
        constructor: {
            enumerable: false,
            configurable: true,
            writable: true,
            value: subType
        }
    });

    Object.setPrototypeOf(subType, superType);
}
```

* 而 Object.create 支持第二个参数， 即给生成的空对象定义属性和属性描述符/访问器描述符， 我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为， 同时它是不可枚举的内部属性（enumerable:false）

* ES6 的 class 允许子类继承父类的静态方法和静态属性， 而普通的寄生组合式继承只能做到实例与实例之间的继承， 对于类与类之间的继承需要额外定义方法， 这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型， 从而能够从父类中继承静态方法和静态属性

## 函数柯里化

	柯里化是函数式编程的一个重要技巧， 将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

```js
function curry(fn) {
    if (fn.length <= 1) {
        return fn;
    };
    const generator = (...args) => {
        if (fn.length === args.length) {
            // 执行fn并且返回执行结果
            return fn(...args);
        } else {
            return (...args2) => {
                // 返回generator函数
                return generator(...args, ...args2);
            }
        }
    }
    return generator;
}

const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];
const curriedDisplay = curry(display);
console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8)); // 一维数组(8) [1, 2, 3, 4, 5, 6, 7, 8]

let add = (a, b, c, d) => a + b + c + d;
const curriedAdd = curry(add);
curriedAdd(5)(6)(7)(8); // 26
```

**ES6简写**

```js
const curry2 = fn => {
    if (fn.length <= 1) return fn;
    const generator = (...args) => (args.length === fn.length ? fn(...args) : (...args2) => generator(...args, ...args2));
    return generator;
};

const curriedDisplay2 = curry2(display);
console.log("curriedDisplay2", curriedDisplay2(1)(2)(3)(4)(5)(6)(7)(8)); // 结果一样
```

## 函数柯里化（支持占位符版本）

	通过占位符能让柯里化更加灵活， 实现思路是， 每一轮传入的参数先去填充上一轮的占位符， 如果当前轮参数含有占位符， 则放到内部保存的数组末尾， 当前轮的元素不会去填充当前轮参数的占位符， 只会填充之前传入的占位符

```js
const curry3 = (fn, placeholder = "_") => {
    curry3.placeholder = placeholder;
    if (fn.length <= 1) return fn;
    let argsList = [];
    const generator = (...args) => {
        let currentPlaceholderIndex = -1 // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
        args.forEach(arg => {
            let placeholderIndex = argsList.findIndex(item => item === curry3.placeholder)
            if (placeholderIndex < 0) { // 如果数组中没有占位符直接往数组末尾放入一个元素
                currentPlaceholderIndex = argsList.push(arg) - 1;
                // 防止将元素填充到当前轮参数的占位符
                // (1,'_')('_',2) 数字2应该填充1后面的占位符，不能是2前面的占位符
            } else if (placeholderIndex !== currentPlaceholderIndex) {
                argsList[placeholderIndex] = arg;
            } else { // 当前元素是占位符的情况
                argsList.push(arg);
            }
        })
        let realArgsList = argsList.filter(arg => arg !== curry3.placeholder) //过滤出不含占位符的数组
        if (realArgsList.length === fn.length) {
            return fn(...argsList);
        } else if (realArgsList.length > fn.length) {
            throw new Error('超出初始函数参数最大值');
        } else {
            return generator;
        }
    }

    return generator;
}
const curriedDisplay3 = curry3(display);
console.log("curriedDisplay3", curriedDisplay3('_', 2)(1, '_', 4)(3, '_', )('_', 5)(6)(7, 8)); // 一维数组(8) [1, 2, 3, 4, 5, 6, 7, 8]
```

**函数组合 + 函数柯里化**

	函数式编程另一个重要的函数 compose， 能够将函数进行组合， 而组合的函数只接受一个参数， 所以如果有接受多个函数的需求并且需要用到 compose 进行函数组合， 就需要使用柯里化对准备组合的函数进行部分求值， 让它始终只接受一个参数

```js
const compose = function(...fns) {
    return function(initValue) {
        return fns.reduceRight((acc, cur) => {
            return cur(acc);
        }, initValue);
    }
}

const curriedJoin = curry3((separator, arr) => arr.join(separator));
const curriedMap = curry3((fn, arr) => arr.map(fn));
const curriedSplit = curry3((separator, str) => str.split(separator));

const composeFunc = compose(
    curriedJoin("1"),
    curriedMap(item => `${item}1` ),
    curriedSplit(""),
)

console.log("compose + curry", composeFunc('helloworld')); // compose + curry h11e11l11l11o11w11o11r11l11d1
```

## 偏函数

	创建已经设置好一个或多个参数的函数, 并且添加了占位符功能

	偏函数和柯里化概念类似， 它们区别在于偏函数会固定你传入的几个参数， 再一次性接受剩下的参数， 而函数柯里化会根据你传入参数不停的返回函数， 直到参数个数满足被柯里化前函数的参数个数

	

	Function.prototype.bind 函数就是一个偏函数的典型代表， 它接受的第二个参数开始， 为预先添加到绑定函数的参数列表中的参数， 与 bind 不同的是， 上面的这个函数同样支持占位符

```js
const partialFunc = (func, ...args) => {
    let placeholderNum = 0;
    return (...args2) => {
        args2.forEach(arg => {
            let index = args.findIndex(item => item === "_")
            if (index < 0) return;
            args[index] = arg;
            placeholderNum++;
        })
        if (placeholderNum < args2.length) {
            args2 = args2.slice(placeholderNum, args2.length);
        }
        return func.apply(this, [...args, ...args2]);
    }
}

let partialDisplay = partialFunc(display, 1, 2);
console.log("partialFunc", partialDisplay(3, 4, 5, 6, 7, 8)); // partialFunc (8) [1, 2, 3, 4, 5, 6, 7, 8]

let partialDisplay2 = partialFunc(display, '_', 2, '_');
console.log('partialFunc2', partialDisplay2(1, 3, 4, 5, 6, 7, 8)); // partialFunc2 (8) [1, 2, 3, 4, 5, 6, 7, 8]

let add = (a, b, c, d) => a + b + c + d;
const partialAdd = partialFunc(add, '_', 2, '_');
partialAdd(1, 3, 4);
add(1, 2, 3, 4); // 10
```

## 斐波那契数列及其优化

	利用函数记忆， 将之前运算过的结果保存下来， 对于频繁依赖之前结果的计算能够节省大量的时间， 例如斐波那契数列， 缺点就是闭包中的 obj 对象会额外占用内存

```js
const speed = function(fn, num) {
    console.time('time')
    let value = fn(num)
    console.timeEnd('time')
    console.log( `返回值:${value}` )
}

let fibonacci = function(n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

speed(fibonacci, 35);

//函数记忆
const memory = function(fn) {
    let obj = {}
    return function(n) {
        if (obj[n] === undefined) obj[n] = fn(n)
        return obj[n]
    }
}
fibonacci = memory(fibonacci);

speed(fibonacci, 35);

/* 输出 
	time: 79.59228515625ms
	返回值:9227465
	time: 0.138916015625ms
	返回值:9227465
 */
```

## 实现函数 bind 方法

	函数的 bind 方法核心是利用 call， 同时考虑了一些其他情况

	

	* bind 返回的函数被 new 调用作为构造函数时， 绑定的值会失效并且改为 new 指定的对象

	* 定义了绑定后函数的 length 属性和 name 属性（不可枚举属性）

	* 绑定后函数的原型需指向原来的函数

```js
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 实现一个简易的bind
const selfBind = function(bindTarget, ...args1) {
    if (typeof this !== 'function') throw new TypeError('Bind must be called on a function')
    let func = this
    let boundFunc = function(...args2) {
        let args = [...args1, ...args2];

        // 使用new关键字调用返回新对象
        if (new.target) {
            let res = func.apply(this, args);
            //如果构造函数返回一个对象则返回这个对象
            if (isComplexDataType(res)) return res;
            //否则返回新建的对象
            return this;
        } else {
            func.apply(bindTarget, args);
        }
    }
    // 绑定后的函数继承绑定前的函数(非箭头函数)
    /**真正的bind创建的函数是没有prototype的, 但是使用new会将创建的对象连接到bind前函数的prototype(非箭头函数)**/
    this.prototype && (boundFunc.prototype = Object.create(this.prototype));

    // 定义绑定后函数的长度和名字
    let desc = Object.getOwnPropertyDescriptors(func);
    Object.defineProperties(boundFunc, {
        length: desc.length,
        name: Object.assign(desc.name, {
            value: `bound ${desc.name.value}` 
        })
    })
    return boundFunc;
}
```

**使用**

```js
Function.prototype.selfBind || (Object.defineProperty(Function.prototype, 'selfBind', {
    value: selfBind,
    enumerable: false,
    configurable: true,
    writable: true
}))

function func() {
    this.name = 'zyk'
    return {}
}

let example = {
    age: 22
}

let boundFunc = func.selfBind(example)

console.dir(func); // ƒ func()
console.dir(boundFunc); // ƒ bound func(...args2)

boundFunc();
console.log(example); // {age: 22, name: "zyk"}

let x = new boundFunc();
console.log(x); // {}
```

## 实现函数 call 方法

	将函数作为传入的上下文参数（ context） 的属性执行， 这里为了防止属性冲突使用了 ES6 的 Symbol 类型

```js
// selfCall(ES6版本)
const selfCall = function(context, ...args) {
    let func = this;
    context || (context = window);
    if (typeof func !== 'function') throw new TypeError('this is not function');
    let caller = Symbol('caller');
    context[caller] = func;
    let res = context[caller](...args);
    delete context[caller];
    return res;
}

Function.prototype.selfCall || (Object.defineProperty(Function.prototype, 'selfCall', {
    value: selfCall,
    enumerable: false,
    configurable: true,
    writable: true
}))

let example2 = {
    a: 1
};
func.selfCall(example2);
console.log(example2); // {a: 1, name: "zyk"}
```

## 简易的 CO 模块

	run 函数接受一个生成器函数， 每当 run 函数包裹的生成器函数遇到 yield 关键字就会停止， 当 yield 后面的 promise 被解析成功后会自动调用 next 方法执行到下个 yield 关键字处， 最终就会形成每当一个 promise 被解析成功就会解析下个 promise， 当全部解析成功后打印所有解析的结果， 衍变为现在用的最多的 async /await 语法

## 函数防抖

	leading 为是否在进入时立即执行一次， 原理是利用定时器， 如果在规定时间内再次触发事件会将上次的定时器清除， 即不会执行函数并重新设置一个新的定时器， 直到超过规定时间自动触发定时器中的函数

	同时通过闭包向外暴露了一个 cancel 函数， 使得外部能直接清除内部的计数器

```js
const debounce = (func, time = 17, options = {
    leading: true,
    context: null
}) => {
    let timer;
    const _debounce = function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, time);
            func.apply(options.context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(options.context, args);
                timer = null;
            }, time);
        }
    };
    /**
     * @description 取消函数
     **/
    _debounce.cancel = function() {
        clearTimeout(timer);
        timer = null;
    };
    return _debounce;
};
```

## 函数节流

	和函数防抖类似， 区别在于内部额外使用了时间戳作为判断， 在一段时间内没有触发事件才允许下次事件触发， 同时新增了 trailing 选项， 表示是否在最后额外触发一次

```js
const throttle = (func, time = 17, options = {
    // leading 和 trailing 无法同时为 false
    leading: true,
    trailing: false,
    context: null
}) => {
    let previous = new Date(0).getTime()
    let timer;
    const _throttle = function(...args) {
        let now = new Date().getTime();

        if (!options.leading) {
            if (timer) return
            timer = setTimeout(() => {
                timer = null
                func.apply(options.context, args)
            }, time)
        } else if (now - previous > time) {
            func.apply(options.context, args)
            previous = now
        } else if (options.trailing) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(options.context, args)
            }, time)
        }
    };
    // 闭包返回取消函数
    _throttle.cancel = () => {
        previous = 0;
        clearTimeout(timer);
        timer = null
    };
    return _throttle
};

// 使用Proxy实现函数节流
function proxy(func, time, options = {
    // leading 和 trailing 无法同时为 false
    leading: false,
    trailing: true,
    context: null
}) {
    let timer;
    let previous = new Date(0).getTime();

    let handler = {
        apply(target, _, args) {
            // 和闭包实现核心逻辑相同
            let now = new Date().getTime();
            if (!options.leading) {
                if (timer) return;
                timer = setTimeout(() => {
                    timer = null;
                    Reflect.apply(func, options.context, args)
                }, time)
            } else if (now - previous > time) {
                Reflect.apply(func, options.context, args)
                previous = now
            } else if (options.trailing) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    Reflect.apply(func, options.context, args)
                }, time)
            }
        }
    };
    return new Proxy(func, handler)
}
```

## 图片懒加载

	getBoundClientRect 的实现方式， 监听 scroll 事件（ 建议给监听事件添加节流）， 图片加载完会从 img 标签组成的 DOM 列表中删除， 最后所有的图片加载完毕后需要解绑监听事件

	intersectionObserver 的实现方式，实例化一个 IntersectionObserver ，并使其观察所有 img 标签

	当 img 标签进入可视区域时会执行实例化时的回调，同时给回调传入一个 entries 参数，保存着实例观察的所有元素的一些状态，比如每个元素的边界信息，当前元素对应的 DOM 节点，当前元素进入可视区域的比率，每当一个元素进入可视区域，将真正的图片赋值给当前 img 标签，同时解除对其的观察

```js
// getBoundingClientRect 实现懒加载
let imgList1 = [...document.querySelectorAll(".get_bounding_rect")]
let num = imgList1.length

let lazyLoad1 = (function() {
    let count = 0
    return function() {
        let deleteIndexList = []
        imgList1.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                // 加载成功后将图片添加到删除列表中
                deleteIndexList.push(index)
                count++
                if (count === num) {
                    //当图片全部加载完毕解绑scroll事件
                    document.removeEventListener('scroll', lazyLoad1)
                }
            }
        })
        // 删除已经加载完毕的图片
        imgList1 = imgList1.filter((_, index) => !deleteIndexList.includes(index))

    }
})()

// 这里引用了 throttle.js 的节流函数
lazyLoad1 = proxy(lazyLoad1, 100)

document.addEventListener('scroll', lazyLoad1)
// 手动加载一次，否则首屏的图片不触发滚动无法加载
lazyLoad1()

// intersectionObserver 实现懒加载
let imgList2 = [...document.querySelectorAll(".intersection_observer")]

let lazyLoad2 = function() {
    // 实例化observer
    let observer = new IntersectionObserver(entries => {
        //entries存储着所有观察被元素的intersectionObserverEntry配置
        entries.forEach(entry => {
            // 大于0表示进入视口
            if (entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src
                //取消观察
                observer.unobserve(entry.target)
            }
        })
    })
    imgList2.forEach(img => {
        observer.observe(img)
    })
}

lazyLoad2()
```

## new 关键字

```js
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null;

const selfNew = function (fn, ...rest) {
    let instance = Object.create(fn.prototype);
    let res = fn.call(instance, ...rest);
    return isComplexDataType(res) ? res : instance;
}

function Person(name, sex) {
    this.name = name
    this.sex = sex
}


let newPerson = new Person('zyk', 'male');
let selfNewPerson = selfNew(Person, 'zyk', 'male');

console.log(newPerson);	// Person {name: "zyk", sex: "male"}
console.log(selfNewPerson);	// Person {name: "zyk", sex: "male"}
```

## 实现 Object.assign

	这个ES6新增的Object静态方法允许我们进行多个对象的合并

	Object.assign遍历需要合并给target的对象(即source对象的集合)的属性，用等号进行赋值

```js
"use strict" //启用严格模式在尝试给基本包装类型已定义的下标赋值的时候报错

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 简单实现ES6的Object.assign
const selfAssign = function (target, ...source) {
    if (target == null) throw new TypeError('Cannot convert undefined or null to object')
    return source.reduce((acc, cur) => {
        isComplexDataType(acc) || (acc = new Object(acc)); //变成一个基本包装类型
        if (cur == null) return acc; //source为null,undefined时忽略
        // 遍历出Symbol属性和可枚举属性
        [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(key => {
            acc[key] = cur[key]
        })
        return acc
    }, target)
}

Object.selfAssign || Object.defineProperty(Object, 'selfAssign', {
    value: selfAssign,
    configurable: true,
    enumerable: false,
    writable: false
})


let target = {
    a: 1,
    b: 1
}

let obj1 = {
    a: 2,
    b: 2,
    c: undefined
}

let obj2 = {
    a: 3,
    b: 3,
    [Symbol("a")]: 3,
    d: null
}

console.log(Object.selfAssign(target, obj1, obj2));	// {a: 3, b: 3, c: undefined, d: null, Symbol(a): 3}
console.log(Object.selfAssign("abd", null, undefined));	// String {"abd"}
```

## instanceof

	递归遍历 right 参数的原型链，每次和 left 参数作比较，遍历到原型链终点时则返回 false，找到则返回 true

```js
const selfInstanceof = function (left, right) {
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto == null) return false
        if (proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}

console.log(selfInstanceof({}, Array));	// false
```

## 私有变量的实现

**Proxy实现**

	使用 Proxy 代理所有含有 _ 开头的变量，使其不可被外部访问

	通过闭包的形式保存私有变量，缺点在于类的所有实例访问的都是同一个私有变量

```js
// 私有变量(Proxy)
const proxy = function (obj) {
    return new Proxy(obj, {
        get(target, key) {
            if (key.startsWith('_')) {
                throw new Error('private key')
            }
            return Reflect.get(target, key)
        },
        //拦截所有遍历操作
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
        }
    })
}

class Person {
    constructor(name) {
        this._name = name
        return proxy(this)
    }

    get name() {
        return this._name
    }
}


let person = new Person('zyk');

console.log(person);	// Proxy {_name: "zyk"}
try {
    console.log(person._name);
} catch (e) {
    console.error(e);	// Error: private key
}
console.log(person.name);	// zyk
```

**Symbol实现**

```js
// 私有变量(Symbol)
const Person1 = (function () {
    const _name = Symbol('name')

    class Person1 {
        constructor(name) {
            this[_name] = name
        }

        getName() {
            return this[_name]
        }
    }

    return Person1
})()

let person1 = new Person1('zyk');

console.log('Symbol:', person1);
console.log(person1._name); //undefined
console.log(person1.getName());
```


**闭包实现**

	闭包的实现，解决了上面那种闭包的缺点，每个实例都有各自的私有变量，缺点是舍弃了 class 语法的简洁性，将所有的特权方法（访问私有变量的方法）都保存在构造函数中

```js
// 私有变量(闭包)
class Person4 {
    constructor(name) {
        let _name = name
        this.getName = function () {
            return _name
        }
    }
}


let person4 = new Person4('zyk')

console.log("闭包:", person4)
console.log(person4.name)
console.log(person4.getName())
```

**WeakMap实现**

	通过 WeakMap 和闭包，在每次实例化时保存当前实例和所有私有变量组成的对象，外部无法访问闭包中的 WeakMap，使用 WeakMap 好处在于当没有变量引用到某个实例时，会自动释放这个实例保存的私有变量，减少内存溢出的问题

```js
// 私有变量(WeakMap)
// WeakMap相对于Map当对象不存在的时候自动从映射表中移除,自动减少内存占用率
const Person2 = (function () {
    let wp = new WeakMap()

    class Person2 {
        constructor(name) {
            //存储当前实例和当前实例的私有变量
            wp.set(this, {name})
        }

        getName() {
            return wp.get(this).name
        }
    }

    return Person2
})()

let person2 = new Person2('zyk');	// WeakMap: Person2 {}

console.log("WeakMap:", person2);	// undefined
console.log(person2.name);	// zyk
console.log(person2.getName());	// undefined
```

## 洗牌算法

	通过洗牌算法可以达到真正的乱序，洗牌算法分为原地和非原地，图一是原地的洗牌算法，不需要声明额外的数组从而更加节约内存占用率，原理是依次遍历数组的元素，将当前元素和之后的所有元素中随机选取一个，进行交换

```js
//旧版本的chrome对于10个元素内的数组使用插入算法进行排序(最新版已经修改了排序算法)
function originSort(arr) {
    arr = arr.sort(() => Math.random() - 0.5)
    return arr
}


//原理是将当前元素之后的所有元素中随机选取一个和当前元素互换
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = i + Math.floor(Math.random() * (arr.length - i));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    }
    return arr
}

//新生成一个数组,随机从原数组中取出一个元素放入新数组
function shuffle2(arr) {
    let _arr = []
    while (arr.length) {
        let randomIndex = Math.floor(Math.random() * (arr.length))
        _arr.push(arr.splice(randomIndex, 1)[0])
    }
    return _arr
}

// 分析概率的函数
function statistics(fn, arr) {
    let times = 100000;
    let res = {};
    for (let i = 0; i < times; i++) {
        //每次循环声明一次防止引用同一数组
        let _arr = [...arr]
        let key = JSON.stringify(fn(_arr));
        res[key] ? res[key]++ : res[key] = 1;
    }

    // 为了方便展示，转换成百分比
    Object.keys(res).forEach(key => {
        res[key] = res[key] / times * 100 + '%'
    })

    console.log(fn.name,res)
}

statistics(originSort, [1, 2, 3]);	// originSort {[2,3,1]: "6.2379999999999995%", [2,1,3]: "12.58%", [1,3,2]: "6.196%", [3,2,1]: "31.335%", [1,2,3]: "37.49%", …}
statistics(shuffle, [1, 2, 3]);	// shuffle {[2,3,1]: "16.76%", [1,2,3]: "16.749%", [1,3,2]: "16.477%", [3,1,2]: "16.753999999999998%", [2,1,3]: "16.564%", …}
statistics(shuffle2, [1, 2, 3]);	// shuffle2 {[3,2,1]: "16.884%", [1,3,2]: "16.744%", [1,2,3]: "16.724%", [2,1,3]: "16.427%", [3,1,2]: "16.744%", …}
```

## 单例模式

	通过 ES6 的 Proxy 拦截构造函数的执行方法来实现的单例模式

```js
function proxy(func) {
    let instance;
    let handler = {
        construct(target, args) {
            if (!instance) {
                // 没有实例就创造一个实例
                instance = Reflect.construct(func,args)
            }
            // 无论如何都会返回一个实例(new关键字)
            return instance;
        }
    }
    return new Proxy(func, handler)
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const SingletonPerson = proxy(Person);

let person1 = new SingletonPerson('zhl', 22);

let person2 = new SingletonPerson('cyw', 22);

console.log(person1 === person2); // true
```

## promisify

	promisify 函数是将回调函数变为 promise 的辅助函数，适合 error-first 风格（nodejs）的回调函数，原理是给 error-first 风格的回调无论成功或者失败，在执行完毕后都会执行最后一个回调函数，我们需要做的就是让这个回调函数控制 promise 的状态即可

```js
// promisify.js
// 使用 nodejs 运行以下代码
// 适合err-first风格的异步操作(eg. nodejs)的 promisify 通用函数

const fs = require("fs")

function promisify(asyncFunc) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err);
                }
                return resolve(...values);
            });
            asyncFunc.call(this, ...args);
        });
    };
}

const fsp = new Proxy(fs,{
    get(target, key) {
        return promisify(target[key]);
    }
})


async function generateCommit() {
    try {
        let data = await fsp.readFile('./promisify.js', 'utf-8');
        data += `\n//我是注释`;
        await fsp.writeFile('./promisify.js', data);
    } catch (e) {
        console.log(e);
    }
}

generateCommit();
```

> 这里还用了 Proxy 代理了整个 fs 模块，拦截 get 方法，使得不需要手动给 fs 模块所有的方法都包裹一层 promisify 函数，更加的灵活

## 优雅的处理 async/await

	无需每次使用 async/await 都包裹一层 try/catch ，更加的优雅
	
	另外一个思路，如果使用了 webpack 可以编写一个 loader，分析 AST 语法树，遇到 await 语法，自动注入 try/catch，这样连辅助函数都不需要使用

```js
// async/await 优雅处理方式
async function errorCaptured(asyncFunc) {
    try {
        let res = await asyncFunc();
        return [null,res];
    } catch (e) {
        return [e,null];
    }
}

let asyncFunc = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('success') : reject('error');
        }, 1000)
    })
}


async function func() {
    let [err, res] = await errorCaptured(asyncFunc);
    console.log('res', res);
    console.log('err', err);
}

func();
```

## 发布订阅 EventEmitter

	通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件

```js
// 发布订阅(自定义事件)
class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        (this.subs[event] || (this.subs[event] = [])).push(cb);
    }

    // 也可以使用 call 指定 context
    trigger(event, ...args) {
        this.subs[event] && this.subs[event].forEach(cb => {
            cb(...args);
        })
    }

    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args);
            this.off(event, onceCb);
        }
        this.on(event,cb);
    }

    off(event, offCb) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex(cb => cb === offCb);
            this.subs[event].splice(index, 1);
            if (!this.subs[event].length) delete this.subs[event];
        }
    }
}

let dep = new EventEmitter();

let cb = function () {
    console.log('handleClick');
}

let cb2 = function () {
    console.log('handleMouseover');
}

console.group();
dep.on('click', cb);
dep.on('click',cb2);
dep.trigger('click');
console.groupEnd();

console.group();
dep.off('click', cb);
dep.trigger('click');
console.groupEnd();

console.group();
dep.once('mouseover', cb2);
dep.trigger('mouseover');
dep.trigger('mouseover');
console.groupEnd();
```

## 实现 JSON.stringify

**分析**

	使用 JSON.stringify 将对象转为 JSON 字符串时，一些非法的数据类型会失真

* 如果对象含有 toJSON 方法会调用 toJSON

* 在数组中

	存在 Undefined/Symbol/Function 数据类型时会变为 null

	存在 Infinity/NaN 也会变成 null

* 在对象中

	属性值为 Undefined/Symbol/Function 数据类型时，属性和值都不会转为字符串

	属性值为 Infinity/NaN ，属性值会变为 null


* 日期数据类型的值会调用 toISOString

* 非数组/对象/函数/日期的复杂数据类型会变成一个空对象

* 循环引用会抛出错误

**具体实现**

```js
// 简单实现 JSON.stringify 方法

const isString = value => typeof value === 'string';
const isSymbol = value => typeof value === 'symbol'
const isUndefined = value => typeof value === 'undefined'
const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]'
const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';
const isComplexDataType = value => (typeof value === 'object' || typeof value === 'function') && value !== null;
const isValidBasicDataType = value => value !== undefined && !isSymbol(value); // 合法的基础类型
const isValidObj = obj => Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]';// 合法的复杂类型(对象)
const isInfinity = value => value === Infinity || value === -Infinity


// 在数组中存在 Symbol/Undefined/Function 类型会变成 null
// Infinity/NaN 也会变成 null
const processSpecialValueInArray = value =>
    isSymbol(value) || isFunction(value) || isUndefined(value) || isInfinity(value) || isNaN(value) ? null : value;

// 根据 JSON 规范处理属性值
const processValue = value => {
    if (isInfinity(value) || isNaN(value)) {
        return null
    }
    if (isString(value)) {
        return `"${value}"`
    }
    return value
};

let s = Symbol('s')
let obj = {
    str: "123",
    arr: [1, {e: 1}, s, () => {
    }, undefined,Infinity,NaN],
    obj: {a: 1},
    Infinity: -Infinity,
    nan: NaN,
    undef: undefined,
    symbol: s,
    date: new Date(),
    reg: /123/g,
    func: () => {
    },
    dom: document.querySelector('body'),
};

// obj.loop = obj

const jsonStringify = (function () {
    // 闭包 + WeakMap 防止循环引用
    let wp = new WeakMap()
    // 递归调用 jsonStringify 的都是闭包中的这个函数，而非 const 声明的 jsonStringify 函数
    return function jsonStringify(obj) {
        if (wp.get(obj)) throw new TypeError('Converting circular structure to JSON');
        let res = "";

        if (isComplexDataType(obj)) { // 复杂类型的情况
            if (obj.toJSON) return obj.toJSON; // 含有 toJSON 方法则直接调用
            if (!isValidObj(obj)) {  // 非法的复杂类型直接返回
                return
            }
            wp.set(obj, obj);

            if (Array.isArray(obj)) {  // 数组的情况
                res += "[";
                let temp = []; //声明一个临时数组用来控制属性之间的逗号
                obj.forEach((value) => {
                    temp.push(
                        isComplexDataType(value) && !isFunction(value) ?
                            jsonStringify(value) :
                            `${processSpecialValueInArray(value, true)}`
                    )
                });
                res += `${temp.join(',')}]`
            } else {  // 对象的情况
                res += "{";
                let temp = [];
                Object.keys(obj).forEach((key) => {
                    // 值是对象的情况
                    if (isComplexDataType(obj[key])) {
                        // 值是合法对象的情况
                        if (isValidObj(obj[key])) {
                            temp.push(`"${key}":${jsonStringify(obj[key])}`)
                        } else if (isDate(obj[key])) { // Date 类型调用 toISOString
                            temp.push(`"${key}":"${obj[key].toISOString()}"`)
                        } else if (!isFunction(obj[key])) { // 其余非函数类型返回空对象
                            temp.push(`"${key}":{}`)
                        }
                    } else if (isValidBasicDataType(obj[key])) {   // 值是基本类型
                        temp.push(`"${key}":${processValue(obj[key])}`)
                    }
                });
                res += `${temp.join(',')}}`
            }
        } else if (isSymbol(obj)) { // Symbol 返回 undefined
            return
        } else {
            return obj  // 非 Symbol 的基本类型直接返回
        }
        return res
    }
})();


console.log(jsonStringify(obj));
console.log(JSON.stringify(obj));
```



