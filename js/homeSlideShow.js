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
	this.active_index = 0;
	this.reverse = false;
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	
	

	for(var i=0;i<this.slides.length;i++){
		this.slideHeights.push(this.slides[i].offsetHeight );
		//test
		this.slides[i].setAttribute('offH', this.slides[i].offsetHeight )
		
		this.imgArr.push(this.slides[i].getElementsByTagName('img')[0]);
		this.slidesArr.push( new HomeSlideShowSlide( this.slides[i],i )  );
	}

	
	this.updateSlides();
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
		lastScrollTop = 0;
		
		
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
		self.animate(percentScrolled);
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
HomeSlideShow.prototype.updateSlides = function( dir ){
	var self = this;
	
	//first slide intro
	if(this.active_index === 0 && !this.reverse){
		this.slidesArr[0].slide.classList.add('intro');
	}
	
	for(var i=0;i<this.slidesArr.length;i++){
		
		
		if(i === this.active_index ){
			//set current
			this.currentSlide = this.slidesArr[i];
			
			
			//set next slide
			if(this.reverse && this.active_index >= 1 ){
				this.nextIndex = this.active_index-1;
			}
			if(! this.reverse && this.active_index < this.slides.length-1){
				this.nextIndex = this.active_index+1;
			}
			this.nextSlide = this.slidesArr[this.nextIndex];
			
		}
	}
};
HomeSlideShow.prototype.animate = function( percent ){
	var self = this,
		animatingSlide = this.nextSlide,
		animatingIndex = this.nextIndex;
	
	percent = percent * this.slides.length;
	
	for(var i = 0;i<self.slides.length;i++){
		
		if(Math.floor(percent) === i){
			self.active_index = i;
			console.log('slide change','current = '+i,'next = '+ this.nextIndex)
			self.updateSlides();
		}
	}
	
	this.slideShow.style.position = 'fixed';
	
	//console.log(this.active_index,'animating at : ' +percent.toFixed(1) );

	//act on elements
	animatingSlide.slide.style.position = 'absolute';
	var nH = Math.round( this.slideHeights[animatingIndex] * percent );
	animatingSlide.slide.style.height = nH + 'px';
	animatingSlide.fader.style.opacity = 1-percent;
	//(scrollInterval*self.active_index)
	//console.log(currentScrollPercent.toFixed(2),currentScrollInterval)
	
	
};



/**
 * @class HomeSlideShowSlide 
 */
HomeSlideShowSlide = function(ele,i){
	this.slide = ele;
	this.fader = ele.getElementsByClassName('fader')[0];
	this.slideNumber = i;
}
