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
	this.playing  = false;
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	
	for(var i=0;i<this.slides.length;i++){
		this.slides[i].setAttribute('s',i);
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
		lastPastPercentageCheck = 0,
		nextSlide = 0;
		
		
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
		
		
		//switch slide
		if(Math.floor(percentScrolled * self.slides.length) > lastPastPercentageCheck ){
			if(self.activeIndex < self.slides.length-1) self.activeIndex++;
			nextSlide = lastPastPercentageCheck + 1;
			console.log('next',nextSlide)
			if(nextSlide === self.slides.length)
			console.log('end!')
		}
		lastPastPercentageCheck = Math.floor(percentScrolled * self.slides.length);
		
		
		//console.log(lastPastPercentageCheck, percentScrolled* self.slides.length);
		
		
		//animate slides
		//xsself.animate(percentScrolled);
		
	
	});
	
	this.nextBtn.addEventListener('click', function(){
		self.next();
	}, false);
	
};
HomeSlideShow.prototype.next = function(){
	console.log('next')
	this.activeIndex++
	//this.animate(this.activeIndex)
	this.aniInterval = 0;
	this.playing = true;
	this.run();
};
HomeSlideShow.prototype.run = function(){
	var self = this;
	
	this.aniInterval++;
	if(this.aniInterval >=100){
		this.playing = false;
		console.log('run',this.aniInterval*0.01)
		
		this.aniInterval = 0;
	}
	
	//window.scrollTo(0)
	this.animate(this.aniInterval*0.01)
	
	//request new frame
	requestAnimFrame(function(){
		if(self.playing){ // && self.secondsRunning < (self.duration)
			self.run();
		}else{
			self.playing = false;
		}
	});
};
HomeSlideShow.prototype.animate = function(){
	var self = this,
		nextScroll = 0,
		animatingSlide,
		currPercent = percent * self.slides.length;
	
	this.slideShow.style.position = 'fixed';

	for(var i = 0;i<self.slidesArr.length;i++){
		
		if(Math.floor(currPercent) === i && i < self.slidesArr.length-1 ){
			this.activeIndex = i;
			nextScroll = nextScroll < i ? i : nextScroll;
			
			//console.log(this.activeIndex+1,nextScroll,(currPercent).toFixed(1), percent.toFixed(1) )
			
			//next slide
			animatingSlide = this.slidesArr[this.activeIndex+1];
			
			var nH = Math.round( this.slideHeights[this.activeIndex+1] * (currPercent-i) );
			
			//act on elements
			animatingSlide.slide.style.position = 'absolute';
			animatingSlide.slide.style.height = nH + 'px';
			animatingSlide.fader.style.opacity = this.activeIndex+1 - currPercent;
			
			if(percent >1){
				console.log('end');
				animatingSlide.slide.style.height = this.slideHeights[this.activeIndex+1] + 'px';
				//animatingSlide.fader.style.opacity = 0;
			}
			
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
