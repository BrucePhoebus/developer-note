# JQ的Extend实扩展已经存在的组件

## 概述

#### $.Extend简介

	jQuery.extend() 函数用于将一个或多个对象的内容合并到目标对象
	通过这种方式，我们可以为全局对象jQuery添加新的函数

> 如果多个对象具有相同的属性，则后者会覆盖前者的属性值

* 官方demo

``` js
var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
$.extend(settings, options);	// 结果：settings == { validate: true, limit: 5, name: "bar" }
```

``` js
var empty = {};
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
var settings = $.extend(empty, defaults, options);

// 结果：
// settings == { validate: true, limit: 5, name: "bar" }
// empty == { validate: true, limit: 5, name: "bar" }
// 并且：empty == defaults	// false
```

> 这个貌似可以实现对象深克隆



* 遍历并合并数组demo

	遍历数组元素，并修改第一个对象

``` js
$(function () { 
    var object1 = {
        apple: 0,
        banana: {weight: 52, price: 100},
        cherry: 97
    };
    var object2 = {
        banana: {price: 200},
        durian: 100
    };
    /* object2 合并到 object1 中 */
    $.extend(object1, object2);
    var printObj = typeof JSON != "undefined" ? JSON.stringify : function(obj) {
        var arr = [];
        $.each(obj, function(key, val) {
            var next = key + ": ";
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push( next );
        });
        return "{ " +  arr.join(", ") + " }";
    };
    $("#log").append( printObj(object1) );
})
```

## 应用

#### 扩展ajax请求组件

###### 需求

* 在Web开发的时候我们经常使用jquery.ajax的方式向后台发送请求

``` js
$.ajax({
	type: "post",
	url: "/User/Edit",
	data: { data: JSON.stringify(postdata) },
	success: function (data, status) {
		if (status == "success") {
			toastr.success('提交数据成功');
			$("#tb_aaa").bootstrapTable('refresh');
		}
	},
	error: function (e) {
	},
	complete: function () {
	}

});
```

* 上述情况很常见，但是在自己调用ajax请求的时候，我们不想每次都写error:function(e){}这种代码，但是我们又想让它每次都将ajax的错误信息输出到浏览器让用户能够看到。怎么办呢？

###### 解决思路

* 最简单的是我们可以将`$.ajax({})`封装一层，在封装的公共方法里面定义error对应的事件即可。但是这种方法存在一些问题：

	1）在jquery的基础上面再封装一层，效率不够高；
	2）需要改变调用者的习惯，每次调用ajax的时候需要按照我们定义的方法的规则来写，而不能直接用原生的`$.ajax({})`这种写法，这是我们不太想看到

* 而有一个比较好的解决方案JQ已经给我们提供了，也就是通过`$.extend`去扩展原生的`jquery.ajax`

###### 实现

``` js
(function ($) {
    // 1.得到 $.ajax 的对象
    var _ajax = $.ajax;
    $.ajax = function (options) {
        // 2.每次调用发送ajax请求的时候定义默认的error处理方法
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest.responseText, '错误消息', { closeButton: true, timeOut: 0, positionClass: 'toast-top-full-width' });
            },
            success: function (data, textStatus) { },
            beforeSend: function (XHR) { },
            complete: function (XHR, TS) { }
        }
        // 3.如果在调用的时候写了error的处理方法，就不用默认的
        if (options.error) {
            fn.error = options.error;
        }
        if (options.success) {
            fn.success = options.success;
        }
        if (options.beforeSend) {
            fn.beforeSend = options.beforeSend;
        }
        if (options.complete) {
            fn.complete = options.complete;
        }
        // 4.扩展原生的$.ajax方法，返回最新的参数
        var _options = $.extend(options, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                fn.success(data, textStatus);
            },
            beforeSend: function (XHR) {
                fn.beforeSend(XHR);
            },
            complete: function (XHR, TS) {
                fn.complete(XHR, TS);
            }
        });
        // 5.将最新的参数传回ajax对象
        _ajax(_options);
    };
})(jQuery);
```

###### 分析

1. 定义默认的error处理方法

``` js
var fn = {
	error: function (XMLHttpRequest, textStatus, errorThrown) {
		toastr.error(XMLHttpRequest.responseText, '错误消息', { closeButton: true, timeOut: 0, positionClass: 'toast-top-full-width' });
	},
	success: function (data, textStatus) { },
	beforeSend: function (XHR) { },
	complete: function (XHR, TS) { }
}
```

2. 判断用户在调用$.ajax({})的时候是否自定了error:function(){}，如果定义过，则使用用户定义的，反之则用默认的error处理方法

