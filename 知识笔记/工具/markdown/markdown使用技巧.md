# markdown使用技巧

## 常用技巧

#### 快捷键

|Key|Command|
|:---:|:---:|
|Ctrl + B|Toggle bold  切换粗体|
|Ctrl + I|Toggle italic  切换斜体|
|Alt + S|Toggle strikethrough  切换删除线|
|Ctrl + Shift + ]|Toggle heading (uplevel)   标题（上升）|
|Ctrl + Shift + [|Toggle heading (downlevel)   标题（下降）|
|Alt + C|Check/Uncheck task list item   选表单切换|

#### 指定目录跳转

	这个可以跳转到指定页面指定目录，器原理是通过id传递对应标题名，实现页内调整

**页内调整**

<a href="#知识笔记/工具/markdown/markdown使用技巧?id=特殊技巧">特殊技巧</a>

```js
// 代码
<a href="#知识笔记/工具/markdown/markdown使用技巧?id=特殊技巧">特殊技巧</a>
```

> 注：页内调整要有下拉进度条才能看到效果

**跳转到其他页面的指定目录**

<a href="#知识笔记/大前端/基础/JavaScript/JavaScript基础/js之时间处理?id=时间戳转字符串">跳转到js之时间处理页面：时间戳转字符串</a>

```js
// 代码
<a href="#知识笔记/大前端/基础/JavaScript/JavaScript基础/js之时间处理?id=时间戳转字符串">跳转到js之时间处理页面：时间戳转字符串</a>
```

> 这个能直接跳转到`js之时间处理`页面的对应目录：`时间戳转字符串`

## 特殊技巧

#### emoji

###### 直接copy

**常用**

1. 微信：😄

> [去这里直接copy](http://emojihomepage.com/) | [去这里搜：emojipedia](https://emojipedia.org/)

###### 利用Unicode编码

**常用**

* 哭笑不得：&#x1F602

	<p>&#x1F602</p>

> [找编码](http://unicode.org/emoji/charts/full-emoji-list.html)

###### 也可以利用图片格式

	如果需要大图可以使用 <img> 标签

> [看这里](https://blog.csdn.net/u014636245/article/details/82945997)

> [查看效果网站](https://www.webfx.com/tools/emoji-cheat-sheet/) | [这个图比较大](http://emojihomepage.com/)
