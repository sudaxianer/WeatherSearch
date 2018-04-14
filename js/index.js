// 页面加载
$(function() {
	cityname = "北京市";
	$("#cityname").html(cityname);
	bind(cityname);
	// 显示切换搜索框
	$("#search").on("click",function(){
		$("#searchinput").toggle();
		$("#searchinput input").focus();
	}) 

	// 查询城市天气
	$("#searchinput input").keyup(function(e){
		var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (eCode == 13) {
			var cityname = $("#searchinput input").val();
			$("#cityname").html(cityname);
			bind(cityname);
			$("#searchinput input").val("");
			$("#searchinput").hide();
		}
	}) 

	// 帮助提示
	$("#help").on("click",function(){
		alert("点击搜索按钮可查询城市天气，点击个人账户可注册或登录账户");
	})

	// 获取用户名
	getData();
});

// 获取用户数据
function getData() {
	// jsonp跨域提交数据
	$.ajax({
	    type: 'get',
	    async: true,
	    url: 'http://10.14.15.41:8080/getInfo',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    success: function(data){
	        if(data != ""){
	        	$("#register").html(data.userName);
	        	alert("欢迎您，" + data.userName + "!");
	        	$("#register").on("click",function(e){
	        		window.location.href = "./pages/login.html";
	        	})
	        } else {
	        	$("#register").on("click",function(e){
	        		window.location.href = "./pages/form.html";
	        	})
	        }
	    }
	});
}

// 数据绑定
function bind(cityname) {
	var nowTime = new Date().Format("yyyy-MM-dd");
	$("#nowtime").html(nowTime);
	$.ajax({
	    type: 'get',
	    async: true,
	    url: 'http://restapi.amap.com/v3/place/text?keyword='+ cityname +'&citylimit=beijing&key=ddf4e80dc7363ad65c9fad7dea97a8e0',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    success: function(data){
	        var ary = data.suggestion.cities;
	        for(var i=0, len=ary.length; i<len; i++){
	        	var curCity = ary[i];
	        	if (curCity.name === cityname) {
	        		$.ajax({
					    type: 'get',
					    async: true,
					    url: 'http://restapi.amap.com/v3/weather/weatherInfo?city='+ curCity.adcode +'&extensions=all&key=be650f7126669c2b186c90dbff6ad073',
					    dataType: 'jsonp',
					    jsonp: 'callback',
					    success: function(data){
					    	weather(data);
					    }
					})
	        		break;
	        	}
	        }
	    }
	});
}

// 图片请求与数据绑定
~function() {
	var _this = this;
	$.ajax({
		type: 'get',
	    async: true,
	    url: 'http://10.14.15.41:8080/getImg',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    success: function(data) {
	    	if(data && data.code === 0) {
	    		console.log(data.imgJson);
	    		var newsList = document.getElementById('newslist');
	    		var imgArr = data.imgJson;
	    		var str = "";
	    		for (var i=0, len=imgArr.length; i<len; i++) {
	    			var curImg = imgArr[i];
	    			str += '<li><figure><div class="imgwrap"><img src="" trueImg="' + curImg["src"] + '"/></div><div class="newstream"><h3><a href="javascript:;">' + curImg["title"] +
							'</a></h3><span>' + curImg["content"] + '</span></div></figure></li>'   			
	    		}
	    		newsList.innerHTML = str;
				_this.imgList = document.getElementById('newslist').getElementsByTagName('img');
				window.addEventListener("scroll", debounce(handleAllImg.bind(_this, imgList), 500, 1000));
	    	}
	    }
	});
}()

// 防抖动与节流
function debounce(func, wait, mustRun) {
	// 定时器变量
	var timeout;
	var startTime = new Date();
	return function () {
		var curTime = new Date();
		// 每次触发handler时先清除定时器
		clearTimeout(timeout);
		// 指定wait时间后触发handler
		if (curTime - startTime >= mustRun) {
			func();
			startTime = curTime;
		// 没达到触发时间，重新设定定时器
		} else {
			timeout = setTimeout(func, wait);
		}
	};
}

// 单张图片
function lazyImg(curImg) {   // 单张图片加载
	var oImg = new Image;
	oImg.src = curImg.getAttribute('trueImg');
	oImg.onload = function () {
		curImg.src = this.src;
		curImg.style.display = 'block';
		oImg = null;
	}
	curImg.isLoad = true;
}
// 多张图片
function handleAllImg(imgList) {
	for(var i=0,len=this.imgList.length; i<len; i++){
		var curImg = imgList[i];
		//当前图片处理过就不需要再进行处理
		if (curImg.isLoad) {
			continue;
		}
		//只有A<B的时候再加载图片
		var curImgPar = curImg.parentNode.parentNode;
		var A = curImgPar.offsetHeight + curImgPar.offsetTop - 50;
		var B = userAgent('clientHeight') + userAgent('scrollTop');
		if (A < B) {
			lazyImg(curImg);
		}
	}
}