3. 使用$.extend()将error默认处理方法传入$.ajax()的参数中。我们看options参数时包含$.ajax()方法里面所有的参数的，然后用默认的fn去扩展它即可

> 这样扩展，对于我们使用者来说完全感觉不到变化，我们仍然可以$.ajax({});这样去发送ajax请求，如果没有特殊情况，不用写error处理方法

## 扩展自己的组件

#### 封装select组件

###### 需求

* 以select这个组件为例，很多情况下，我们的select里面的option都是需要从数据库里面取数据的，所以一般的做法就是发送一个ajax请求，然后在success方法里面拼html

> 这样我们可以根据这个需求封装我们的select组件

###### 组件实现

``` js
(function ($) {
    // 1. 定义jquery的扩展方法 combobox
    $.fn.combobox = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.combobox.methods[options](this, param);
        }
        // 2. 将调用时候传过来的参数和default参数合并
        options = $.extend({}, $.fn.combobox.defaults, options || {});
        // 3. 添加默认值
        var target = $(this);
        target.attr('valueField', options.valueField);
        target.attr('textField', options.textField);
        target.empty();
        var option = $('<option></option>');
        option.attr('value', '');
        option.text(options.placeholder);
        target.append(option);
        // 4. 判断用户传过来的参数列表里面是否包含数据data数据集，如果包含，不用发ajax从后台取，否则否送ajax从后台取数据
        if (options.data) {
            init(target, options.data);
        } else {
            // var param = {};
            options.onBeforeLoad.call(target, options.param);
            if (!options.url) return;
            $.getJSON(options.url, options.param, function (data) {
                init(target, data);
            });
        }
        function init(target, data) {
            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[options.valueField]);
                option.text(item[options.textField]);
                target.append(option);
            });
            options.onLoadSuccess.call(target);
        }
        target.unbind("change");
        target.on("change", function (e) {
            if (options.onChange) {
				return options.onChange(target.val());
			}
        });
    }

    // 5. 如果传过来的是字符串，代表调用方法。
    $.fn.combobox.methods = {
        getValue: function (jq) {
            return jq.val();
        },
        setValue: function (jq, param) {
            jq.val(param);
        },
        load: function (jq, url) {
            $.getJSON(url, function (data) {
                jq.empty();
                var option = $('<option></option>');
                option.attr('value', '');
                option.text('请选择');
                jq.append(option);
                $.each(data, function (i, item) {
                    var option = $('<option></option>');
                    option.attr('value', item[jq.attr('valueField')]);
                    option.text(item[jq.attr('textField')]);
                    jq.append(option);
                });
            });
        }
    };

    // 6. 默认参数列表
    $.fn.combobox.defaults = {
        url: null,
        param: null,
        data: null,
        valueField: 'value',
        textField: 'text',
        placeholder: '请选择',
        onBeforeLoad: function (param) { },
        onLoadSuccess: function () { },
        onChange: function (value) { }
    };
})(jQuery);
```

###### 使用

1. 用法一：通过URL远程取数据并初始化

``` html
<!-- 定义一个空的select -->
<select id="sel_search_plant" class="form-control"></select>
```

``` js
// 初始化
$(function(){
     $('#sel_search_plant').combobox({
            url: '/application/Plant/Find',
            valueField: 'TM_PLANT_ID',
            textField: 'NAME_C'
      });
})
```

2. 取值和设置

``` js
var strSelectedValue = $('#sel_search_plant').combobox("getValue");
$('#sel_search_plant').combobox("setValue", "aaa");
```

###### 实现分析

1. 常见实现写法

``` js
(function ($) {
      // 封装组件逻辑
})(jQuery);
```

> 通过匿名函数封装实现，是立即执行函数，这里并传入jQuery对象作为参数使用，相当于：

``` js
var fn = function($){
    // 组件封装逻辑
};
fn(jQuery);
```

2. 定义自己的组件的代码

``` js
$.fn.combobox = function (options, param) {
	// 这里实现封装的组件逻辑
};
```

3. extend合并默认参数和用户传进来的参数

``` js
options = $.extend({}, $.fn.combobox.defaults, options || {});
```

4. 定义一个combobox默认参数列表

``` js
$.fn.combobox.defaults = {
	url: null,
	param: null,
	data: null,
	valueField: 'value',
	textField: 'text',
	placeholder: '请选择',
	onBeforeLoad: function (param) { },
	onLoadSuccess: function () { },
	onChange: function (value) { }
};
```

> 所有的组件一般都会有一个默认值，也就是用户没有传参的时候，我们就使用默认值

> 参考：[JS组件系列——封装自己的JS组件，你也可以](https://www.cnblogs.com/landeanfen/p/5124542.html)
