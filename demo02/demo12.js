//servser服务器搭建
var http = require("http");
http.createServer(function(req,res){
	res.end("hello world");
}).listen(3000,"192.168.3.126")//设置完地址后不可用localhost访问