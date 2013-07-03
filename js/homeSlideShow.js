var HomeSlideShow = window.HomeSlideShow || {};
 
/**
 * @class HomeSlideShow 
 * @description a responsive slide show
 * @param view - slide show view port
 * @param slides - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */

HomeSlideShow = function(view, ul, lis, nextBtn ){
	var self = this;
	
	this.view = view;
	this.slideShow = ul;
	this.slides = lis;
	this.slidesArr = [];
	this.slideHeights = [];
	this.imgArr = [];
	this.nextBtn = nextBtn;
	this.activeIndex = 0;
	this.reverse = false;
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	
	

	for(var i=0;i<this.slides.length;i++){
		this.slideHeights.push( this.slides[i].offsetHeight );
		this.imgArr.push(this.slides[i].getElementsByTagName('img')[0]);
		this.slidesArr.push( new HomeSlideShowSlide( this.slides[i],i )  );
	}

	
	//this.updateSlides( 0 );
	
	this.slidesArr[this.activeIndex].slide.classList.add('intro');
	this.events();
	
	//this.scrollAnimation();
	window.scrollTo(0,1);
};
HomeSlideShow.prototype.events = function(){
	var self = this,
		nextScroll = 0,
		called = 0,
		offsetHeight = 0,
		scrollTop = 0,
		scrollHeight = 0,
		clientHeight = 0,
		position = 0,
		max = 0,
		percentScrolled = 0,
		lastScrollTop = 0,
		newPercent;
		
		
	window.addEventListener('scroll',function(e){
		offsetHeight  = document.documentElement.offsetHeight || document.body.offsetHeight;
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		scrollHeight  = document.documentElement.scrollHeight || document.body.scrollHeight;
		clientHeight  = document.documentElement.clientHeight || document.body.clientHeight;
		position = scrollTop;
		max = scrollHeight - clientHeight;
		percentScrolled = position / max;
	
		self.reverse = lastScrollTop > scrollTop ? true : false;
		lastScrollTop = scrollTop;
		
		
		//animate slides
		self.animate( percentScrolled );
	});
	
	this.nextBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.next();
	}, false);
	
};
HomeSlideShow.prototype.next = function(){
	if(this.reverse === false && this.active_index < this.slides.length-1){
		this.active_index++;
		this.updateSlides('next');
	}else{
		this.reverse = true;
		this.prev();
	}
};
HomeSlideShow.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
		
		this.updateSlides('prev');
	}else{
		this.reverse = false;
		this.next();
	}
};
/*HomeSlideShow.prototype.updateSlides = function(){
	var self = this;
	
	//first slide intro
	if(this.activeIndex === 1 && !this.reverse){
		this.animatingSlide = this.slidesArr[1];
	}else if(this.activeIndex === this.slides.length-1){
		//last slide
		console.log('last slide')
	}else{
		for(var i=0;i<this.slidesArr.length;i++){

			console.log(this.activeIndex)
			if(i === this.activeIndex){
				
				//set next slide
				if(this.reverse && activeIndex>= 1 ){
					this.nextIndex = activeIndex-1;
				}
				if(!this.reverse && activeIndex < this.slides.length-1){
					this.nextIndex = activeIndex+1;
				}
				this.nextSlide = this.slidesArr[this.nextIndex];
				

				//set current
				this.animatingSlide = this.slidesArr[i];

			}
		}
	}
};*/
HomeSlideShow.prototype.animate = function( percent ){
	var self = this,
		nextScroll = 0,
		animatingSlide;
		
	this.slideShow.style.position = 'fixed';
	
	newPercent = percent * self.slides.length;
	
	for(var i = 0;i<self.slides.length;i++){

		if(Math.floor(newPercent) === i && i < self.slides.length-1 ){
			this.activeIndex = i;
			//self.updateSlides(nextScroll);
			animatingSlide = this.slidesArr[this.activeIndex+1];
			
			var nH = Math.round( this.slideHeights[this.activeIndex+1] * (newPercent-i));
			
			console.log('slide change','current = '+this.activeIndex,'next = '+ (this.activeIndex+1) )
			console.log(this.activeIndex,'animating at : ' +newPercent.toFixed(1) , 'h='+nH);
			
			//act on elements
			animatingSlide.slide.style.position = 'absolute';
			animatingSlide.slide.style.height = nH + 'px';
			animatingSlide.fader.style.opacity = this.activeIndex+1 - newPercent;
			//(scrollInterval*self.active_index)
			//console.log(currentScrollPercent.toFixed(2),currentScrollInterval)
		}
	}
	
	
	
	
	
	
	
};



/**
 * @class HomeSlideShowSlide 
 */
HomeSlideShowSlide = function(ele,i){
	this.slide = ele;
	this.fader = ele.getElementsByClassName('fader')[0];
	this.slideNumber = i;
}
