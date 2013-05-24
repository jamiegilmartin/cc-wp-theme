var UBCC = window.UBCC || {};
/**
 * @namespace United Bamboo Cat Club  
 * @description 
 * 
 */
UBCC = {
	init : function(){
		console.log('cat club');
		
		this.headerAnimation();
	},
	headerAnimation : function(){
		var header = document.getElementById('cc-header');
		
		header.addEventListener('click', function(){
			if(header.classList.contains('closed')){
				header.classList.remove('closed');
			}else{
				header.classList.add('closed');
			}
		}, false);
	}
};
window.onload = function(){
	UBCC.init();
};