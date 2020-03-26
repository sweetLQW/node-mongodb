var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";
function checkdData(option,next){
    //0 登陆成功
    //1 密码错误
    //2 用户名错误
    MongoClient.connect(url,function(err,db){
       // db.collection("login").find().toArray(function(err,docs){
       //     db.close();
           // for(var i = 0;i<docs.length;i++){
           //     if(option.username==docs[i].username){
           //         if(option.password==docs[i].password){
           //             next(0,message);
           //             return;
           //         }else{
           //             var message = "密码错误，请重新输入";
           //             next(1,message);
           //             return;
           //         }
           //     }
           // }
           // var message = "用户名不存在，请重新输入";
           // next(2,message);
        // })
           //性能优化版
           var condition= {"username":option.username};
           db.collection("login").find(condition).toArray(function(err,docs){
               db.close();
               if(docs.length === 0){
                   next(2);
               }else if(docs[0].password === option.password){
                   next(0);
               }else{
                   next(1);
               }
           })
    })
}
module.exports = {
    checkData:checkdData
}
