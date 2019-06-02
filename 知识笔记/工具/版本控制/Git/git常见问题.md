# git常见问题

## 环境问题

#### git转义字符错误解决

**CMD执行命令**

1. core.autocrlf=true

2. rm -rf .git  // 删除.git

3. git config --global core.autocrlf false  //禁用自动转换

## 分支操作问题

#### 分支合并失败（错误）

1. 切换到其他分支，然后删除错误的分支，重新拉取分支代码

2. 删除分支命令

	**git 删除本地分支**
	```git
	git branch -D br
	```
	**git 删除远程分支**
	```git
	git push origin :br  (origin 后面有空格)
	```

## 场景问题

#### 应用场景：自动部署系统发布后发现问题，需要回滚到某一个commit，再重新发布

1. 原理
	
	先将本地分支退回到某个commit，删除远程分支，再重新push本地分支

2. 操作步骤：

	1、git checkout the_branch

	2、git pull

	3、git branch the_branch_backup //备份一下这个分支当前的情况

	4、git reset --hard the_commit_id //把the_branch本地回滚到the_commit_id

	5、git push origin :the_branch //删除远程 the_branch

	6、git push origin the_branch //用回滚后的本地分支重新建立远程分支
	
	7、git push origin :the_branch_backup //如果前面都成功了，删除这个备份分支
