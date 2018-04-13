// 注册按钮事件
var aBtn = document.getElementById("loginbtn").getElementsByTagName('a')[0];
aBtn.onclick = function(e) {
	e = e || window.event;
	if (!checkForm()) {
		e.preventDefault();
		warning(checkUserName, "userName");
		warning(checkPassword, "userPasword");
		return;
	} else {
		var userObj = {};
		var username = document.getElementById('userName'); 
		var userpasswd = document.getElementById('userPasword'); 
		userObj["userName"] = userName.value;
		userObj["userPasword"] = userPasword.value;
		var jsonData = JSON.stringify(userObj);  //{"username":"苏振","userpasswd":"1234"}
		submitData(jsonData);
	}
}

// 提交后台
function submitData(jsonData) {
	// jsonp跨域提交数据
	$.ajax({
	    type: 'get',
	    async: true,
	    url: 'http://10.14.15.41:8080/loginInfo',
	    data: jsonData,
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    success: function(data){
	    	console.log(data);
	    	if(data && data.code === 0) {
	   			window.setTimeout(function(){
					window.location.href = "../index.html";
				},1000);
	    	}
	        if(data && data.code === 1) {
	        	var username = document.getElementById('userName'); 
	        	var userpasswd = document.getElementById('userPasword'); 
	        	var errname = document.getElementById('nameErr');
	        	var errPasswd = document.getElementById('passwordErr'); 
	        	errname.className = "tips1";
				errname.innerHTML = "用户名或密码错误，请重新填写";
				userpasswd.value = "";
				username.focus();
	        }
	    }
	});
}

// 初始化
window.onload = function() { 
	var errname = document.getElementById('nameErr'); 
	var errPasswd = document.getElementById('passwordErr');  
	errname.innerHTML = "";
	errPasswd.innerHTML = "";
}

function checkForm() { 
	var nametip = checkUserName(); 
	var passtip = checkPassword();  
	return nametip && passtip; 
}
// 验证用户名
function checkUserName() { 
	var username = document.getElementById('userName'); 
	var errname = document.getElementById('nameErr'); 
	var pattern = /^([\u4e00-\u9fa5]){2,4}$/;  //中文2-4位汉字 
	if (username.value.length == 0) { 
		errname.className = "tips1";
		errname.innerHTML = "用户名不能为空";
		return false; 
	} 
	if (!pattern.test(username.value)) { 
		errname.className = "tips1";
		errname.innerHTML = "请输入2-4位汉字";
		return false;
	} else { 
		errname.innerHTML = ""; 
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
		errPasswd.innerHTML = ""; 
		return true; 
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
