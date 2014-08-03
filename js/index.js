//　判断浏览器兼容性
if (!isCanvasSupported()) {
  $('#warning').slideDown('slow');
  throw new Error('browser not supported');
}

// 登录状态判断
$.ajax({
  url: 'system/login.jsp',
  success: function (htmlStr) {
    var resObj = {};
    try {
      resObj = JSON.parse(htmlStr);
    } catch (err) {
    }
    if (resObj['__LOGINED__']) {
      link('system/main.jsp');
    }
    else {
      $('#login-form').slideDown('slow');
    }
  }
});

// 登录表单提交
$('#login-form').ajaxForm({
  success: function (resTxt) {
    var resObj = {};
    try {
      resObj = JSON.parse(resTxt);
    } catch (err) {
    }
    if (resObj['__LOGINED__']) {
      link('system/main.jsp');
    }
    else {
			notify(resObj['__MESSAGE__']);
    }
  }
});

function isCanvasSupported() {
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}