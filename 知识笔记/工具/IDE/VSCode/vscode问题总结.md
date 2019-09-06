<!--
 * @Description: vscode问题总结
 * @Date: 2019-09-06 11:15:44
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-06 11:20:20
 -->
# vscode问题总结

## 常见工具使用问题

#### vscode如何直接运行代码

1. 本地要有相应运行环境，例如前端要有`node`

2. 安装插件`code runner`，然后相应配置'

	要这样配置才能运行js，糊了我一脸

``` js
"code-runner.runInTerminal": true, // 允许打开控制台输出
"code-runner.executorMap": {
	"javascript": "node",	// 设置js运行环境为node
	"html": "\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\"",	// 设置html运行环境为google浏览器
	"java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
},
"code-runner.defaultLanguage": "javascript"	// 设置默认运行语言为js
```

> [code runner github配置](https://github.com/formulahendry/vscode-code-runner)

