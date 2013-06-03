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
		var imgs = this.content.getElementsByTagName('img'),
			imgArr = [],
			liArr = [];
		
		//set slide show height
		var slideShowHeight = this.content.style.height = imgs[0].offsetHeight + 'px';
		
		console.log(slideShowHeight)
		//wrap images in list
		var list = document.createElement('ul');
		
		//add images to array
		for(var i=0;i<imgs.length;i++){
			imgArr.push( imgs[i] );
		}
		//empty content
		this.content.innerHTML = '';
		
		//wrap images in list item
		for(var j=0;j<imgArr.length;j++){
			var img = imgArr[j],
				li = document.createElement('li');
			
			li.appendChild( img );
			li.style.top = -slideShowHeight+'px';
			list.appendChild( li );
			liArr.push(li);
		}
		this.content.appendChild(list);
		
		/**
		 * create slide show
		 */
		var homeSlideShow = new VerticalSlideShow( this.content, list, liArr, this.content );
		
		
		
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
				imgs = entryContent.getElementsByTagName('img'),
				imgArr = [],
				liArr = [],
				slideShowHeight = 0;
			
			//wrap images in list
			var view = document.createElement('div'),
				list = document.createElement('ul'),
				nextBtn = document.createElement('a'),
				prevBtn = document.createElement('a');
			
			view.classList.add('slideShow');
			nextBtn.classList.add('nextBtn');
			prevBtn.classList.add('prevBtn');
			
			if(imgs.length>1){
				
				for(var j=0;j<imgs.length;j++){
					//set slide show height based on tallest slide
					if(imgs[j].offsetHeight > slideShowHeight){
						slideShowHeight = imgs[j].offsetHeight
					}
					
					imgArr.push( imgs[j] );
					
				}
				
				//set ss height
				list.style.height = slideShowHeight + 'px';
				
				
				
				//wrap images in list item
				for(var k=0;k<imgArr.length;k++){
					var img = imgArr[k],
						li = document.createElement('li'),
						over = false;

					li.appendChild( img );
					list.appendChild( li );
					liArr.push(li);
					
					
					// slide side rollover function
					li.addEventListener('mouseover', function(e){
						over = true;
						mouseOverTimer();
					}, false);
					li.addEventListener('mouseout', function(e){
						over = false;
					}, false);
					
					var up = 0;
					function mouseOverTimer(){
						
						console.log(up++)
						
						//request new frame
						requestAnimFrame(function(){
							if(self.playing){
								mouseOverTimer();
							}else{
								over = false;
							}
						});
					}
				}
				view.appendChild(nextBtn);
				view.appendChild(list);
				view.appendChild(prevBtn);
				
				//set btn tops
				nextBtn.style.top = slideShowHeight / 2 - nextBtn.offsetHeight / 2 + 'px';
				prevBtn.style.top = slideShowHeight / 2 - prevBtn.offsetHeight / 2 + 'px';
				
				entryContent.insertBefore(view, entryContent.firstChild);

				/**
				 * create slide show
				 */
				var newsItemSlideShow = new SlideShow( view, list, liArr, nextBtn, prevBtn );
				
				
				
				
				
			}else{
				//no images, slide show
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