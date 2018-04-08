var http = require("http");
module.exports = {
    httpReq:function (data,opt,i,callback) {
        var body = "";
        var req = http.request(opt, function(res) {
            // console.log("response: " + res.statusCode);
            res.on('data',function(data){
                body += data;
            }).on('end', function(){
                callback(body);
            });
        }).on('error', function(e) {
            console.log("error: " + e.message);
        });
        req.write(data);
        req.end();
    }
};