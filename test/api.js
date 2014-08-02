var app = module.parent.exports.app
var username = 'admin'
var password = '111111'

app.get('/system/login.jsp', function(req, res){
  var json = '{"__LOGINED__":false,"__MESSAGE__":"未登录"}'
  res.send(json)
})

app.post('/system/login.jsp', function(req, res){
  var json
  if (req.body['action'] === 'Login') {
    json = '{"__LOGINED__":true,"__MESSAGE__":"登录成功"}'
    if (req.body['login-name'] !== username ||
      req.body['login-password' !== password]) {
      json = '{"__LOGINED__":false,"__MESSAGE__":"登录信息错误"}'
    }
    res.send(json)
  } else {
    res.send(400)
  }
})

app.get('/system/main.jsp', function(req, res){
  res.redirect('/main.html')
})

app.get('/modules/UserManage_ctl.jsp', function(req, res){
  var json
  if (req.query['action'] === 'showuserinfo') {
    json = '{"__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.get('/system/logout.jsp', function(req, res){
  res.redirect('/index.html')
})

app.get('/system/menu.jsp', function(req, res){
  //
})