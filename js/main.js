var UBCC = window.UBCC || {};
/**
 * @namespace United Bamboo Cat Club  
 * @description 
 * 
 */
UBCC = {
	init : function(){
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
		this.isAndroid = /Android/i.test(navigator.userAgent);
		
		
		this.content = document.getElementById('content');
		this.contentList = this.content.getElementsByClassName('contentList')[0];
		if(this.contentList)
		this.contentListItems = this.contentList.getElementsByClassName('item');
		
		
		//header
		this.header();
		
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
		if(this.content.classList.contains('cc-models')){
			this.models();
		}
		if(this.content.classList.contains('cc-archive')){
			this.archive();
		}
	},
	header : function(){
		var header = document.getElementById('cc-header');
		
		function openCloseHeader(){
			if(header.classList.contains('closed')){
				openHeader();
			}else{
				closeHeader();
			}
		}
		function openHeader(){
			header.classList.remove('closed');
		}
		function closeHeader(){
			header.classList.add('closed');
		}
		
		header.addEventListener('click', openCloseHeader, false);
		this.content.addEventListener('click',closeHeader,false);
	},
	homeSlideShow : function(){
		var imgs = this.content.getElementsByTagName('img'),
			imgArr = [],
			liArr = [];
		
		//set slide show height
		var slideShowHeight = this.content.style.height = imgs[0].offsetHeight + 'px';
		
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
				li = document.createElement('li'),
				fader = document.createElement('div');
			fader.classList.add('fader');
			//fader.style.height = slideShowHeight + 'px';
			//fader.style.top = -this.viewHeight + 'px';
			
			li.appendChild( fader );
			li.appendChild( img );
			//li.style.top = -slideShowHeight+'px';
			list.appendChild( li );
			liArr.push(li);
		}
		this.content.appendChild(list);
		
		/**
		 * create slide show
		 */
		var homeSlideShow = new HomeSlideShow( this.content, list, liArr, this.content );

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
						slideShowHeight = imgs[j].offsetHeight;
						//console.log(imgs[j].offsetHeight, slideShowHeight )
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
			//console.log(item)
		}
	},
	models : function(){
		var self = this;
		this.modelList = this.content.getElementsByClassName('modelList')[0];
		this.modelListItems = this.modelList.getElementsByClassName('item');
		for(var i=0;i<this.modelListItems.length;i++){
			var item = this.modelListItems[i],
				header = item.getElementsByTagName('header')[0],
				entry = item.getElementsByClassName('entry')[0],
				imgHolder = entry.getElementsByClassName('imgHolder')[0],
				entryContent = entry.getElementsByClassName('content')[0],
				img = entryContent.getElementsByTagName('img')[0];
			
			imgHolder.appendChild(img);
			
			new model(item,header,entry,entryContent,img,i);
		}
		
		/**
		 *@Class model
		 */
		function model(item,header,entry,entryContent,img,i){
			
			item.addEventListener('mouseover', function(){
				header.style.opacity =  1;
			}, false);
			item.addEventListener('mouseout', function(){
				header.style.opacity = 0;
			}, false);
			item.addEventListener('click', function(){
				
				modelSlideShow(i+1);
				
			}, false);
		}
		
		/**
		 *@Class modelSlideShow
		 */
		function modelSlideShow(clicked_slide_index){
			//wrap images in list
			var view = self.modelList.parentNode,
				content = view.parentNode,
				nextBtn = document.createElement('a'),
				prevBtn = document.createElement('a'),
				xBtn = document.createElement('a');
			
			console.log(content.offsetLeft,content.offsetWidth)
			view.classList.add('slideShow');
			
			content.style.width = window.innerWidth - ((window.innerWidth - content.offsetWidth) /2)-10 + 'px';
			view.style.width = content.offsetWidth - 100+ 'px';
			
			nextBtn.classList.add('nextBtn');
			prevBtn.classList.add('prevBtn');
			xBtn.classList.add('xBtn');
			
			//set btn positions
			//nextBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';
			//prevBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';
			
			view.appendChild(nextBtn);
			view.appendChild(prevBtn);
			view.appendChild(xBtn);
			
			
			
			//set heights
			var maxHeight = 0;
			for(var i=0;i<self.modelListItems.length;i++){
				if(self.modelListItems[i].offsetHeight > maxHeight){
					maxHeight = self.modelListItems[i].offsetHeight;
				}
			}
			for(var j=0;j<self.modelListItems.length;j++){
				self.modelListItems[j].style.height = maxHeight + 'px'; //?working correctly??
			}
			self.modelList.style.height = maxHeight + 'px';
			
			var modelItemSlideShow = new SlideShow( view, self.modelList, self.modelListItems, nextBtn, prevBtn );
			modelItemSlideShow.gotoSlide(clicked_slide_index);
			
			
			//x btn click
			xBtn.addEventListener('click', function(){
				view.classList.remove('slideShow');
				view.removeChild(nextBtn);
				view.removeChild(prevBtn);
				view.removeChild(xBtn);
				self.modelList.style.height = 'auto';
				for(var j=0;j<self.modelListItems.length;j++){
					self.modelListItems[j].style.height = 'auto';
				}
			}, false);
		}
	},
	archive : function(){
		var self = this;
		this.archiveList = this.content.getElementsByClassName('archiveList')[0];
		this.archiveListStories = this.archiveList.getElementsByClassName('story');
		for(var i=0;i<this.archiveListStories.length;i++){
			var story = this.archiveListStories[i],
				archiveStoryList = story.getElementsByClassName('archiveStoryList')[0],
				archiveStoryListItems = archiveStoryList.getElementsByClassName('item'),
				storyWidth = 0;
				
			for(var j=0;j<archiveStoryListItems.length;j++){
				var item = archiveStoryListItems[j],
					header = item.getElementsByTagName('header')[0],
					entry = item.getElementsByClassName('entry')[0],
					imgHolder = entry.getElementsByClassName('imgHolder')[0],
					entryContent = entry.getElementsByClassName('content')[0],
					img = entryContent.getElementsByTagName('img')[0];
				
				imgHolder.appendChild(img);
				
				if(j===archiveStoryListItems.length-1){
					item.style.display = 'block';
					storyWidth = img.width;
					
					new archiveItem(item,header,entry,entryContent,img,i);
				}
				
			}
			//set story width
			story.style.width = storyWidth + 'px';
		}
		/**
		 *@Class archiveItem
		 */
		function archiveItem(item,header,entry,entryContent,img,i){

			item.addEventListener('mouseover', function(){
				header.style.opacity =  1;
			}, false);
			item.addEventListener('mouseout', function(){
				header.style.opacity = 0;
			}, false);
			item.addEventListener('click', function(){

				archiveSlideShow(i);

			}, false);
		}
		/**
		 *@Class archiveSlideShow
		 */
		function archiveSlideShow(clicked_story_index){
			
			//get clicked story
			for(var i=0;i<self.archiveListStories.length;i++){
				if(i === clicked_story_index){
					buildSlideShow( self.archiveListStories[i] );
				}else{
					self.archiveListStories[i].style.display = 'none';
				}
			}
			
			
			function buildSlideShow( story ){
				//wrap images in list
				var view = story,
					content = story.parentNode.parentNode,
					list = story.getElementsByClassName('archiveStoryList')[0],
					listItems = list.getElementsByClassName('item'),
					nextBtn = document.createElement('a'),
					prevBtn = document.createElement('a'),
					xBtn = document.createElement('a');
					
				//console.log(content,content.offsetLeft,content.offsetWidth)
				view.classList.add('slideShow');
				
				content.style.width = window.innerWidth - ((window.innerWidth - content.offsetWidth) /2)-10 + 'px';
				
				view.style.width = content.offsetWidth - 100+ 'px';

				nextBtn.classList.add('nextBtn');
				prevBtn.classList.add('prevBtn');
				xBtn.classList.add('xBtn');

				//set btn positions
				//nextBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';
				//prevBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';

				view.appendChild(nextBtn);
				view.appendChild(prevBtn);
				view.appendChild(xBtn);

				//set heights
				var maxHeight = 0;
				for(var i=0;i<listItems.length;i++){
					//show all
					listItems[i].style.display = 'block';
					if(listItems[i].offsetHeight > maxHeight){
						maxHeight = listItems[i].offsetHeight;
					}
				}
				for(var j=0;j<listItems.length;j++){
					listItems[j].style.height = maxHeight + 'px'; //?working correctly??
				}
				list.style.height = maxHeight + 'px';

				var archiveStoryItemSlideShow = new SlideShow( view, list, listItems, nextBtn, prevBtn );
				archiveStoryItemSlideShow.gotoSlide(listItems.length);
				

				//x btn click
				xBtn.addEventListener('click', function(){
					view.classList.remove('slideShow');
					view.removeChild(nextBtn);
					view.removeChild(prevBtn);
					view.removeChild(xBtn);
					list.style.height = 'auto';
					for(var j=0;j<listItems.length;j++){
						listItems[j].style.height = 'auto';
					}
					for(var i=0;i<self.archiveListStories.length;i++){
						
						self.archiveListStories[i].style.display = 'block';
						//self.archive();//???
						//todo : re loop and hide stuff
						location.reload();
						/*
						for(var i=0;i<self.archiveListStories.length;i++){
							var story = self.archiveListStories[i],
								archiveStoryList = story.getElementsByClassName('archiveStoryList')[0],
								archiveStoryListItems = archiveStoryList.getElementsByClassName('item'),
								storyWidth = 0;

							for(var j=0;j<archiveStoryListItems.length;j++){
								var item = archiveStoryListItems[j],
									header = item.getElementsByTagName('header')[0],
									entry = item.getElementsByClassName('entry')[0],
									imgHolder = entry.getElementsByClassName('imgHolder')[0],
									entryContent = entry.getElementsByClassName('content')[0],
									img = entryContent.getElementsByTagName('img')[0];
									
								if(j===archiveStoryListItems.length-1){
									item.style.display = 'block';
									storyWidth = img.width;
								}

							}
							//set story width
							story.style.width = storyWidth + 'px';
						}
						*/
					}
				}, false);
			}
			
		}
	}
};
window.onload = function(){
	UBCC.init();
};