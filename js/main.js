
// 默认所有按钮均为子页面链接（.external类除外）
$('body').delegate('[href]', 'click', function(ev) {
    var href = $(this).attr('href');
    if (! $(this).is('.external') && href && href !== '#') {
        ev.preventDefault();
        href = href.match(/(html\/.+)/)[1]; // fix IE bug
        loadPage(href);
    }
}).delegate('a, button, [href]', 'click', function() {
    //validateUser(); // 检测用户在线状态
});

// 首次检测用户登录状态
validateUser(init);

function init(resObj) {
    // 欢迎语
    $('#profile-links>span').text('你好，' + resObj['__CURRENTUSER__']);
    // 生成菜单
    makeMenu('system/menu.jsp', function() {
        // 首次加载子页面
        defaultHref = 'html/MainCharts.html';
        loadPage(location.hash.substr(1) || defaultHref);
    });
}
function validateUser(onUserValidated) {
    $.get('modules/UserManage_ctl.jsp?action=showuserinfo', function(resObj) {
        if (!_.isObject(resObj))
            try {
                 resObj = $.parseJSON(resObj);
            } catch (err) {
                resObj = null;
            }
        if (! resObj || ! resObj['__LOGINED__']) {
            window.location.href = '.';
            return;
        }
        onUserValidated && onUserValidated(resObj);
    });
}
