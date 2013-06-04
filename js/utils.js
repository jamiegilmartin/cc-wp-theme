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

Array.prototype.sum = function() {
	return (! this.length) ? 0 : this.slice(1).sum() + ((typeof this[0] == 'number') ? this[0] : 0);
};

//not working yet
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
