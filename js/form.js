// 注册按钮事件
var aBtn = document.getElementById("loginbtn").getElementsByTagName('a')[0];
aBtn.onclick = function(e) {
	e = e || window.event;
	if (!checkForm()) {
		e.preventDefault();
		warning(checkUserName, "userName");
		warning(checkPassword, "userPasword");
		warning(confirmPassword, "userConfirmPasword");
		warning(checkPhone, "userPhone");
		return;
	}
}

// 点击注册按钮显示红色警示框
function warning(textFn, inputObj) {
	if (!textFn()) {
		var errorArea = document.getElementById(inputObj);
		errorArea.style.backgroundColor = "#FCD9DA";
		var timer = window.setTimeout(function(){
			errorArea.style.backgroundColor = "";
			window.clearTimeout(timer);
		}, 200)
	}
}

// 初始化
window.onload = function() { 
	var errname = document.getElementById('nameErr'); 
	var errPasswd = document.getElementById('passwordErr');  
	var phonrErr = document.getElementById('phoneErr'); 
	errname.innerHTML = "";
	errPasswd.innerHTML = "";
	phonrErr.innerHTML = "";
}

// 注册按钮检验
function checkForm() { 
	var nametip = checkUserName(); 
	var passtip = checkPassword();  
	var conpasstip = confirmPassword(); 
	var phonetip = checkPhone(); 
	return nametip && passtip && conpasstip && phonetip; 
}

// 验证用户名   
function checkUserName() { 
	var username = document.getElementById('userName'); 
	var errname = document.getElementById('nameErr'); 
	var pattern = /^\w{4,16}$/;  //数字、字母、下划线四到十六位 
	if (username.value.length == 0) { 
		errname.className = "tips1";
		errname.innerHTML = "用户名不能为空";
		return false; 
	} 
	if (!pattern.test(username.value)) { 
		errname.className = "tips1";
		errname.innerHTML = "输入4-16位数字、字母、下划线";
		return false;
	} else { 
		errname.innerHTML = "OK!";
		errname.className = "tips1 success"; 
		return true; 
	} 
} 
// 验证密码   
function checkPassword() { 
	var userpasswd = document.getElementById('userPasword'); 
	var errPasswd = document.getElementById('passwordErr'); 
	var pattern = /^\d{4,16}$/; //密码要在4-16位
	if (userpasswd.value.length == 0) {
		errPasswd.className = "tips2"; 
		errPasswd.innerHTML = "密码不能为空";
		return false; 
	}  
	if (!pattern.test(userpasswd.value)) { 
		errPasswd.className = "tips2";
		errPasswd.innerHTML = "密码不合规范";
		return false; 
	} else { 
		errPasswd.innerHTML = "OK!";
		errPasswd.className = "tips2 success"; 
		return true; 
	} 
} 
// 确认密码 
function confirmPassword() { 
	var userpasswd = document.getElementById('userPasword'); 
	var userConPassword = document.getElementById('userConfirmPasword'); 
	var errPasswd = document.getElementById('passwordErr');
	if (userConPassword.value.length == 0) { 
		errPasswd.className ="tips2";
		errPasswd.innerHTML = "密码不能为空";
		return false; 
	}   
	if ((userpasswd.value)!=(userConPassword.value) || userConPassword.value.length == 0) {
		errPasswd.className = "tips2"; 
		errPasswd.innerHTML = "密码不合规范";
		return false; 
	} else { 
		errPasswd.innerHTML = "OK!";
		errPasswd.className = "tips2 success"; 
		return true; 
	}    
} 
// 验证手机号 
function checkPhone() { 
	var userphone = document.getElementById('userPhone'); 
	var phonrErr = document.getElementById('phoneErr'); 
	var pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/; //验证手机号正则表达式
	if (userphone.value.length == 0) {
		phonrErr.className = "tips3"; 
		phonrErr.innerHTML = "手机号码不能为空";
		return false; 
	}   
	if (!pattern.test(userphone.value)) {
		phonrErr.className = "tips3"; 
		phonrErr.innerHTML = "手机号码不合规范";
		return false;
	} else { 
		phonrErr.innerHTML = "OK!";
		phonrErr.className = "tips3 success"; 
		return true; 
	} 
} 
