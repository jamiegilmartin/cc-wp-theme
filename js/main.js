var UBCC = window.UBCC || {};
/**
 * @namespace United Bamboo Cat Club  
 * @description main js controller for all ubcc pages
 * 
 */
UBCC = {
	init : function(){
		var self = this;
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
		this.isAndroid = /Android/i.test(navigator.userAgent);
		
		//load store bg
		storeBG = new Image(); 
		storeBG.src = "/wp-content/themes/ubcatclub/images/cc-store-bg.gif";
		
		this.content = document.getElementById('content');
		this.contentList = this.content.getElementsByClassName('contentList')[0];
		if(this.contentList)
		this.contentListItems = this.contentList.getElementsByClassName('item');

		//header
		this.header();
		
		//subscribe link out rather than page
		function subscribeLinkOut(){
			var url = 'http://unitedbamboo.us6.list-manage1.com/subscribe?u=6b9528ffebce1155e342ec488&id=3267b6a7cb',
				header = document.getElementById('cc-header'),
				nav = header.getElementsByTagName('nav')[0],
				menu = nav.getElementsByClassName('menu')[0],
				list = menu.getElementsByTagName('ul')[0],
				listItems = list.getElementsByTagName('li');
				subscribeLink = listItems[listItems.length-1].getElementsByTagName('a')[0];
				
			subscribeLink.setAttribute('href',url);
			subscribeLink.setAttribute('target','_blank');
				
		}
		subscribeLinkOut();
		
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
		if(this.content.classList.contains('cc-casting')){
			this.casting();
		}
		if(this.content.classList.contains('cc-archive')){
			this.archive();
		}
		if(this.content.classList.contains('cc-subscribe')){
			this.subscribe();
		}
		
		//Saver.init();
	},
	header : function(){
		var header = document.getElementById('cc-header');
		
		function openCloseHeader(){
			//console.log('header click')
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
		var self = this,
			imgs = this.content.getElementsByTagName('img'),
			imgArr = [],
			liArr = [],
			shadowLiArr = [];
		
		//set slide show height
		var slideShowHeight;
		if(!this.isMobile){
			slideShowHeight = this.content.style.height = imgs[0].offsetHeight + 'px';
		}else{
			var newImgHeight= getRatio(imgs[0].offsetWidth ,imgs[0].offsetHeight ,window.innerWidth);
			slideShowHeight = this.content.style.height = newImgHeight + 'px';
		}
		
		//wrap images in list and shadow list for scrollarama
		var slideList = document.createElement('ul'),
			shadowList = document.createElement('ul');
		
		slideList.classList.add('slideList');
		shadowList.classList.add('shadowList');
		
		//add images to array
		for(var i=0;i<imgs.length;i++){
			//hide images
			imgs[i].style.opacity = 0;
			imgArr.push( imgs[i] );
		}
		//empty content
		this.content.innerHTML = '';
		
		//wrap images in list item
		for(var j=0;j<imgArr.length;j++){
			var img = imgArr[j],
				li = document.createElement('li'),
				cloneLi = li.cloneNode(true),
				fader = document.createElement('div');
				
			fader.classList.add('fader');
			//fader.style.height = slideShowHeight + 'px';
			//fader.style.top = -this.viewHeight + 'px';
			
			li.appendChild( fader );
			li.appendChild( img );
			//li.style.top = -slideShowHeight+'px';
			slideList.appendChild( li );
			//shadowList.appendChild( cloneLi );
			liArr.push(li);
			//shadowLiArr.push(cloneLi);
			//show images
			img.style.opacity = 1;
		}
		this.content.appendChild(slideList);
		//this.content.appendChild(shadowList);
		

		//set top slideList
		//slideList.style.position = 'absolute';
		
		
		//resize images
		function resize(elementsToResize){
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;

			function isImage(i) {
				return i instanceof HTMLImageElement;
			}
			//resize elements
			for(var i=0;i<elementsToResize.length;i++){
				var oldW,
					oldH;
				if(isImage(elementsToResize[i])){
					oldH = elementsToResize[i].offsetHeight;
					oldW = elementsToResize[i].offsetWidth;
					//scale img to width
					elementsToResize[i].style.width = this.windowWidth + 'px';
					elementsToResize[i].style.height = (oldH*this.windowWidth)/oldW + 'px';
					
					/*
					if(!this.isMobile){
						//scale img to height
						elementsToResize[i].style.width = (oldW*this.windowHeight)/oldH + 'px';
						elementsToResize[i].style.height = this.windowHeight + 'px';
					}else{
						elementsToResize[i].style.width = this.windowWidth  + 'px';
						elementsToResize[i].style.height = (oldH*this.windowWidth)/oldW + 'px';
					}
					*/
					
					//set view height
					self.content.style.height = (oldH*this.windowWidth)/oldW + 'px';
					//self.content.style.height = this.windowHeight + 'px';
				}else{
					elementsToResize[i].style.height = this.windowHeight + 'px';
				}

			}
			/*
			//set shadows same height
			for(var k=0;k<liArr.length;k++){
				shadowLiArr[k].style.height = liArr[k].offsetHeight  + 'px';
				//console.log(liArr[k].offsetHeight)
			}
			*/
		}
		
		
		resize( imgArr );
		window.addEventListener('resize',function(e){
			resize( imgArr );
		});
		window.addEventListener('orientationchange',function(e){
			resize( imgArr );
		});
		/**
		 * create slide show
		 */
		if(liArr.length > 0)
		var homeSlideShow = new SlideShowVertical( this.content, slideList, liArr, this.content );

	},
	news : function(){
		window.scrollTo(0,0);
		
		//twitter
		var twitterModule = document.getElementsByClassName('twitter-module')[0];
		if(twitterModule){
			var twitterTitle = twitterModule.getElementsByClassName('title')[0],
				rtw_meta = document.getElementsByClassName('rtw_meta')[0],
				rtw_a = rtw_meta.getElementsByTagName('a')[0];
			rtw_a.style.paddingLeft = '5px';
			twitterTitle.appendChild(rtw_a);
		}
			
		
		//list
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
					//hide images
					imgs[j].style.opacity = 0;
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
					
					img.style.opacity = 1;
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
				if(liArr.length > 0)
				var newsItemSlideShow = new SlideShow( view, list, liArr, list, prevBtn ); //@param penUltimate was nextBtn
			
			}else{
				//no images, slide show
			}
			
			
		}
	},
	store : function(){
		//list
		for(var i=0;i<this.contentListItems.length;i++){
			var item = this.contentListItems[i],
				entry = item.getElementsByClassName('entry')[0],
				headerContent = entry.getElementsByClassName('content')[0],
				entryContent = entry.getElementsByClassName('content')[1],//1 cuz header has content
				imgs = entryContent.getElementsByTagName('img'),
				imgArr = [],
				liArr = [],
				slideShowHeight = 0,
				meta = headerContent.getElementsByClassName('meta')[0],
				metaListItems = meta.getElementsByTagName('li'),
				buyNowBtn = headerContent.getElementsByClassName('buyNowBtn')[0],
				orderedList = [];

			//meta fix
			for(var j=0;j<metaListItems.length;j++){
				var metaListItem = metaListItems[j],
					span = metaListItem.getElementsByTagName('span')[0];
					
					//console.log(span.innerHTML)
					//buyNow set link
					if(span.innerHTML.toLowerCase()  === 'description:'){
						metaListItems[j].classList.add('description');
						orderedList[0] = metaListItems[j];
					}
					if(span.innerHTML.toLowerCase()  === 'price:'){
						metaListItems[j].classList.add('price');
						orderedList[1] = metaListItems[j];
					}
					if(span.innerHTML.toLowerCase() === 'buy now:'){
						metaListItems[j].classList.add('buyNow');
						var string = metaListItems[j].innerHTML.split('</span> ')[1];
						buyNowBtn.setAttribute('href',string);
					}
			}
			//check if desc
			if(!meta.getElementsByClassName('description')[0]){
				entryContent.style.paddingTop = '45px'
			}else{
				entryContent.style.paddingTop = '0px'
			}


			//slide show
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
					//hide images
					imgs[j].style.opacity = 0;
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
					
					img.style.opacity = 1;
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
				if(liArr.length > 0)
				var newsItemSlideShow = new SlideShow( view, list, liArr, list, prevBtn ); //@param penUltimate was nextBtn
			
			}else{
				//no images, slide show
			}
		}
	},
	models : function(){
		var self = this,
			contentSection = this.content.getElementsByClassName('content')[0],
			contentWidth = contentSection.offsetWidth,
			modelLists = this.content.getElementsByClassName('modelList');
			
		//console.log(contentWidth)
		for(var h=0;h<modelLists.length;h++){
			
			var list = modelLists[h];
			new modelList(list);
			
		}
		/**
		 *@Class modelList
		 */
		function modelList(list){
			var self = this;
			this.list = list;
			this.items = [];
			this.modelListItems = this.list.getElementsByClassName('item');
			for(var i=0;i<this.modelListItems.length;i++){
				var item = this.modelListItems[i],
					header = item.getElementsByTagName('header')[0],
					entry = item.getElementsByClassName('entry')[0],
					imgHolder = entry.getElementsByClassName('imgHolder')[0],
					entryContent = entry.getElementsByClassName('content')[0],
					img = entryContent.getElementsByTagName('img')[0];

				imgHolder.appendChild(img);
				
				this.items.push( new model(this,item,header,entry,entryContent,img,i) );
				
			}
		}
		
		/**
		 *@Class model
		 */
		function model(modelList,item,header,entry,entryContent,img,i){
			var self = this;
			this.item = item;
			this.header = header;
			this.item.addEventListener('mouseover', function(){
				self.header.style.opacity =  1;
			}, false);
			this.item.addEventListener('mouseout', function(){
				self.header.style.opacity = 0;
			}, false);
			this.item.addEventListener('click', function(){
				for(var h=0;h<modelLists.length;h++){
					modelLists[h].parentNode.style.display = 'none';
					window.scrollTo(0,0);
					if(modelList.list === modelLists[h]){
						modelLists[h].parentNode.style.display = 'block';
						if(!modelList.list.parentNode.classList.contains('slideShow'))
						modelSlideShow(h,modelList,i);
					}
					
				}
				

			}, false);
		}
		
		/**
		 *@Class modelSlideShow
		 */
		var slideShowsArr = [];
		function modelSlideShow(listNum,modelList,clicked_slide_index){
			//wrap images in list
			var view = modelList.list.parentNode,
				content = view.parentNode,
				nextBtn = document.createElement('a'),
				prevBtn = document.createElement('a'),
				xBtn = document.createElement('a');

			//console.log(content.offsetLeft,content.offsetWidth)
			view.classList.add('slideShow');
			
			//fix width to show part of next slide
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
			
			
			//console.log(modelList.modelListItems)
			
			//set heights
			var maxHeight = 0;
			for(var i=0;i<modelList.modelListItems.length;i++){
				if(modelList.modelListItems[i].offsetHeight > maxHeight){
					maxHeight = modelList.modelListItems[i].offsetHeight;
				}
			}
			for(var j=0;j<modelList.modelListItems.length;j++){
				modelList.modelListItems[j].style.height = maxHeight + 'px'; //?working correctly??
			}
			for(var h=0;h<modelLists.length;h++){
				modelLists[h].style.height = maxHeight + 'px';
			}
			
			if(slideShowsArr[listNum] === undefined){
				var modelItemSlideShow = new SlideShow( view, modelList.list, modelList.modelListItems,  nextBtn, prevBtn );//@param penUltimate was nextBtn
				slideShowsArr.push(modelItemSlideShow);
				
				//reset next button to fix double firing
				//modelItemSlideShow.nextBtn = modelList.list;
				//modelItemSlideShow.events()
			}else{
				modelItemSlideShow = slideShowsArr[listNum];
			}
			
			modelItemSlideShow.indicatorOn = false;
			modelItemSlideShow.gotoSlide(clicked_slide_index);
			
			//save scroll position
			var doc = document.documentElement, body = document.body;
			var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
			var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
			window.scrollTo(0,0);
			
			//x btn click
			xBtn.addEventListener('click', function(){
				content.style.width = contentWidth+ 'px';
				console.log(contentWidth)
				view.classList.remove('slideShow');
				view.removeChild(nextBtn);
				view.removeChild(prevBtn);
				view.removeChild(xBtn);
				for(var h=0;h<modelLists.length;h++){
					modelLists[h].style.height = 'auto';
					modelLists[h].parentNode.style.display = 'block';
					
				}
				for(var j=0;j<modelList.modelListItems.length;j++){
					modelList.modelListItems[j].style.height = 'auto';
				}
				slideShowsArr=[];
				
				modelItemSlideShow.close();
				window.scrollTo(0,top);
			}, false);
		}
	},
	casting : function(){
		var self = this;
		this.content.style.height =  window.innerHeight + 'px';
		var callout = this.content.getElementsByClassName('callout')[0];

		setTimeout(function(){
			callout.style.opacity = 0;
		},5000)


		window.onresize = function(e){
			self.content.style.height =  window.innerHeight + 'px';
		};
	},
	archive : function(){
		var self = this,
			contentSection = this.content.getElementsByClassName('content')[0],
			contentWidth = contentSection.offsetWidth;
			
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
					img = entryContent.getElementsByTagName('img')[0],
					obj = entryContent.getElementsByTagName('object')[0],
					iframe = entryContent.getElementsByTagName('iframe')[0],
					imgW = 0,
					imgH = 0,
					media = null;
					
				if(img){
					imgW = img.style.width = (img.width / 2)+'px';
					imgH = img.style.height = (img.height / 2)+'px';
					imgHolder.appendChild(img);
					media = img;
				}
				if(obj){
					//imgW = obj.style.width = (obj.width / 2)+'px';
					//imgH = obj.style.height = (obj.height / 2)+'px';
					imgW = obj.style.width = (obj.width )+'px';
					imgH = obj.style.height = (obj.height )+'px';
					imgHolder.appendChild(obj);
					media = obj;
				}
				if(iframe){
					//imgW = iframe.setAttribute('width',iframe.width / 2)+'px';
					//imgH = iframe.setAttribute('height',iframe.height / 2)+'px';
					imgW = iframe.getAttribute('width' )+'px';
					imgH = iframe.getAttribute('height' )+'px';
					imgHolder.appendChild(iframe);
					media = iframe;
				}
				
				
				
				if(j===archiveStoryListItems.length-1){
					item.style.display = 'block';
					storyWidth = imgW;
					
					new archiveItem(item,header,entry,entryContent,media,i,storyWidth);
				}
				
			}
			//set story width
			story.style.width = storyWidth + 'px';
		}
		/**
		 *@Class archiveItem
		 */
		function archiveItem(item,header,entry,entryContent,media,i,storyWidth){

			item.addEventListener('mouseover', function(){
				header.style.opacity =  1;
			}, false);
			item.addEventListener('mouseout', function(){
				header.style.opacity = 0;
			}, false);
			item.addEventListener('click', function(){
				if(!self.archiveListStories[i].classList.contains('slideShow')){
					archiveSlideShow(i,media,storyWidth);
				}
			}, false);
		}
		/**
		 *@Class archiveSlideShow
		 */
		var slideShowsArr = [];
		function archiveSlideShow(clicked_story_index,media,storyWidth){
			
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
				
				if(media.tagName === 'IFRAME' || media.tagName === 'OBJECT'){
					//don't change size
				}else{
					media.style.width = (media.width * 2) +'px';
					media.style.height = (media.height * 2) +'px';
				}
				
				for(var k=0;k<listItems.length;k++){
					//make images bigger again
					var img = listItems[k].getElementsByTagName('img')[0],
						obj = listItems[k].getElementsByTagName('object')[0],
						iframe = listItems[k].getElementsByTagName('iframe')[0];
					if(img){
						img.style.width = (img.width )+'px';
						img.style.height = (img.height )+'px';
					}
					if(obj){
						//obj.style.width = (obj.width )+'px';
						//obj.style.height = (obj.height )+'px';
					}
					if(iframe){
						//iframe.width = (iframe.width )+'px';
						//iframe.height = (iframe.height )+'px';
					}
				}
				
				view.classList.add('slideShow');
				
				//fix width to show part of next slide
				content.style.width = window.innerWidth - ((window.innerWidth - content.offsetWidth) /2)-10 + 'px';
				view.style.width = content.offsetWidth-100+ 'px';
				//console.log(contentWidth,content.offsetWidth)

				nextBtn.classList.add('nextBtn');
				prevBtn.classList.add('prevBtn');
				xBtn.classList.add('xBtn');

				//set btn positions
				//nextBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';
				//prevBtn.style.top = self.modelListItems[0].offsetHeight / 2+ 'px';

				view.appendChild(nextBtn);
				view.appendChild(prevBtn);
				view.appendChild(xBtn);
				
				if(listItems.length>1 ){//more than one slide
					//create slide show instance
					if(slideShowsArr[clicked_story_index] === undefined && listItems.length > 0){
						var archiveStoryItemSlideShow = new SlideShow( view, list, listItems, nextBtn, prevBtn );//@param penUltimate was nextBtn
						slideShowsArr.push(archiveStoryItemSlideShow);
					}else{
						archiveStoryItemSlideShow = slideShowsArr[clicked_story_index];
					}
					archiveStoryItemSlideShow.indicatorOn = false;
					//archiveStoryItemSlideShow.gotoSlide(listItems.length-2);
					archiveStoryItemSlideShow.gotoSlide(listItems.length-1);
				}
				
				
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
					//listItems[j].style.height = maxHeight + 'px'; //?working correctly??
				}
				list.style.height = maxHeight + 'px';
				
				//save scroll position
				var doc = document.documentElement, body = document.body;
				var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
				var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
				window.scrollTo(0,0);
				
				//x btn click
				xBtn.addEventListener('click', function(){
					content.style.width = contentWidth + 'px';
					view.classList.remove('slideShow');
					view.removeChild(nextBtn);
					view.removeChild(prevBtn);
					view.removeChild(xBtn);
					view.style.width = storyWidth;
					list.style.height = 'auto';
					for(var j=0;j<listItems.length;j++){
						listItems[j].style.height = 'auto';
						listItems[j].style.display = 'none';
						if(j===listItems.length-1){
							listItems[j].style.display = 'block';
						}
					}
					for(var i=0;i<self.archiveListStories.length;i++){
						self.archiveListStories[i].style.display = 'block';
					}
					if(media.tagName === 'IFRAME' || media.tagName === 'OBJECT'){
						console.log(media.tagName,media.width)
						//media.setAttribute('width',(parseInt(media.width) / 2) );
						//media.setAttribute('height',(parseInt(media.height) / 2) );
						//media.width = (media.width /2)+'px';
						//media.height = (media.height /2)+'px';
					}else{
						media.style.width = (media.width / 2) +'px';
						media.style.height = (media.height / 2) +'px';
					}
					
					
					
					
					if(archiveStoryItemSlideShow) 
					archiveStoryItemSlideShow.close();
					slideShowsArr=[];
					window.scrollTo(0,top);
				}, false);
			}
			
		}
	},
	subscribe : function(){
		var self = this;
			
		this.content.style.height = window.innerHeight + 'px';
	}
};
window.onload = function(){
	UBCC.init();
};
