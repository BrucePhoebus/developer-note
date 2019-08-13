<!--
 * @Description: js原生实现ajax上传文件
 * @Date: 2019-08-13 18:04:04
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-13 18:18:30
 -->
# js原生实现ajax上传文件

## 概述

#### 实现思路

##实现

#### 实现代码

``` js
/*
 *   ajax上传文件
 *       url                 文件上传地址
 *       fileSelector        input=file 选择器（支持多文件上传，只要后台接口支持）
 *       size                文件限制大小
 *       fileType            文件限制类型 mime类型
 *       success             上传成功处理
 *       error               上传失败处理
 *       timeout             超时处理
 *
 *   return: status:  0      请选择文件
 *                    1      超出文件限制大小
 *                    2      非允许文件格式
 * */
upload: function(url, fileSelector, size, fileType, success, error, timeout) {
	// 使用formData对象上传文件
    var formData = new formData(),
        fileNode = document.querySelector(fileSelector),	// 获取选择的file
        fileCount = fileNode.files.length,
        data = {},
        result = {};
	
    // 上传文件限制检查
    if (fileCount > 0) {
		// 便利每个文件，对文件的大小、格式等限制做判断，判断是否存在不符合条件的文件
        tool.each(Array.prototype.slice.call(fileNode.files), function(value) {
            // 检查文件大小
            if (value.size > size) {
                result["status"] = 1;
                result["errMsg"] = "超出文件限制大小";
            } else {
                // 检查文件格式.因为支持formData，自然支持数组的indexOf(h5)
                if (fileType.indexOf(value.type) === -1) {
                    result["status"] = 2;
                    result["errMsg"] = "非允许文件格式";
                } else {
                    formData.append(value.name, value);
                };
            };
        });
    } else {
        result["status"] = 0;
        result["errMsg"] = "请选择文件";
    };

	//如果有错误信息直接抛出去，结束运行
    if (result.status !== undefined) {
		return result; 
	}

    var ajaxParam = {
        type: "post",
        url: url,
        data: formData,
        isFormData: true,
        success: success,
        error: error,
        timeout: timeout
    };
    ajax.common(ajaxParam);
}
```

**使用/测试**

``` html
<!-- 使用form表单上传会导致页面刷新，使用iframe做提交页面可解决 -->
<form id="formUpload" action="/api/ajaxUpload/upload2/" method="post" enctype="multipart/form-data" target="frameFile">
    <input name="isIE8" type="text" value="1" readonly style="display: none"/>
    <input id="ieFile" type="file" name="age"/>
    <input type="submit" value="submit">
</form>
<iframe id="frameFile" name="frameFile" src="postMsg.html"></iframe>
```


``` js
var temp = ajax.upload("/api/ajaxUpload/upload3/", "#file1", 1024 * 1024 * 1, ["image/png","image/bmp"], function (data) {
    if (data == "true") {
        alert("上传成功！");
    }
    if (data == "error") {
        alert(data);
    }
});
console.log(temp);
```

#### 问题

* IE10一下不兼容(IE8、IE9)

	解决方案：将flash插件和ajax Level2的上传进行组合，支持H5的用ajax上传，不支持初始化flash上传插件

* 一般ajax请求和formData请求，后台取值问题

	传统http请求，可以直接在接口参数中取得数据，但是使用formData进行ajax请求的话，后台接口需要从formData对象中取数据，包括文件啥的，操作不一样

* 关于formData上传文件，具体能上传多大文件的限制问题

	上传文件的限制取决于web容器可接受上传文件的大小，tomcat、IIS等web容器都有自己的设置方法

> 参考：[前端通信：ajax设计方案（三）--- 集成ajax上传技术](js原生实现ajax上传文件)
