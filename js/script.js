
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

// 全局变量
var global = {},
    $body = $('body'),
	$frame = $body.find('#main-frame'),
    hrefPage = window.location.hash.substr(1);

// 默认所有ajax不缓存
$.ajaxSetup({
	cache: false
});

// hash改变时自动加载子页面
$(window).on('hashchange', function() {
	var href = window.location.hash.substr(1);
	if (href && href !== hrefPage) {
		loadPage(href);
	}
	return false;
});

// 获取url参数
function getURLParams(hash) {
    var pat = /([^?=&#]*)=([^?=&#]+)/g, params = {};
    decodeURIComponent(hash || window.location.hash)
        .replace(pat, function(a, b, c){
            if (b in params) {  // 已有该键
                if (! _.isArray(params[b])) params[b] = [params[b]];    // 数组化
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
    console.log('正在加载子页面 ' + href);
	$.ajax({
		url: href,
		success: function(data){
            try {
                var obj = $.parseJSON(data);
                if (! obj['__LOGINED__']) {    // 若未登录
                    window.location.href = '.';
                    return;
                }
            } catch(err) {}

            window.location.hash = hrefPage = href;
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
            window.location.back();
		}
	});
}
