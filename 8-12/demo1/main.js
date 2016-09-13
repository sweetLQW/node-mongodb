var exp = require("express");//创建后台服务器
var path = require("path");//连接路径
var a = exp();
a.use(exp.static(path.join(__dirname,"public")));
a.set("view engine","jade");//设置模板引擎为jade
//设置路由,当打192.168.3.126:3000/page时显示it is my page.
// a.get("/page",function(req,res){
// 	res.end("it is my page.");
// })
//用模板引擎渲染html
a.get("/home",function(req,res){
	var tit = "我的jade模板引擎";
	// var header = ["主页","新闻","百度知道","体育"];
	var data = [
		{
			name:"主页",
			url:"/home",
		},
		{
			name:"新闻",
			url:"/news.html",//静态页要加后缀
		},
		{
			name:"体育",
			url:"/sports",//动态页要添加路由
		},
		{
			name:"百度",
			url:"http://baidu.com",//外部网站要写好路径
		},
	]
	res.render("home",{"title":tit,"head":data});
})
a.get("/sports",function(req,res){
	res.render("sports");
})
a.listen(3000,function(){
	console.log("服务器已启动");
})