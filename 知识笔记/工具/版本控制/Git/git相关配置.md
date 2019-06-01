# git相关配置

> 这个一般是在安装git库的时候就要进行配置的，但是很多时候初学者看到能用就不理的，但是到后面出现一些问题的时候，才发生是一开始留的坑

## 基础配置

> 这个是git前使用必须配置的

```bash
git config --global user.name xxxxx 
git config --global user.email xxx@x 
```

> 设置用户名的email，一般用户名和邮箱直接使用github的，以免出问题，当然用户名无所谓，但是邮箱一定要一样（其实不影响git连远程库，因为git连接远程库是通过ssh验证的）