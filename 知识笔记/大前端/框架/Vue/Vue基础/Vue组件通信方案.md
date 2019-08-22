<!--
 * @Description: 
 * @Date: 2019-08-22 11:50:14
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-22 13:41:05
 -->
# Vue组件通信方案

## 概述

#### 有哪些Vue组件通信的手段

* `props` / `$emit` 父子组件通信

	单向数据流

* `ref` 与 `$parent / $children` 父子组件通信

* `EventBus` （`$emit / $on`） 父子、隔代、兄弟组件通信

* `$attrs`/`$listeners` 隔代组件通信

* `provide` / `inject` 隔代组件通信

* `Vuex` 父子、隔代、兄弟组件通信

#### `props` / `$emit` 父子组件通信

#### `ref` 与 `$parent / $children` 父子组件通信

#### `EventBus` （`$emit / $on`） 父子、隔代、兄弟组件通信

#### `$attrs`/`$listeners` 隔代组件通信

#### `provide` / `inject` 隔代组件通信

#### `Vuex` 父子、隔代、兄弟组件通信

	全局状态管理

#### 总结：场景分析

* 首先，最常用的方案，也就是父子组件通信和兄弟组件通信的场景

	* 这也是我们最常用的`props` / `$emit`和可能用到的`EventBus` （`$emit / $on`）(这个或许经常使用Vuex代替)

* 其次，一般不用的方案：`ref` 与 `$parent / $children` | `$attrs`/`$listeners` | `provide` / `inject`

	* 虽然能实现父子组件和隔代通信，但是已被`props/$emit`和`Vuex`所替代

* 最后，统一天下的`Vuex`

	* 这个几乎是个项目都会用到的全局状态管理工具，先不说性能怎么样，但是可以替代上述所有方案，当然父子组件通信我们一般还是使用`props/$emit`

