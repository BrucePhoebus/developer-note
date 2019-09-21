# 配置多个git账户

## 前言

* 使用多个git账户主要是针对个人git公开账户和公司gitlab私密账户，做出区分

## 配置实现

#### 首先先生成两个不同账户的ssh

1. [如何生成多个ssh](知识笔记/工具/版本控制/github/如何生成多个ssh.md)

2. 配置config

``` bash
# 该文件用于配置私钥对应的服务器
# Default github user(1634372267@qq.com)
Host git@github.com	# 也可以叫github / git，就是个别名
	HostName github.com	# 这个是区别的唯一性，不同的远程库管理平台
	User git
	IdentityFile ~/.ssh/id_rsa

# second user(zheng.yekun@trs.com.cn)
# 建一个github别名，新建的帐号使用这个别名做克隆和更新
Host git@xxx.com	# 也可以叫gitlab
	HostName gitlab.com	# 也可以是IP，公司的gitlab地址
	User git
	IdentityFile ~/.ssh/trs
```

3. 验证是否连接成功

``` bash
ssh -T git@github.com
# 或使用别名执行
ssh -T github	# 看别名叫什么
```

> 在远程库管理平台(github/gitlab)中添加SSH后就可以验证连接了

