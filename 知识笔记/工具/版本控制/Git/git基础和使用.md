# git基础和使用

> [git常见问题](问题积累/工具问题/版本控制/Git/git常见问题.md) | [git相关配置](知识笔记/工具/版本控制/Git/git相关配置.md) | [常用git命令](知识笔记/工具/版本控制/Git/常用git命令.md)

## 安装环境

	工欲善其事，必先利其器

#### 安装并关联github

> 我们最常用的git库管理就是[github](https://github.com/)了，当然公司自己的项目一般用gitlab

#### 关联远程仓库管理平台：github

1. 执行命令

	ssh-keygen -t rsa -C "your_email@yourEmail.com"

> 注意ssh-keygen命令中间没有空格，如果在ssh后面加上空格，会得到Bad escape character ‘ygen’.的错误

2. 后面的your_email@yourEmail.com改为你的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行

3. 成功的话会在~/下生成.ssh文件夹，进去，打开id_rsa.pub，复制里面的key（全部）

4. 回到github，进入Account Settings，左边选择SSH Keys，Add SSH Key,title随便填，粘贴key。

> 结果：LOCALHOST20180725	e8:e7:79:03:24:31:5c:83:a6:22:fa:b6:a2:5b:74:73

5. 输入命令

	ssh -T git@github.com
	yes

> 结果：Hi BrucePhoebus! You've successfully authenticated, but GitHub does not provide shell access.

6. =设置本地全局git用户名密码

	git config --global user.name "username"
	git config --global user.email "your_email@yourEmail.com"

7. 右键TortoiseGit克隆上github个人页面找Repositories中的项目，负责git路径，粘贴，指定克隆路径，点击克隆
	
	git config user.name
	git config user.email

#### 工具中使用git

> 虽然说git基础很重要，但是初学者一般是结合工具使用的，例如：IDEA、WebStorm、VSCode，尤其是IDEA和WebStorm（他们是一家人）提供了非常好而遍历的支持，当然建议经常在cmd中使用下git命令

## 创建项目

#### 本地项目关联github

	这个是指讲本地已有的项目关联远程空的git库，然后讲本地的所有代码推送到github仓库，然后进行项目管理

> 这种操作一般比较少，当然个人操作或许比较大，一般公司都是先创建库，然后才进行项目开发的，当然公司项目偶尔会迁移库，操作是一样的

**新项目**

1. 创建新文件夹（项目）

	mkdir xxx

2. 进入（项目）

	cd xxx

3. 初始化Git仓库

	git init

4. 提交改变到缓存

	git add .
	git commit -m 'description'

5. 本地git仓库关联GitHub仓库

	git remote add origin git@github.com:1634372267@qq.com/*.git

6. 提交到GitHub中

	git push -u origin master

7. 取消本地目录下关联的远程库(重新连)

	git remote remove origin
	git remote add origin git@github.com:1634372267@qq.com/*.git

#### 克隆github的项目

	这个是最常用的，我们经常要讲远程仓库clone到本地进行本地开发，当然，这个github的说法并不准确，应该说远程仓库，因为还有gitLab等多种远程仓库可用，但是我们个人用得最多的还是github

1. 拉取远程项目到本地

	git clone git@github.com:han1202012/NDKHelloWorld.git 
	
> 注意克隆的时候直接在仓库根目录即可, 不用再创建项目根目录

2. 添加文件

	git add ./*  

> 将目录中所有文件添加

3. 提交缓存

	git commit -m '提交'

4. 提交到远程GitHub仓库

	git push -u origin master

> 如果是你的远程库，你配置过全局git账户密码，并使用ssh连接成功的话就不需要账户密码，否则每次提交都需要使用账户密码

## 多个git账户的问题

#### Windows下Git多账号配置，同一电脑多个ssh-key的管理

> [Git-TortoiseGit完整配置流程](http://www.cnblogs.com/popfisher/p/5466174.html)

1. 生成github.com对应的私钥公钥（本文中文件地址C:\Users\popfisher目录）
执行命令 ssh-keygen -t rsa -C email 创建github对应的sshkey，命名为id_rsa_github，密码 123456
ssh-keygen -t rsa -C 1634372267@qq.com

2. 同样的方式生产git.oschina.net的私钥公钥（邮箱地址可以相同可以不同，本文相同）
执行命令ssh-keygen -t rsa -C email创建github对应的sshkey，命名为id_rsa_oschina，密码 123456
ssh-keygen -t rsa -C 1634372267@qq.com
