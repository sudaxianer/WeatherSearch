// 首次打开
$("#btn").on("click",function(e){
	$("#layer").fadeOut(2000);
	var cityname = $("#inp").val();
	$("#area").html(cityname);
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
});

// 显示隐藏搜索框
$("#searchicon").on("click",function(){
	$("#search").toggle();
	$("#input").focus();
}) 

// 点击搜索icon
$("#searchbtn").on("click",function(){
	var cityname = $("#input").val();
	$("#area").html(cityname);
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
	$("#input").val("");
	$("#search").hide();
}) 

// 天气数据绑定
function weather(data){
	var hours = data.forecasts[0].reporttime.replace(/(\d{4}-\d{2}-\d{2})\s/,'')
	$("#times").html(hours);
	var temp = data.forecasts[0].casts[0].daytemp;
	$("#temp span").html(temp);
	$("#tempcircle").circleProgress({
		value: temp/100,
		size: 160,
		fill: {
			gradient: ["orange", "red"]
		}
	});
	var weather0 = data.forecasts[0].casts[0].dayweather;
	var weather1 = data.forecasts[0].casts[1].dayweather;
	var weather2 = data.forecasts[0].casts[2].dayweather;
	var weather3 = data.forecasts[0].casts[3].dayweather;
	chooseImg(weather0, $("#imgbig"));
	chooseImg(weather0, $("#first img"));
	chooseImg(weather1, $("#second img"));
	chooseImg(weather2, $("#third img"));
	chooseImg(weather3, $("#fourth img"));
	var day0 = data.forecasts[0].casts[0].week;
	var day1 = data.forecasts[0].casts[1].week;
	var day2 = data.forecasts[0].casts[2].week;
	var day3 = data.forecasts[0].casts[3].week;
	weekday(parseInt(day0), $(".tempdesc #weekday"));
	weekday(parseInt(day1), $("#second #weekday"));
	weekday(parseInt(day2), $("#third  #weekday"));
	weekday(parseInt(day3), $("#fourth #weekday"));
	$(".tempdesc .weath").html(weather0);
	$("#first .weath").html(weather0);
	$("#second .weath").html(weather1);
	$("#third  .weath").html(weather2);
	$("#fourth .weath").html(weather3);
	var temprange0 = data.forecasts[0].casts[0].daytemp + "°/" + data.forecasts[0].casts[0].nighttemp + "°";
	var temprange1 = data.forecasts[0].casts[1].daytemp + "°/" + data.forecasts[0].casts[1].nighttemp + "°";
	var temprange2 = data.forecasts[0].casts[2].daytemp + "°/" + data.forecasts[0].casts[2].nighttemp + "°";
	var temprange3 = data.forecasts[0].casts[3].daytemp + "°/" + data.forecasts[0].casts[3].nighttemp + "°";
	$("#first .temprange").html(temprange0);
	$("#second .temprange").html(temprange1);
	$("#third  .temprange").html(temprange2);
	$("#fourth .temprange").html(temprange3);
	var daywind = data.forecasts[0].casts[0].daywind;
	var daypower = data.forecasts[0].casts[0].daypower;
	$(".tempdesc .daywind").html(daywind);
	$(".windpower .daywind").html(daywind+"风");
	$(".windpower .daypower").html(daypower+"级");
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
        	index.attr("src", 'imgs/xiayu.png');
            break;
        case '大雨':
        	index.attr("src", 'imgs/xiayu.png');
            break;
        case '暴雨':
        	index.attr("src", 'imgs/xiayu.png');
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
        	index.attr("src", 'imgs/xiayu.png');
            break;
        case '霾':
            index.attr("src", 'imgs/chachenbao.png');
            break;
        default:
            index.attr("src", 'imgs/cloudy.png');
    }
}

// 星期修改
function weekday(id, index) {
	switch (id) {
        case 1:
            index.html("周一");
            break;
        case 2:
            index.html("周二");
            break;
        case 3:
            index.html("周三");
            break;
        case 4:
            index.html("周四");
            break;
        case 5:
            index.html("周五");
            break;
        case 6:
            index.html("周六");
            break;
        case 7:
            index.html("周日");
            break;
        default:
            index.html("error")
    }
}

// 点击设置icon显示界面
$(".settings").on("click", function(){
	$("#setting").animate({ left: 0}, 500);
});
// 点击返回icon返回主页
$("#back").on("click", function(){
	$("#setting").animate({ left: "-380px"}, 500);
});

// jquery圆环进度条插件
$("#aircircle").circleProgress({
	value: 0.75,
	size: 100,
	fill: {
		gradient: ["#71C7E5", "#F66255"]
	}
});

// IP地址定位
$("#locate").on("click", function(){
	var map = new AMap.Map("center", {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });
    showCityInfo();

})
// 获取用户所在城市信息
function showCityInfo() {
    //实例化城市查询类
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
            	console.log(result);
                var cityinfo = result.city;
                var citybounds = result.bounds;
                document.getElementById('locate').innerHTML = '您当前所在城市：'+ cityinfo;
                //地图显示当前城市
                map.setBounds(citybounds);
            }
        } else {
            document.getElementById('locate').innerHTML = "北京市";
        }
    });
}