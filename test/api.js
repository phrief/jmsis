var app = module.parent.exports.app
var username = 'admin'
var password = '111111'
var logined = false

app.get('/system/login.jsp', function(req, res){
  var json = '{"__LOGINED__":true}'
  var obj = JSON.parse(json)
  if (!logined) {
    obj['__LOGINED__'] = false
    //obj['__MESSAGE__'] = '未知错误!'
    obj['__MESSAGE__'] = '未登录!'
  }
  res.send(obj)
})

app.post('/system/login.jsp', function(req, res){
  var json
  if (req.param('action') === 'Login') {
    json = '{"__LOGINED__":true,"__MESSAGE__":"登录成功!"}'
    if (req.body['login-name'] !== username ||
      req.body['login-password'] !== password) {
      json = '{"__LOGINED__":false,"__MESSAGE__":"登录信息错误!"}'
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
  var action = req.param('action')
  if (action === 'showuserinfo') {
    json = '{"__MESSAGE__":"","__ERROR__":false,"ISQUANSHI":true,"_PageValue":{"ZWM":"管理员","ID":"2","DW":"五邑大学","QYSY":"440799,440700,440701,440703,440704,440705,440781,440783,440784,440785","YHM":"admin","BZ":"系统管理员"},"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else if (action === 'listuser') {
    json = '{"_PageList":[{"ZWM":"江门社保局","ID":"81","DW":"江门市直用户","ISAUDITED":"false","YHM":"jmsi","BZ":""},{"ZWM":"计财科","ID":"80","DW":"社保局计财科","ISAUDITED":"false","YHM":"jck","BZ":""},{"ZWM":"养老科","ID":"79","DW":"社保局养老科","ISAUDITED":"false","YHM":"ylk","BZ":""},{"ZWM":"林亮","ID":"78","DW":"","ISAUDITED":"false","YHM":"11080731","BZ":"nice"},{"ZWM":"黄锐昌","ID":"77","DW":"","ISAUDITED":"false","YHM":"11080715","BZ":"great"},{"ZWM":"王柱","ID":"76","DW":"五邑大学开发用户","ISAUDITED":"false","YHM":"wharry","BZ":"无"},{"ZWM":"管理员","ID":"2","DW":"五邑大学","ISAUDITED":"false","YHM":"admin","BZ":"系统管理员"}],"_pageCount":1,"__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"__CURRENTUSER__":"admin","_moreaction":"","__LOGINED__":true,"_curPage":1,"_AUTH_MANAGE":true}'
    res.send(json)
  } else if (action === 'edituser') {
    json = '{"__MESSAGE__":"","__ERROR__":false,"_PageValue":{"ZWM":"管理员","ID":"2","DW":"五邑大学","QYSY":"440799,440700,440701,440703,440704,440705,440781,440783,440784,440785","YHM":"admin","BZ":"系统管理员"},"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.post('/modules/UserManage_ctl.jsp', function(req, res){
  var json
  var action = req.param('action')
  if (action === 'saveuser') {
    json = '{"__MESSAGE__":"存盘成功!","__ERROR__":false,"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else if (action === 'saveuserauth') {
    json = '<script>alert("保存成功！")</script>'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.get('/system/logout.jsp', function(req, res){
  res.redirect('/')
})

app.get('/system/menu.jsp', function(req, res){
  var json = '{"__MESSAGE__":"","__ERROR__":false,"_Menu":[{"nName":"ROOT","nId":"0","uId":"-1","nImg":"","nHref":""},{"nName":"主监控台","nId":"21","uId":"0","nImg":"","nHref":"#"},{"nName":"养老保险","nId":"1","uId":"0","nImg":"","nHref":"#"},{"nName":"失业保险","nId":"65","uId":"0","nImg":" ","nHref":"#"},{"nName":"工伤保险","nId":"81","uId":"0","nImg":" ","nHref":"#"},{"nName":"计划财务科","nId":"12","uId":"0","nImg":"","nHref":"#"},{"nName":"系统设置","nId":"14","uId":"0","nImg":"","nHref":"#"},{"nName":"养老保险基金监测","nId":"2","uId":"1","nImg":"","nHref":"#"},{"nName":"养老保险业务检测","nId":"3","uId":"1","nImg":"","nHref":"#"},{"nName":"养老保险基金收支预测","nId":"4","uId":"1","nImg":"","nHref":"#"},{"nName":"养老保险待遇分析","nId":"59","uId":"1","nImg":"","nHref":"#"},{"nName":"基金状况自动监测","nId":"5","uId":"2","nImg":"","nHref":"html/MonthlyIAE.html"},{"nName":"扶养比监测","nId":"6","uId":"2","nImg":"","nHref":"html/FirmArrearageList.html"},{"nName":"待遇发放异常检索","nId":"8","uId":"3","nImg":"","nHref":"html/PI_MonthlyAPL.html"},{"nName":"养老金发放变化检索","nId":"7","uId":"3","nImg":"","nHref":"html/PI_AUPLList.html"},{"nName":"养老保险基金趋势预测","nId":"10","uId":"4","nImg":"","nHref":"html/PredictionChart.html"},{"nName":"养老保险相关政策模拟","nId":"11","uId":"4","nImg":"","nHref":"html/ParameterSimulation.html"},{"nName":"年度预算","nId":"20","uId":"12","nImg":"","nHref":"#"},{"nName":"年度分析","nId":"13","uId":"12","nImg":"","nHref":"html/FT_AnnualAS.html"},{"nName":"季度分析","nId":"19","uId":"12","nImg":"","nHref":"html/FT_QuarterAS.html"},{"nName":"数据管理","nId":"18","uId":"12","nImg":"","nHref":"html/FT_DataList.html"},{"nName":"用户管理","nId":"15","uId":"14","nImg":"","nHref":"html/UserManageList.html"},{"nName":"修改个人信息","nId":"16","uId":"14","nImg":"","nHref":"html/PInfo.html"},{"nName":"测试页面","nId":"58","uId":"14","nImg":" ","nHref":"html/test.html"},{"nName":"基础资料","nId":"32","uId":"20","nImg":"","nHref":"html/FD_Base.html"},{"nName":"预算编制","nId":"23","uId":"20","nImg":"","nHref":"html/FD_Budget.html"},{"nName":"存款数据","nId":"24","uId":"20","nImg":"","nHref":"html/FD_FixedDeposit.html"},{"nName":"基金余额监控","nId":"22","uId":"21","nImg":"","nHref":"html/MainCharts.html"},{"nName":"新增领取人员分析","nId":"63","uId":"59","nImg":" ","nHref":"html/AdditionAnalyze.html"},{"nName":"在领人员分析","nId":"61","uId":"59","nImg":"","nHref":"html/ReceiverAnalyze.html"},{"nName":"失业保险基金监测","nId":"67","uId":"65","nImg":"  ","nHref":"#"},{"nName":"失业保险业务检测","nId":"68","uId":"65","nImg":"  ","nHref":"#"},{"nName":"失业保险基金收支预测","nId":"69","uId":"65","nImg":"  ","nHref":"#"},{"nName":"失业保险业务分析","nId":"70","uId":"65","nImg":"  ","nHref":"#"},{"nName":"基金状况监测","nId":"71","uId":"67","nImg":"  ","nHref":"html/UI_MonthlyIAE.html"},{"nName":"待遇异常现象扫描","nId":"72","uId":"68","nImg":"  ","nHref":"html/UI_MonthlyAPL.html"},{"nName":"收支趋势预测","nId":"73","uId":"69","nImg":"  ","nHref":"html/UI_PredictionChart.html"},{"nName":"失业人口趋势预测","nId":"76","uId":"69","nImg":"  ","nHref":"html/UI_PredictionPeople.html"},{"nName":"失业人员分析","nId":"77","uId":"70","nImg":"  ","nHref":"html/UI_UmemployedAnalyze.html"},{"nName":"新增失业人员分析","nId":"78","uId":"70","nImg":"  ","nHref":"html/UI_UmemployedAddition.html"},{"nName":"领失业金死亡人员分析","nId":"79","uId":"70","nImg":" ","nHref":"html/UI_Death.html"},{"nName":"失业人员增减分析","nId":"80","uId":"70","nImg":" ","nHref":"html/UI_AdditionAnalyze.html"},{"nName":"工伤保险基金监测","nId":"82","uId":"81","nImg":" ","nHref":"#"},{"nName":"工伤保险业务检测","nId":"84","uId":"81","nImg":" ","nHref":"#"},{"nName":"工伤保险基金收支预测","nId":"89","uId":"81","nImg":" ","nHref":"#"},{"nName":"工伤保险业务分析","nId":"90","uId":"81","nImg":" ","nHref":"#"}],"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
  res.send(json)
})

app.post('/modules/main.jsp', function(req, res){
  if (req.param('action') === 'GetMain') {
    var json = '{"__MESSAGE__":"","__NEXTACTION__":"","GSBXJJ":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"工伤保险基金","TYPE":1,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"23.5","END":"51.74"},"CXJMJBYL":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"城乡居民基本医疗保险基金","TYPE":5,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"28.2","END":"51.74"},"CZZGYLBXJJ":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"城镇职工医疗保险基金","TYPE":4,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"34.2","END":"51.74"},"__ERROR__":false,"__CURRENTUSER__":"admin","QYYLJJ":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"企业养老保险基金","TYPE":0,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"51.74","END":"51.74"},"__LOGINED__":true,"SYBXJJ1":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"生育保险基金","TYPE":3,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"25.2","END":"51.74"},"SYBXJJ0":{"GREEN2":"51.74","GREEN1":"20.06","TITLE":"失业保险基金","TYPE":2,"YELLOW2":"20.06","YELLOW1":"10.03","DIVISION":"亿","RED2":"10.03","START":"0.00","RED1":"0.00","BALANCE":"18.2","END":"51.74"}}'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.get('/modules/PI_ctl.jsp', function(req, res){
  var json
  var action = req.param('action')
  if (action === 'DependencyRatio') {
    json = '{"SRRS":["755539","758412","761596","764907","852534","791635","786411","786800","777756","0","0","0"],"AREA":"全市","MONTHS":["2013年08月","2013年09月","2013年10月","2013年11月","2013年12月","2014年01月","2014年02月","2014年03月","2014年04月","2014年05月","2014年06月","2014年07月"],"__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"TITLE":"全市养老抚养比分析图","__CURRENTUSER__":"admin","__LOGINED__":true,"PERIOD":"2013年8月——2014年7月","DIVISION":"人数","NAME2":"养老人数","NAME1":"缴费人数","ZCRS":["223370","226744","229704","231443","234013","235985","238198","241901","241233","0","0","0"]}'
    res.send(json)
  } else if (action === 'FundautoMonitor') {
    json = '{"AREA":"全市","FUNDDATASET":[{"payout":"31355","income":"22446"},{"payout":"31701","income":"23459"},{"payout":"31736","income":"23970"},{"payout":"32022","income":"37214"},{"payout":"32379","income":"50758"},{"payout":"33691","income":"30748"},{"payout":"33912","income":"24586"},{"payout":"59685","income":"24631"},{"payout":"39217","income":"25444"},{"payout":"0","income":"0"},{"payout":"0","income":"0"},{"payout":"0","income":"0"},{"payout":"0","income":"0"}],"__MESSAGE__":"","__NEXTACTION__":"","FUNDMONTHS":["2013年08月","2013年09月","2013年10月","2013年11月","2013年12月","2014年01月","2014年02月","2014年03月","2014年04月","2014年05月","2014年06月","2014年07月","2014年08月"],"__ERROR__":false,"__CURRENTUSER__":"admin","TYPE":"统筹账户","__LOGINED__":true,"PERIOD":"2013年8月——2014年8月","FUNDDIVISION":"万元"}'
    res.send(json)
  } else if (action === 'TreatmentAbnormal') {
    json = '{"_PageList":[{"SMZT":"已完成","ID":"29","JLS":"393","ISAUDITED":"false","SMSJ":"2014-07-20 13:58:44","SMX":"扫描全市2014年04月个人一次性待遇发放大于5000元的参保户。"},{"SMZT":"已完成","ID":"28","JLS":"0","ISAUDITED":"false","SMSJ":"2014-02-28 15:52:07","SMX":"扫描全市2014年01月个人月发放养老金大于3000元的参保户。"},{"SMZT":"已完成","ID":"27","JLS":"0","ISAUDITED":"false","SMSJ":"2014-02-28 15:51:48","SMX":"扫描全市2014年02月个人月发放养老金大于3000元的参保户。"},{"SMZT":"已完成","ID":"26","JLS":"0","ISAUDITED":"false","SMSJ":"2014-02-28 15:51:36","SMX":"扫描全市2014年02月个人月发放养老金大于4000元的参保户。"},{"SMZT":"已完成","ID":"25","JLS":"0","ISAUDITED":"false","SMSJ":"2014-02-28 15:51:11","SMX":"扫描全市2014年02月个人月发放养老金大于5000元的参保户。"},{"SMZT":"已完成","ID":"24","JLS":"2093","ISAUDITED":"false","SMSJ":"2014-01-04 12:10:29","SMX":"扫描全市2012年01月个人月发放养老金大于3000元的参保户。"},{"SMZT":"已完成","ID":"23","JLS":"476","ISAUDITED":"false","SMSJ":"2013-12-30 20:45:50","SMX":"扫描全市2012年02月个人月发放养老金大于3000元的参保户。"},{"SMZT":"已完成","ID":"22","JLS":"0","ISAUDITED":"false","SMSJ":"2013-12-25 16:10:24","SMX":"扫描全市2012年07月个人月发放养老金与上月差额大于3000元的参保户。"},{"SMZT":"已完成","ID":"21","JLS":"239","ISAUDITED":"false","SMSJ":"2013-12-23 16:24:19","SMX":"扫描蓬江区2013年03月个人月发放养老金大于3000元的参保户。"},{"SMZT":"已完成","ID":"20","JLS":"30","ISAUDITED":"false","SMSJ":"2013-12-18 16:32:12","SMX":"扫描全市2013年01月个人一次性待遇发放大于20000元的参保户。"},{"SMZT":"已完成","ID":"19","JLS":"183","ISAUDITED":"false","SMSJ":"2013-12-18 16:30:56","SMX":"扫描全市2011年02月个人月发放养老金大于5000元的参保户。"},{"SMZT":"已完成","ID":"17","JLS":"77","ISAUDITED":"false","SMSJ":"2013-12-12 17:02:52","SMX":"扫描蓬江区2013年01月个人月发放养老金大于5000元的参保户。"},{"SMZT":"已完成","ID":"16","JLS":"46","ISAUDITED":"false","SMSJ":"2013-12-12 16:53:47","SMX":"扫描蓬江区2011年02月个人月发放养老金与上月差额大于3000元的参保户。"},{"SMZT":"已完成","ID":"15","JLS":"143","ISAUDITED":"false","SMSJ":"2013-12-12 16:33:41","SMX":"扫描全市2011年01月个人月发放养老金大于5000元的参保户。"}],"_pageCount":1,"__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"_moreaction":"","__CURRENTUSER__":"admin","_curPage":1,"__LOGINED__":true,"_AUTH_DETAIL_":true,"_AUTH_SCAN_":true,"_AUTH_DEL_":true}'
    res.send(json)
  } else if (action === 'TASearch') {
    json = '{"__MESSAGE__":"异常扫描已经成功建立！","__ERROR__":false,"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else if (action === 'TreatmentVary') {
    json = '{"_PageList":[{"ISAUDITED":"false","CURRENTPEOPLE":"241627","PEOPLECHAGE":"-496","MONEYCHANGE":"-204,021,258.69","CURRENTMONEY":"406,359,982.93","LASTMONEY":"610,381,241.62","LASTPEOPLE":"242123","STATISTICMONTH":"2014-04","SHSJ":"201404","NY":"201404"},{"ISAUDITED":"false","CURRENTPEOPLE":"242123","PEOPLECHAGE":"3542","MONEYCHANGE":"257,964,479.32","CURRENTMONEY":"610,381,241.62","LASTMONEY":"352,416,762.30","LASTPEOPLE":"238581","STATISTICMONTH":"2014-03","SHSJ":"201403","NY":"201403"},{"ISAUDITED":"false","CURRENTPEOPLE":"238581","PEOPLECHAGE":"2074","MONEYCHANGE":"2,706,380.31","CURRENTMONEY":"352,416,762.30","LASTMONEY":"349,710,381.99","LASTPEOPLE":"236507","STATISTICMONTH":"2014-02","SHSJ":"201402","NY":"201402"},{"ISAUDITED":"false","CURRENTPEOPLE":"236507","PEOPLECHAGE":"2172","MONEYCHANGE":"13,276,349.42","CURRENTMONEY":"349,710,381.99","LASTMONEY":"336,434,032.57","LASTPEOPLE":"234335","STATISTICMONTH":"2014-01","SHSJ":"201401","NY":"201401"},{"ISAUDITED":"false","CURRENTPEOPLE":"234335","PEOPLECHAGE":"2769","MONEYCHANGE":"3,786,571.68","CURRENTMONEY":"336,434,032.57","LASTMONEY":"332,647,460.89","LASTPEOPLE":"231566","STATISTICMONTH":"2013-12","SHSJ":"201312","NY":"201312"},{"ISAUDITED":"false","CURRENTPEOPLE":"231566","PEOPLECHAGE":"1614","MONEYCHANGE":"3,084,123.41","CURRENTMONEY":"332,647,460.89","LASTMONEY":"329,563,337.48","LASTPEOPLE":"229952","STATISTICMONTH":"2013-11","SHSJ":"201311","NY":"201311"},{"ISAUDITED":"false","CURRENTPEOPLE":"229952","PEOPLECHAGE":"2889","MONEYCHANGE":"548,031.98","CURRENTMONEY":"329,563,337.48","LASTMONEY":"329,015,305.50","LASTPEOPLE":"227063","STATISTICMONTH":"2013-10","SHSJ":"201310","NY":"201310"},{"ISAUDITED":"false","CURRENTPEOPLE":"227063","PEOPLECHAGE":"3425","MONEYCHANGE":"3,782,287.73","CURRENTMONEY":"329,015,305.50","LASTMONEY":"325,233,017.77","LASTPEOPLE":"223638","STATISTICMONTH":"2013-09","SHSJ":"201309","NY":"201309"},{"ISAUDITED":"false","CURRENTPEOPLE":"223638","PEOPLECHAGE":"4864","MONEYCHANGE":"4,210,937.95","CURRENTMONEY":"325,233,017.77","LASTMONEY":"321,022,079.82","LASTPEOPLE":"218774","STATISTICMONTH":"2013-08","SHSJ":"201308","NY":"201308"}],"_pageCount":1,"__MESSAGE__":"","AREANAME":"全市","__NEXTACTION__":"","__ERROR__":false,"_moreaction":"","__CURRENTUSER__":"admin","__LOGINED__":true,"_curPage":1}'
    res.send(json)
  } else if (!action) {
    json = '{"AREA":"全市","FUNDDATASET":[{"payout":"32523","income":"35234"},{"payout":"32901","income":"36838"},{"payout":"32956","income":"37817"},{"payout":"33264","income":"59815"},{"payout":"33643","income":"79545"},{"payout":"34971","income":"48937"},{"payout":"35241","income":"38809"},{"payout":"61038","income":"38826"},{"payout":"40635","income":"40092"},{"payout":"0","income":"0"},{"payout":"0","income":"0"},{"payout":"0","income":"0"}],"__MESSAGE__":"","__NEXTACTION__":"","FUNDMONTHS":["2013年08月","2013年09月","2013年10月","2013年11月","2013年12月","2014年01月","2014年02月","2014年03月","2014年04月","2014年05月","2014年06月","2014年07月"],"__ERROR__":false,"__CURRENTUSER__":"admin","TYPE":"合并账户","__LOGINED__":true,"PERIOD":"2013年8月——2014年7月","FUNDDIVISION":"万元"}'
    res.send(json)
  } else if (action === 'AdditionAnalyze') {
    json = '{"DATASET":[1962,1914,1953,1780,1744,1990,2395,1617,1585,1768,1764,1642],"MONTHS":["2013年08月","2013年09月","2013年10月","2013年11月","2013年12月","2014年01月","2014年02月","2014年03月","2014年04月","2014年05月","2014年06月","2014年07月"],"__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"TITLE":"养老保险全市新增领取人员走势图","__CURRENTUSER__":"admin","__LOGINED__":true,"PERIOD":"2013年8月——2014年7月","DIVISION":"人","NAME":"新增人员"}'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.post('/modules/PI_ctl.jsp', function(req, res){
  var json
  var action = req.param('action')
  if (action === 'TASearch') {
    json = '{"__MESSAGE__":"异常扫描已经成功建立！","__ERROR__":false,"__NEXTACTION__":"","__LOGINED__":true,"__CURRENTUSER__":"admin"}'
    res.send(json)
  } else if (action === 'TreatmentVary') {
    json = '{"_PageList":[{"ISAUDITED":"false","CURRENTPEOPLE":"241627","PEOPLECHAGE":"-496","MONEYCHANGE":"-204,021,258.69","CURRENTMONEY":"406,359,982.93","LASTMONEY":"610,381,241.62","LASTPEOPLE":"242123","STATISTICMONTH":"2014-04","SHSJ":"201404","NY":"201404"},{"ISAUDITED":"false","CURRENTPEOPLE":"242123","PEOPLECHAGE":"3542","MONEYCHANGE":"257,964,479.32","CURRENTMONEY":"610,381,241.62","LASTMONEY":"352,416,762.30","LASTPEOPLE":"238581","STATISTICMONTH":"2014-03","SHSJ":"201403","NY":"201403"},{"ISAUDITED":"false","CURRENTPEOPLE":"238581","PEOPLECHAGE":"2074","MONEYCHANGE":"2,706,380.31","CURRENTMONEY":"352,416,762.30","LASTMONEY":"349,710,381.99","LASTPEOPLE":"236507","STATISTICMONTH":"2014-02","SHSJ":"201402","NY":"201402"},{"ISAUDITED":"false","CURRENTPEOPLE":"236507","PEOPLECHAGE":"2172","MONEYCHANGE":"13,276,349.42","CURRENTMONEY":"349,710,381.99","LASTMONEY":"336,434,032.57","LASTPEOPLE":"234335","STATISTICMONTH":"2014-01","SHSJ":"201401","NY":"201401"},{"ISAUDITED":"false","CURRENTPEOPLE":"234335","PEOPLECHAGE":"2769","MONEYCHANGE":"3,786,571.68","CURRENTMONEY":"336,434,032.57","LASTMONEY":"332,647,460.89","LASTPEOPLE":"231566","STATISTICMONTH":"2013-12","SHSJ":"201312","NY":"201312"},{"ISAUDITED":"false","CURRENTPEOPLE":"231566","PEOPLECHAGE":"1614","MONEYCHANGE":"3,084,123.41","CURRENTMONEY":"332,647,460.89","LASTMONEY":"329,563,337.48","LASTPEOPLE":"229952","STATISTICMONTH":"2013-11","SHSJ":"201311","NY":"201311"},{"ISAUDITED":"false","CURRENTPEOPLE":"229952","PEOPLECHAGE":"2889","MONEYCHANGE":"548,031.98","CURRENTMONEY":"329,563,337.48","LASTMONEY":"329,015,305.50","LASTPEOPLE":"227063","STATISTICMONTH":"2013-10","SHSJ":"201310","NY":"201310"},{"ISAUDITED":"false","CURRENTPEOPLE":"227063","PEOPLECHAGE":"3425","MONEYCHANGE":"3,782,287.73","CURRENTMONEY":"329,015,305.50","LASTMONEY":"325,233,017.77","LASTPEOPLE":"223638","STATISTICMONTH":"2013-09","SHSJ":"201309","NY":"201309"},{"ISAUDITED":"false","CURRENTPEOPLE":"223638","PEOPLECHAGE":"4864","MONEYCHANGE":"4,210,937.95","CURRENTMONEY":"325,233,017.77","LASTMONEY":"321,022,079.82","LASTPEOPLE":"218774","STATISTICMONTH":"2013-08","SHSJ":"201308","NY":"201308"}],"_pageCount":1,"__MESSAGE__":"","AREANAME":"全市","__NEXTACTION__":"","__ERROR__":false,"_moreaction":"","__CURRENTUSER__":"admin","__LOGINED__":true,"_curPage":1}'
    res.send(json)
  } else if (action === 'ExpensesPredication') {
    json = '{"AREA":"全市","__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"CURBALANCE":["24068.22","119899.54","143588.21","110841.39","-15146.01","77297.35"],"__CURRENTUSER__":"admin","INCOME":["256714.77","389936.88","477246.71","503977.08","385956.62","489935.68"],"YEAR":["2010","2011","2012","2013","2014","2015"],"__LOGINED__":true,"PERIOD":"2010年——2015年","PAYOUT":["232646.55","270037.34","333658.5","393135.69","401102.63","412638.33"],"DIVISION":"万元","YELLOW":["116323.28","135018.67","166829.25","196567.85","200551.31","206319.16"],"AMSG":"","RED":["58161.64","67509.34","83414.63","98283.92","100275.66","103159.58"],"BALANCE":["148313.61","268213.15","411801.36","522642.75","507496.74","584794.09"]}'
    res.send(json)
  } else if (action === 'PolicySimulation') {
    json = '{"AREA":"全市","__MESSAGE__":"","__NEXTACTION__":"","__ERROR__":false,"CURBALANCE":["119899.54","143588.21","110841.39","40871.66","139359.41","153671.12"],"__CURRENTUSER__":"admin","INCOME":["389936.88","477246.71","503977.08","441974.29","551997.74","582010.55"],"YEAR":["2011","2012","2013","2014","2015","2016"],"__LOGINED__":true,"PERIOD":"2011年——2016年","PAYOUT":["270037.34","333658.5","393135.69","401102.63","412638.33","428339.43"],"DIVISION":"万元","YELLOW":["135018.67","166829.25","196567.85","200551.31","206319.16","214169.72"],"AMSG":"","RED":["67509.34","83414.63","98283.92","100275.66","103159.58","107084.86"],"BALANCE":["268213.15","411801.36","522642.75","563514.41","702873.82","856544.94"]}'
    res.send(json)
  } else {
    res.send(400)
  }
})

app.get('/modules/AuthEdit.jsp', function(req, res){
  var html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style scoped>#table-list th{min-width:80px}#table-list th:nth-child(1){min-width:0}#table-list th:nth-child(6){width:90px}</style><script type="text/javascript" src="js/authlist.js"></script><script type="text/javascript">function init(){var e=new Array;e[e.length]=newNode("0","ROOT","-1","");var t=new Array;e[e.length]=newNode("21","主监控台","0","#",""),e[e.length]=newNode("1","养老保险","0","#",""),e[e.length]=newNode("65","失业保险","0","#"," "),e[e.length]=newNode("81","工伤保险","0","#"," "),e[e.length]=newNode("12","计划财务科","0","#",""),e[e.length]=newNode("14","系统设置","0","#",""),e[e.length]=newNode("2","养老保险基金监测","1","#",""),e[e.length]=newNode("3","养老保险业务检测","1","#",""),e[e.length]=newNode("4","养老保险基金收支预测","1","#",""),e[e.length]=newNode("59","养老保险待遇分析","1","#",""),e[e.length]=newNode("5","基金状况自动监测","2","html/MonthlyIAE.html",""),e[e.length]=newNode("6","扶养比监测","2","html/FirmArrearageList.html",""),e[e.length]=newNode("8","待遇发放异常检索","3","html/PI_MonthlyAPL.html",""),e[e.length]=newNode("7","养老金发放变化检索","3","html/PI_AUPLList.html",""),e[e.length]=newNode("10","养老保险基金趋势预测","4","html/PredictionChart.html",""),e[e.length]=newNode("11","养老保险相关政策模拟","4","html/ParameterSimulation.html",""),e[e.length]=newNode("20","年度预算","12","#",""),e[e.length]=newNode("13","年度分析","12","html/FT_AnnualAS.html",""),e[e.length]=newNode("19","季度分析","12","html/FT_QuarterAS.html",""),e[e.length]=newNode("18","数据管理","12","html/FT_DataList.html",""),e[e.length]=newNode("15","用户管理","14","html/UserManageList.html",""),e[e.length]=newNode("16","修改个人信息","14","html/PInfo.html",""),e[e.length]=newNode("58","测试页面","14","html/test.html"," "),e[e.length]=newNode("32","基础资料","20","html/FD_Base.html",""),e[e.length]=newNode("23","预算编制","20","html/FD_Budget.html",""),e[e.length]=newNode("24","存款数据","20","html/FD_FixedDeposit.html",""),e[e.length]=newNode("22","基金余额监控","21","html/MainCharts.html",""),e[e.length]=newNode("63","新增领取人员分析","59","html/AdditionAnalyze.html"," "),e[e.length]=newNode("61","在领人员分析","59","html/ReceiverAnalyze.html",""),e[e.length]=newNode("67","失业保险基金监测","65","#","  "),e[e.length]=newNode("68","失业保险业务检测","65","#","  "),e[e.length]=newNode("69","失业保险基金收支预测","65","#","  "),e[e.length]=newNode("70","失业保险业务分析","65","#","  "),e[e.length]=newNode("71","基金状况监测","67","html/UI_MonthlyIAE.html","  "),e[e.length]=newNode("72","待遇异常现象扫描","68","html/UI_MonthlyAPL.html","  "),e[e.length]=newNode("73","收支趋势预测","69","html/UI_PredictionChart.html","  "),e[e.length]=newNode("76","失业人口趋势预测","69","html/UI_PredictionPeople.html","  "),e[e.length]=newNode("77","失业人员分析","70","html/UI_UmemployedAnalyze.html","  "),e[e.length]=newNode("78","新增失业人员分析","70","html/UI_UmemployedAddition.html","  "),e[e.length]=newNode("79","领失业金死亡人员分析","70","html/UI_Death.html"," "),e[e.length]=newNode("80","失业人员增减分析","70","html/UI_AdditionAnalyze.html"," "),e[e.length]=newNode("82","工伤保险基金监测","81","#"," "),e[e.length]=newNode("84","工伤保险业务检测","81","#"," "),e[e.length]=newNode("89","工伤保险基金收支预测","81","#"," "),e[e.length]=newNode("90","工伤保险业务分析","81","#"," "),t[t.length]=newAuth("0","16","管理","可以修改个人密码和信息","0","0"),t[t.length]=newAuth("1","15","列表","拥有权限用户可以浏览用户列表","0","0"),t[t.length]=newAuth("3","5","查看","查看养老保险基金状况","0","0"),t[t.length]=newAuth("4","6","查看","查看养老保险抚养比","0","0"),t[t.length]=newAuth("5","7","查看","查看养老金发放变化检索","0","0"),t[t.length]=newAuth("6","8","列表","查看待遇发放异常检索总表","0","0"),t[t.length]=newAuth("10","10","查看","查看养老保险基金趋势预测","0","0"),t[t.length]=newAuth("11","11","查看","查看养老保险相关政策模拟结果","0","0"),t[t.length]=newAuth("12","13","查看","查看计财科年度分析","0","0"),t[t.length]=newAuth("13","19","查看","查看计财科季度分析","0","0"),t[t.length]=newAuth("14","18","列表","查看计财科数据总表","0","0"),t[t.length]=newAuth("17","23","查看","查看计财科预算数据","0","0"),t[t.length]=newAuth("19","24","列表","查看存款列表","0","0"),t[t.length]=newAuth("24","32","查看","查看编制列表","0","0"),t[t.length]=newAuth("28","61","查看","查看在领人员分析","0","0"),t[t.length]=newAuth("33","77","查看","失业保险-失业保险业务分析-失业人员分析","0","0"),t[t.length]=newAuth("2","15","管理","拥有权限用户可以管理系统用户信息","1","0"),t[t.length]=newAuth("7","8","新建","新建待遇发放异常检索","1","0"),t[t.length]=newAuth("15","18","管理","添加或者删除计财科数据","1","0"),t[t.length]=newAuth("18","23","管理","新建，编辑或者删除年度预算数据","1","0"),t[t.length]=newAuth("20","24","管理","新建和删除存款列表","1","0"),t[t.length]=newAuth("25","32","管理","用户可以管理基础资料","1","0"),t[t.length]=newAuth("31","63","查看","查看新增人员分析","1","0"),t[t.length]=newAuth("8","8","查看详情","查看待遇发放异常检索详情","2","0"),t[t.length]=newAuth("16","18","详细","查看计财科数据详情","2","0"),t[t.length]=newAuth("21","23","审核","拥有审核编制的权限","2","0"),t[t.length]=newAuth("9","8","删除","删除待遇发放异常检索数据","3","0"),t[t.length]=newAuth("26","32","审核","全市用户可以审核编制","3","0"),drawTree&&(nodelist=e,nodelen=e.length,authlist=t,authlen=t.length,drawTree("treemap"))}</script><form name="form1" method="post" target="cmdframe" charset="utf-8" action="modules/UserManage_ctl.jsp?action=saveuserauth&ID=2"><table cellpadding="3" cellspacing="1" border="0" width="750"><tr><th height="26">用户权限</th></tr><tr><td><div id="treemap"></div></td></tr><tr><td align="center"><Input type="submit" class="button" name="Submit" value="保存"><Input type="button" class="button" name="button" value="返回列表" href="html/UserManageList.html"></Input></Input></td></tr></table></form><iframe name="cmdframe" style="display:none"></iframe><script>init();</script>'
  res.send(html)
})