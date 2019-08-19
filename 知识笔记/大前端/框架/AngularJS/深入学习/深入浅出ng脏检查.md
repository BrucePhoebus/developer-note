<!--
 * @Description: 深入浅出ng脏检查
 * @Date: 2019-08-15 11:33:27
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-19 18:19:50
 -->
# 深入浅出ng脏检查

## 概述

#### 什么是脏检查(Dirty checking)？

* 双向数据绑定是 AngularJS 的核心机制之一。当 view(UI) 中有任何数据变化时，会更新到 model，当 model 中数据有变化时，view 也会同步更新，这样就实现操作数据等同于操作DOM

* 当UI发生变化时，很容易做处理，也就是我们看到的已经变了，剩下的js处理model就好了；

* 但是当数据发生变化的时候，却是很难监控，需要一种监控机制，而在angular中，它没办法监控到那个数据变了，所以它设置了一些条件，当条件被触发时，就遍历一定范围的数据，通过之前保存的快照进行新旧数据对比，这就是所谓的`脏检查`(`脏数据检查`)

* 而脏数据，也是官方的叫法；因为它存在一定性能问题，也就是我们要检查的脏数据范围到底是那些，最早(angular1.x)的时候，检查的数据范围太大，太过于频繁，导致出现了严重的性能问题

* 当然现在已经进行了部分优化(但是本质问题还存在)，并且他是将多次数据变更进行批处理，这样可以减少DOM操作，更进一步优化，也就是性能方面的影响越来越小

* 一般项目使用完全没有影响，绑定几十个上百个数据完全没问题，当然如果一个页面绑定过多(上千个)的数据，就很容易引发性能问题，但大项目一般都是会考虑的

**示例解说**

	用户点击了 button，angular 执行了一个叫 onClick 的方法

``` js
DOM.addEventListener('click', function ($scope) {
  	$scope.$apply(() => userCode());
});
```

* 这个 onClick 的方法体对于 angular 来说是黑盒，它到底做了什么不知道。可能改了 $scope.content1 的值，可能改了 $scope.content2 的值，也可能两个值都改了，也可能都没改

* 那么 angular 到底应该怎样得知 onClick() 这段代码后是否应该刷新 UI，应该更新哪个 DOM 元素？angular 必须去挨个检查这些元素对应绑定表达式的值是否有被改变

> 这就是所谓的`脏检查`，但是这就有个核心问题了，它什么时候回出现进行脏检查，还有进行哪些对象检查？

#### 首先，angular具体检查的对象是什么？

	首先angular不会脏检查所有的对象，也不会不会脏检查所有的属性

> 只有当对象被绑定到html中，这个对象添加为检查对象（watcher）；只有当属性被绑定后，这个属性会被列为检查的属性

``` js
watcher = {
    fn: listener,          // 监听回调函数
    last: initWatchVal,    // 上一状态值
    get: get,              // 取得监听的值
    exp: watchExp,         // 监听表达式
    eq: !!objectEquality   // 要不要比较引用
};
```

> 也就是在angular程序初始化时，会将绑定的对象的属性添加为监听对象（watcher），也就是说一个对象绑定了N个属性，就会添加N个watcher

#### 而angular什么时候开始脏检查？

	一般一些事件回调执行完后就会触发 脏检查，而 $apply() 就是触发脏检查的函数

* 绝大多数事件触发都会进行脏检查

	* controller初始化的时候
	* ng-click事件和所有以ng-开头的事件执行后
	* $http回调完成后

> 这些事件执行完后(但不限于这些)，就会触发脏检查

**这样就有个问题了：触发脏检查的点是在函数执行完之后，那么如果存在异步函数还未执行完？**

``` js
function Ctrl($scope) {
    $scope.message = "Waiting 2000ms for update";
    setTimeout(function () {
        $scope.message = "Timeout called!";
        // AngularJS unaware of update to $scope
    }, 2000);
}
```

> DOM上显示的message是 "Waiting 2000ms for update"，永远都不是 "Timeout called!"

* 这就是`$apply`的应用场景，使用`$scope.$apply()`手动触发脏检查

* 当然还有个解决办法，使用`$timeout`替代setTimeout执行异步，因为它执行完后angular会自动触发`$apply()`

#### 最后就是如何进行脏检查

	触发脏检查angular是用 $apply()，而执行脏检查是使用 $digest()

> 也就是`$apply()`最终会触发`$digest()`实现脏检查

``` js
// $digest()核心实现：遍历watchers，比较监视的属性是否变化
if ((watchers = current.$watchers)) {
    // process our watches
    length = watchers.length;
    while (length--) {
        try {
            watch = watchers[length];
            // Most common watches are on primitives, in which case we can short
            // circuit it with === operator, only when === fails do we use .equals
            if (watch
                && (value = watch.get(current)) !== (last = watch.last)
                && !(watch.eq ? equals(value, last) : (typeof value == 'number'
                    && typeof last == 'number' && isNaN(value) && isNaN(last)))) {
                dirty = true;
                watch.last = watch.eq ? copy(value) : value;
                watch.fn(value, ((last === initWatchVal) ? value : last), current);
                if (ttl < 5) {
                    logIdx = 4 - ttl;
                    if (!watchLog[logIdx]) {
                        watchLog[logIdx] = [];
                    }
                    logMsg = (isFunction(watch.exp)) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                    logMsg += '; newVal: ' + toJson(value) + ';oldVal: ' + toJson(last);
                    watchLog[logIdx].push(logMsg);
                }
            }
        } catch (e) {
            $exceptionHandler(e);
        }
    }
}
```

