var express = require("express");
var bodyParser = require("body-parser");
var handledata = require("./mymodules/handledata");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:"false"}));
app.listen(3000,function(){
    console.log("服务器已启动");
})

app.get("/hello",function(req,res){
    console.log(req.query);
    res.send("get");
})
app.post("/hello",function(req,res){
    console.log(req.body);
    res.send("post");
})
app.post("/insertdata",function(req,res){
    handledata.insertdata(req.body,function(){})
    res.send("接收成功");
})
app.get("/finddata",function(req,res){
    handledata.finddata(function(data){
        res.send(data);
    })
})
handledata.removedata({num:"09"},function(){})
