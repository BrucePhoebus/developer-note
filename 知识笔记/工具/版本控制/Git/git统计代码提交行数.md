<!--
 * @Description: git统计代码提交行数
 * @Date: 2019-08-09 16:42:33
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-09 17:02:20
 -->
# git统计代码提交行数

## 概述

#### 前言

	有时候我们可能想知道我们项目或我们自己为项目做了多少贡献，提交了多少代码，而git就有这样的命令可以让我们直接从.git库统计出来

> 当然，有点长，保存起来，有兴趣的可以了解下怎么算的

#### 怎么查看

	直接在项目根目录(有.git的项目)，在 Git Bash 中打开输入下面那些命令就可以对应查到

**例如：查看提交数**

``` bash
git log --oneline | wc -l
```

> 注，有些查询字段`CMD`识别不了，一定要`git bash`中执行

#### 我们比较想要看到的

* 我们添加删除的总行数

``` bash
git log --author="$(git config --get user.name)" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }' -
# added lines: 27997 removed lines : 214 total lines: 27783
```

> 注：这个是直接获取我们自己的user.name。也可以输入别人的username

* 我们总的提交数

``` bash
git log --oneline | wc -l
# 384：commit提交数
```

* 我们修改/添加的行数

``` bash
git log --stat|perl -ne 'END { print $c } $c += $1 if /(\d+) insertions/';
# 231181
```

* 仓库提交者排名

``` bash
# 根据邮箱进行commit提交统计排名，输出邮箱和提交数
git log --pretty=format:%ae | gawk -- '{ ++c[$0]; } END { for(cc in c) printf "%5d %s\n",c[cc],cc; }' | sort -u -n -r | head -n 5
# 384 1634372267@qq.com

# 输出提交数和用户名：这里是前五位，把`| head -n 5`管道去掉就是查全部了
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
# 199 zhengyekun
# 154 Phoebus
# 31 phoebus
```

* 贡献者统计

	如果我们是开源项目，或团队项目，我们可能先看看有多少人参与了开发

``` bash
git log --pretty='%aN' | sort -u | wc -l
# 3
```

#### 另外还有

> 参考：[用git统计代码提交行数](https://blog.csdn.net/carterslam/article/details/81162463)
