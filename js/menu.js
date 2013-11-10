
// 生成标签
function makeTabs(nIdMenu, nIdTab){
	var $header = $('.content-box-header').empty();
	var tabItems = _.where(global.tabItems, {
		'uId': nIdMenu
	}), item = _.findWhere(global.allItems, {
		'nId': nIdMenu
	}), $tabList = $('<ul class="content-box-tabs">').appendTo($header);
	
	if (tabItems.length === 0) {
		/*var $h3 = $('<h3>').text(item['nName']).prependTo($header);*/
		$([
			'<li data-n-name="'+ item['nName'] +'" data-n-id="'+ item['nId'] +'" data-u-id="'+ item['uId'] +'">',
				'<a href="'+ item['nHref'] +'" class="current">', item['nName'], '</a>',
			'</li>'
		].join('')).appendTo($tabList);
	} else {
		_.each(tabItems, function(val) {
			$([
				'<li data-n-name="'+ val['nName'] +'" data-n-id="'+ val['nId'] +'" data-u-id="'+ val['uId'] +'">',
					'<a href="'+ val['nHref'] +'">', val['nName'], '</a>',
				'</li>'
			].join('')).appendTo($tabList);
		});
		
		$lis = $('ul.content-box-tabs li');
		$lis.children('a').removeClass('current');
		$lis.filter('[data-n-id="'+ nIdTab +'"]').children('a').addClass('current');
	}
}

// 进入某一子页面，刷新菜单和标签
function startMenu(nIdMenu, nIdTab){
	global.nIdMenu = nIdMenu;
	global.nIdTab = nIdTab;
	var $nav = $('#main-nav');
	$nav.find('a.current').removeClass('current');
	$nav.find('li[data-n-id="'+ nIdMenu +'"] a').addClass('current');
	$nav.find('a.current').closest('ul').slideDown('fast');
	
	makeTabs(nIdMenu, nIdTab);
}
// 生成菜单
function makeMenu(href, onLoad){
	var $nav = $('#main-nav').hide().empty();
	$.get(href, function(resTxt){
		var resObj = JSON.parse(resTxt),
			menuArr = resObj['_Menu'],
			allItems = global.allItems = [],
			topItems = global.topItems = [],
			subItems = global.subItems = [],
			tabItems = global.tabItems = [];
		
		_.each(_.rest(menuArr), function(item, i) {
			allItems.push(item);
			if (item.uId === '0') {	// 顶级条目
				topItems.push(item);
				$([
					'<li data-n-name="'+ item['nName'] +'" data-n-id="'
					+ item['nId'] +'" data-u-id="'+ item['uId'] +'">',
						'<a class="nav-top-item">', item['nName'], '</a>',
						'<ul style="display: none;">', '</ul>',
					'</li>'
				].join('')).appendTo($nav);
			} else if (_.some(topItems, function(val) {
				return val['nId'] === item['uId'];
			})) {	// 子条目
				subItems.push(item);
				$([
					'<li data-n-name="'+ item['nName'] +'" data-n-id="'
					+ item['nId'] +'" data-u-id="'+ item['uId'] +'">',
						'<a class="nav-sub-item"'+ (item['nHref'] !== '#' && (' href="'+ item['nHref'] +'"'))
						+'>', item['nName'], '</a>',
					'</li>'
				].join('')).appendTo($nav.find('li[data-n-id="'+ item['uId'] +'"] ul'));
			} else if (_.some(subItems, function(val) {
				return val['nId'] === item['uId'];
			})) {	// 标签条目
				tabItems.push(item);
				var $li = $nav.find('li[data-n-id="'+ item['uId'] +'"]');
				if (! $li.data('tabs')) {
					$li.data('tabs', [item]);
					$li.children('a').attr('href', item['nHref']);
				} else {
					$li.data('tabs').push(item);
				}
			}
		});
		$nav.show();
		
		$('body').delegate("#main-nav li a.nav-top-item", 'click', function() {
			$(this).parent().siblings().find('ul').stop().slideUp('fast'); // Slide up all sub menus except the one clicked
			$(this).next().stop().slideDown('fast'); // Slide down the clicked sub menu
			return false;
		});
		$("#main-nav li .nav-top-item").hover(function() {
			$(this).stop().animate({ paddingRight: '25px' }, 'fast');
		}, function() {
			$(this).stop().animate({ paddingRight: '15px' });
		});
		onLoad();
	});
	
}
