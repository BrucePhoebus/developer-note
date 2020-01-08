# 使用原生js实现斐波那契数列计算

## 题目描述

	输入一个数数值，然后把这个值经过斐波那契数列计算输出
	说明：斐波那契数列，以兔子的繁殖的例子而引入，故又称“兔子数列”，指的是这样一个数列：1、1、2、3、5、8、13、21、34、...；在数学上，斐波那契数列以如下被以递归的方法定义：F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)  (n>2，n∈N*)。

## 问题思考

1. 最简单的就是按照斐波那契数列的公式递归输出斐波那契数列计算后的值

## 代码实现

``` JS
function fn(num) {
	if (num === 1 || num === 2) {
		return 1;
	} else {
		return fn(num - 1) + fn(num - 2);
	}
}
console.log(fn(6));
```

## 参考

#### 动态规划优化实现

	性能优化

``` JS
function fibonacci(n) {
	let n1 = 1,
        n2 = 1,
        sum = 1;
    for(let i = 3; i <= n; i += 1) {
        sum = n1 + n2;
        n1 = n2;    //往后移动一位数
        n2 = sum
    }
    return sum
}
console.log(fibonacci(8));
```

> 参考：[博客-蔚莱先森](https://blog.csdn.net/Mr_JavaScript/article/details/79769572)
