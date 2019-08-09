<!--
 * @Description: 各种CSS特殊效果按钮原生实现
 * @Date: 2019-08-09 09:42:49
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-09 09:48:47
 -->
# CSS实现特效按钮

## 基础按钮

#### 实现按钮立起效果

``` html
<button class="btn-up">click</button>
```

``` css
.btn-up {
        font-size: 80px;
        outline: none;
        border: none;
        padding: .3em 1em;
        border-radius: .2em;
        cursor: pointer;
		/* 渐变背景色 */
        background: linear-gradient(#2de5fb, #26acbd);
        text-shadow: 0 2px 2px #9E9E9E;
		/* 阴影效果：实现按钮立体视觉 */
        box-shadow: 0 0.2em 0 #028494, 0 0.2em 0.2em grey;
    }

    .btn-up:active {
		/* 按钮点击变更阴影：实现点击效果 */
        box-shadow: 0 0.1em 0 #028494, 0 0.1em 0.1em grey;
        transform: translate(0, 0.1em);
    }
```

> [按钮立体效果实现](知识笔记/大前端/基础/CSS/效果/按钮/CSS实现按钮立起效果.html)
