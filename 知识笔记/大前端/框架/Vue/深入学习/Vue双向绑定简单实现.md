<!--
 * @Description: Vue双向绑定简单实现
 * @Date: 2019-08-15 11:37:11
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-15 17:17:24
 -->
# Vue双向绑定简单实现

> 先看看原理：[Vue响应式原理](知识笔记/大前端/框架/Vue/深入学习/Vue响应式原理.md)

## 前言

#### Vue响应式与非响应式

	js在对数组和对象监听时，是监听不到引用对象内容的变动的，也就是非响应式的
	所以Vue对数组和对象做了专门的处理

###### 对象实现响应式

* Vue对对象实现响应式的处理是在初始化的时候利用 `Object.definePrototype` 的定义set和get过滤器，在进行组件模板编译时实现watcher的监听搜集依赖项，当数据发生变化时在set中通过调用 `dep.notify()` 进行发布通知，实现视图的更新

###### 数组实现响应式

* 对于数组则是通过继承重写数组的方法 `splice、pop、push、shift、unshift、sort、reverse` 等可以修改原数组的方式实现响应式的，但是通过length以及直接利用 `item[index]` 方式修改数组是不能实现响应式的改变DOM（这种两种方式涉及到数组的内部实现）

  + 而在数据更新后为了避免过于频繁的进行DOM的操作，在vue中会将更新的DOM进行批量操作，而不是直接有数据更新就刷新DOM，vue将需要更新的DOM压入异步队列记性批量操作，提高性能

###### 在vue的data中定义的属性才具有响应式的效果

* 通过 `vue.name` 或者 `this.name` 形式定义的全局变量虽然可以在template中使用，但是其 `不是响应式` 的。同时在data中定义的对象obj，如果后面给对象定义新的属性也不是响应式的， `除非通过vue提供的方法set设置` 

``` js
new vue({
    data() {
        return {
            obj: {}
        }
    },
    methods: {
        this.obj.name = "hs" // 非响应属性
        this.$set(this.obj, 'name', 'hs') // name属性将会是响应式的
    }
})
```

> 所以，尽可能的把对象定义在data中，这样Vue在初始化的时候机会做响应化处理，如果特殊情况，我们也可以考虑使用`$set()`解决问题

## 应用

#### 简单实现input双向绑定

``` html
<div id="app">
    <input type="text" v-model="text">
    {{ text }}
</div>
```

``` js
/* 
	对象响应化
 */
function observe(obj, vm) {
	// 遍历对象，对对象进行响应化处理
    Object.keys(obj).forEach(function(key) {
        defineReactive(vm, key, obj[key]);
    });
}

/* 
	对象响应化具体实现
 */
function defineReactive(obj, key, val) {

	// 创建Dep对象，用于保存订阅者列表
    var dep = new Dep();

	// 数据拦截
    Object.defineProperty(obj, key, {
        get: function() {
            // 添加订阅者watcher到主题对象Dep
            if (Dep.target) dep.addSub(Dep.target);
            return val
        },
        set: function(newVal) {
            if (newVal === val) return
            val = newVal;
            // 作为发布者发出通知
            dep.notify();
        }
    });
}

function nodeToFragment(node, vm) {
	// 模板解析
    var flag = document.createDocumentFragment();
    var child;

    while (child = node.firstChild) {
        compile(child, vm);
        flag.appendChild(child); // 将子节点劫持到文档片段中
    }

    return flag;
}

function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    // 节点类型为元素
    if (node.nodeType === 1) {
        var attr = node.attributes;
        // 解析属性
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                node.addEventListener('input', function(e) {
                    // 给相应的data属性赋值，进而触发该属性的set方法
                    vm[name] = e.target.value;
                });
                node.value = vm[name]; // 将data的值赋给该node
                node.removeAttribute('v-model');
            }
        };

        new Watcher(vm, node, name, 'input');
    }
    // 节点类型为text
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1; // 获取匹配到的字符串
            name = name.trim();

            new Watcher(vm, node, name, 'text');
        }
    }
}

function Watcher(vm, node, name, nodeType) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
	// 对象更新，针对不同类型的对象执行不同更新操作
    update: function() {
        this.get();
        if (this.nodeType == 'text') {
            this.node.nodeValue = this.value;
        }
        if (this.nodeType == 'input') {
            this.node.value = this.value;
        }
    },
    // 获取data中的属性值
    get: function() {
        this.value = this.vm[this.name]; // 触发相应属性的get
    }
}

/* 
	Dep主题，用于保存订阅者列表
 */
function Dep() {
    this.subs = []
}

Dep.prototype = {
	// 添加订阅者的方法
    addSub: function(sub) {
        this.subs.push(sub);
    },

	// 发布通知的方法
    notify: function() {
		// 遍历列表中的每个订阅者，对每个订阅者执行更新操作
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

// 对象实例化入口
function Vue(options) {
	// 获取data对象
    this.data = options.data;
    var data = this.data;

	// 对data对象中的属性进行响应化处理
    observe(data, this);

    var id = options.el;
    var dom = nodeToFragment(document.getElementById(id), this);

    // 编译完成后，将dom返回到app中
    document.getElementById(id).appendChild(dom);
}

var vm = new Vue({
    el: 'app',
    data: {
        text: 'hello world'
    }
});
```

###### 思路分析

> <a href="知识笔记/大前端/框架/Vue/深入学习/简单input双向绑定模拟实现.html" target="_blank">看看效果</a> | [github源码](https://github.com/BrucePhoebus/developer-note/tree/master/知识笔记/大前端/框架/Vue/深入学习/简单input双向绑定模拟实现.html)

> 参考：[基于 getter 和 setter 撸一个简易的MVVM](https://www.cnblogs.com/likeFlyingFish/p/6201106.html)

