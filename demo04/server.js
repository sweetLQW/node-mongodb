var express = require("express");
var app = express();
app.set("view engine","jade");
app.get("/",function(req,res){
	res.render("home");
})
app.get("/sp",function(req,res){
	res.render("sports");
})
app.get("/ne",function(req,res){
	res.render("news");
})
app.get("/fl",function(req,res){
	res.render("flash");
})
app.listen(3000, function(){
	console.log("服务器已启动");
})