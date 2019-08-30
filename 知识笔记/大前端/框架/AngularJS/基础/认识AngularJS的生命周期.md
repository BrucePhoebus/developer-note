<!--
 * @Description: 认识AngularJS的生命周期
 * @Date: 2019-08-21 16:58:23
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-30 16:31:03
 -->
# 认识AngularJS的生命周期

## 概述

#### AngularJS生命周期有哪些

* ngOnChanges()

	* 当数据绑定输入属性的值发生变化时调用

* ngOnInit()

	* 在第一次 ngOnChanges 后调用(只调用一次)

* ngDoCheck()

	* 自定义的方法，用于检测和处理值的改变
	* 跟随ngOnChanges() 和 ngOnInit() 后面调用

* ngAfterContentInit()

	* 在组件内容初始化之后调用
	* 第一次 ngDoCheck() 之后调用(只调用一次)

* ngAfterContentChecked()

	* 组件每次检查内容时调用
	* ngAfterContentInit() 和每次 ngDoCheck() 之后调用

* ngAfterViewInit()

	* 组件相应的视图初始化之后调用
	* 第一次 ngAfterContentChecked() 之后调用(只调用一次)

* ngAfterViewChecked()

	* 组件每次检查视图时调用
	* ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用

* ngOnDestroy()

	* 指令/组件销毁前调用

##### 生命周期钩子分类

1. 指令与组件共有的钩子：

	ngOnChanges
	ngOnInit
	ngDoCheck
	ngOnDestroy

2. 组件特有的钩子

	ngAfterContentInit
	ngAfterContentChecked
	ngAfterViewInit
	ngAfterViewChecked

#### 指令组件生命周期钩子详情

###### 1、构造函数constructor()

	constructor是ES6中class中新增的属性

* Angular中的组件就是基于class类实现的，当class类实例化的时候会调用constructor，用来初始化类，对于Angular来说就是用于注入依赖

* 组件的构造函数会在所有的生命周期钩子之前被调用，它主要用于依赖注入或执行简单的数据初始化操作

``` js
constructor(
	// 注入HeroService，创建一个HeroService单例对象：heroService
	private heroService: HeroService,
) {
	// 初始化数据
}
```

###### 2、ngOnInit()

	在第一次 ngOnChanges 后调用(只调用一次)

* 它主要用于执行组件的其它初始化操作或获取组件输入的属性值

* 在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件

> 注：此时组件已初始化，可以进行数据操作

**有什么用？**

* 在构造函数之后马上执行复杂的初始化逻辑

* 在Angular设置完输入属性之后，对该组件进行准备

``` bash
ngOnInit() {
	console.log('ChildComponent ngOnInit', this.pname); 
	// output: 输入的pname值
}
```

###### 3、ngOnChanges()

	当数据绑定输入属性的值发生变化时调用

* 当数据绑定输入属性的值发生变化的时候，Angular 将会主动调用 ngOnChanges 方法。

* 它会获得一个 SimpleChanges 对象，包含绑定属性的新值和旧值，它主要用于监测组件输入属性的变化

* 当Angular（重新）设置数据绑定输入属性时响应。该方法接受当前和上一属性值的SimpleChanges对象

* 当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在ngOnInit()之前

``` js
import { Input, SimpleChanges } from '@angular/core';

@Input()
public name: string;

ngOnChanges(changes: SimpleChanges) {
	// 定义了一个输入属性name并将从a它改为ab之后的打印结果
	console.dir(changes);	// name:SimpleChange {previousValue: "a", currentValue: "ab", firstChange: false}
}
```

> 注：只有绑定变量是基本类型以及引用类型地址发生变化时才会触发

**有什么用？**

	很明显只要Angular监听到属性值发生变化的时候，它就会触发这个钩子

* 也就是我们可以在这个钩子上拦截所有绑定属性的变化，准确的说法是过滤，我们可以对部分属性针对处理

###### 4、ngOnDestroy()

	指令/组件销毁前调用

* 在指令被销毁前，将会调用 ngOnDestroy() 方法，主要用于执行一些清理操作：

	移除事件监听、清除定时器、退订 Observable 等

* 当Angular每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏

	简单的说就是我们可以手动回收部分内存

**有什么用？**

* 这是组件彻底销毁之前，也就是数据、实例还可以使用，这个时候我们可以进行一些清理逻辑、事件回调、提示用户即将离开等，尤其是释放一些Angular不会主动释放的内存(例如localStorage存储的数据)