#### 脏检查对比set/get的优劣

* angularJS脏检查实现起来简单，set/get实现很麻烦，对表达式的处理更麻烦

	* 也就是angularJS脏检查除了性能问题(检查比较太多了)外，我们无需有任何担心，随便进行任何对象绑定，随便赋值，不用担心表达式的问题
	* 但是Vue等实现的set/get虽然道理简单，性能也不错，但是其实底层实现起来很是麻烦，对复杂表达式处理容易出现问题

!> 关于脏检查的道理其实在其他不少框架都有用到，例如：`React` 每次生成新的 `Virtual DOM`，与旧 `Virtual DOM`的 `diff 操作`本来就可以看做一次脏检查

#### 关于angularJS使用注意事项

* 表达式（以及表达式所调用的函数）中少写太过复杂的逻辑

	* 复杂的表达式容易触发多重检查

* 不要连接太长的 filter（往往 filter 里都会遍历并且生成新数组）

* 不要操作 DOM 元素

	* 当然MVVM模式下开发都不建议操作DOM，angular更甚

#### angularJS优化开发

###### 使用单次绑定减少绑定表达式数量

* 单次绑定。它以 `::` 开头，当脏检查发现这种表达式的值不为 `undefined` 时就认为此表达式已经稳定，并取消对此表达式的监视。

* 这是一种行之有效的减少绑定表达式数量的方法，与 `ng-repeat` 连用效果更佳，但过度使用也容易引发 `bug`

###### 善用`ng-if`减少绑定表达式的数量

* 每一个 `ng-if` 拥有自己的 `scope`，`ng-if` 下面的 `$watch` 表达式都是注册在 `ng-if` 自己 `scope` 中

* 当 `ng-if` 变为 `false`，`ng-if`下的 `scope` 被销毁，注册在这个 `scope` 里的绑定表达式也就随之销毁了

**对于一些情况，使用ng-if效果远远好于ng-show**

``` js
<div ng-if="selectedTab === 1">[[Tab 1 body...]]</div>
<div ng-if="selectedTab === 2">[[Tab 2 body...]]</div>
<div ng-if="selectedTab === 3">[[Tab 3 body...]]</div>
<div ng-if="selectedTab === 4">[[Tab 4 body...]]</div>
```

> 如果这里使用`ng-show`即使我们用`display: none;`隐藏了DOM，但对于angular来说还是存在，也就是还是会进行检查

**这样会有比较大的优点**

* 首先 DOM 树中的元素个数显著减少至四分之一，降低内存占用

* 其次 $watch 表达式也减少至四分之一，提升脏检查循环的速度

* 如果这个 tab 下面有 controller（例如每个 tab 都被封装为一个组件），那么仅当这个 tab 被选中时该 controller 才会执行，可以减少各页面的互相干扰

* 如果 controller 中调用接口获取数据，那么仅当对应 tab 被选中时才会加载，避免网络拥挤

**当然，ng-if也存在本质的问题**

* DOM 重建本身费时间

* 如果 tab 下有 controller，那么每次该 tab 被选中时 controller 都会被执行

* 如果在 controller 里面调接口获取数据，那么每次该 tab 被选中时都会重新加载

> 所以总体要对业务了解，进而综合选择

###### 使用分页减少绑定个数

	这个道理最简单了，使用分页减少DOM数，也就是相对减少了脏检查数了，当然一般前后端都会这样处理

## 示例学习

#### 脏检查的范围

###### 问：点击 test 这个按钮时会触发脏检查吗？触发几次？

``` html
<div ng-show="false">
	<span id="span1" ng-bind="content"></span>
</div>
<span id="span2" ng-bind="content"></span>
<button ng-click="">test</button>
```

**分析**

1. 首先：`ng-click=""`什么都没有做。`angular`会因为这个事件回调函数什么都没做就不进行脏检查吗？不会

2. 然后：`#span1` 被隐藏掉了，会检查绑定在它上面的表达式吗？尽管用户看不到，但是`$scope.$watch('content', callback)`还在。就算我们直接把这个`span`元素干掉，只要`watch`表达式还在，要检查的还会检查

3. 重复的表达式会重复检查吗？会

4. `ng-show="false"`。可能是因为 `angular` 的开发人员认为这种绑定常量的情况并不多见，所以 `$watch` 并没有识别所监视的表达式是否是常量。常量依旧会重复检查

**所以最终答案是：触发三次**

	一次 false，一次 content，一次 content

> 所以只要对于angular来说可能存在于DOM树中的对象或存在触发可能(满足脏检查)的事件就会被脏检查

**最后建议**

* 建议使用`ng-if`减少表达式数量，而尽量少使用`ng-show`

## 源码学习




> 参考：[AngularJS 脏检查深入分析](https://www.cnblogs.com/likeFlyingFish/p/6183630.html) | [详解angular脏检查原理及伪代码实现](https://www.jb51.net/article/141712.htm) | [什么是脏检测，angular的双向绑定机制为什么叫脏检测，双向绑定具体细节是怎么样的？](https://www.zhihu.com/question/43470158) | [脏检查: 数据绑定的秘密](http://www.phperz.com/article/15/0906/154484.html) | [AngularJS的scope.$apply](https://www.w3cschool.cn/gejiawenangularjs/gejiawenangularjs-qmw924qw.html)
