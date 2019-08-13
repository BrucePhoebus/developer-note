<!--
 * @Description: 
 * @Date: 2019-08-13 16:39:49
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 17:00:57
 -->
# CSS各种使用技巧之问题驱动

## 常见

#### 隐藏文字内容的方法

* `text-indent`设置为`-1000px`

	原意思是段落缩进程度，这里负值的意思就是让他往左缩回去，实现隐藏效果

* `font-size`值设为`0`

	当一个字的大小为0时，就是没有或不占空间，也就看不见隐藏了

#### 如何实现背景虚化

* 使用CSS滤镜实现背景虚化

``` css
body {
	filter: blur(2px);
}
```

## 偏门


> 参考：[你未必知道的49个CSS知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12) | [前端硬核面试专题之 CSS 55 问](https://mp.weixin.qq.com/s/SVKMsQtOLNqYXeT_f95FUw)
