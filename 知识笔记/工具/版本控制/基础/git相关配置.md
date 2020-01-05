<!--
 * @Description: git相关配置
 * @Date: 2019-09-21 18:10:56
 * @LastEditors: phoebus
 * @LastEditTime: 2019-09-21 18:16:47
 -->
# git相关配置

## 入门配置

#### 配置全局git用户名和邮箱

``` bash
git config --global user.name "phoebus"
git config --global user.email  "1634372267@qq.com"
```

> 这样配置之后，使用git提交默认使用该用户名和邮箱，如果要针对项目配置可以单独配置

#### 针对每个项目配置不同的用户名和邮箱

``` bash
git config user.name "zheng.yekun"
git config user.email  "zheng.yekun@trs.com.cn"
```

> 这样配置完后会覆盖全局配置，使得每个项目都有不同的用户名和邮箱(当然也可以配置多个git账户)


