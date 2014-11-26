var do_login = function(user){
	var data = "username=" + user + "&drop=0&type=1&n=100";
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

var uid = do_login(14212010005);
setInterval(function(){
	keep_live(uid);
}, 10 * 60 * 1000);