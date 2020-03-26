var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname,"public")));
app.listen(2000,function(){
    console.log("服务器已启动");
})
app.get("/domain",function(req,res){
    res.jsonp("请求成功");
})