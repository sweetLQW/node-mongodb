var express = require("express"),
    path = require("path"),//连接路径
    bodyParser = require("body-parser"),
    app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({type:"application/json"}));

app.get("/fruits",function (req,res) {
    console.log("fruits");
    res.send({"fruits":["苹果","香蕉","葡萄","芒果"]});
});
app.post("/animals",function (req,res) {
    console.log("animals：",req.body);
    res.send({"animals":["猴子","企鹅","小白兔","老虎"]});
});
app.get("/aaa",function (req,res) {
    console.log("aaa");
    res.send({"aaa":["aaa"]});
});
app.post("/bbb",function (req,res) {
    console.log("bbb：",req.body);
    res.send({"bbb":["bbb"]});
});
app.get("/ccc",function (req,res) {
    console.log("ccc");
    res.send({"ccc":["ccc"]});
});
app.listen(8081,function () {
    console.log("服务启动成功");
});