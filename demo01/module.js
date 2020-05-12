function fun(num1, num2, callback){
	setTimeout(function(){
		var result = num1 + num2;
		callback(result);
	},1000)
}

module.exports = {
	fun: fun
}