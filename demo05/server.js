var express = require("express");
var app = express();
var path = require("path")
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));
app.get("/table",function(req,res){
	var title = "表格";
	var table = [
		{
			name:"lqw",
			age:21,
			sex:"female"
		},
		{
			name:"ywd",
			age:22,
			sex:"female"
		},
		{
			name:"lq",
			age:20,
			sex:"female"
		}
	]
	res.render("table",{title:title,table:table});
})
app.get("/",function(req,res){
	var title = "主页";
	res.render("home",{title:title});
})
app.listen(3000,function(){
	console.log("服务器已经启动")
})