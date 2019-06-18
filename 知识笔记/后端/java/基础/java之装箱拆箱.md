# java基本数据类型、对应的封装类以及字符串之间的相互转换


## 基本数据类型与其对应的封装类之间的相互转换

* 直接赋值(自动装箱)

```js
Integer i = 3;
```

* 使用封装类的含参构造方法(实例化)

```js
Integer i = new Integer(3);
```

* 使用封装类提供的valueOf()方法(静态方法)

```js
Integer i=Integer.valueOf(3);
```

## 基本数据类型与字符串之间的相互转换

* 直接赋值(自动拆箱)

```js
Integer i = new Integer(2);
int j = i;
```

* 使用封装类提供的value()方法

```js
Integer i = new Integer(3);
int j = i.intValue();
float f = i.floatValue();
```

## 基本数据类型与字符串之间的相互转换

#### 基本数据类型转换为字符串

* 使用String类的valueOf()方法(静态方法)

```js
String s = String.valueOf(123);
```

* 使用封装类的toString()方法(静态方法)

```js
String s = Integer.toString(3);
```

* 使用字符串连接符`+`

```js
String s = "" + 123;
```

#### 字符串转换为基本数据类型

* 使用封装类的静态方法

```js
int i = Integer.parseInt("12");
```

## 封装类与字符串之间的相互转换

#### 字符串转换为封装类

* 使用封装类的含参构造方法(实例化)

```js
Integer i=new Integer("123");
```

* 使用封装类的valueOf()方法

```js
Integer i = Integer.valueOf("123");
```

#### 封装类转换为字符串

* 使用字符串连接符`+`

```js
Integer i = new Integer(123);
String s = i + "";
```

* 使用封装类的toString()方法

```js
Integer i = new Integer(123);
String s = i.toString();
```

* 使用String类的valueOf()方法

```js
Integer i = Integer.valueOf(123);
String s = String.valueOf(i);
```
