# js解决服务器和客户端存在时间差的问题

	问题根源： 在网页上做倒计时的功能， 必然存在服务器和客户端存在时间差， 而往往我们需要准确的知道并计算好时间节点问题

## 原理

	向服务器请求数据的时候， 服务器返回一个服务器时间的变量server_time， 客户端获取本地的时间client_time， 两者相减得到相差的 时间， 将该值加入本地时间差里面

## 常规实现

#### 摇红包倒计时

```html
<p id='countdownTxt'>摇红包倒计时</p>
<p id='timeContent'></p>
```

```js
$(function() {

    var time_distance = 0;
    requestRedBag();
    // 向后台请求数据： 
    function requestRedBag() {
        var url = ''; // 填写实际的url
        data = {}; // 填写实际的请求参数 

        // 向服务器请求数据 
        request(url, data, function(response) {
            var serve_time = new Date(response.current_time.replace(/-/g, '/')); // 将服务器返回的时间数据格式1992-09-12 10:22换成如1992/09/12 10:22 ，因为在safari下日期格式只能识别第二种 
            var local_time = new Date();
            time_distance = local_time.getTime() - serve_time.getTime(); // 服务器和用户的时间相差的毫秒数 
            var start_time = response.data.start_time;
            startCount(start_time);
        });
    }
    // 倒计时函数： 
    function startCount(startTime) {
        var endTime = new Date(startTime.replace(/-/g, '/')); // 改变日期格式为1992/03/12 23:00，因为safari只能是被这种格式 
        var countTimer = setInterval(function() {
            var nowTime = new Date();
            var time = endTime.getTime() - nowTime.getTime() + time_distance; // 截止时间和开始时间相差的毫秒数
            if (!isNaN(time) && time >= 0) {
                var day = parseInt(time / 1000 / 60 / 60 / 24);
                var hour = parseInt(time / 1000 / 60 / 60 % 24);
                var minute = parseInt(time / 1000 / 60 % 60);
                var second = parseInt(time / 1000 % 60);
                if (time == 0) {
                    currentRedBag.status = "1";
                    refreshView(currentRedBag, false);
                } else if (time <= 10000) {
                    // 调用10秒倒计时动画 
                    $('#timeContent').text(second + '秒');
                } else if (time <= 120000) {
                    // 倒数120秒的时候
                    var secondLeft = minute * 60 + second;
                    $('#timeContent').text(secondLeft + '秒');
                } else {
                    $('#timeContent').text(day + '天' + hour + '小时' + minute + '分钟' + second + '秒');
                }
            } else if (time < 0) {
                clearInterval(countTimer);
            }
        }, 1000);
    }
});
```

