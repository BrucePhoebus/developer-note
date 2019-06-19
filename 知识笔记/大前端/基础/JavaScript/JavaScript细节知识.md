# JavaScript细节

## 变量方面

#### null和undefined的区别

* null在Number中会被自动转为0；而undefined则输出NaN

* null表示`没有对象`或说空对象指针，将null赋值给变量，就表示该变量指向空对象；undefined表示缺少值，意思已声明，但未定义，声明一个变量但不初始化，那么它的值就是undefined

> null主要表示一个变量还没有真正保存对象的时候，它的值就应该为null，这是意料之中的空，而undefined通常表示意料之外的内容，如未初始化的变量，一般来说我们不应该显式的使用undefined
