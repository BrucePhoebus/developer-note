<!--
 * @Description: github克隆项目慢的问题
 * @Date: 2019-09-06 12:35:17
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-06 15:00:02
 -->
# 解决github克隆项目慢的问题

## 前言

* 在国内使用github，尤其是clone项目慢是公认的，毕竟人家是国外的服务器

* 所以我们经常会出现卡的问题，重点不是这个，重点是拉个项目天边久，更重点的是项目稍微一大就会下载失败

* 项目一个项目下了几个钟，然后失败了，重新下，又是几个钟，然后又默默的失败的，几K几K的下，还经常几bite和0，这就妈卖批了。。。

* 所以面对这个问题，我们除了翻墙的方法外，我们来总结下有哪些方法可以优雅的解决这个问题

## 解决方案

#### 方案一

	将仓库转到国内仓库再拉取

* 将github仓库clone到`gitee`，因为`gitee`是国内服务器，所以不存在卡的问题，6得一批

* 最重要的是人家支持直接从`github`上clone仓库到`gitee`，也就是我们把github地址粘到gitee上就能导入过去了，然后直接在gitee上拉项目，最后便是修改成github地址就行

	* 至于为啥gitee能clone github的仓库？人家服务器拉东西可不会像我们这样，没啥限制，快得一批，重点是人家能翻墙，git仓库结构都是一样的，不冲突

* 重点来了，也就是`如何将从gitee clone下来的项目远程地址改为github？`

	* 为啥要改？如果只是单纯项目开发倒是直接使用gitee无所谓，但是如果我们是开源贡献，那么我们必须改为github的远程库，这样才能实现开源仓库关联


**这里以fork开源项目为例**

1. clone项目到gitee

	* 首先当然是去gitee上新建自己的git仓库，这里也就是导入github的仓库
	* gitee个人主页左下角便可以看到自己的仓库，并且有+号可以添加仓库
	* 创建新仓库时，最下面有个导入已有仓库的选项，我们点击之后就能输入github上的仓库地址了

	> 注意：这里只能输入https格式的git仓库地址，git格式的需要ssh验证，就不行了，当然人家会提示你

2. clone gitee项目到本地

	* 导入github的仓库到gitee一般很快的，然后跟操作github一样，将项目clone到本地(当然这里如果gitee没有ssh的可以手动先加上去)

3. 重新关联远程库和开源仓库

``` bash
# 删除当前gitee远程库
git remote rm origin
# 添加github仓库和开源主仓库
git remote add origin git@github.com:xxx/developer-note.git
git remote add upstream git@github.com:BrucePhoebus/developer-note.git
# 查看远程库和开源仓库
git remote -v
```

> 就此项目拉取成功，如果只是单纯的拉取某个仓库的代码就省去关联开源仓库就行

``` bash
# 删除当前gitee远程库
git remote rm origin
# 添加github仓库
git remote add origin git@github.com:xxx/developer-note.git
# 查看远程库
git remote -v
```

#### 方案二：翻墙(VPN(代理服务器))

* 这里推荐免费的蓝灯

	* 当然问题是有的，也就是有事连容易中断和只有500M免费，但是只是偶尔使用的话够了
	* 蓝灯流程使用需要付费，下了软件就知道了，或直接淘宝买个

> [翻墙工具下载](资源积累/工具/翻墙/翻墙工具下载.md)

#### 方案三

> 参考：[github克隆项目很慢怎么办](https://blog.csdn.net/qq_25842063/article/details/81303048)
