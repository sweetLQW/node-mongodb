var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";
function findData(next){
    mongoClient.connect(url,function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("stu").find().toArray(function(err,docs){
                if(err){
                    console.log(err);
                }else{
                    next(docs);
                    db.close();
                }
            })
        }
    })
}
function insertData(data,next) {
    mongoClient.connect(url,function(err,db){
        db.collection("stu").insertOne(data,function(){
            next();
            db.close();
        });
    })
}
function updateData(condition,data,next) {
    mongoClient.connect(url,function(err,db){
        db.collection("stu").updateOne(condition,data,function(){
            next();
            db.close();
        });
    })
}
function removeData(condition,next) {
    mongoClient.connect(url,function(err,db){
        db.collection("stu").removeOne(condition,function(){
            next();
            db.close();
        });
    })
}
module.exports ={
    finddata:findData,
    insertdata:insertData,
    updatedata:updateData,
    removedata:removeData
}
