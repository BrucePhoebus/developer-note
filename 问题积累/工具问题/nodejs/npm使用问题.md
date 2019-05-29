# npm使用异常问题

## 安装依赖异常

1. npm ls 显示模块包的时候出现一堆 npm ERR! ...
	
	安装不需要的软件包，可以清理掉，实际上只是一个警告，因此可以忽略。忽略这个错误可能是安全的。但是你可以用清理不必要的软件包。
	执行 `npm prune` 即可

## 删除依赖异常

1. 确保正确描述依赖关系 package.json
	
	只需输入npm install并按Enter即可。

2. 检查问题仍然存在。如果问题未解决，请继续这些方法。
	
	输入 `npm cache clean` 执行
	输入 `npm install -g npm` 执行
	重试 `npm install` 执行

## 命令错误

> [参考](https://blog.csdn.net/huangpin815/article/details/75669525)

1. NODE_ENV 不是内部或外部命令，也不是可运行的程序，或者批处理文件

	这是shell命令，不被window的cmd识别，需要增加set命令

例如："dev": "set NODE_ENV=development && node dev-server.js"
