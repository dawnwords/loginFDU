function Network(){
	var uid,si,user;
	var self = this;

	var do_post = function(fun_name,data){
		var post = new XMLHttpRequest();
		post.open("POST","http://10.108.255.249/cgi-bin/" + fun_name, false);
		post.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		post.send(data);
		return post.responseText;
	}

	this.do_login = function(username){
		user = username;
		var data = "username=" + user + "&password={TEXT}&drop=0&type=1&n=10";
		uid = do_post("do_login", data);
		return uid;
	}

	this.keep_live = function(period){
		si = setInterval(function(){
			var msg = do_post("keeplive", "uid=" + uid);
			if(msg.indexOf("error") > -1){
				alert("keep_live response error!");
				self.do_login(user);
			}
		}, period);
	}

	this.do_logout = function(){
		clearInterval(si);
		do_post("do_logout", "uid=" + uid);
		uid = '';
	}
}