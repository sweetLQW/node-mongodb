// servser服务器搭建
// node httpServer 开启服务
// 开启服务后可通过127.0.0.1:3000或localhost:3000来访问

const http = require("http");
http.createServer(function(req,res){
	res.end("hello world");
}).listen(3000, "127.0.0.1")