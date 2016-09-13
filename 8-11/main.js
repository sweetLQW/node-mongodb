var module1 = require("./module1");
var module2 = require("./module2");
var bubble = require("./bubble");
// module2.fun(100,11,function(re){
// 	console.log(re);
// });
// console.log("//////////////////////////////");
// console.log("1");
// console.log("2");
// console.log("3");
// console.log("//////////////////////////////");
var arr =[2,4,3,6,8,1,5,3];
bubble.bubble(arr,function(a){
	console.log(a);
})