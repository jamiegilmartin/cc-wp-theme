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
		if(this.contentList)
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
		var imgs = this.content.getElementsByTagName('img');
		
		//set slide show height
		var slideShowHeight = this.content.style.height = imgs[0].offsetHeight + 'px';
		
/*
		//wrap images in list
		var list = document.createElement('ul');
		this.content.appendChild(list);
		for(var i=0;i<imgs.length;i++){
			var img = imgs[i],
				li = document.createElement('li');
			
			li.appendChild( img );
			list.appendChild( li );
			console.log(i,li)
	
		}
		
		for(var j=0;j<list.childNodes.length;j++){
			list.childNodes[j].appendChild(imgs[j]);
			console.log(j)
		}*/
		/**
		 * create slide show
		 */
		var homeSlideShow = new VerticalSlideShow( this.content, imgs, this.content );
		
		
		
		/*
	var imgLink = imgs[i];
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
		*/
					
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
					console.log(maxMin(images[j].offsetHeight) )
				}
			}else{
				//console.log('no images')
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