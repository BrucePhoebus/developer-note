# nodejs文件操作

> nodejs 提供了基本的文件操作API，但是像文件拷贝这种高级功能就没有提供，因此我们先拿文件拷贝程序练手。与copy命令类似，我们的程序需要能接受`源文件路径`与`目标文件路径`两个参数。

## 初识文件操作

#### 小文件拷贝

	使用nodejs内置的 fs模块 实现

*参考示例*

```js
var fs = require('fs');

function copy(src, paramPath) {
	fs.writeFileSync(paramPath, fs.readFileSync(src));
}

function main(argv) {
	copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

> 注：process是一个全局变量，可以通过process.argv活动命令行参数。由于argv[0]固定等于nodejs执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。

#### 大文件拷贝

	使用上面的程序直接读写一些小文件不是问题，但是这种一次性将文件的所有内容都读写到内存中后一次性写入磁盘的方式不适合大文件的拷贝，内存容易爆炸。
	对于大文件的拷贝只能一点点的读写，也就是读一点写一点，慢慢实现拷贝。

*参考示例*

```js
var fs = require('fs');

function copy(src, paramPath) {
	fs.createReadStream(src).pipe(fs.createWriteStream(paramPath));
}

function main(argv) {
	copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

> 这个程序使用`fs.createReadStream()`创建了一个源文件的只读数据流，并使用`fs.createWriteStream()`创建了一个目标文件的只写数据流，然后使用pipe()方法将两个数据流串联起来。理解起来就是在两个桶增加了管道，水一边注入的同时一边流入另一个桶中。

## 简单看看API

> 这个`API`也就是`nodejs`官方为我们提供了那些文件操作方法

#### Buffer(数据块)

> js自身只有字符串数据类型，没有二进制数据类型，因此nodejs提供了一个与`String`对等的全局构造函数Buffer来提供对二进制数据的操作。

###### 直接构造Buffer实例

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
```

> 注：Buffer与字符串类似，既可以使用`.length`方法得到字节的长度外，还能使用[index]的方法读取到指定位置的字节

```js
bin[0];	// 0x68
```

###### Buffer与字符串能互相转化，并且指定编码

1. 二进制数据转字符串

```js
var str = bin.toString('utf-8');	// "hello"
```

2. 字符串转二进制数据

```js
var bin = new Buffer('hello', 'utf-8');	// <Buffer 68 65 6c 6c 6f>
```

###### Buffer与字符串的修改

> Buffer与字符串有个很重要的区别，就是字符串是只读的，对字符串的任何操作的修改得到的都是一个新的字符串，原字符串保持不变。而Buffer更像是数组的操作，可以直接修改某个位置的字节，例如使用[index]方式。

1. [index]方式修改

```js
bin[0] = 0x48;
```

2. slice()方法修改

> 而.slice()方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针

```bash
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```

> 因此对.slice()方法`返回的Buffer`的修改会作用于`原Buffer`

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // <Buffer 68 65 65 6c 6f>
```

3. 深拷贝copy()方法

> 上面程序可以看出这只是浅拷贝，如果想要拷贝一份新的Buffer实例，首先得先创建一个新的Buffer实例，然后使用copy()方法将原Buffer的数据复制到新的实例中。

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;

console.log(bin); // <Buffer 68 65 6c 6c 6f>
console.log(dup); // <Buffer 48 65 65 6c 6f>
```

> `Buffer`将`js`的数据处理能力从字符串扩展到了任意二进制数据

#### Stream(数据流)

> 当内存无法一次装下需要的处理的数据时，或者一边读取一边处理更加高效，解决办法便是使用数据流。`nodejs`中通过各种`Stream`来提供数据流的操作。

> 注：`Stream`是基于事件机制工作，所有的`Stream`实例都继承与`nodejs`提供的`EventEmitter`

###### Stream实现大文件拷贝

```js
var fs = require('fs');

var rs = fs.createReadStream(pathname);

rs.on('data', function(chunk) {
	doSomething(chunk);
});

rs.on('end', function() {
	cleanUp();
});
```

> 这个程序有个小`问题`：程序中`data事件`会不断被触发，不管`doSomething()`函数是否处理得过来

###### 优化一波

```js
var fs = require('fs');

var rs = fs.createReadStream(pathname);

rs.on('data', function(chunk) {
	rs.pause();
	doSomething(chunk, function() {
		rs.resume();
	});
});

rs.on('end', function() {
	cleanUp();
});
```

> 这个程序在doSomething()函数中加了回调，可以让处理数据前暂停数据的读取，并且数据读取完后继续读取数据。

###### Stream实现只读数据流

> 有了上面的例子，实现数据的只读数据流便很简单了

```js
var fs = require('fs');

var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(paramPath)

rs.on('data', function(chunk) {
	ws.write(chunk);
});

rs.on('end', function() {
	ws.end();
});
```



