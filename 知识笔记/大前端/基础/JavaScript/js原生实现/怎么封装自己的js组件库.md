# 怎么封装自己的js组件库？

## 概述

#### 前言

	项目中我们经常会用到别人已经封装好的组件或插件， 例如PDF预览插件， 最出名的就是jQuery了， 虽然它已经慢慢被替代， 但是无疑它的组件封装的写法是值得我们初学者研究的， 也就是可以研究研究它的源码实现

> [JQ源码学习](知识笔记/大前端/基础/JavaScript/js原生实现/JQ源码学习.md)

#### 组件封装思路

	要实现组件库， 我们首先要有组件封装的基础认识， 也就是组件封装的结构是怎么样的？ 我们要怎么写才比较好？(结构严谨、 易拓展)， 这些都是别人玩透玩烂的东西， 也就已经有很多成品的， 而作为初学者的我们， 第一步就是要学会抄， 抄着学， 先知道组件封装的结构应该是怎么样的， 然后再慢慢理解为什么是这样的。

1. 我们都是把组件写在匿名函数中，这样避免了污染全局变量，当然我们一般会考虑传点什么参数或说依赖什么插件，例如，我们可能依赖jquery开发，也就是把jquery作为参数传进组件

``` js
// 这里可以进行参数重命名，喜欢叫啥都行
(function($, global) {

})(jquery, typeof window !== "undefined" ? window : this);	// 把jquery作为参数传进我们的组件中，相当于当前组件依赖于jquery，还可以传window等参数
```

2. 然后便是正式编写组件逻辑，不过一般组件实现都有一定严谨的结构参考，也就是我们的代码要可维护的，不是光有功能就行，要好看、有注释、又方便拓展。。。

	* 我们可以创建一个类(或函数对象)，将我们组件的方法封装到里面，插件式的写法是返回该对象给引用者使用，组件式的写法是将该组件挂载到当前window对象中
	* 造轮子的时候我们一般都是插件式写法，也就是我们将所有功能都封装到一个对象中，然后返回该对象给引用者使用；而一些项目中，我们需要封装一些全局组件，这个时候我们可以考虑把组件挂载到window对象中。当然二者并不冲突

``` js
(function($, global) {

	// 将组件的方法封装在一个类中
    function Person() {}

	// 将组件绑定到window对象上
	var Person = new Person();
    global.Person = global.$ = Person;

	return Person;

})(jquery, typeof window !== "undefined" ? window : this);
```

3. 最后便是里面的实现逻辑了，这个就比较复杂，主要是想要写得好要有好的编程思维，或说函数式编程或面对对象编程

``` js
(function($, global) {

	// 将组件的方法封装在一个类中
    function Person() {}

	// 直接将所有行为函数(给引用者的操作)放到原型对象中，并且运行引用者进行对象拓展
	Person.prototype = {
		eat: function(food) {
			console.log("吃" + food);
		},
		say: function(message) {
			console.log("说" + message);
		}
	}

	return Person;

})(jquery, typeof window !== "undefined" ? window : this);
```

> 当然，这只是个示例，大概的组件封装可以这样写，但具体还得根据各种需求指定实现，不过我们有些功能组件可以参考

> [常用CSS方法封装实现](知识笔记/大前端/基础/JavaScript/js原生实现/常用CSS方法封装实现.md) | [js实现弹框插件实现](知识笔记/大前端/基础/JavaScript/js原生实现/js实现弹框插件.md)

## 应用

#### 基础认识

	先写几个简单的实现， 开门大吉

###### 最简单的组件封装

	点击div框实现颜色改变和隐藏

``` html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style type="text/css">
.test1{
   background-color: #c39729;
   width: 100px;
   height: 100px;
}
.test2{
   background-color: #2315c3;
   color: red;
   width: 100px;
   height: 100px;
}
.test3{
   background-color: #c30505;
   color: red;
   width: 100px;
   height: 100px;
}

</style>

<script>
(function(window, undefined) {

   // 将组件的方法封装在一个类中
   function myComponent() {
   }
   myComponent.prototype = {
   		// 这里可以添加组件方法
		changeColor: function(that, color){
       		that.style.background = color;
        },
       	hide:function(that){
       		that.style.display = 'none';
       	}
   };
   // 将组件绑定到window对象上
   window.myComponent = window.myComponent || new myComponent();

})(window);

</script>
</head>
<body>
	<p>测试Js封装组件</p>
	<div class="test1" onclick="myComponent.changeColor(this,'#41c30d');">测试块1</div>
	<div class="test2" onclick="myComponent.changeColor(this,'#c30505');">测试块2</div>
	<div class="test3" onclick="myComponent.hide(this);">点击隐藏</div>
</body>

</html>
```

