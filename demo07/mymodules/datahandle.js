var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/db";

function getData(next){
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log(err);
        }else{
            var col = db.collection("stu");
            col.find().toArray(function(err, docs) {
                if(err){
                    console.log(err);
                }else{
                    next(docs);
                    db.close();
                }
            });
        }
    });
};

function insertData(next){
    MongoClient.connect(url,function(err, db) {
        var col = db.collection("stu");
        col.insertOne(next, function(){
            db.close();
        })
    })
}

module.exports = {
    getData: getData,
    insertData: insertData
}