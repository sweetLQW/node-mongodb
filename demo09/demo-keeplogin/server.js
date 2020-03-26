var express = require("express");
var path = require("path");
var session = require("express-session")
var app = express();
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    "secret":"hello",
    "cookie":{maxAge:10*1000}
}))
app.listen(3000,function () {
    console.log("服务器已启动");
})
app.get("/",function(req,res){
    res.render("login");
})
app.post("/login",function(req,res){
    req.session.username="LQW";
    res.redirect("home");
})
app.get("/home",function(req,res){
    if(req.session.username){
        res.render("home",{user:req.session.username});
    }else{
        res.redirect("/");
    }
})