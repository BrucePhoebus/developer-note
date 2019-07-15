# CSS兼容实现

## CSS兼容IE

	CSS代码中，则可以根据各浏览器自己独立的可识别的特殊代码来编写区分浏览器的代码，例如为IE系列浏览器可读[\9]，而IE6和IE7可读[*]，另外IE6可辨识[ _ ](下划线)
	由于CSS读取时是按从上到下来的，同样属性靠后写的生效，因此可以依照顺序写下来，就会让每个浏览器正确的读取到自己看得懂得CSS语法，有效区分各类型或版本

#### 只需要兼容IE高版本

```css
@media screen and(-ms-high-contrast: active),(-ms-high-contrast: none) {
	/* todo 这里放IE高版本才能显示的css样式：IE10. IE11 */
}
```

#### 指定IE版本才执行

```css
.various_background {
	background: blue;	/*Firefox等非IE浏览器背景变蓝色*/
	background: red \9;	/*IE8 背景变红色*/
	*background: black;	/*IE7 背景变黑色*/
	_background: orange;	/*IE6 背景变橘色*/
}
```

```css
.important_IE6 {
	background: black !important;	/*非IE6 背景变黑色*/
	background: orange;	/*IE6 背景变橘色*/
}
```

> 这个important在IE6上无法使用

## CSS浏览器兼容问题的解决方案

