$docsify.plugins = [].concat(function (t) {
	var a = Docsify.dom;
	t.mounted(function (t) {
		var n = a.create("div");
		n.id = "gitalk-container";
		var i = a.getNode("#main");
		n.style = "width: " + i.clientWidth + "px; margin: 0 auto 20px;", a.appendTo(a.find(".content"),
			n);
		var e = a.create("script");
		e.textContent = "gitalk.render('gitalk-container')", a.appendTo(a.body, e)
	})
}, $docsify.plugins);