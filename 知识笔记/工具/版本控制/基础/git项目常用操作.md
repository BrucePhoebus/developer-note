# git项目常用操作

## 基础操作

> [常用git命令](知识笔记/工具/版本控制/常用git命令.md)

#### 通用验证操作

###### 验证配置是否成功

	配置完ssh并且将ssh公钥添加到远程库后，我们需要验证是否配置成功

``` bash
ssh -T git@github.com
```


## 分支操作

#### 删除远程分支

###### 先删除本地分支

``` bash
git branch -d xxx
```

###### 提交删除远程分支

``` bash
git push origin --delete xxx
```

#### git分支重命名

1. 本地分支重命名

	git branch -m old new

2. 远程分支重命名

	* 删除远程分支

		git push origin : 远程分支名(你要删除的远程分支名)
		
		或

		 git push --delete origin 分支名（不含remotes/origin）

	* 将本地分支推送到远程分支上，如果远程分支不存在，则创建此远程分支

		git push origin 本地分支名: 远程分支名


## 库操作

#### 切换远程git库

	一般这种情况是git库迁移的问题，当然也存在关联失败或错误关联的问题（一般比较少操作，所以记住的人也就不多）
	曾经试过不小心使用http地址clone项目，但是发现没法提交，问题很严重，然后发现远程地址不是git开头的，然后删了远程库地址，重新关联

*方法1*

```bash
# 修改远程库
git remote origin set-url [url]
```

*方法2*

```bash
# 先删除再加
git remote rm origin
git remote add origin [url]
```

> 一般删除远程库地址然后重新关联一般都是没问题的，因为git管理是通过commit的版本记录管理的，如果出现意外，或许是冲突问题

*方法3*

	直接修改config文件

> 这是很无奈的办法，一般都不建议用这么低效的办法

#### 关联开源库

``` bash
# 关联远程库
git remote add origin xxx
# 关联主开源库
git remote add upstream xxx
# 查看：正常有两个库地址
git remote -v
```

## 日志相关

#### 查看commit提交记录

> 查看commit提交记录，显示可以看到多少个文件一次push，也可以看到检出、合并分支

*使用*

> 直接命令行cmd操作

```js
git log --oneline --decorate --all --graph
```

> 输入该命令就会出现近期的commit记录，具体详情可以根据显示的ID查找，通过回车显示查看更多记录

*参考效果*

```bash
*   a23bfff (HEAD -> master, origin/master) Merge branch 'master' of github.com:BrucePhoebus/developer-note
|\
| * 5d47da0 调整JavaScript
| * ceea5cc 重命名数组文件
| * f00afef 完善Array原型方法
| * 9b874fc 重命名文件：js之异步机制
| * fd3a845 提交js原型练习和异步之定时器
| * ddbd09a 提交组件回调问题
* | 1d9788a 提交开发积累：pc端pdf预览实现
* | c5b9055 提交二维码处理文件
* | 4133efe 提交移动端PDF预览实现
* | 9f75b0c 添加正则语法文件
* | 8a1f4f3 添加正则匹配积累
* | cd5164f 调整正则基础位置
|/
* a680047 Vue语法错误总结
* ee53366 提交webstorm快捷设置
* c0d8c56 添加深入docsify文档
* bc45375 完善项目基本说明和docsify-cli安装说明
* 3eb9c84 完善项目介绍
* c2f7082 去除更新记录文件
*   3ae8e80 Merge branch 'master' of github.com:BrucePhoebus/developer-note
|\
| * ece4f65 完善nodejs，提交一个问题文件
: //这里回车显示更多
```
