var SlideShowVertical = window.SlideShowVertical || {};
 
/**
 * @class SlideShowVertical 
 * @description a responsive slide show
 * @param view - slide show view port
 * @param ul - slide show list
 * @param lis - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */

SlideShowVertical = function(view, ul, lis, nextBtn, prevBtn){
	var self = this;
	this.view = view;
	this.SlideShowVertical = ul;
	this.slides = lis;
	this.nextBtn = nextBtn;
	this.prevBtn = prevBtn;
	this.slidesArr = [];
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	this.transitioning = false;
	this.active_index = 0;
	
	
	for(var i=0;i<this.slides.length;i++){
		this.slidesArr.push( new SlideShowVerticalSlide( this.slides[i],i )  );
	}

	
	this.aniDelay = 0.5;
	
	
	//three places
	this.previousSlide;
	this.currentSlide;
	this.nextSlide;
	
	this.onFirst = false;
	this.onLast = false;
	
	this.updateSlides();
	this.nonAnimateSlides();
	
	this.events();
};
SlideShowVertical.prototype.events = function(){
	//Events
	var self = this,
		called = 0,
		touchStartX,
		touchStartY,
		deltaXAvg = [],
		deltaYAvg = [];;
		
	//touch start
	this.view.addEventListener('touchstart',function(e){
		called = 0;
		deltaXAvg = [];
		deltaYAvg = [];
		if(UBCC.isAndroid){
			touchStartX = e.changedTouches[0].pageX;
			touchStartY = e.changedTouches[0].pageY;
		}else{
			touchStartX = e.pageX;
			touchStartY = e.pageY;
		}
		
	},false);
	
	//touch move
	this.view.addEventListener('touchmove',function(e){
		var deltaX,
			deltaY;
		if(UBCC.isAndroid){
			deltaX = e.changedTouches[0].pageX  - touchStartX;
			deltaY = e.changedTouches[0].pageY  - touchStartY;
		}else{
			deltaX = e.pageX - touchStartX;
			deltaY = e.pageY - touchStartY;
		}
		
		deltaXAvg.push(deltaX);
		deltaYAvg.push(deltaY);
		
		if(deltaXAvg.length > 2){
			//if scrolling Y return
			if(Math.abs(deltaYAvg.sum()) > 10) return;
			
			var dir = deltaXAvg.sum() > 0 ? 'prev' : 'next';
			
			//output.innerHTML = e.pageX + ' --- ' + deltaAvg.sum() + ' : ' + dir;
			
			//reset touch start 
			touchStartX = e.pageX;
			//swipe
			swipe(dir);
		}
	},false);
	
	
	function swipe(dir){
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
	
	//next and prev click
	this.nextBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.next();
	}, false);

};
SlideShowVertical.prototype.next = function(){
	if(this.active_index < this.slides.length-1){
		this.active_index++;
	}else{
		this.active_index = 0;
	}
	
	this.updateSlides('next');
	this.animateSlides();

};
SlideShowVertical.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
	}else{
		this.active_index = this.slides.length-1;
	}
	this.updateSlides('prev');
};

SlideShowVertical.prototype.close = function(){
	this.active_index = 0;
};
SlideShowVertical.prototype.updateSlides = function( dir ){
	var self = this;
	
	if(this.active_index<0) return;
	for(var i=0;i<this.slidesArr.length;i++){
		
		if(i === this.active_index ){
			//set prev slide
			if(this.active_index-1 >= 0){
				this.onFirst = false;
				this.previousSlide = this.slidesArr[this.active_index-1];
			}else{
				//on first slide
				this.onFirst = true;
				this.previousSlide = this.slidesArr[this.slides.length-1];
				//move previous slide stage left
				this.previousSlide.slide.style.zIndex = 1;
				
			}
			//set current
			this.currentSlide = this.slidesArr[i];
			this.currentSlide.slide.classList.add('currentSlide');
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slidesArr[this.active_index+1];
				this.onLast = false;
			}else{
				//on last slide
				this.onLast = true;
				this.nextSlide = this.slidesArr[0];
				//move next slide stage right
				this.nextSlide.slide.style.zIndex = 1;
			}
			
			
			this.currentSlide.slide.style.zIndex = 2;
			
		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slidesArr[i].slide.classList.remove('currentSlide');
			
		}else{
			//slide is greater than active, move stage right
			this.slidesArr[i].slide.classList.remove('currentSlide');
			
			if(this.slidesArr[i] !== this.previousSlide){
				this.slidesArr[i].slide.style.top = -this.viewHeight+'px';
			}
		}
	}
	
};
SlideShowVertical.prototype.animateSlides = function( dir ){
	var self = this;
	this.currentSlide.slide.style.top = 0;
	this.currentSlide.slide.style.height = 0;
	
	this.transitioning = true;
	
	TweenLite.to(this.currentSlide.slide, this.aniDelay, {height:this.viewHeight, ease:Linear.easeOut});
	TweenLite.to(this.currentSlide.fader, this.aniDelay+0.3, {opacity:0, ease:Linear.easeOut,
		onComplete : function(){
			self.transitioning = false;
			self.previousSlide.slide.style.height  =  0;
			self.previousSlide.fader.style.opacity  =  1;
		}
	});
	
	this.nextSlide.slide.style.top  =  -this.viewHeight+'px';
	
};
SlideShowVertical.prototype.nonAnimateSlides = function(){
	if(this.onFirst)
	this.previousSlide.slide.style.top  =  this.viewHeight+'px';
	
	this.currentSlide.slide.style.top = 0;
	this.currentSlide.fader.style.opacity = 0;
	
	if(this.onLast)
	this.nextSlide.slide.style.top  =  -this.viewHeight+'px';
	
};

/**
 * @class SlideShowVerticalSlide 
 */
SlideShowVerticalSlide = function(ele,i){
	this.slide = ele;
	this.fader = ele.getElementsByClassName('fader')[0];
	this.slideNumber = i;
}

