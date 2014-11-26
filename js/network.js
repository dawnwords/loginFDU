function Network(){
	var uid;

	var do_post = function(fun_name,data){
		var post = new XMLHttpRequest();
		post.open("POST","http://10.108.255.249/cgi-bin/" + fun_name, false);
		post.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		post.send(data);
		return post.responseText;
	}

	this.do_login = function(user){
		var data = "username=" + user + "&password={TEXT}&drop=0&type=1&n=100";
		uid = do_post("do_login", data);
		return uid;
	}

	this.keep_live = function(){
		do_post("keeplive", "uid=" + uid);
	}

	this.do_logout = function(){
		do_post("do_logout", "uid=" + uid);
	}
}