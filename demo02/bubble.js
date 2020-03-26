function bubble(array,callback){
	for(var i = array.length;i>2;i--){
		for(var j=0;j<i-1;j++){
			if(array[j]>array[j+1]){
				var temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		}
	}
	callback(array);
}
module.exports={
	bubble:bubble,
}