var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/db";
// 链接数据库
MongoClient.connect(url, function(err, db) {
    // 定义数据库中的集合stu
    var col = db.collection("stu");

    // 修改数据
    col.updateOne({"age": 21}, {$set: {"sex": "male"}}, function(){
        db.close();
    })

    // 查看集合
    col.find().toArray(function(err, docs){
        console.log(docs);
        db.close();
    })

    // 删除数据
    // col.remove({ "name": "lqw" });


    // var student = {
    //     "name": "lqw",
    //     "age": 25,
    //     "sex": "female"
    // };
    // var student1 = {
    //     "name": "hxy",
    //     "age": 25,
    //     "sex": "male"
    // };
    // var student2 = {
    //     "name": "lily",
    //     "age": 21,
    //     "sex": "female"
    // };

    // // 插入单条数据
    // col.insertOne(student, function(){
    //     db.close();
    // })

    // // 插入多条数据
    // col.insertMany([student1, student2],function(){
    //     db.close();
    // })
})