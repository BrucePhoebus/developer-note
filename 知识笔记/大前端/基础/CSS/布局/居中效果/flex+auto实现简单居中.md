<!--
 * @Description: flex+auto实现简单居中
 * @Date: 2019-08-13 16:50:24
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 17:01:19
 -->
# flex+auto实现简单居中

## 实现思路

## 实现代码

``` html
<div class="content">
    <div class="center-content"></div>
</div>
```

``` css
.content {
        min-height: 100vh;
        display: flex;
    }

    .center-content {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        margin: auto;
		/* 这个只是为了美观，可以随意 */
        background: radial-gradient(circle at 100px 100px, #5cabff, #000);
    }
```

> [flex+auto实现居中效果](知识笔记/大前端/基础/CSS/布局/居中效果/flex+auto实现居中.html)
