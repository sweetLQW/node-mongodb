var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser());
app.get("/",function(req,res){
    // console.log(req.cookies.username);
    // res.cookie("username","liu");
    // res.send("欢迎访问");
    if(req.cookies.username){
        res.send("欢迎再次访问");
    }else{
        res.cookie("username","liu");//cookie是存在浏览器端，相对不安全
        res.send("欢迎第一次访问");
    }
})
app.listen(3000,function(){
    console.log("ok");
})
