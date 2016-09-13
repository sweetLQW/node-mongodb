var express=require("express");
var session=require("express-session");
var app = express();
app.use(session({
    "secret":"hello",//加密session是存在服务器端，相对安全
    "cookie":{maxAge:60*1000}//用来设置cookie存储的毫秒数，过了这个时间会自动清理cookie
}))
app.get("/",function(req,res){
    if(req.session.num){
        req.session.num++
        res.send("欢迎第"+req.session.num+"次访问");
    }else{
        req.session.num=1;
        res.send("欢迎第"+req.session.num+"次访问");
    }
})
app.listen(3000,function(){
    console.log("服务器已启动");
})
