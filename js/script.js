
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
}

// 全局变量
var global = {},
	$body = $('body'),
	$frame = $body.find('#main-frame'),
	hrefPage = location.hash.substr(1);

// 默认所有ajax不缓存
$.ajaxSetup({
	cache: false,
	async: false
});

// hash改变时自动加载子页面
$(window).on('hashchange', function() {
	var href = location.hash.substr(1);
	if (href && href !== hrefPage) {
		loadPage(href);
	}
	return false;
});

// 从后台读取数据对象或使用测试数据
function readResObj(data, testData) {
	var resObj;
	try {
		if (typeof data === 'string') {
			data = JSON.parse(data);
		}
		resObj = data;
	} catch(err) {
		if (typeof testData === 'string') {
			testData = JSON.parse(testData);
		}
		resObj = testData;
	}
	if (typeof resObj !== 'object') {
		console.error('Error reading resObj', err);
	}
	// 通知消息
	var msg = resObj['__MESSAGE__'];
	if (msg) {
		notify(msg);
	}
	return resObj;
}
// 通知消息
function notify(msg) {
	alert(msg);
}

// 获取url参数
function getURLParams(hash) {
	var pat = /([^?=&#]*)=([^?=&#]+)/g, params = {};
	decodeURIComponent(hash || location.hash)
		.replace(pat, function(a, b, c){
			if (b in params) {  // 已有该键
				if (! _.isArray(params[b])) params[b] = [params[b]];	// 数组化
				params[b].push(c);
			} else {
				params[b] = c;
			}
		});
	return params;
}

// 刷新子页面
function reloadPage(success) {
	loadPage(hrefPage, success);
}
// ajax加载子页面
function loadPage(href, success){
	//console.log('正在加载子页面 ' + href);
	$.ajax({
		url: href,
		success: function(data){
			try {
				var obj = $.parseJSON(data);
				if (! obj['__LOGINED__']) {	// 若未登录
					location.href = '.';
					return;
				}
			} catch(err) {}

			location.hash = hrefPage = href;
			$(window).scrollTop(0);

			// 移除对话框
			//$body.children('[role="dialog"]').remove();

			$frame.html(data);

			
			var item = _.findWhere(global.allItems, {
				'nHref': href
			});
			if (item) {
				var nId = item['nId'], uId = item['uId'], nIdMenu, nIdTab;
				if (uId !== '0' && _.findWhere(global.subItems, {
					'nId': uId
				})) {
					nIdMenu = _.findWhere(global.subItems, {
						'nId': uId
					})['nId'];
					nIdTab = nId;
				} else {
					nIdMenu = nId;
					nIdTab = -1;
				}
				startMenu(nIdMenu, nIdTab);
			}
			success && success();
		},
		error: function(){
			alert('子页面 '+ href +' 加载失败!');
			history.back();
		}
	});
}
