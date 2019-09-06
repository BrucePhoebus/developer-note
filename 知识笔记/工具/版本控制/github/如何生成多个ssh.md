<!--
 * @Description: 如何生成多个ssh
 * @Date: 2019-09-06 11:36:23
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-06 11:52:59
 -->
# 如何生成多个ssh

## windows下Git多账号配置，同一电脑多个ssh-key的管理

> [Git-TortoiseGit完整配置流程](http://www.cnblogs.com/popfisher/p/5466174.html)

1. 执行命令创建github对应的ssh key

``` bash
# 绑定你的邮箱名
ssh-keygen -t rsa -C 1634372267@qq.com
```

2. 让你命名，输入`id_rsa_github`

3. 输入账号密码，直接回车，这样每次push的时候直接验证`ssh`，而不需要密码

4. 成功生成秘钥/公钥

	* 直接在路径：`C://Users/xxx(个人window账户名)/.ssh/`下可以看到两个文件：id_rsa和id_rsa_github.pub

5. 往github上添加ssh

	* 找到个人github账号的`Settings`处，左侧目录有`SSH and GPG keys`选项，进去`New SSH Key`
	* 找到本地`id_rsa_github.pub`文件，将里面的东西复制出来，然后粘到要求输入的key上，title自拟

6. 执行github测试

``` bash
# 执行命令连接github测试
ssh git@github.com
```

> 如果提示成功，就说明我们连接github成功，也就是ssh可用，然后可以进行相关git操作，例如clone项目、pull/push

7. 进入正题，再生成一个ssh秘钥，步骤重复

``` bash
# 进入生成ssh操作
ssh-keygen -t rsa -C 1634372267@qq.com(这个可以换个)
# 输入新的秘钥名：看个人喜欢
gitee
# 不需要输入账号密码
回车
回车
# 然后在 C://Users/xxx(个人window账户名)/.ssh/ 下可以看见多了两个文件
# 将id_rsa_gitee.pub(新的公钥)打开粘到你想要的平台，可以github，也可以gitee
```

> 生成更多秘钥步骤完全一样，自此问题完毕
