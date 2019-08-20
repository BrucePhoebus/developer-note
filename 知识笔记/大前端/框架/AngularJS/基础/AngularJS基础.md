<!--
 * @Description: 初识AngularJS基础
 * @Date: 2019-08-16 11:11:49
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-20 10:30:51
 -->
# AngularJS基础

## 概述

> [官网](https://angular.cn/) | [Github](https://github.com/angular/angular)

#### AngularJS是什么？

	AngularJS 是一个创建富客户端应用的JS多平台框架(支持跨平台)
	是一个大而全的MVVM框架(MVC结构)，相当于N多个库的优秀集合

#### 重要概念

###### 数据绑定

###### 依赖对象和依赖注入

#### 重要思想

* 去DOM化

	* NG内部帮我们集成了很多的DOM操作，让我们无需关注DOM，而是更多的关注业务(所以一般不建议使用JQ等操作DOM)

* 模块化

	* 一切都起于模块

* 依赖注入

	* 为应用提供服务

* MVC - 思想

	* 将应用划分为：`Model、View、Controller`
	* 也就是：

		* 模型：数据处理。数据存储和部分业务逻辑操作
		* 视图：以友好的方式向用户展示数据。数据展示
		* 控制器：业务逻辑处理。用来初始化模型
	
	> 剥离开视图和逻辑之间的关系，无论怎么修改dom操作都不用修改业务逻辑代码

* 语义化标签(指令)

* 双向数据绑定

	* 通过`ng-model`指令进行数据双向绑定

> 跟`Vue`双向绑定效果一样，但是底层实现原理不一样，NG是通过[脏检查](只是笔记/大前端/AngularJS/深入学习/深入浅出ng脏检查.md)实现的

#### AngularJS结构

	angular是MVC结构，也就是View - Model - Controller

* View层就是用于表现的HTML和CSS

* Model层有点类似于Java里面的POJO，都是用来存放数据，只不过放在Js里面不应该用类的形式体现。

* Controller层则用来做一些数据操作

	* 为应用中的模型设置初始状态。

	* 通过 $scope 对象把数据模型和函数暴露给视图（UI 模板）。

	* 监视模型其余部分的变化，并采取相应的动作

###### 大致工作流程

1. 用户在浏览过程中产生一些数据，或者触发某些事件，使得Model中保存的数据发生了变化

2. Controller可以操作Model，并且和服务器交互

3. 和服务器交互完成之后，Controller修改Model的数据，Angular把数据更新到视图，实现双向绑定，数据同步


#### 常用指令

* ng-app: 指定模块名，angular管理的区域；

* ng-model： 双向绑定，输入相关标签；

* ng-init： 初始化数据；

* ng-click： 调用作用域对象的方法（点击时）；

* ng-controller: 指定控制器构造函数名，内部会自动创建一个新的子作用域（外部的）；

* ng-bind： 解决使用{{}}显示数据闪屏（在很短时间内显示{{}}）；

* ng-repeat： 遍历数组显示数据， 数组有几个元素就会产生几个新的作用域；

* $index, $first, $last, $middle, $odd, $even；

* ng-show: 布尔类型， 如果为true才显示；

* ng-hide: 布尔类型， 如果为true就隐藏

* ng-class: 动态引用定义的样式 {aClass:true,bClass:false}

* ng-style: 动态引用通过js指定的样式对象 {color:’red’, background:’blue’};

* ng-click: 点击监听, 值为函数调用, 可以传$event;

* ng-mouseenter: 鼠标移入监听, 值为函数调用, 可以传$event;

* ng-mouseleave: 鼠标移出监听, 值为函数调用, 可以传$event

## 入门引导

#### 参考引导

* 前置环境

	* 安装最新的`node`，自带最新的`npm`

> [nodejs入门](知识笔记/后端/nodejs/nodejs开发/nodejs入门.md)

* 安装全局依赖

``` bash
# 安装最新的TypeScript稳定版
$ npm install -g typescript 

# 安装angular cli脚手架
npm install -g @angular/cli
ng version
```

> 建议在此之前完成`node`和`npm`的一些配置修改，例如推荐添加`cnpm`可以使用国内淘宝镜像下载依赖(比较快)

* 找个地方开始第一个项目

``` bash
# 执行脚手架安装
ng new ng4-first-demo

# 问我们安不安装router
y
# 问我们选择使用哪种CSS语言开发
SCSS
```

> 之后便是直接自动安装，连`e2e`单元测试都帮我安装了。。。最后让我无语的是有`230M`大小，简直是庞大无比，不用看了，肯定功能强大得一批，什么鬼都集成上去了

> [Angular CLI 终极指南](https://segmentfault.com/a/1190000009771946)

!> 最后建议使用AngularJS + TypeScript + SCSS(预编译CSS) + ...进行开发 

#### 常用操作

1. 使用`$scope.$watch()`方法监听一个表达式

2. 使用`$scope`暴露模型数据

3. 使用`Module`（模块）组织依赖关系，可以自动解析依赖关系

4. 使用`Angular`提供的事件处理指令来替代原生JS的事件属性，例如`ng-click`。

	* 这样的好处是可以在所有浏览器中具有相同的行为，Angular将会帮我们屏蔽差异性。
	* 并且不会在全局命名空间中进行操作，我们所指定的表达式只能访问元素控制器作用域范围内的函数和数据

5. 使用`ng-repeat`指令进行迭代

6. 使用`ng-show`和`ng-hide`来显示和隐藏元素，ng-if可以减少脏检查

7. 使用`ng-class`和`ng-style`来修改样式

8. 在`src`和`href`属性中嵌入`Angular表达式`时，使用`ng-src`和`ng-href`指令

#### NG学习18问

###### 1. 项目结构怎么看

``` bash
# 根目录
node_modules		# 第三方依赖包存放目录
e2e  				# 端到端的测试目录  用来做自动测试的
src   				# 应用源代码目录  
.angular-cli.json   # Angular命令行工具的配置文件。后期可能会去修改它，引一些其他的第三方的包  比如jquery等
karma.conf.js  		# karma是单元测试的执行器，karma.conf.js是karma的配置文件
package.json   		# 这是一个标准的npm工具的配置文件，这个文件里面列出了该应用程序所使用的第三方依赖包。实际上我们在新建项目的时候，# 等了半天就是在下载第三方依赖包。下载完成后会放在node_modules这个目录中，后期我们可能会修改这个文件。
protractor.conf.js  # 也是一个做自动化测试的配置文件
README.md           # 说明文件
tslint.json       	# 是tslint的配置文件，用来定义TypeScript代码质量检查的规则，不用管它
tsconfig.app.json	# TypeScript编译器的配置,添加第三方依赖的时候会修改这个文件
tsconfig.spec.json	# 不用管

# src下：放资源 + 配置 + app源码 + 全局样式 + 入口等
app目录				# 包含应用的组件和模块，我们要写的代码都在这个目录
assets目录  		# 	资源目录，存储静态资源的  比如图片
environments目录   	# 环境配置。Angular是支持多环境开发的，我们可以在不同的环境下（开发环境，测试环境，生产环境）共用一套代码，主要用来配置环境的
index.html  		# 整个应用的根html，程序启动就是访问这个页面
main.ts    			# 整个项目的入口点，Angular通过这个文件来启动项目
polyfills.ts   		# 主要是用来导入一些必要库，为了让Angular能正常运行在老版本下
styles.css   		# 主要是放一些全局的样式
test.ts    			# 也是自动化测试用的
typings.d.ts        # 不用管

# app目录：放源码文件
app.component.ts	# 这个文件表示入口组件，一般我们都不改它(全局配置可能要)，当然一般也可以改个项目名等
app.component.html	# app页面，入口html，入口模板，我们一般从这里开始
app.component.css	# app页面样式
app.module.ts		# 模块化文件，可以在这里进行路由管理
```

> 参考：[Angular项目目录结构详解](https://blog.csdn.net/yuzhiqiang_1993/article/details/71191873)

###### 2. 怎么新建组件和服务并使用

**创建**

``` bash
# 新建组件命令
ng g component 组件名
# 例如：ng g component product-list / 简写：ng g c product-list
# 这样就能自动脚手架创建组件，并且注册到模块(app.module.ts)中去

# 新建服务命令
ng g service cart
# 简写：ng g s cart
```
**组件使用**

``` js
// 一是直接在组件中作为子组件导入，例如在 app.component.html 文件中：
<app-product-list></app-product-list>

// 二是在模块中进行路由注册：这样就是根据路由控制，用户访问的时候才显示
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
	// ...
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		RouterModule.forRoot([
			{ path: 'productList', component: ProductListComponent },
		])
	],
	// ...
})
```

**服务使用**

``` js
// 首先创建的服务 cart.service.ts 中实现数据共享
export class CartService {

	// 存储购物车数据
	items = [];

	// 添加商品到购物车
	addToCart( product ) {
		this.items.push(product);
	}
}

// 然后在需要的业务页面调用使用该服务：product-details.component.ts
// 导入购物车服务
import { CartService } from '../cart.service';
// 调用cart服务，将商品添加到购物车
addToCart( product ) {
	this.cartService.addToCart(product);
}
// 最后在页面中调用该方法就能用了，而页面跳转后其他页面也能共享到这个服务的数据：items，可以通过localStorage进行数据持久化
```

###### 3. 父子组件怎么传值

``` js
/* 
	在父组件中标签式引入子组件，这里子组件名为：product-alerts
	[product]="product" 表示父组件向子组件传值，传入变量为product的数据，后面的product表示某个变量，变量在组件中定义：product-list.component.ts

	(notify)="onNotify()" 表示子组件向父组件通信，父组件通过onNotify()方法接收，父组件依然是在product-list.component.ts接收处理
 */
<app-product-alerts
    [product]="product"
    (notify)="onNotify()">
</app-product-alerts>

/* 
	子组件实现：
 */
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
...{
	/*
	* @Input 装饰器
	* 指出其属性值是从组件的父组件中传入的：这里是商品列表组件导入
	* */
	@Input() product;

	/*
	* @Output 装饰器和事件发射器（EventEmitter）
	* 让商品提醒组件在 notify 属性发生变化时发出事件
	* */
	@Output() notify = new EventEmitter();
	// ...
}
```

###### 4. 怎么进行路由跳转并传值？

**上一级页面实现跳转**

``` html
<!-- 
	上一级页面只需要实现html，然后根据配置的路由和 [routerLink] 属性直接跳转制定路由页面
 -->
<div *ngFor="let product of products, index as productId">
	<!-- 这里点击姓名就会调转到路由为：products的页面，并且传递参数：productId -->
	<a [title]="product.name + ' details'" [routerLink]="['/products', productId]">
		{{ product.name }}
	</a>
</div>
```

**下一级页面接收**

``` js
/* 
	下一级页面要接受参数，需要在组件(product-details.component.ts)中写点东西
	ActivatedRoute 专门用于由 Angular 路由器加载的每个路由组件。它包含关于该路由、路由参数以及与该路由关联的其它数据的信息
 */
import {ActivatedRoute} from '@angular/router';
export class ProductDetailsComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
	) { }
	ngOnInit() {
		// 订阅（subscribe）路由参数
		this.route.paramMap.subscribe(params => {
			// 接收路由参数
			params.get('productId');
		});
	}
}
```

###### 5. 关于angular开发的注意事项

* Controller使用过程注意事项

	1. 不要试图去复用controller，一个控制器一般只负责一小块视图；

	2. 不要在controller中操作DOM，这不是控制器的职责；

	3. 不要在controller中做数据格式化，ng有很好的表单控件；

	4. 不要在controller中做数据过滤，ng有$filter服务；

	5. controller一般是不会互相调用的，控制器之间的交互会通过事件进行


###### 6. 关于模板和数据绑定的流程

1. 用户请求应用起始页。

2. 用户的浏览器向服务器发起一次 HTTP 连接，然后加载index.html 页面，这个页面里面包含了模板。

3. Angular 被加载到页面中，等待页面加载完成，然后查找 ng-app指令，用来定义模板边界。

4. Angular 遍历模板，查找指令和绑定关系，这将触发一系列动作
	
	* 注册监听器、执行一些 DOM 操作、从服务器获取初始化数据。
	
	* 最后应用启动，并且模板被转换成了 DOM 视图。

5. 连接到服务器去加载需要展示给用户的其他数据

## 应用

#### 第一个demo

* 创建项目

``` bash
ng new ng4-first-demo

# 运行
ng serve --open
```

* 添加组件：模块化开发

``` bash
# 控制台输入
ng g component top-bar

# 在top-bar-component.html 实现页面
# 在top-bar-component.ts实现业务逻辑
# 在top-bar-component.css 实现样式
```

* 效果展示

``` bash
# 在 app-component.html中使用组件
<app-top-bar></app-top-bar>
# 或在app.module.ts中注册组件
```

> [参考demo](https://github.com/BrucePhoebus/ng4-first-demo)

> 参考：[Angular 4 教程](https://www.w3cschool.cn/angular/angular-12c825ux.html) | [AngularJS 菜鸟教程](https://runoob.com/angularjs/angularjs-tutorial.html) | [Angular框架介绍](https://blog.csdn.net/mutouafangzi/article/details/77199346)