// 计算浏览器、滚动距离
function userAgent(attr,value) {
	if(typeof value === 'undefined') {
		return document.documentElement[attr]||document.body[attr];
	}
	document.documentElement[attr] = value;
	document.body[attr] = value;
}

// jquery圆环进度条插件
$("#tempcircle").circleProgress({
	value: 0.13,
	size: 150,
	fill: {
		gradient: ["yellow", "red"]
	}
});


// 天气数据
function weather(data){
	var temp = data.forecasts[0].casts[0].daytemp;
	$("#temp").html(temp + "°");
	$("#tempcircle").circleProgress({
		value: temp/100,
		size: 150,
		fill: {
			gradient: ["yellow", "red"]
		}
	});
	var weather0 = data.forecasts[0].casts[0].dayweather,
		weather1 = data.forecasts[0].casts[1].dayweather,
		weather2 = data.forecasts[0].casts[2].dayweather,
		weather3 = data.forecasts[0].casts[3].dayweather;
	chooseImg(weather0, $("#titleimg"));
	chooseImg(weather0, $("#first img"));
	chooseImg(weather1, $("#second img"));
	chooseImg(weather2, $("#third img"));
	chooseImg(weather3, $("#fourth img"));
	var day0 = data.forecasts[0].casts[0].week,
		day1 = data.forecasts[0].casts[1].week,
		day2 = data.forecasts[0].casts[2].week,
		day3 = data.forecasts[0].casts[3].week;
	weekday(parseInt(day0), $("#titleweekday"));
	weekday(parseInt(day1), $("#second #weekday"));
	weekday(parseInt(day2), $("#third  #weekday"));
	weekday(parseInt(day3), $("#fourth #weekday"));
	$("#titleweath").html(weather0);
	$("#first .weath").html(weather0);
	$("#second .weath").html(weather1);
	$("#third  .weath").html(weather2);
	$("#fourth .weath").html(weather3);
	var temprange0 = data.forecasts[0].casts[0].daytemp + "°/" + data.forecasts[0].casts[0].nighttemp + "°",
		temprange1 = data.forecasts[0].casts[1].daytemp + "°/" + data.forecasts[0].casts[1].nighttemp + "°",
		temprange2 = data.forecasts[0].casts[2].daytemp + "°/" + data.forecasts[0].casts[2].nighttemp + "°",
		temprange3 = data.forecasts[0].casts[3].daytemp + "°/" + data.forecasts[0].casts[3].nighttemp + "°";
	$("#first .temprange").html(temprange0);
	$("#second .temprange").html(temprange1);
	$("#third  .temprange").html(temprange2);
	$("#fourth .temprange").html(temprange3);
	var daywind = data.forecasts[0].casts[0].daywind,
		daypower = data.forecasts[0].casts[0].daypower;
	$("#winddir").html(daywind);
	$("#daypower").html(daypower+"级");
}

// 获取日期
Date.prototype.Format = function (fmt) {    
    var o = {    
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };    
    if (/(y+)/.test(fmt)) {
    	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
    	if (new RegExp("(" + k + ")").test(fmt)) {
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));     
    	}
    }  
    return fmt;  
}    

// 星期修改
function weekday(id, index) {
	switch (id) {
        case 1:
            index.html("星期一");
            break;
        case 2:
            index.html("星期二");
            break;
        case 3:
            index.html("星期三");
            break;
        case 4:
            index.html("星期四");
            break;
        case 5:
            index.html("星期五");
            break;
        case 6:
            index.html("星期六");
            break;
        case 7:
            index.html("星期日");
            break;
        default:
            index.html("error")
    }
}

// 根据接口传递的天气选择图片
function chooseImg(id, index) {
    switch (id) {
        case '晴':
            index.attr("src", 'imgs/qing.png');
            break;
        case '多云':
            index.attr("src", 'imgs/cloudy.png');
            break;
        case '阴':
            index.attr("src", 'imgs/yin.png');
            break;
        case '阵雨':
        	index.attr("src", 'imgs/zhenyu.png');
            break;
        case '雷阵雨':
        	index.attr("src", 'imgs/leizhenyu.png');
            break;
        case '雨夹雪':
        	index.attr("src", 'imgs/yujiaxu.png');
            break;
        case '小雨':
        	index.attr("src", 'imgs/xiayu.png');
            break;	
        case '中雨':
        	index.attr("src", 'imgs/zhongyu.png');
            break;
        case '大雨':
        	index.attr("src", 'imgs/dayu.png');
            break;
        case '暴雨':
        	index.attr("src", 'imgs/dayu.png');
            break;
        case '雾':
        	index.attr("src", 'imgs/wu.png');
            break;
        case '沙尘暴':
        	index.attr("src", 'imgs/shachenbao.png');
            break;
        case '小雨-中雨':
        	index.attr("src", 'imgs/xiayu.png');
            break;
        case '中雨-大雨':
        	index.attr("src", 'imgs/zhongyu.png');
            break;
        case '霾':
            index.attr("src", 'imgs/chachenbao.png');
            break;
        default:
            index.attr("src", 'imgs/cloudy.png');
    }
}
