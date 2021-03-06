var ba = chrome.browserAction;
var local = window.localStorage;
var network = new Network();
var error = new Array();
error['user_tab_error'] = '认证程序未启动';
error['username_error'] = '用户名错误';
error['non_auth_error'] = '您无须认证，可直接上网';
error['password_error'] = '密码错误';
error['status_error'] = '用户已欠费，请尽快充值。';
error['available_error'] = '用户已禁用';
error['ip_exist_error'] = '您的IP尚未下线，请等待2分钟再试。';
error['usernum_error'] = '用户数已达上限';
error['online_num_error'] = '该帐号的登录人数已超过限额\n如果怀疑帐号被盗用，请联系管理员。';
error['mode_error'] = '系统已禁止WEB方式登录，请使用客户端';
error['time_policy_error'] = '当前时段不允许连接';
error['flux_error'] = '您的流量已超支';
error['minutes_error'] = '您的时长已超支';
error['ip_error'] = '您的IP地址不合法';
error['mac_error'] = '您的MAC地址不合法';
error['sync_error'] = '您的资料已修改，正在等待同步，请2分钟后再试。';

var stop_icon = function() {
	ba.setIcon({path:"../img/icon48_g.png"});
	ba.setPopup({popup:"../popup.html"});
}

var start_icon = function(){	
	ba.setIcon({path:"../img/icon48.png"});
	ba.setPopup({popup:""});
}

var check_and_set_period = function(period){
	if(isNaN(period) || period < 10){
		local.removeItem("period");
		period = 10;
	} else {
		local.period = period;
	}
	return period;
}

var stop = function(){
	network.do_logout();
	stop_icon();
}

var start = function(user, period){
	var uid = network.do_login(user);
	var digits = /^[\d]+$/;
	if(digits.test(uid)){
		local.user = user;
		period = check_and_set_period(period);		
		start_icon();
		network.keep_live(period * 1000);
	} else {
		local.removeItem("user");
		alert(error[uid]);
	}
}

var handler = function(request,sender,sendResponse){
	start(request.user, request.period);
}

ba.onClicked.addListener(stop);
chrome.extension.onMessage.addListener(handler);
start(local.user, local.period);