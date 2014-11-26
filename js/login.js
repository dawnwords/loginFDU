var ba = chrome.browserAction;
var local = window.localStorage;
var si;

var do_login = function(user,pass){
	var data = "username=" + user + "&password={TEXT}" + pass + "&drop=0&type=1&n=100";
	return do_post("do_login", data);
}

var keep_live = function(uid){
	do_post("keeplive", "uid=" + uid);
}

var do_post = function(fun_name,data){
	var post = new XMLHttpRequest();
	post.open("POST","http://10.108.255.249/cgi-bin/" + fun_name, false);
	post.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	post.send(data);
	return post.responseText;
}

var stop = function(){
	clearInterval(si);
	ba.setIcon({path:"../img/icon16_g.png"});
	ba.setPopup({popup:"../popup.html"});
}

var error_info = function(key){
	var arr = new Array();
	arr['user_tab_error'] = '认证程序未启动';
	arr['username_error'] = '用户名错误';
	arr['non_auth_error'] = '您无须认证，可直接上网';
	arr['password_error'] = '密码错误';
	arr['status_error'] = '用户已欠费，请尽快充值。';
	arr['available_error'] = '用户已禁用';
	arr['ip_exist_error'] = '您的IP尚未下线，请等待2分钟再试。';
	arr['usernum_error'] = '用户数已达上限';
	arr['online_num_error'] = '该帐号的登录人数已超过限额\n如果怀疑帐号被盗用，请联系管理员。';
	arr['mode_error'] = '系统已禁止WEB方式登录，请使用客户端';
	arr['time_policy_error'] = '当前时段不允许连接';
	arr['flux_error'] = '您的流量已超支';
	arr['minutes_error'] = '您的时长已超支';
	arr['ip_error'] = '您的IP地址不合法';
	arr['mac_error'] = '您的MAC地址不合法';
	arr['sync_error'] = '您的资料已修改，正在等待同步，请2分钟后再试。';
	return arr[key];
}

var start = function(){
	var user = document.getElementById("user").value || '';
	var pass = document.getElementById("pass").value || '';
	var period = document.getElementById("period").value;
	var uid = do_login(user, pass);
	var digits = /^[\d]+$/;
	if(digits.test(uid)){
		local.user = user;
		local.pass = pass;
		local.period = period;

		period = isNaN(period) || period < 10 ? 10 : period;
		period *= 1000;
		si = setInterval(function(){keep_live(uid);}, period);

		ba.setIcon({path:"../img/icon16.png"});
		ba.setPopup({popup:""});
		return null;
	}
	return error_info(uid);	
}

ba.onClicked.addListener(stop);

// var uid = do_login(14212010005, 260955);
// setInterval(function(){
// 	keep_live(uid);
// }, 10 * 60 * 1000);