# seaJS-VS-requireJS

## 区别

1. 遵循的规范不同

	RequireJS 遵循 AMD（异步模块定义）规范，SeaJS 遵循 CMD （通用模块定义）规范。

2. factory 的执行时机不同

	SeaJS按需执行依赖避免浪费，但是require时才解析的行为对性能有影响。虽然是异步加载模块, 但执行模块的顺序也是严格按照模块在代码中出现(require)的顺序。

	RequireJS更遵从js异步编程方式，提前执行依赖，输出顺序取决于哪个 js 先加载完（不过 RequireJS 从 2.0 开始，也改成可以延迟执行）。如果一定要让 模块B 在 模块A 之后执行，需要在 define 模块时申明依赖，或者通过 require.config 配置依赖

> 如果两个模块之间突然模块A依赖模块B：SeaJS的懒执行可能有问题，而RequireJS不需要修改当前模块。

**示例**

	当模块A依赖模块B，模块B出错了：如果是SeaJS，模块A执行了某操作，可能需要回滚。RequireJS因为尽早执行依赖可以尽早发现错误，不需要回滚。

``` js
define(['a', 'b'], function(A, B) {
	//运行至此，a.js 和 b.js 已下载完成
	//A、B 两个模块已经执行完，直接可用
	return function () {};
});
```

3. 聚焦点有差异

	SeaJS努力成为浏览器端的模块加载器，RequireJS牵三挂四，兼顾Rhino 和 node，因此RequireJS比SeaJS的文件大

4. 理念不一样

	RequireJS 有一系列插件，功能很强大，但破坏了模块加载器的纯粹性。SeaJS 则努力保持简单，并支持 CSS 模块的加载。

**总结**

* SeaJS只会在真正需要使用(依赖)模块时才执行该模块，SeaJS是异步加载模块的没错, 但执行模块的顺序也是严格按照模块在代码中出现(require)的顺序, 这样也许更符合逻辑。

* RequireJS会先尽早地执行(依赖)模块, 相当于所有的require都被提前了, 而且模块执行的顺序也不一定100%就是先mod1再mod2 。因此你看到执行顺序和我们预想的完全不一样。

> 参考：[SeaJS从入门到原理](https://blog.csdn.net/sinat_17775997/article/details/52522767)
