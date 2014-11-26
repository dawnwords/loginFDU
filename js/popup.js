window.onload = function(){
	load_value("user");
	load_value("pass");
	load_value("period");

	var start_btn = document.getElementById("start")
	start_btn.onclick = function(){
		var msg = start();
		if(msg) { 
			alert(msg); 
		} else {
			window.close();
		}
	};
}

function load_value (id) {
	document.getElementById(id).value=window.localStorage[id] || '';
}