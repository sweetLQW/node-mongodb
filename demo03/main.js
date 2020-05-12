// 利用express搭建服务器
const express = require("express");
const path = require("path");
const app = express();

// 核心模块path.join()连接路径，__dirname找到此文件的绝对路径
app.use(express.static(path.join(__dirname, "public")));
// 设置模板引擎为jade
app.set("view engine", "jade");

// 用模板引擎渲染html
app.get("/home",function(req,res){
	var tit = "我的jade模板引擎";
	var data = [
		// 动态页要添加路由
		{
			name: "主页",
			url: "/home",
		},
		{
			name: "体育",
			url: "/sports", 
		},
		// 静态页要加后缀
		{
			name: "新闻",
			url: "/news.html", 
		},
		// 外部网站要写好路径
		{
			name: "百度",
			url: "http://baidu.com",
		},
	]
	res.render("home", {"title": tit, "head": data});
})

app.get("/sports",function(req,res){
	res.render("sports");
})

app.listen(3000, function(){
	console.log("服务器已启动");
})