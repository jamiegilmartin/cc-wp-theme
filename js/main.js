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
		//this.homeSlideShow();
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
	},
	homeSlideShow : function(){
		var slideShow = document.getElementsByClassName('cc-home')[0],
			imgLinks = slideShow.getElementsByTagName('a'),
			fader = document.getElementById('fader');
		
		//set slide show height
		var slideShowHeight = slideShow.style.height = imgLinks[0].offsetHeight + 'px';
		
		console.log(imgLinks[0].offsetHeight )
		
		for(var i=0;i<imgLinks.length;i++){
			var imgLink = imgLinks[i];
			imgLink.addEventListener('click', function(e){
				e.preventDefault();
				fader.style.height = slideShowHeight;
				fader.style.opacity = 1;
				
				function setFaderTop(){
					fader.classList.add('transition');
					fader.style.top = slideShowHeight;
					
				}
				setTimeout(setFaderTop,1000);
				//fader.classList.add('transition');
			}, false);
		}
		
		
		
		
		
	}
};
window.onload = function(){
	UBCC.init();
};