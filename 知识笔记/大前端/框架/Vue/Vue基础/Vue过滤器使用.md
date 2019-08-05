# Vue过滤器使用

	Vue的过滤器跟计算属性和Vuex的getter方法效果一样，都是对数据的二次处理

## 简单使用

#### 限制内容显示长度

```js
// 过滤器
filters: {
	// 过滤周日程内容显示长度
	scheduleContentFilter: function(value) {
		if (!value) {
			return '';
		}

		// 根据屏幕大小使用不同的长度限制
		let len = document.body.scrollWidth > 1400 ? 23 : 14;
		// 计算字节长度
		let valueLength = 0;
		for (var i = 0; i < value.length; i++) {
			var charCode = value.charAt(i);
			if (charCode.match(/[^\x00-\xff]/ig) != null) {
				valueLength += 2;
			} else {
				valueLength += 1;
			}
		}

		if (valueLength > len) {
			if (valueLength > value.length * 3 / 2) {
				value = value.toString().substring(0, len * 2 / 3) + '...';
			} else {
				value = value.toString().substring(0, len) + '...';
			}
		}

		return value;
	},
},
```

> 这里使用了中英文转字节判断和大小屏显示处理

**使用方式**

	使用方式比较简单，直接在花括号模版代码处

```js
{{ weekDay.sCont | scheduleContentFilter }}
```
