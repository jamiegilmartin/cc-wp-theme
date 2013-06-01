//requestAnimFrame
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();


function maxMin( test ){
	var t = test,
		max,
		min,
		obj = {};
	if(t > max){
		max = t;
	}else{
		if(t < min){
			min = t;
		}else{
			min = t;
		}
	}
	obj.max = max;
	obj.min = min;
	return obj;
}