* 取消那些对可观察对象和DOM事件的订阅。停止定时器。注销该指令曾注册到全局服务或应用级服务中的各种回调函数

* 如果不这么做，就会有导致内存泄露的风险

``` js
ngOnDestroy() {
	window.clearInterval(this.sayHiya);
}
```

###### 5、ngDoCheck()

	自定义的方法，用于检测和处理值的改变
	跟随ngOnChanges() 和 ngOnInit() 后面调用

> ngDoCheck()是Angular中的变更检测机制，由zone.js来实现的

* 其行为是只要Angular中的某个组件发生异步事件，就会检查整个组件树，以保证组件属性的变化或页面的变化是同步的，所以ngDoCheck()的触发相当频繁的

	也许我们在页面上的一个无意识的操作都会触发几十次ngDoCheck()

**有什么用？**

* 检测，使用 DoCheck 钩子来检测那些 Angular 自身无法捕获的变更并采取行动

	我们自定义检查(判断)，提高效率，降低无用的触发

``` js
// 扩展OnChanges
ngDoCheck() {

  if (this.hero.name !== this.oldHeroName) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
    this.oldHeroName = this.hero.name;
  }

  if (this.power !== this.oldPower) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
    this.oldPower = this.power;
  }

  if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      let count = this.noChangeCount += 1;
      let noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      if (count === 1) {
        // add new "no change" message
        this.changeLog.push(noChangeMsg);
      } else {
        // update last "no change" message
        this.changeLog[this.changeLog.length - 1] = noChangeMsg;
      }
  }

  this.changeDetected = false;
}
```


###### 6、ngAfterContentInit()

	当把内容投影进组件之后调用
	第一次 ngDoCheck() 之后调用(只调用一次)

* 在组件使用 ng-content 指令的情况下，Angular 会在将外部内容放到视图后用

* 主要用于获取通过 @ContentChild 或 @ContentChildren 属性装饰器查询的内容视图元素

* 当父组件向子组件投影内容的时，在子组件内会初始化父组件的投影内容,此时会调用ngAfterContentInit()生命周期钩子

> 注：整个组件生命周期中ngAfterContentInit()生命周期钩子只会调用一次

``` js
// 父组件
<app-child>
  <p>我是父组件向子组件的投影内容</>
</app-child>

// 子组件 ChildComponent
<div>
  // 接受父组件的投影内容，第一次初始化时调用
  <ng-content></ng-content>
</div>
```

###### 7、ngAfterContentChecked()

	每次完成被投影组件内容的变更检测之后调用
	ngAfterContentInit() 和每次 ngDoCheck() 之后调用

* 当父组件向子组件的投影内容发生改变时会调用ngAfterContentChecked()生命周期钩子

	* 与ngDoCheck()类似，当投影内容发生改变时，就会执行变更检查机制，同时调用ngAfterContentChecked()

> 注：当父组件和子组件都有投影内容时，会先执行父组件的生命周期钩子

	并且ngAfterViewInit()和ngAfterViewChecked()相反

###### 8、ngAfterViewInit()

	初始化完组件视图及其子视图之后调用
	第一次 ngAfterContentChecked() 之后调用(只调用一次)

* 当其组件本身和所有的子组件`渲染完成`，已经呈现在页面上时，调用`ngAfterViewInit()`生命周期钩子

> 注：整个组件生命周期中ngAfterViewInit()生命周期钩子只会调用一次

###### 9、ngAfterViewChecked()

	每次做完组件视图和子视图的变更检测之后调用
	ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用

* 当组件及其子组件的视图发生改变时，执行完变更检查机制后调用

> 注：当父组件和子组件都发生视图变化时，会先执行子组件的生命周期钩子

> 视图发生改变不一定是真正页面上的变化.只是Angular种所认为的视图变化.因为Angular本身并不能察觉到页面上显示的视图.所以在Angular认为，只要在定义的属性发生了改变，就是视图有了变化.从而就会调用ngAfterViewChecked()生命周期钩子

> 参考：[生命周期钩子](https://angular.cn/guide/lifecycle-hooks) | [对Angular中的生命周期钩子的理解](https://juejin.im/post/597dd3546fb9a03c5945699a) | [angular生命周期](https://www.jianshu.com/p/a2f1d54097f8)
