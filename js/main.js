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
		
		
		
		this.content = document.getElementById('content');
		this.contentList = this.content.getElementsByClassName('contentList')[0];
		this.contentListItems = this.contentList.getElementsByClassName('item');
		
		//pages
		if(this.content.classList.contains('cc-home')){
			this.homeSlideShow();
		}
		if(this.content.classList.contains('cc-news')){
			this.news();
		}
		if(this.content.classList.contains('cc-store')){
			this.store();
		}
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
		
		//console.log( imgLinks[0].offsetHeight )
		
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
		
	},
	news : function(){
		for(var i=0;i<this.contentListItems.length;i++){
			var item = this.contentListItems[i],
				entry = item.getElementsByClassName('entry')[0],
				entryContent = entry.getElementsByClassName('content')[0],
				images = entryContent.getElementsByTagName('img');
			if(images.length>0){
				for(var j=0;j<images.length;j++){
					console.log(i,j,images[j]);
				}
			}else{
				console.log('no images')
			}
			
		}
	},
	store : function(){
		for(var i=0;i<this.contentListItems.length;i++){
			var item = this.contentListItems[i];
			console.log(item)
		}
	},
	models : function(){
		
	}
};
window.onload = function(){
	UBCC.init();
};