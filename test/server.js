var express = require("express"),
    path = require("path"),//连接路径
    bodyParser = require("body-parser"),
    rp = require('request-promise'),
    app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({type:"application/json"}));

app.post("/all",function (req,res) {
    var list = [];
    var optList = [];
    var idx= 0;
    var data = req.body.data;
    // for(var i=0;i<data.length;i++){
    //     (function(x){
    //         var opt = {
    //             host: 'localhost',
    //             port: "8081",
    //             body: data[x].data || {},
    //             uri: 'http://127.0.0.1:8081'+data[x].path,
    //             method: data[x].method,
    //             path: data[x].path,
    //             headers: data[x].headers,
    //             json:true
    //         };
    //         new Promise(function(resolve) {
    //             var req = http.request(opt, function(res) {
    //                 resolve(res);
    //                 console.log(res);
    //                 res.on('data',function(param){
    //                     list.push(JSON.parse(param));
    //                 }).on('end', function(){
    //                     // console.log("结束");
    //                 });
    //             });
    //             req.on('error', function(e){
    //                 console.log("request " + opt + " error, try again");
    //                 // startDownloadTask(imgSrc, dirName, index);
    //             });
    //             req.end();
    //         }).then(function(res) {
    //             console.log(res);
    //             // getHttpReqCallback(imgSrc, dirName, index)(res);
    //             console.log("then---------------------------------");
    //             if(list.length == data.length){
    //                 console.log(list);
    //                 res.send({"data":list});
    //             }
    //         });
    //     })(i)
    // }

    for(var i = 0;i<data.length;i++) {
        var opt = {
            host: 'localhost',
            port: "8081",
            body: data[i].data || {},
            uri: 'http://127.0.0.1:8081'+data[i].path,
            method: data[i].method,
            path: data[i].path,
            headers: data[i].headers,
            json:true
        };
        optList.push(opt);
        (function(x){
            rp(optList[x]).then(function(param){
                param.id = data[x].id;
                console.log(param);
                list.push(param);
                if(list.length == data.length){
                    console.log(list);
                    res.send({"data":list});
                    console.log("---------------------------------------------------------------------");
                }
            });
        })(i);
    }
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

app.listen(8080,function () {
    console.log("服务启动成功");
});