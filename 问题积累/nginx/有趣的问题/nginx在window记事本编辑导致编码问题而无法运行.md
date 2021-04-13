# nginx在window记事本编辑导致编码问题而无法运行

> 参考：[nginx报错unknown directive "锘? in D:\nginx/conf/nginx.conf:3](https://blog.csdn.net/bigbear00007/article/details/103544167)

### 异常

在window作为服务器的记事本中修改nginx的配置，然后启动，报错

但是之前启动成功过

异常信息：nginx报错unknown directive "锘? in D:\nginx/conf/nginx.conf:3

### 原因

  类似WINDOWS自带的记事本等软件，在保存一个以UTF-8编码的文件时，会在文件开始的地方插入三个不可见的字符（0xEF 0xBB 0xBF，即BOM）。它是一串隐藏的字符，用于让记事本等编辑器识别这个文件是否以UTF-8编码。

看博主说：一般的文件使用记事本编辑一般不会出现问题，但是nginx的配置文件添加BOM之后会导致无法运行

### 解决方案

直接用好点的编辑器编辑，例如`Notepad++`、`VSCode`编辑
