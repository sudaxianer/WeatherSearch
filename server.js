var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function (req,res) {
	var urlObj = url.parse(req.url, true);
	var pathname = urlObj.pathname;
	var query = urlObj.query;

	var con = null;
	var customPath = "./json/userdata.json";
	// 获取userdata.json文件内容
	con = fs.readFileSync(customPath, "utf-8");
	con.length === 0 ? con = '[]' : null; //->以防文件为空con转化JSON报错
	con = JSON.parse(con);

	// 注册用户信息
	if (pathname === "/addInfo") {
		var ary = [];
		for(var key in query) {
			ary.push(key);
		}
		if (ary[1] === "") {
			res.writeHead(200, {'content-type': 'text/plain;charset=utf-8;'});
			res.end("无用户信息");
			return;
		}
		var data = JSON.parse(ary[1]);
		// 设置注册用户的ID
		data["id"] = con.length === 0 ? 1 : parseFloat(con[con.length-1]["id"]) + 1;
		con.push(data);
		fs.writeFileSync(customPath, JSON.stringify(con), "utf-8"); 
		res.end();
		return;
	}

	// 获取用户信息
	if (pathname === "/getInfo") {
		var fn = query.callback;
		if (con.length !== 0) {
			var result = con[con.length-1];
			console.log(result);
			res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
			res.write(fn + "(" + JSON.stringify(result)+ ")")
			res.end();
		} else {
			result = '';
			res.writeHead(200, {'content-type': 'text/plain;charset=utf-8;'});
			res.write(fn + "(" + JSON.stringify(result) + ")")
			res.end();
		}
		return;
	}
	//如果请求的地址不存在，提示404不存在
	res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
	res.end("404 not found");
});

server.listen(8080, function() {
	console.log("server is success, listening on 8080 port");
})