var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var datahandle = require("./mymodules/datahandle");
var app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:"false"}));
app.set("view engine","jade");
app.get("/",function(req,res){
    datahandle.finddata(function(data){
        res.render("index",{data:data});
    })
})
app.post("/insertdata",function(req,res){
    var data = req.body;
    datahandle.insertdata(data,function(){
        res.redirect("/");
    })
})
app.post("/updatedata",function(req,res){
    var data = req.body;
    var condition = {"num":data.num};
    datahandle.updatedata(condition,data,function(){
        res.redirect("/");
    });
});
app.post("/removedata",function(req,res){
    var data = req.body;
    datahandle.removedata(data,function(){
        res.redirect("/");
    });
})
app.listen(3000,function(){
    console.log("服务器已启动");
})

