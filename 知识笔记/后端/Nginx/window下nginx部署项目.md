<!--
 * @Description: window下nginx部署项目
 * @Date: 2019-08-21 10:15:04
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-21 10:29:39
 -->
# window下nginx部署项目

## 前置操作

1. [下载nginx](http://nginx.org/)

	* 找个地方放这个nginx文件夹

2. 将已有项目打包

	* 一般来说打包成dist文件，文件下面有index.html作为索引
	* 复制dist，放到nginx的html目录下，重命名下，例如：demo

## 配置

**目前重要目录有**

``` bash
|--conf
|	|--nginx.conf	# nginx服务配置文件
|
|--html	# 项目文件放置位置
|	|--demo	# 项目打包文件
|	|	|-- index.html	# 这个是配置后的访问页面
|	|	|-- ...
|	|--index.html	# 这个是默认访问页面
```

* 然后修改配置：nginx.conf

``` bash
server {
        #监听的端口，80端口是默认端口，在访问时，就无需输入端口号，其他的都需要输入端口号，比如这里访问地址就是127.0.0.1，而若是8080端口，则是127.0.0.1：8080
        listen       80;
        #此处localhost可改为要访问的域名或者ip地址，若有多个用空格隔开。例如 server_name www.baidu.com baidu.com test.baidu.com
        server_name  localhost;
        #编码
        charset utf-8;

        #access_log  logs/host.access.log  main;

        location / {
            #nginx下HTML文件夹，访问上述域名时会检索此文件夹下的文件进行访问
            root   html/demo;
            #输入网址（server_name：port）后，默认的访问页面
            index  index.html index.htm;
        }
}
```

> 注：重点就是配置`location /`下的`root`路径，要添加项目路径和默认项目启动文件

## nginx操作

#### 启动nginx服务

* 方法一是直接双击`nginx`跟目录下的`nginx.exe`文件就能启动

* 方法二是根目录下控制台操作

``` bash
# 根目录下执行
start nginx
```

#### nginx服务操作

``` bash
# 启动nginx
start nginx

# 修改配置后重新加载生效
nginx -s reload

# 重新打开日志文件
nginx -s reopen

# 测试nginx配置文件是否正确
nginx -t -c /path/to/nginx.conf

# 关闭nginx
nginx -s stop  	# 快速停止nginx
nginx -s quit 	# 完整有序的停止nginx
```

> 注：要现在根目录执行`start nginx`，否则DOC系统无法识别`nginx`命令
