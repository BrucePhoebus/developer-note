<!--
 * @Description: AngularJS-cli部署发布
 * @Date: 2019-08-30 17:04:56
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-30 17:14:48
 -->
# AngularJS-cli部署发布

## 最简单的部署

``` bash
ng build --prod
```

* 直接编译打包后，将dist打包文件复制到服务器某路径下(记得重命名)

* 然后配置服务器，将某个文件路径映射到项目打包的`index.html`文件

## 免费的github page部署

``` bash
ng build --prod --output-path docs --base-href
```

* 打包后项目根目录会出现一个`docs`打包文件，推送到github上

* 在github上设置github page的source路径，选择`master branch/docs folder`

* 之后页面刷新会出现项目`github page`外网访问地址，访问就能看到项目首页了
