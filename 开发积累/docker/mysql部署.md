# mysql部署实例

> [docker基础](知识笔记/工具/虚拟机/docker/docker基础.md)

## 物资准备

1. 下载镜像

```bash
docker pull hub.c.163.com/library/mysql:latest
```

2. 创建并且实例

```bash
docker run --name mysql5.7 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```


## 说明地址

> [镜像地址](https://c.163yun.com/hub#/m/repository/?repoId=2955)

``` bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

*分析*

1. some-mysql 	// 创建的实例名称
2. my-secret  	// 创建的密码 用户名为 root
3. tag       	// mysql的版本号


|参数|说明|
|:---:|:---:|
|run|启动实例|
|-e|配置账号密码|
|-d|创建一个实例|
|mysql: tag|使用实例以及版本号|

## mysql操作

1. 运行容器：并设置mysql账号密码

	docker run --name mysql80 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
	docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql

2. 进入容器

	docker exec -it f3a14e928610 /bin/bash

3. 登陆mysql

	mysql -u root -p root

4. 修改mysql登陆密码

	ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

5. 进入mysql容器

	docker exec -it mysql bash

6. 登陆mysql

	mysql -u root -p
	password: root

7. 修改账户密码加密规则并更新用户密码

	ALTER USER 'root'@'%' IDENTIFIED BY 'root' PASSWORD EXPIRE NEVER;
	ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
	FLUSH PRIVILEGES;   #刷新权限

8. 远程登陆mysql
	
	mysql -h 118.24.70.239 -u root -p
	password: root

9. 检查数据库
	
	show databases;