> 参考： [js解决服务器和客户端存在时间差的问题](https://blog.csdn.net/tangxiujiang/article/details/78154865)

## 具体实例

#### 客户端实现正确的服务器时间同步

	需要解决的问题很简单，就是如何在页面上比较准确的显示服务器时间。
	
	目前比较常用的方法就是根据基准时间使用setTimeout或 setInterval来计算最新的时间，这样的问题在于setTimeout与setInterval的时间精度比较低，经测试一分钟大概能相差几秒 （与电脑性能以及运行的任务也相关），这样的精度在某些需求下是无法满足的。除此之外，如果要获得比较准确的时间可以定期与服务器进行校准，只是这样实现的成本大一些

###### 实现特点

1. 根据基准时间进行纯客户端计算，无需服务器校准

2. 时间精度与客户端系统时间保持一致

3. 不受客户端时间与服务器时间不同步造成的影响

4. 不受客户端系统时间发生修改造成的影响

5. 不受页面前进后退造成的影响

###### 具体实现

1. 为了解决原方案中的时间精度问题，这里不再使用setTimeout和setInterval来直接计算时间，而是直接使用客户端时间(CT)。不过客户 端时间很可能与服务器时间(ST)不同步，这需要在页面加载的时候计算出客户端与服务器的时间差值(ΔT)，这样只需在客户端时间上做一下修正即可得到准 确的服务器时间(ST’ = CT - ΔT)

2. 由于客户端时间很可能被用户修改，因此直接按照步骤1中的方式计算，一旦用户修改了时间，计算出来的服务器时间也将随之发生变化。这就需要检测出客户端时 间的变化并消除这个变化。检测的方法很简单，即在每个计算周期(T)都将当时的客户端时间(CT2)与上一个周期的客户端时间(CT1)做比较，一旦两个 周期的差值(ΔT’ = CT2 - CT1 - T)大于某个预设值(S)时就将差值(ΔT’)加入到ΔT中，即此时的ΔT = ΔT + ΔT’。之所以需要设置一个预设值，是因为每个周期的时间本身不是固定的(依赖于setTimeout)，因此ΔT’并不会等于0，如果每次都将 setTimeout造成的误差作为CT与ST之间的误差将会造成计算不准确。经过以上的计算，用户修改时间后将不会对计算结果产生影响

3. 完成以上两步还有一个问题：当用户离开当前页面之后后退回页面时，时间计算不准确。问题在于基准时间是服务器给的，在第一次进入页面的时候确 定，当用户后退回当前页面时，基准时间并没有变，这样会导致重新从过期的基准时间开始计算，导致不准确。需要解决这个问题就是需要解决跨页面的数据存储问题，参考《Ajax应用中浏览器历史的兼容性解决方案》，可以通过表单元素来记忆。

	具体的实现方案是，页面第一次加载时创建两个input，一个用于存储最近一次的客户端时间，一个用于存储最近一次的基准时间。如果发现已经存在input（前进、后退、非强制刷新）则比较上一次的客户端时间与当前客户端时间，如果其差值大于某个预设值则像步骤2中一样进行校准，只不过使用的将是最新的基准值

**具体实现代码**

```js
var SyncTimer = (function(){  
	/*跨页面数据存储器*/    
	//存储最近一次的客户端时间，用于在页面前进、后退时进行时间矫正    
	var memoryElementID = 'sync_timer_memory_el';    
	//存储矫正后的最新基准时间，当页面前进、后退到当前页面时会以此值为新的基准时间    
	var memoryBaseTimeElementID = 'sync_timer_memory_base_time_el';    
	document.write('<input type="text" id="' + memoryElementID + '">');    
	document.write('<input type="text" id="' + memoryBaseTimeElementID + '">');    
	return{    
		/*  
			* @param { Integer } baseTime 基准时间  
			* @param { Function } updater 时间更新时的监听器  
			* @param { Integer } interval 校准计算周期时长，默认为200ms。  
			* @param { Integer } threshold 两个检查周期之间的时间误差（差值-周期时长）如果大于阈值则视为客户端时间有调整，默认为500ms。  
			*/    
		run: function(baseTime,updater,interval,threshold){    
			interval = interval || 200;    
			threshold = threshold || 500;                       

			var memoryEl = document.getElementById(memoryElementID);    
			var baseTimeEl = document.getElementById(memoryBaseTimeElementID);    

			/*前进、后退或刷新，则矫正baseTime*/    
			if( memoryEl.value != '' ){    
				//计算当前客户端时间与上次存储的客户端时间之差，如果差值超过阈值则更新基准时间    
				var diff = +new Date - parseInt(memoryEl.value);    
				if( Math.abs( diff ) - interval > threshold ){    
					baseTime = parseInt(baseTimeEl.value);    
					baseTime += diff;    
				}    
			}    

			var ct = +new Date;    
			var diff = ct - baseTime;    
			var pt = ct,cct;    

			(function(){    
				cct = +new Date;    
				/*计算当前计算周期与上一个计算周期的时间差，如果差值大于设定的阈值则进行矫正（处理客户端时间调整的情况）*/    
				var secDiff = cct - pt;    
				if( Math.abs( secDiff ) - interval > threshold ){    
					diff += (secDiff - interval);    
				}    
				var fixedTime = cct - diff;    
				updater( fixedTime );    
				pt = memoryEl.value = cct;    
				baseTimeEl.value = fixedTime;    
				setTimeout(arguments.callee,interval);    
			})();    
		}    
	}    
})();    
/*使用*/
window.onload = function(){    
	var serverTime = parseInt($('dateWrapper').getAttribute('date'))*1000;    

	SyncTimer.run(serverTime,function(date){    
		var d = new Date(date);    
		$('dateWrapper').innerHTML = d.format('yyyy-MM-dd hh:mm:ss');    
		$('dateWrapper').setAttribute('date', parseInt(date/1000));    
	});    
}
```

#### 同步服务器时间、同步倒计时

**实现思路**

1. 当用户第一次浏览页面时，服务器首先获取当前时间并显示在页面上

2. 设置一个每隔一秒就计算新的时间（新时间以`服务器时间`为初始值，然后每隔一秒累加一秒并生成新的时间），然后显示

> 这时显示的时间就是服务器时间了，当然，运行时间久了可能存在一定的误差，我们可以定时进行服务器时间校准

#### sign签名

	在做sign签名的时候，需要对比时间戳，是否合法，但是有时候真的会出现，时间不对称的客户端的时间和服务器时间不对称的情况

**解决思路**

1. 第一次请求，服务器端传递一个服务器端的当前时间戳到客户端；

2. 客户端接收到这个时间戳，然后用js获取一下当前的时间戳是啥；

3. 用客户端的时间戳减去，服务器端的时间戳，对比两个的时间差；

4. 如果存在时间差，保存时间差，然后每次需要用到时间的时候，js获取当前时间+(时间差)，就能算出来，客户端的时间戳是多少了。

## 问题场景

1. 比如一个商品，倒计时1小时停售，服务器已经过了这停售时间，从而停售了，但是客户端的时间比服务器时间向后调了1小时，那么客户端就会以为还没有停售，这就是bug，所以都会要求使用服务端的时间进行计算




