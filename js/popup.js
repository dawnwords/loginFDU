window.onload = function(){
	var local = window.localStorage;
	var user_input = document.getElementById("user");
	var period_input = document.getElementById("period");
	var start_btn = document.getElementById("start");

	user_input.value = local.user || '';
	period_input.value = local.period || '';

	start_btn.onclick = function(){
		var request = {
			user: user_input.value,
			period: period_input.value
		};
		chrome.extension.sendMessage(request);
		window.close();
	};
}