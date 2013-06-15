var SlideShow = window.SlideShow || {};
 
/**
 * @class SlideShow 
 * @description IBM Security Headlines, a responsive slide show
 * @param view - slide show view port
 * @param ul - slide show list
 * @param lis - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */

SlideShow = function(view, ul, lis, nextBtn, prevBtn){
	var self = this;
	this.view = view;
	this.slideShow = ul;
	this.slides = lis;
	this.nextBtn = nextBtn;
	this.prevBtn = prevBtn;
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	this.active_index = 0;
		
	
	this.slideArray = [];
	
	for(var i=0;i<this.slides.length;i++){
		this.slideArray.push( new Slide(this.slides[i]) );
	}
	
	this.updateSlides();
	
	
	
	//Events
	var called = 0,
		touchStartX;
		
	this.view.addEventListener('touchstart',function(e){
		called = 0;
		touchStartX = e.pageX;
	},false);
	
	this.view.addEventListener('touchmove',function(e){
		//e.preventDefault();
		var deltaX = e.pageX - touchStartX;
		var dir = deltaX > 0 ? 'prev' : 'next';
		touchStartX = e.pageX;
		swipe(dir, deltaX)
	},false);
	
	
	
	function swipe(dir, deltaX){
		called ++;
		if(called === 1){
			if(dir === 'next'){
				if(self.transitioning === false)
				self.next();
			}else{
				if(self.transitioning === false)
				self.prev();
			}
		}
	}
	
	
	this.nextBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.next();
	}, false);
	this.prevBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.prev();
	}, false);
	
};

SlideShow.prototype.next = function(){
	if(this.active_index < this.slides.length-1){
		this.active_index++;
	}else{
		this.active_index = 0;
	}
	this.updateSlides('next');

};
SlideShow.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
	}else{
		this.active_index = this.slides.length-1;
	}
	this.updateSlides('prev');
};
SlideShow.prototype.gotoSlide = function(num){
	this.active_index = num;
	this.updateSlides();
};
SlideShow.prototype.updateSlides = function( dir ){
	var self = this;
	for(var i=0;i<this.slides.length;i++){
		
		if(i === this.active_index ){
			
			//set prev slide
			if(this.active_index-1 >= 0){
				this.previousSlide = this.slides[this.active_index-1];
			}else{
				//on first slide
				this.previousSlide = this.slides[this.slides.length-1];
				//move previous slide stage left
				this.previousSlide.style.zIndex = 0;
				this.previousSlide.style.left  =  -this.viewWidth+'px';
				
			}
			
			//set current
			this.currentSlide = this.slides[i];
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
				//move next slide stage right
				this.nextSlide.style.zIndex = 0;
				this.nextSlide.style.left  =  this.viewWidth+'px';
			}
			
			this.transitioning = true; //prevents user from going through slides too fast
			this.currentSlide.style.zIndex = 2;
			this.currentSlide.style.left = 0;
			//start header animations
			this.slideArray[i].start();
			
			
			this.currentSlide.addEventListener('webkitTransitionEnd', function( e ) {
				self.transitioning = false;
				//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
			}, false );
			
		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].style.zIndex = 0;
			this.slides[i].style.left = -this.viewWidth+'px';
			this.slideArray[i].stop();
		}else{
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){
			
				this.slides[i].style.zIndex = 0;
				this.slides[i].style.left = this.viewWidth+'px';
			}
			this.slideArray[i].stop();
		}
	}
	
};





