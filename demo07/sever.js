var express = require("express");
var bodyParser = require("body-parser");
var datahandle = require("./mymodules/datahandle");
var path = require("path");
var app = express();
app.use(bodyParser.urlencoded({extended:"false"}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","jade");
app.get("/table",function(req,res){
    datahandle.getData(function(docs){
        res.render("table",{data:docs});
    });
});
app.post("/getdata",function(req,res){
    var data = req.body;
    datahandle.insertData(data);
    res.render("getdata");
});
app.listen(3000,function(){
    console.log("服务器已启动");
});



