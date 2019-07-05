# 路径分类

	我们在项目中进行webpack配置的时候，经常需要涉及到路径相关的变量，但是初学者往往不知道这是啥东东，只是说打包需要用，那就用吧，但是作为一名工程师，不懂的东西有空还是要搞清楚，不然哪空手撸得起代码项目啊
	
## node中的路径分类

	node中的路径大致分5类，dirname、filename、process.cwd()、./、../
	其中dirname、filename、process.cwd()是绝对路径

#### 实例项目理解

**项目路径**

```bash
代码pra/
  - node核心API/
      - fs.js
      - path.js
```

**path.js代码**

```js
const path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

**在代码pra目录下运行命令 node node核心API/path.js**

```js
/koala/Desktop/程序员成长指北/代码pra/node核心API
/koala/Desktop/程序员成长指北/代码pra/node核心API/path.js
/koala/Desktop/程序员成长指北/代码pra
/koala/Desktop/程序员成长指北/代码pra
```

**在node核心API目录下运行这个文件，node path.js**

```js
/koala/Desktop/程序员成长指北/代码pra/node核心API
/koala/Desktop/程序员成长指北/代码pra/node核心API/path.js
/koala/Desktop/程序员成长指北/代码pra
/koala/Desktop/程序员成长指北/代码pra
```

**对比得出的暂时结论**

	__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
	__filename: 总是返回被执行的 js 的绝对路径
	process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
	./: 跟 process.cwd() 一样，返回 node 命令时所在的文件夹的绝对路径

* 验证结论

**在path.js中加个内容**

```js
exports.A = 1;
```

**然而在fs.js文件中直接通过readFile读取文件路径报错**

```js
fs.readFile('./path.js',function(err,data){
   
});
```

**再往fs.js里面加这两句代码看看**

```js
const test = require('./path.js');
console.log(test);
```
**在代码pra/目录下运行node node核心API/fs.js**

```js
{ A: 1 }
```

> 这个意思是可用访问到相对路径下的path.js文件的，这样`./`的结论就不一样了

	在 require()中使用是跟__dirname 的效果相同，不会因为启动脚本的目录不一样而改变，当然在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径

**只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径**

```js
// 当前目录下
 path.dirname(__filename) + '/path.js'; 
// 相邻目录下
 path.resolve(__dirname, '../regx/regx.js');
```

**总结**

* __dirname： 获得当前执行文件所在目录的完整目录名

* __filename： 获得当前执行文件的带有完整绝对路径的文件名

* process.cwd()：获得当前执行node命令时候的文件夹目录名

* ./： 不使用require时候，./与process.cwd()一样，使用require时候，与__dirname一样

## path模块

	这个path模块在配置中经常会用到，node编程中更是到处都会用到

> [api官网地址](https://link.juejin.im/?target=https%3A%2F%2Fnodejs.org%2Fapi%2Fpath.html)

#### path.normalize

	规范化路径，把不规范的路径规范化

```js
const path = require('path');

console.log(path.normalize('/koala/Desktop//程序员成长指北//代码pra/..'));
```

```js
/koala/Desktop/程序员成长指北/代码pra
```

> 可以看出，我们通过normalize将一些不规范的地址统一规范起来

#### path.join

	path.join([...paths])

	1、传入的参数是字符串的路径片段，可以是一个，也可以是多个
	2、返回的是一个拼接好的路径，但是根据平台的不同，他会对路径进行不同的规范化，举个例子，Unix系统是/，Windows系统是\，那么你在两个系统下看到的返回结果就不一样。
	3、如果返回的路径字符串长度为零，那么他会返回一个.，代表当前的文件夹。
	4、如果传入的参数中有不是字符串的，那就直接会报错

```js
const path = require('path');
console.log(path.join('src', 'task.js'));

const path = require('path');
console.log(path.join(''));
```

```js
src/task.js
.
```

> 这个可以解决不同系统路径符合的问题

#### path.parse

	这个是返回一个对象，根据传入的路径返回对应解析的对象信息

	1、root：代表根目录
	2、dir：代表文件所在的文件夹
	3、base：代表整一个文件
	4、name：代表文件名
	5、ext: 代表文件的后缀名

```js
const path = require('path');
console.log(path.parse('/koala/Desktop/程序员成长指北/代码pra/node核心API'));
```

```json
{ 
	root: '/',
  	dir: '/koala/Desktop/程序员成长指北/代码pra',
  	base: 'node核心API',
  	ext: '',
  	name: 'node核心API' 
}
```

#### path.basename

	basename接收两个参数，第一个是path，第二个是ext(可选参数)，当输入第二个参数的时候，打印结果不出现后缀名

```js
const path = require('path');
console.log(path.basename('/koala/Desktop/程序员成长指北/代码pra/node核心API'));
console.log(path.basename('/koala/Desktop/程序员成长指北/代码pra/node核心API/path.js', '.js'));
```

```js
node核心API
path
```

> 就是路径的文件或文件夹名

#### path.dirname

	返回文件的目录完整地址

```js
const path = require('path');
console.log(path.dirname('/koala/Desktop/程序员成长指北/代码pra/node核心API'));
```

```js
/koala/Desktop/程序员成长指北/代码pra
```

#### path.extname

```js
const path = require('path');
path.extname('index.html');
path.extname('index.coffee.md');
path.extname('index.');
path.extname('index');
path.extname('.index');
```

```js
.html
.md
.
''
''
```

> 上面我们知道了如何获取路径文件名，这个我们可以知道如何获取路径后缀，当然要注意最后两种情况，`''`

#### path.resolve

	path.resolve([...paths])

	path.resolve就相当于是shell下面的cd操作，从左到右运行一遍cd path命令，最终获取的绝对路径/文件名，这个接口所返回的结果了
	但是resolve操作和cd操作还是有区别的，resolve的路径可以没有，而且最后进入的可以是文件

```js
const path = require('path');
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c'));
```

```js
/bar/c
```

```js
cd /foo/bar/    //这是第一步, 现在的位置是/foo/bar/
cd /bar/faa     //这是第二步，这里和第一步有区别，他是从/进入的，也就时候根目录，现在的位置是/bar/faa
cd ..       // 第三步，从faa退出来，现在的位置是 /bar
cd a/../c   // 第四步，进入a，然后在推出，在进入c，最后位置是/bar/c
```

#### path.relative

	path.relative(from, to)：从from路径，到to路径的相对路径

	如果from、to指向同个路径，那么，返回空字符串。
	如果from、to中任一者为空，那么，返回当前工作路径。

```js
const path = require('path');

console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));

console.log(path.relative('/data/demo', '/data/demo'));

console.log(path.relative('/data/demo', ''));
```

```js
../../impl/bbb
 ""
 ../../koala/Desktop/程序员成长指北/代码pra/node核心API
```

> 参考：[作为一个前端工程师也要掌握的几种文件路径知识](https://juejin.im/post/5d1a3328e51d4510727c80e4)
