var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var datahandle = require("./mymodules/datahandle");
var app = express();
app.use(session({
    "secret":"hello",
    "cookie":{maxAge:10 * 1000}
}));
app.use(bodyParser.urlencoded({extended:"false"}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","jade");
app.listen(3000,function(){
    console.log("服务器已启动");
})

app.get("/",function(req,res){
    var showinfo = req.query.info;
    res.render("login",{showinfo:showinfo});
})
app.get("/welcome",function(req,res){
    if(req.session.username){
        res.render("welcome",{username:req.session.username});
    }else{
        res.redirect("/");
    }
})
app.post("/home",function(req,res){
    var option = req.body;
    datahandle.checkData(option,function(result){
        if(result === 0){
            req.session.username = option.username;
            res.redirect("/welcome");
        }else if(result === 1){
            res.redirect("/?info=密码错误,请重新输入");
        }else{
            res.redirect("/?info=用户名不存在,请重新输入");
        }
    })
})

