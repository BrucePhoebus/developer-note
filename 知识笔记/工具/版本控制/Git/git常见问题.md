# git常见问题

## 冲突

#### 为何会发生冲突？

> git中，代码是通过行来控制版本的，而非字节。
 
	当我们多人写作使用版本控制系统的时候，往往会遇到多人写作编辑同一个文件的场景。

**例如**

```java
public class Demo{
	public static void main(String[] args){
		System.out.println("hello");
	}
}
```

*同学a*

```java
public class Demo{
	public static void main(String[] args){
		System.out.println("hi");
	}
}
```

*同学b*

```java
public class Demo{
	public static void main(String[] args){
		System.out.println("你好");
	}
}
```

**分析**

上述的同学a和b分别都`恰巧修改`了同一行代码 `System.out.println("****");`。

此时作为版本控制系统，git系统的设计认为 两位开发者的提交都至关重要，对于这种结果的判断，就需要两个人一起来解决不同的设置。

**解决冲突方法**

1. 首先，解决冲突首先我们要知道冲突的概念：

> 冲突是两位开发者同时修改相同的代码，导致了版本控制系统无法明确到底应该适用谁的修改。

2. 找到冲突代码的修改人，两人商量确定哪部分代码是正确的

	当然，如果我们的代码不要的话，直接选择使用对方的代码即可解决冲突

> 注：如果无法确定谁的代码是正确的，千万不要随便解决冲突，这样很容易导致对方的代码对手

> `严重`：千万不要在解决冲突时选择reset，然后又push代码，这样会把两个人的代码都搞丢

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
