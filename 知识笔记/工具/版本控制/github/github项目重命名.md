# github项目重命名

	项目名字看着看着就觉得很lo，感觉跟内容也不完全符合，还是改下名字

## github项目重命名

1. 找到github官网个人项目的setting设置处，直接重命名

![](../../images/工具/版本控制/github_setting.png)

2. 然后将本地的github仓库地址重命名

``` bash
# 本地查看远程仓库地址
git remote -v
# 然后删除绑定的远程仓库
git remote rm origin
# 重新绑定远程仓库
git remote add origin git@github.com:xxx/xxx.git
# 重命名本地项目文件名：注意这一步可能影响到node_modules路径，可以考虑不重命名本地项目文件夹，不影响
```

> 自此，项目重命名完成
