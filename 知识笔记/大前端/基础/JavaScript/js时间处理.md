# js之时间处理

## 时间戳处理

## 获取年月日

## 获取周起始时间

## 获取月起始时间

## 其他

#### js判断当前月有多少天

``````js
function getDaysInMonth(year, month) {
    month = parseInt(month, 10) + 1;
    var temp = new Date(year, month, 0);
    return temp.getDate();
}
```

