module.exports = function (app) {
    app.get("/fruits",function (req,res) {
        res.send({"fruits":["苹果","香蕉","葡萄","芒果"]});
    });
    app.post("/animals",function (req,res) {
        // console.log("请求参数",req.query);
        res.send({"animals":["猴子","企鹅","小白兔","老虎"]});
    });
};