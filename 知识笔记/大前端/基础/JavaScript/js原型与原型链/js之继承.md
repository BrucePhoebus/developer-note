# js之继承

	js的继承主要分为原型式(原型链) 继承和类式继承

## 原型式(原型链)继承

	这是属于对象间的继承​​

#### 概述

	原型式继承： 是借助已有的对象创建新的对象， 将子类的原型指向父类， 就相当于加入了父类这条原型链

#### 思路

**demo**

```js
function obj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
var box = {
    name: 'trigkit4',
    arr: ['brother', 'sister', 'baba']
};
var b1 = obj(box);
console.log(b1.name); //trigkit4
b1.name = 'mike';
console.log(b1.name); //mike
console.log(b1.arr); //brother,sister,baba
b1.arr.push('parents');
console.log(b1.arr); //brother,sister,baba,parents
var b2 = obj(box);
console.log(b2.name); //trigkit4
console.log(b2.arr); //brother,sister,baba,parents
```

> 原型式继承首先在obj()函数内部创建一个临时性的构造函数， 然后将传入的对象作为这个构造函数的原型， 最后返回这个临时类型的一个新实例

#### 原型链继承

	为了让子类继承父类的成员（ 属性、 方法）， 首先需要定义一个构造函数； 然后将父类的新实例赋给构造函数的原型

**demo**

```js
function Parent() {
    this.name = 'mike';
}

function Child() {
    this.age = 12;
}
Child.prototype = new Parent(); // Child继承Parent，通过原型，形成链条
var test = new Child();
console.log(test.age);
console.log(test.name); //得到被继承的属性
//继续原型链继承
function Brother() { //brother构造
    this.weight = 60;
}
Brother.prototype = new Child(); //继续原型链继承
var brother = new Brother();
console.log(brother.name); //继承了Parent和Child,弹出mike
console.log(brother.age); //弹出12
```

#### 组合式继承

	原型链 + 构造函数继承

**demo**

```js
function Parent(age) {
    this.name = ['mike', 'jack', 'smith'];
    this.age = age;
}

function Child(age) {
    Parent.call(this, age);
}
var test = new Child(21);
console.log(test.age); //21
console.log(test.name); //mike, jack, smith
test.name.push('bill');
console.log(test.name); //mike, jack, smith, bill
```

**思路**

	使用原型链对原型属性和方法的继承， 通过借用构造函数实现对实例属性的继承
	这样即实现了原型定义方法的函数复用， 也保证了每个实例都有自己的属性

**问题**

	组合式继承的父类在使用的过程中会被调用两次

1. 在创建子类的时候
2. 在子类构造函数的内部

**问题解决**

	寄生组合继承

**标准组合式继承**

```js
function Parent(name) {
    this.name = name;
}
Parent.prototype.play = function() {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
// 多态
Child.prototype.play = function() {
    Parent.prototype.play.call(this);
    console.log(this.age);
}
```

#### 寄生式继承

	原型式 + 工厂模式
	使用寄生式继承是基于原型式继承的优化， 结合了工厂模式的优点， 实现了对象创建过程的封装

**demo**

```js
function obj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function create(o) {
    var f = obj(o); // 通过调用函数创建一个新对象
    f.run = function() { // 以某种方式增强整个对象
        return this.arr; // 同样， 会共享引用
    };
    return f;
}
```

#### 寄生组合式继承

	解决组合式继承调用两次父类构造方法的问题

**demo**

```js
// 复用原型
function obj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
// 寄生式创建对象
function create(parent, child) {
    var f = obj(parent.prototype); //创建对象
    f.constructor = child; //增强对象
    child.prototype = f; // 将子类原型指回自己的构造函数
}

function Parent(name) {
    this.name = name;
    this.arr = ['brother', 'sister', 'parents'];
}
Parent.prototype.run = function() {
    return this.name;
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
create(Parent, Child); //通过这里实现继承
var test = new Child('trigkit4', 21);
test.arr.push('nephew');
console.log(test.arr); //
console.log(test.run()); //只共享了方法
var test2 = new Child('jack', 22);
console.log(test2.arr); //引用问题解决
```

## 类式继承

	构造函数间的继承

#### 概述

	类式继承： 是子类构造函数的内部调用父类的构造函数

#### 思路

1. 先创建一个拥有属性、 方法、 原型方法的父类

2. 然后创建一个子类的构造方法， 在构造方法中继承父类对象的方法， 可以使用call函数

3. 然后在子类构造函数中继承父类原型所有成员

	* 首先使用Object.create(Person.prototype); 将父类原型所有成员让子类继承

	* 然后Teacher.prototype.constructor = Teacher; 将子类的原型的构造方法指回子类

	* 因为子类的构造方法是通过call继承父类时生成的， 子类原型的构造方法默认会指向父类， 所以要重新指回来

4. 最后便是创建子类的原型方法了

	创建子类的原型方法和创建父类的原型方法一样

#### demo

```js
// Person类
function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
};

// 定义原型方法
Person.prototype.greeting = function() {
    console.log('Hi! I\'m ' + this.name.first + '.');
};

// 创建Teacher类继承Person类的所有成员， 同时包含新的对象
/* 一个新的属性， subject——这个属性包含了教师教授的学科。 
一个被更新的greeting()方法， 这个方法打招呼听起来比一般的greeting()方法更正式一点——对于一个教授一些学生的老师来说。 
定义 Teacher() 构造器函数
创建一个Teacher()构造器
Teacher通过call()函数继承Person类的所有成员 */
function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests);
    this.subject = subject;
}

// 设置 Teacher() 的原型和构造器引用
// 继承Person.prototype的所有属性和方法
function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests);
    Teacher.prototype = Object.create(Person.prototype);
    Teacher.prototype.constructor = Teacher; // 因为使用call生成构造函数的时候调用的是父类的构造函数， 所以Teacher.prototype.constructor会指向父类， 应该修改回来， 指向Teacher
    this.subject = subject;
}

// 向 Teacher() 添加一个新的greeting()函数
// 给Teacher原型添加方法
Teacher.prototype.greeting = function() {
    var prefix;
    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
        prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
        prefix = 'Mrs.';
    } else {
        prefix = 'Mx.';
    }
    console.log('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};
```

#### 借用构造函数解决原型继承的两个问题： 字面量重写原型会中断关系， 使用引用类型的原型； 子类型还无法给超类型传递参数

**demo**

```js
function Parent(age) {
    this.name = ['mike', 'jack', 'smith'];
    this.age = age;
}

function Child(age) {
    Parent.call(this, age);
}
var test = new Child(21);
console.log(test.age); //21
console.log(test.name); //mike, jack, smith
test.name.push('bill');
console.log(test.name); //mike, jack, smith, bill
```

**问题**

	因为没有使用原型， 所以就不存在复用的说法

**问题解决**

	组合继承： 原型链 + 借用构造函数模式

#### 函数式继承
