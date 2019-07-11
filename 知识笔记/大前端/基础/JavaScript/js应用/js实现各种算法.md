# JavaScript实现各种算法问题

1. 处理URL参数

	输入一串URL，问号前的参数是哈希，作为第一行输出，之后参数和参数值以空格隔开，按行按顺序输出

``` js
function parseURL(url) {
	var result = [];
	if (!url || !url.split("#")[1]) {
		return result;
	}
	var str = url.split("#")[1];
	result.push(str.split("?")[0]);
	var temp1 = [];
	if (str.split("?")[1]) {
		temp1 = str.split("?")[1].split("&");

		var i,
			len = temp1.length;
		for(i = 0; i < len; i++) {
			result.push(temp1[i].split("=")[0] + " " + temp1[i].split("=")[1]);
		}
	}
	return result;
}
parseURL("http://163.com/role/search/#page?pageSize=20&pageNumber=10");
```


