var SlideShow = window.SlideShow || {};
 
/**
 * @class SlideShow 
 * @description a responsive slide show
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
	this.transitioning = false;
	this.active_index = 0;
	
	//indicator
	this.indicator = document.createElement('div');
	this.indicator.classList.add('indicator');
	this.indicator.innerHTML = '1 of '+this.slides.length;
	this.view.appendChild(this.indicator);
	
	
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
SlideShow.prototype.events = function(){
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
SlideShow.prototype.next = function(){
	if(this.active_index < this.slides.length-1){
		this.active_index++;
	}else{
		this.active_index = 0;
	}
	
	this.updateSlides('next');
	this.animateSlides();

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
	this.updateSlides('next');
	this.nonAnimateSlides();
	//this.events();
	if(this.indicatorOn)
	this.indicator.style.display = 'block';
	
};
SlideShow.prototype.close = function(){
	this.indicator.style.display = 'none';
	this.active_index = 0;
};
SlideShow.prototype.updateSlides = function( dir ){
	var self = this;
	if(this.active_index<0) return;
	for(var i=0;i<this.slides.length;i++){
		if(i === this.active_index ){
			//set prev slide
			if(this.active_index-1 >= 0){
				this.onFirst = false;
				this.previousSlide = this.slides[this.active_index-1];
			}else{
				//on first slide
				this.onFirst = true;
				this.previousSlide = this.slides[this.slides.length-1];
				//move previous slide stage left
				this.previousSlide.style.zIndex = 1;
				//this.previousSlide.style.left  =  -this.viewWidth+'px';
				
			}
			//console.log('this.active_index ',this.active_index,this.nextBtn)
			//set current
			this.currentSlide = this.slides[i];
			this.currentSlide.classList.add('currentSlide');
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
				this.onLast = false;
			}else{
				//on last slide
				this.onLast = true;
				this.nextSlide = this.slides[0];
				//move next slide stage right
				this.nextSlide.style.zIndex = 1;
				//this.nextSlide.style.left  =  this.viewWidth+'px';
			}
			
			
			this.currentSlide.style.zIndex = 2;
			//this.currentSlide.style.left = 0;
			
		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].classList.remove('currentSlide');
			
			//this.slides[i].style.zIndex = 0;
			//this.slides[i].style.left = -this.viewWidth+'px';
			
		}else{
			//slide is greater than active, move stage right
			this.slides[i].classList.remove('currentSlide');
			
			if(this.slides[i] !== this.previousSlide){
				//this.slides[i].style.zIndex = 0;
				this.slides[i].style.left = this.viewWidth+'px';
			}else{
				//console.log('prev',this.slides[i])
			}
		}
	}
	
	
	//update indicator
	this.indicator.innerHTML = (this.active_index+1) +' of '+this.slides.length;
	//set indicator top
	var img  = this.slides[this.active_index].getElementsByTagName('img')[0],
		obj = this.slides[this.active_index].getElementsByTagName('object')[0],
		iframe= this.slides[this.active_index].getElementsByTagName('iframe')[0];
	if(img){
		this.indicator.style.top = img.offsetHeight+10+'px';
	}
	if(obj){
		this.indicator.style.top = obj.offsetHeight+10+'px';
	}
	if(iframe){
		this.indicator.style.top = iframe.offsetHeight+10+'px';
	}
};
SlideShow.prototype.animateSlides = function( dir ){
	var self = this;
	this.transitioning = true;
	
	TweenLite.to(this.currentSlide, this.aniDelay, {left:0, ease:Linear.easeOut,
		onComplete : function(){
			self.transitioning = false;
		}
	});
	
	if(this.slides.length>2)
	TweenLite.to(this.previousSlide, this.aniDelay, {left: -this.viewWidth, ease:Linear.easeOut});
	
	
	this.nextSlide.style.left  =  this.viewWidth+'px';
	
};
SlideShow.prototype.nonAnimateSlides = function(){
	if(this.onFirst)
	this.previousSlide.style.left  =  -this.viewWidth+'px';
	
	this.currentSlide.style.left = 0;
	
	if(this.onLast)
	this.nextSlide.style.left  =  this.viewWidth+'px';
	
};


