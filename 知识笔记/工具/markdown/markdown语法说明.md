# markdown语法归纳

## 简述

	markdown是纯文本标记语言，通过简单的标记，使得纯文本内容具有一定的格式
	如果是静态网站，使用markdown进行开发是很不错的体验，重点是有docsify这类框架，让静态网页有比较好的体验

#### 优点

1. 因为是纯文本，所以只要支持markdown的地方都能获得一样的编辑效果，可以让作者摆脱排版的困扰，专心写作。

2. 操作简单
	
	比如:WYSIWYG编辑时标记个标题，先选中内容，再点击导航栏的标题按钮，选择几级标题。要三个步骤。而markdown只需要在标题内容前加#即可

#### 缺点

1. 需要记一些语法

	这是很正常的，什么东西不需要语法呢？当然主要是有些语法跟以前的不一样

2. 有些平台不支持Markdown编辑模式

	这可以忽略不计，因为主流的工具平台都支持，非主流的就无所谓了

> 注：具体实现网站可以参考[Vue官网](https://cn.vuejs.org/)，或[简述](https://www.jianshu.com/p/191d1e21f7ed)，因为简述就是支持markdown模式的，而且结合[docsify](开发积累/docsify/docsify安装及基本使用.md)使用体验更好

## 基础语法

#### 常用语法

1. 标题

	我们经常写文档第一个开头就是写个标题
	想要设置标题只要在文字前面加#就行

*例如*

```bash
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

> 一般我使用`一、二、四、六级`标题，但因为六级标题字体也是很小，所以经常使用`*`号加粗或`1. 2. 3. `序号代替

2. 字体

	因为标题太多，我们经常星号`*`加粗或斜线表示内容强调，或表示一个小标题

*斜线*

```bash
*斜线内容*
```

**加粗**

```bash
**加粗内容**
```

3. 代码

	作为一个开发人员，这获取写得最多的一种标识符了，一般都会把代码进行标识出来，这样明显显示效果比较好，有语法和高亮提示
	使用`，这是Esc下面的反引号图标，使用英文键时可以点出来，单行代码使用``包围，代码块使用``````包围

**单行代码**

```bash
`单行代码`
```

> 我们经常在单词或几个字中使用，表示强调

**代码块**

	```vue/bash/js/html/css...
	这是代码或某些示例内容
	```

	```js
	console.log("这是js内容");
	```

```bash
(```)
  代码...
  代码...
  代码...
(```)
```

> 注：为了防止转译，前后三个反引号处加了小括号，实际是没有的。这里只是用来演示，实际中去掉两边小括号即可

4. 引用

	这个我一直当作备注、注释或内容强调使用，使用大于号`>`表示
	其实还有多层引用`>>` `>>>`...但是一直没用过，一般就用一层`>`

```bash
> 引用内容
```

> 引用效果

5. 图片

	这对于写文章的人经常用的，在静态网页中插入一张图片对于使用markdown语法来说却是非常简单，写对图片地址就好了

```
![图片名](图片地址)
![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=702257389,1274025419&fm=27&gp=0.jpg "区块链")
![blockchain](../images/blockchain.png)
![blockchain](./blockchain.png)
```

![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=702257389,1274025419&fm=27&gp=0.jpg "区块链")

6. 链接

	这个对于写文章的人也挺常用的，我们经常在写文章的时候需要写个链接引用，例如：链接到某个官网、链接到下一页

```
[显示文件名](文件路径)
[markdown语法说明](知识笔记/工具/markdown/markdown语法说明.md)
```

[markdown语法问题](问题积累/语法问题/markdown语法问题/markdown语法问题.md) | [简书](http://jianshu.com) | [百度](http://baidu.com)

> 注：Markdown本身语法不支持链接在新页面中打开，如果想要在新页面中打开的话可以用html语言的a标签代替。

<a href="https://brucephoebus.github.io/developer-note/#/" target="_blank">Phoebus的笔记</a>

7. 列表

	这也是经常用的功能，因为有些时候标题太多不是很好看，偶尔会使用来当做小标题
	当然，它的根本作用就是列表，例如列举优点缺点。。。

**无须列表**

```bash
- 列表内容
+ 列表内容
* 列表内容
```

> 注：- + * 跟内容之间都要有一个空格

- 列表内容
+ 列表内容
* 列表内容

**有序列表**

```bash
1.列表内容
2.列表内容
3.列表内容
```

> 注：序号跟内容之间要有空格

1. 列表内容
2. 列表内容
3. 列表内容

8. 表格

	这个在做一些文章笔记的时候会使用作为内容说明、记个作者时间等信息、写项目版本号等

```bash
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右

|参数|说明|
|:---:|:---:|
|run|启动实例|
|-e|配置账号密码|
|-d|创建一个实例|
|mysql: tag|使用实例以及版本号|
```

> 注：原生的语法两边都要用 | 包起来。此处省略

|参数|说明|
|:---:|:---:|
|run|启动实例|
|-e|配置账号密码|
|-d|创建一个实例|
|mysql: tag|使用实例以及版本号|

#### 其他语法

1. markdown删除线

```html
~~删除线~~
```

> ~~这是过时的东西~~

> [参考](https://www.jianshu.com/p/191d1e21f7ed)