> [参考](https://blog.csdn.net/August_leo/article/details/80545910)

#### 导入语句过滤器
	
	由于不同的输出设备的输出样式可能不一致，可以使用@import语句来将不同的样式导入到不同的设备里解决不同设备间样式不一致的问题。 

* 引入CSS样式一般有以下几种方式

1. 属性样式表 
2. 内部样式表 
3. 链接样式表 
4. 导入样式表

> @import属于第四个导入样式表，通过@import语句在CSS文件或者style标签内调用外部的CSS文件

**用法**

```css
@import url(路径) media_query_list;

@import url("global.css");
@import url(global.css);
@import "global.css";
```

|参数|说明|
|:---:|:---:|
|url()|用来链接指定CSS文件的绝对路径或者相对路径|
|media_query_list|指定媒体类型和查询条件|

**实例**

```js
// 文件目录 
-index.html 
-blue.css 
-red.css
```

*index.html*

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>@import示例</title>
        <style>
            @import url("blue.css") screen and (max-width:500px);
            @import url("red.css") screen and (max-width:900px);
        </style>
    </head>
    <body>
    </body>
</html>
```

*blue.css*

```css
body{
    background: blue;
}
```

*red.css*

```css
body{
    background: red;
}
```

**媒体类型表**

|媒体类型|CSS版本|兼容性|简介|
|:---:|:---:|:---:|:---:|
|all|CSS2|所有浏览器|用于所有媒体设备类型|
|aural|CSS2|Opera|用于语音和音乐合成器|
|braille|CSS2|Opera|用于触觉反馈设备|
|handheld|CSS2|Chrome,Safari,Opera|用于小型或者手持设备|
|print|CSS2|所有浏览器|用于打印机|
|projection|CSS2|Opera|用于投影图像，例如幻灯片|
|screens|CSS2|所有浏览器|用于计算机显示器|
|tty|CSS2|Opera|用于使用固定间距字格的设备。如电传打字机和终端|
|tv|CSS2|Opera|用于电视类设备|
|embossed|CSS2|Opera|用于凸点字符（盲文）印刷设备|

#### IE判断过滤器

	不同的IE浏览器间也可能存在重载样式不一致的问题，可以通过判断IE浏览器的型号来进行对应的样式设置。
	IE提供了判断IE浏览器类型的HTML语句

> [HTML兼容IE](知识笔记/大前端/基础/HTML+CSS/HTML常用效果.md)

**demo**

```html
<!--[if IE 7]>
	todo
<![endif]-->
```

**示例**

	在IE6和IE7下显示不同的内容

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>IE兼容测试</title>
        <!--[if IE 6]>
            <style>
                div{
                    border:1px solid red;
                }
            </style>
        <![endif]-->
        <!--[if IE 7]>
            <style>
                div{
                    border:1px dashed blue;
                }
            </style>
        <![endif]-->
    </head>
    <body>
        <div>
            IE判断过滤器
        </div>
    </body>
</html>
```

#### 属性名字过滤器

	不同的浏览器对于CSS属性也有不同的识别方式，通过研究各种浏览器的属性判断方式就可以得到设置CSS属性的规则，从而设置你想要的浏览器的样式。
	
**示例**

	IE7.0及以下版本浏览器会忽略某些字符，有“-”、“+”、“_”、“#”、“%”、“!”等等

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div{
                border-style: double;	/*IE7.0以上版本和其他类型浏览器下使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;

                +border-style: dotted;	/*IE7.0及以下版本浏览器使用的代码*/
                -border-width:5px;
                *border-color:#666;
                /font-size: 30px;
                #padding-bottom:30px;
                !text-align:center;
                ^color:#FF0000;
            }
        </style>
    </head>
    <body>
        <div>
            属性名字过滤器
        </div>
    </body>
</html>
```

> 属性前添加了“+”、“-”和“*”等字符，对于IE7及以下版本的浏览器来说，会忽略这些字符并继续执行这些字符后面的属性设置；但对于IE7以上版本的浏览器以及其他类型的浏览器来说，会将这些字符视为属性的一部分，即属性设置发生错误。


#### 根符号过滤器

	IE6.0以上的版本浏览器以及其他类型的浏览器不支持 * 标签作为根节点，利用这一点可以进行样式的一致性设置。 

**示例**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            html div{
                border-style: double;	/*IE7.0及以上版本和其他类型浏览器下使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            * html div{
                border-style: dotted;	/*IE7.0以下版本浏览器使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            根符号过滤器
        </div>
    </body>
</html>
```

#### 派生选择符过滤器

	IE6.0及以下的浏览器不支持”>”尖括号作为子标签选择符（只能使用空格），利用这一点可以进行样式的一致性设置。 

**示例**

	派生选择符也叫子类选择符，所有浏览器都支持空格方式表示的派生选择符，IE6及以下版本的浏览器以外的浏览器还支持右尖括号">"作为派生选择符。 

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            body div{
                border-style: double;/*IE7.0以下版本浏览器使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            body>div{
                border-style: dotted;/*IE7.0及以上版本和其他类型浏览器下使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            派生选择符过滤器
        </div>
    </body>
</html>
```

#### 属性选择符过滤器
	
	IE6.0及以下的浏览器里不支持属性选择符，利用这一点可以进行样式的一致性设置。 

**示例**

	IE6及以下版本的浏览器（除360浏览器外）不支持属性选择符。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div{
                border-style: double;	/*IE7.0以下版本浏览器使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            div[id]{
                /*"div[id]"表示id属性已定义的div标签*/
                border-style: dotted;	/*IE7.0及以上版本和其他类型浏览器下使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div id="example">
            属性选择符过滤器
        </div>
    </body>
</html>
```

#### 注释语句过滤器

	IE5.0及以下浏览器不支持选择符和属性后添加注释语句，利用这一点可以进行样式的一致性设置。 

**示例**

	在IE5.0浏览器里不识别样式选择符后面直接添加注释语句。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>属性名字过滤器</title>
        <style>
            div
            {
                border-style: double;	/*IE5.0版本浏览器使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            div/**/
            {
                border-style: dotted;	/*IE5.0以上版本和其他类型浏览器下使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            注释语句过滤器
        </div>
    </body>
</html>
```

> 注：这里IE5是5.5版本可能和5.0有偏差
> IE6.0浏览器里不识别样式属性后面添加注释语句（并以空格相隔），而其他版本和类型的浏览器都支持。 

#### 大括号过滤器

	CSS内使用大括号作为规则开始及结束定位标记。由于IE5.0及以下的浏览器版本不支持某些特殊的转移字符，所以利用大括号来屏蔽掉后面的属性设置。 

**示例**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div
            {
                border-style: double;/*IE5.0使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            div
            {
                voice-family: "\"}"\";
                border-style: dotted;/*除IE5.0外其他版本的IE浏览器和其他浏览器下使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            大括号过滤器
        </div>
    </body>
</html>
```

> 在IE5.0浏览器下面不能识别转义字符，所以认为voice-family属性值为"\"，即大括号就会作为该样式规则的结束标志。而在其他浏览器下面都可以识别转义字符，所以认为voice-family属性的值为""}""。所以前一个样式规则会被后一个样式规则所覆盖。

#### 优先级过滤器

	利用!important标志在不同浏览器下面的设置方法实现样式的一致性设置，IE6.0以下的浏览器，!important标志必须写在分号";"后面。 

**示例**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div
            {
                border-style: double !important;	/*IE6.0以上和其他浏览器使用的代码*/
                border-width:2px !important;
                border-color: #FF0000 !important;
                font-size: 16px !important;
                padding-bottom: 5px !important;
                text-align: left !important;
                color: #00FF99 !important;

                border-style: dotted;	/*IE6.0及以下使用*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            优先级过滤器
        </div>
    </body>
</html>
```

#### 相邻选择符过滤器

	利用IE6.0版本以下的浏览器不支持相邻选择符的特性，来实现样式的一致性设置。 

**示例**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div{
                border-style: double;	/*IE6.0及以下浏览器使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;
            }
            b+div{
                border-style: dotted;	/*IE6.0以上和其他浏览器使用的代码*/
                border-width:5px;
                border-color:#666;
                font-size: 30px;
                padding-bottom:30px;
                text-align:center;
                color:#FF0000;
            }               
        </style>
    </head>
    <body>
        <b></b>
        <div>
            相邻选择符过滤器
        </div>
    </body>
</html>
```

#### 转义字符过滤器
	
	当属性名或者选择符名字出现斜杠"\"时，在IE5.0浏览器下忽略掉该斜杠。

**示例**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            div{
                border-style: double;/*IE6.0及以下浏览器使用的代码*/
                border-width:2px;
                border-color: #FF0000;
                font-size: 16px;
                padding-bottom: 5px;
                text-align: left;
                color: #00FF99;

                border-sty\le: dotted;/*IE6.0以上和其他浏览器使用的代码*/
                border-widt\h:5px;
                border-colo\r:#666;
                font-s\ize: 30px;
                padding-botto\m:30px;
                text-alig\n:center;
                colo\r:#FF0000;
            }               
        </style>
    </head>
    <body>
        <div>
            转义字符过滤器
        </div>
    </body>
</html>
```
