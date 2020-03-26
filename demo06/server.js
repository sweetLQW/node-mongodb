var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";//链接字符串
MongoClient.connect(url,function(err,db){//链接数据库
    //定义数据库中的集合stu
    var col = db.collection("stu");
    //查看集合
    col.find().toArray(function(err,docs){
        console.log(docs);
        db.close();
    })
    //修改数据
    col.updateOne({"age":"21"},{$set:{"sex":"female"}},function(){
        db.close();
    })
    // var student = {
    //     "name":"wangqiang",
    //     "age":"30",
    //     "sex":"male"
    // };
    // var student1 = {
    //     "name":"wangqiang",
    //     "age":"30",
    //     "sex":"male"
    // };
    //插入数据
    // col.insertOne(student,function(){
    //     db.close();
    // })
    //插入多条数据
    // col.insertMany([student,student1],function(){
    //     db.close();
    // })
})