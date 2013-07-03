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
		self.animate( percentScrolled * self.slides.length );
		
		if(percentScrolled >1){
			console.log('end');
		}
	});
	
	this.nextBtn.addEventListener('click', function(){
		self.next();
	}, false);
	
};
HomeSlideShow.prototype.next = function(){
	console.log('next')
	this.activeIndex++
	//this.animate(this.activeIndex)
	
};
HomeSlideShow.prototype.run = function(  ){
	var self = this;
	
	//request new frame
	requestAnimFrame(function(){
		if(self.playing){ // && self.secondsRunning < (self.duration)
			self.run( now );
		}else{
			self.playing = false;
		}
	});
};
HomeSlideShow.prototype.animate = function( percent ){
	var self = this,
		nextScroll = 0,
		animatingSlide,
		currPercent;
		
	this.slideShow.style.position = 'fixed';
	
	for(var i = 0;i<self.slides.length;i++){

		if(Math.floor(percent) === i && i < self.slides.length-1 ){
			this.activeIndex = i;
			nextScroll = nextScroll < i ? i : nextScroll;
			
			console.log(nextScroll,(percent-i).toFixed(1))
			//next slide
			animatingSlide = this.slidesArr[this.activeIndex+1];
			
			//var nH = Math.round( this.slideHeights[this.activeIndex+1] * (percent-i) );
			var nH = Math.round( this.slideHeights[this.activeIndex+1] * (percent-i) );
			//act on elements
			animatingSlide.slide.style.position = 'absolute';
			animatingSlide.slide.style.height = nH + 'px';
			animatingSlide.fader.style.opacity = this.activeIndex+1 - percent;
			
			
			
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
