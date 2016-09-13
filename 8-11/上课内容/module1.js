var num1 = 10;
var num2 = 99;
function add(){
	return num1 + num2;
}

function sub(){
	return num1 - num2;
}

module.exports = {
	add:add,
	sub:sub
};