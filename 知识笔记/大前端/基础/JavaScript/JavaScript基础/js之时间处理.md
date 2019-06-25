# js之时间处理

## 时间戳处理

#### 格式化时间

```js
function formatTime(date, state) {
	date = new Date(date);
	var year = date.getFullYear();
	var m = date.getMonth() + 1;	// 月份要 +1
	var d = date.getDate();
	var h = date.getHours();
	var mm = date.getMinutes();
	var s = date.getSeconds();
	if (state === 0) {
		h = 0;
		mm = 0;
		s = 0;
	} else if (state === 1) {
		h = 23;
		mm = 59;
		s = 59;
	}
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

// 补零
function add0(timeValue) {
	return timeValue < 10 ? '0' + timeValue : timeValue;
}
```

> 将传入的date转为Date对象，这样就可以实现传入各种格式的时间数据进行统一格式化

#### 字符串转时间戳

```js
let date = new Date();

let currentTime = date.getTime();	// 当前时间转时间戳
console.log(currentTime);	// 1561368117282

date = new Date('2018-08-08');
stringToTimestamp = date.getTime();	// 当前时间转时间戳
console.log(stringToTimestamp);	// 1533686400000
```

> 直接通过new Date()将某个时间格式的字符串转化为Date格式时间，然后就能调用Date对象getTime()方法输入转换后的时间戳

#### 时间戳转字符串

```js
timestampToTimeString(timestamp, state) {
	var time = new Date(timestamp);	// 转时间戳为Date格式
	var y = time.getFullYear();	// 获取Date格式中年份
	var m = time.getMonth() + 1;	// 月份要 +1
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	if (state === 0) {
		h = 0;
		mm = 0;
		s = 0;
	} else if (state === 1) {
		h = 23;
		mm = 59;
		s = 59;
	}
	return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
},

// 补零
add0(timeValue) {
	return timeValue < 10 ? '0' + timeValue : timeValue;
}
```

> 根据state状态增加类型，即一天的起始时间

## 获取年月日

```js
const date = new Date();

// 获取当前年份
let year = date.getFullYear();
console.log(year);

// 获取当前月份，注：获取月份数要+1
let month = date.getMonth() + 1;
console.log(month);

// 获取当前日
let day = date.getDate();
console.log(day);

// 计算当前是周几，注：以星期一为一周第一天
let weekDay = date.getDay();
console.log(weekDay);
```

## 获取周起始时间

```js
// 获取本周起始时间，注：本周以周一零点开始，结束时间以周日23:59:59
getThisWeekStartTime(isWeekEnd) {
	let date = new Date();
	let day = date.getDay();	//本周第几天，从周一开始算
	if (day === 1 && !isWeekEnd) {
		// 如果今天是周一
		return this.timestampToTimeString(new Date(), 0);
	}
	let year = date.getFullYear();
	// 因为月份是从0开始的,所以获取这个月的月份数要加1才行
	let month = date.getMonth() + 1;
	let monday = date.getDate() - day + 1; // 这周周一所在天数

	if (!isWeekEnd) {
		if (date.getDate() < day) {
			// 这个判断是为了解决跨年的问题,月份是从0开始的
			if (month === 1) {
				year -=  1;	// 跨年年份减一
				month = 12;	// 跨年的话，上个月为12月
				// 获取上个月天数
				date.setMonth(date.getMonth());
				date.setDate(0);
				let monthDay = date.getDate();
				monday = monthDay - day + 1;	// 上个月最后一个周一
			} else {
				month -= 1;
			}
		}
	} else {
		if (date.getDate() - day + 7 > this.getDaysInMonth(year, month)) {
			// 跨月
			// 如果跨年
			if (month === 12) {
				year += 1;
				month = 1;
			} else {
				month += 1;
			}
			monday = date.getDate() - day + 7 - this.getDaysInMonth(year, month);
		} else {
			monday = date.getDate() - day + 7;
		}
	}

	let time = new Date(year + '-' + this.add0(month) + '-' + this.add0(monday)).getTime(),
		index = isWeekEnd ? 1 : 0;

	return this.timestampToTimeString(time, index);
}
```

> `timestampToTimeString()`为获取时间戳转字符串，参数1为时间戳，参数2为判断是否零点或指定日的23点59分59秒，默认当前时间，具体看：<a href="#知识笔记/大前端/基础/JavaScript/JavaScript基础/js之时间处理?id=时间戳转字符串">时间戳转字符串</a>

> `getDaysInMonth()`为获取指定月份的天数，<a href="#知识笔记/大前端/基础/JavaScript/JavaScript基础/js之时间处理?id=js判断指定月有多少天">js判断指定月有多少天</a>


## 获取月起始时间

```js
// 获取本月起始时间，注：结束时间以本月最后一天23:59:59
getThisMonthTime(isMonthEnd) {
	let date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let dayTime = '01 00:00:00';

	// 解决跨年问题
	if(month === 1) {
		year = year - 1;
		month = 12;
	}

	if (isMonthEnd) {
		dayTime = this.getDaysInMonth(year, month) + ' 23:59:59';
	}

	return year + '-' + this.add0(month) + '-' + dayTime;
}
```

> `getDaysInMonth()`为获取指定月份的天数，<a href="#知识笔记/大前端/基础/JavaScript/JavaScript基础/js之时间处理?id=js判断指定月有多少天">js判断指定月有多少天</a>

## 时间运算

#### 加减天数

```js
changeCurrentDay(currentTime, changeDay) {
	let date = new Date(currentTime);
	date.setDate(date.getDate() + changeDay);
	return date;
}
```

> 根据传入的时间和要修改的天数进行计算，返回Date类型，也可以通过formatTime()方法得到指定格式的时间数据


## 其他

#### js判断指定月有多少天

``````js
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// 判断当前月有多少天
function getDaysInMonth(year, month) {
	const date = new Date();
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

```



