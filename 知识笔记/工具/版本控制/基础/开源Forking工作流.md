<!--
 * @Description: 认识git管理之Forking工作流
 * @Date: 2019-08-28 09:35:20
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-06 11:29:54
 -->
# 开源Forking 工作流

## 概述

#### Forking 工作流简述

	Forking 工作流简单说就是开源项目常用的git管理方式，因为它致力于程序猿之间共享代码

###### Forking 工作流对比普通工作流的区别

	最大的区别就是有两个git服务端仓库，一个是项目维护者的开源项目，一个是代码贡献者的公开仓库

* 存在这两个服务端仓库允许项目维护者和代码贡献者并行开发，互补干扰，本质上他们属于两个不同的git库，但是git允许他们交互操作(也就是同步数据、代码提交、拉取等)

* 这样两个服务仓库对于代码贡献者也是区别于普通工作流的，对于代码贡献者，他们有两个远程库

	* 一个是私人的公开库直接远程库，一个是开源项目上游库，当然私人公开库是他自己的，有全部权限；而开源项目代码贡献者一般只有`pull`权限
	* 至于怎么贡献代码？是代码贡献者直接告诉开源项目维护者，让他拉取合并代码贡献者的某个分支代码，这是被允许的两个库之间的操作，实现代码贡献

``` bash
# 拉取直接远程库
git clone https://github.com/BrucePhoebus/developer-note.git
# 拉取直接远程库最新代码
git pull origin master

# 添加上游库
git remote add upstream https://github.com/BrucePhoebus/developer-note.git
# 同步上游开源项目
git pull upstream master
```

#### 详细工作流

1. 开源者创建正式仓库

	跟正常创建项目git库就行

``` bash
# 初始化裸仓库
ssh user@host
git init --bare /path/to/repo.git
```

> 这个是开源者维护的开源项目正式仓库，代码贡献者只有pull权限

2. 代码贡献者fork项目

	贡献者通过fork将该该项目在自己的服务器上创建一个拷贝的库(如果是github就是clone到自己github账号上)，属于个人私有开发库

``` bash
# github直接fork，然后就会clone到个人github上
git clone https://github.com/BrucePhoebus/developer-note.git
# 添加上游库
git remote add upstream https://github.com/xxx/developer-note.git
```

> 在fork后，开源项目就是clone一个关联的副本到代码贡献者账号上，拉取项目后，远程库还是我们私人的远程库，但是我们可以添加上游库，实现关联

> 当然，这样关联的开源项目，代码贡献者是没有多少权限的，一般只有pull权限，如果我们要贡献代码，就要把项目贡献的项目分支直接告诉开源项目维护者，让他拉取我们贡献的代码分支进行项目合并

3. 代码贡献者贡献代码

	基于原开源项目，我们进行完相应功能的开发后，按常推送到我们的直接远程库，然后告诉开源维护者拉取我们的项目分支进行合并

``` bash
# 先拉取上游库最新代码，然后进行项目开发
git pull upstream master
# 完成功能开发，提交到直接远程库
git push origin feature-branch
```

> 开源维护者知道我们的项目、对于分支以及相应变更的功能后，会拉取代码贡献者的相应分支代码(这里是feature-branch分支)到本地进行代码检查或直接GUI查看变更

	使用GUI查看变更更加方便，可以直接做备注和合并，当然如果出现冲突还是需要拉取代码进行冲突解决

4. 开源维护者检查代码贡献者的代码

	1. 直接`pull request`GUI中查看代码变更
	2. 拉取到本地进行代码检查(常用于冲突解决)

``` bash
# 拉取已经完成的功能分支
git fetch https://github.com/BrucePhoebus/developer-note.git feature-branch
// 查看变更
git checkout master
# 检查完后合并变更功能到master分支(通常是测试分支用于整体测试)
git merge FETCH_HEAD
```

5. 开源维护者将代码贡献者的代码分支合并推送到开源正式仓库

``` bash
# 此时已经是开源维护者的操作了，已经没代码贡献者什么事了
git push origin master	# 当然这一般也不会是master分支，常常是开发分支或测试分支

# 最后每次代码贡献者拉取上游库代码就能看见更新了
git pull upstream master
```

#### 总结

* 可以看出这个过程实现了两个git并行开发，互不干扰，并且可以实现代码共享

* 当然，说是存在git库关联，实际上只是一种约定，我们定了这样的规范就是`Forking工作流`

> 参考：[Forking 工作流](https://www.jianshu.com/p/017ea9200b43) | [“史上最全”git工作流之——fork](https://www.jianshu.com/p/8200d4d90d77)
