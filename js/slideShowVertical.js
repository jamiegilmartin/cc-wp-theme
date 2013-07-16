var SlideShow = window.SlideShow || {};
 
/**
 * @class SlideShow 
 * @description   a responsive slide show
 * @param view - slide show view port
 * @param ul - slide show list
 * @param lis - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */
SlideShowVertical = function( view, ul, lis, nextBtn){
	//SlideShow.call( this, view, ul, lis, nextBtn  );
	
	var self = this;
	this.view = view;
	this.slideShow = ul;
	this.slides = lis;
	this.slideHeights = [];
	this.slidesArr = [];
	this.nextBtn = nextBtn;
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	this.onLast = false;
	
	
	for(var i=0;i<this.slides.length;i++){
		this.slideHeights.push(this.slides[i].offsetHeight);
		this.slidesArr.push( new SlideShowVerticalSlide( this.slides[i],i )  );
	}
	
	
	this.over = false;
	this.overLeftSide = false;
	//console.log(this.viewWidth ,this.viewHeight )
	
	this.transitioning = false;
	this.active_index = 0;
	
	this.updateSlides();
	//set agian for ff
	this.transitioning = false;
	
	//this.slidesArr[this.active_index].slide.classList.add('intro');
	
	this.events();
	
};
//inherits SlideShow
//SlideShowVertical.prototype = new SlideShow();
//SlideShowVertical.prototype.constructor = this.SlideShowVertical;
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
		//console.log(self.transitioning)
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

};
SlideShowVertical.prototype.updateSlides = function( dir ){
	var self = this;
	
	
	for(var i=0;i<this.slidesArr.length;i++){
		//add transitioning class
		//this.slides[i].classList.remove('transitioning');
		
		if(i === this.active_index ){
			
			//set current
			this.currentSlide = this.slidesArr[i];
			this.currentSlide.slide.style.height = this.slideHeights[i] + 'px';
			
			this.currentSlide.slide.classList.add('currentSlide');
			this.currentSlide.slide.classList.add('transitioning');
			
			
			if(this.onLast ){
			
			}
			//set prev slide
			if(this.active_index-1 >= 0){
				this.previousSlide = this.slidesArr[this.active_index-1];
				this.previousSlide.slide.classList.add('transitioning');
				
			}else{
				//on first slide
				this.previousSlide = this.slidesArr[this.slides.length-1];
				
				//move previous slide stage left
				//this.previousSlide.slide.classList.add('p');
				
				//this.previousSlide.slide.classList.remove('transitioning');
				//this.previousSlide.fader.classList.remove('transitioning');
				
				this.currentSlide.slide.classList.remove('transitioning');
				this.currentSlide.fader.classList.remove('transitioning');
		
				//this.previousSlide.slide.style.zIndex = 0;
				//this.previousSlide.slide.style.top  =  this.viewHeight+'px';
				console.log('on f',this.previousSlide.slide)
				
			}
			
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slidesArr[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slidesArr[0];
				//move next slide stage right
				console.log('llasst')
				this.nextSlide.slide.classList.remove('transitioning');
				this.nextSlide.slide.style.height = 0;
				
				this.onLast = true;
				
				//this.nextSlide.slide.style.zIndex = 1;
				this.currentSlide.fader.style.bottom = 0;
				
				//this.nextSlide.slide.style.top  =  -this.viewHeight+'px';
			}
			
			this.transitioning = true; //prevents user from going through slides too fast
			//this.currentSlide.slide.style.zIndex = 2;
			//this.currentSlide.slide.style.top = 0;
			this.currentSlide.fader.style.opacity = 0;
			
			
			var transitionEnd = whichTransitionEvent();
			if(transitionEnd){
				this.currentSlide.slide.addEventListener(transitionEnd, function( e ) {
					self.transitioning = false;
					//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
					
				}, false );
			}else{
				self.transitioning = false;
			}
			
		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slidesArr[i].slide.classList.remove('currentSlide');
			this.slidesArr[i].slide.classList.add('transitioning');
			
			//this.slidesArr[i].slide.style.zIndex = 0;
			//this.slidesArr[i].slide.style.top = this.viewHeight+'px';
			
		}else{
			this.slidesArr[i].slide.style.height = 0;
			
			this.slidesArr[i].slide.classList.remove('currentSlide');
			this.slidesArr[i].slide.classList.add('transitioning');
			
			//slide is greater than active, move stage right
			if(this.slidesArr[i] !== this.previousSlide){
				
				//this.slidesArr[i].slide.style.zIndex = 0;
				//this.slidesArr[i].slide.style.top = -this.viewHeight+'px';
				this.slidesArr[i].fader.style.opacity = 1;
				
			}
		}
	}
};

/**
 * @class SlideShowVerticalSlide 
 */
SlideShowVerticalSlide = function(ele,i){
	this.slide = ele;
	this.fader = ele.getElementsByClassName('fader')[0];
	this.slideNumber = i;
}



