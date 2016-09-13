//第三方模块
var express = require("express");
var path = require("path");//核心模块path.join()连接路径，__dirname找到此文件的绝对路径
var app = express();
app.use(express.static(path.join(__dirname,"serverpublic")));
app.listen(3000,function(){
	console.log("服务器已启动");
})