/*
 * @Description: 封装倒计时实现
 * @Date: 2019-07-04 14:16:01
 * @LastEditors: phoebus
 * @LastEditTime: 2019-07-04 14:17:25
 */

;(function ($) {
	$.fn.extend({
		countDown: function (endTime) {
			// 取设定的活动结束时间距1970年1月1日之间的毫秒数
			var end = new Date(endTime).getTime();
			// 取当前时间距1970年1月1日之间的毫秒数
			var nowTime = new Date().getTime();
			// 结束时间与当前时间之间的毫秒差
			var difference = end - nowTime;
			if (difference > 0) {
				// 将毫秒差换算成天数
				days = Math.floor(difference / 86400000);
				difference = difference - days * 86400000;
				// 换算成小时
				hours = Math.floor(difference / 3600000);
				difference = difference - hours * 3600000;
				// 换算成分钟
				minutes = Math.floor(difference / 60000);
				difference = difference - minutes * 60000;
				// 换算成秒数
				seconds = Math.floor(difference / 1000);
				// 不足10时，进行补零操作
				if (hours < 10) {
					hours = "0" + hours;
				};
				if (minutes < 10) {
					minutes = "0" + minutes;
				};
				if (seconds < 10) {
					seconds = "0" + seconds;
				};
				$(".tis1").html(days);
				$(".tis3").html(hours);
				$(".tis5").html(minutes);
				$(".tis7").html(seconds);
			} else {
				// 设定若是过了设置的活动结束时间，全部写成0天0时0分0秒
				$(".tis1").html(0);
				$(".tis3").html(0);
				$(".tis5").html(0);
				$(".tis7").html(0);
			}
		}
	})
})(jQuery);
