var express = require("express");
var app = express();
var data = {'name': 'lily'};

app.get("/jsonp/list",function(req, res){
    res.jsonp(data);
})

app.get("/ajax/list",function(req, res){
    // 允许所有跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许百度访问
    // res.setHeader('Access-Control-Allow-Origin', 'http://www.baidu.com');
    res.send(data);
})

app.get("/script/list",function(req, res){
    var result = req.query.callback + '(' + JSON.stringify(data) + ')';
    res.send(result);
})

app.listen(2000, function(){
    console.log("服务器已启动");
})