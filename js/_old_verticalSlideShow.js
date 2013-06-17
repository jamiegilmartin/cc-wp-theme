var VerticalSlideShow = window.VerticalSlideShow || {};
 
/**
 * @class VerticalSlideShow 
 * @description a responsive slide show
 * @param view - slide show view port
 * @param slides - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */

VerticalSlideShow = function(view, ul, lis, nextBtn, prevBtn){
	var self = this;
	this.view = view;
	this.slideShow = ul;
	this.slides = lis;
	this.nextBtn = nextBtn;
	//this.prevBtn = prevBtn;

	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	this.active_index = 0;
	
	console.log(this.viewHeight)
	
	/*
	//mousewheel
	$(view).mousewheel(function(event, delta, deltaX, deltaY) {
	    event.preventDefault();
		var dir = deltaY > 0 ? 'up' : 'down';
		console.log( dir, deltaY );
	});
	*/

	this.updateSlides();
	
	this.events();
};
VerticalSlideShow.prototype.events = function(){
	var self = this;
	/*
	var output = document.createElement('div');
	output.style.border = '1px solid red';
	output.style.position = 'absolute';
	output.style.height = '40px';
	output.style.top = '0px';
	output.style.left = '0px'
	output.style.zIndex = 100;
	this.view.appendChild(output);
	*/
	//Events
	var called = 0,
		touchStartX,
		touchStartY,
		deltaXAvg = [],
		deltaYAvg = [];;

	//touch start
	this.view.addEventListener('touchstart',function(e){
		called = 0;
		deltaXAvg = [];
		deltaYAvg = [];
		if(MSH.isAndroid){
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
		if(MSH.isAndroid){
			deltaX = e.changedTouches[0].pageX  - touchStartX;
			deltaY = e.changedTouches[0].pageY  - touchStartY;
		}else{
			deltaX = e.pageX - touchStartX;
			deltaY = e.pageY - touchStartY;
		}

		deltaXAvg.push(deltaX);
		deltaYAvg.push(deltaY);
		console.log(deltaY)

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

	
	this.nextBtn.addEventListener('click', function(){
		//if(self.transitioning === false)
		self.next();
	}, false);
	/*
	this.prevBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.prev();
	}, false);
	*/
};

VerticalSlideShow.prototype.next = function(){
	if(this.active_index < this.slides.length-1){
		this.active_index++;
	}else{
		this.active_index = 0;
	}
	this.updateSlides('next');
};
/*
VerticalSlideShow.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
	}else{
		this.active_index = this.slides.length-1;
	}
	this.updateSlides('prev');
};

VerticalSlideShow.prototype.transition = function( dir ){
	var self = this;
	this.transitioning = true; //prevents user from going through slides too fast
	
	//this.currentFader.style.opacity = 1;
	//self.currentFader.style.top = self.viewHeight+ 'px';
	
	var twoTimes = 0;
	this.currentFader.addEventListener('webkitTransitionEnd', function( e ) {
		self.transitioning = false;
		twoTimes ++;
		console.log('transition end',twoTimes);
		if(twoTimes >= 2){
			
			self.currentFader.removeEventListener('webkitTransitionEnd', this , false);
			
			twoTimes = 0;
		}else{
			//first time through
			self.currentFader.style.top = self.viewHeight+ 'px';
			self.updateSlides(dir);
		}
		
	}, false );
};
VerticalSlideShow.prototype.updateSlides = function( dir ){
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
				//this.previousSlide.style.top  =  this.viewHeight+'px';
			}
			//this.previousFader = this.previousSlide.getElementsByClassName('fader')[0];
			
			
			
			//set current
			this.currentSlide = this.slides[i];
			this.currentFader = this.currentSlide.getElementsByClassName('fader')[0];
			
			
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
				//move next slide stage right
				this.nextSlide.style.zIndex = 0;
				//this.nextSlide.style.top  =  -this.viewHeight+'px';
			}
			//this.nextFader = this.nextSlide.getElementsByClassName('fader')[0];
			//this.nextFader.style.top = 0;


			this.transitioning = true; //prevents user from going through slides too fast
			this.currentSlide.style.zIndex = 2;
			//this.currentSlide.style.top = 0;//this.viewHeight+'px';
			
			
			
			this.currentSlide.addEventListener('webkitTransitionEnd', function( e ) {
				self.transitioning = false;
				//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
			}, false );

		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].style.zIndex = 0;
			//this.slides[i].style.top  =  this.viewHeight+'px';
			//var fader = this.slides[i].getElementsByClassName('fader')[0];
			//fader.style.opacity = 1;
			
		}else{
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){

				this.slides[i].style.zIndex = 0;
				//this.slides[i].style.top  =  -this.viewHeight+'px';
			}
		}
	}

};
*/
VerticalSlideShow.prototype.updateSlides = function( dir ){
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
				//this.previousSlide.style.top  =  this.viewHeight+'px';
			}
			//this.previousFader = this.previousSlide.getElementsByClassName('fader')[0];
			
			
			
			//set current
			this.currentSlide = this.slides[i];
			this.currentFader = this.currentSlide.getElementsByClassName('fader')[0];
			
			
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
				//move next slide stage right
				this.nextSlide.style.zIndex = 0;
				//this.nextSlide.style.top  =  -this.viewHeight+'px';
			}
			//this.nextFader = this.nextSlide.getElementsByClassName('fader')[0];
			//this.nextFader.style.top = 0;


			this.transitioning = true; //prevents user from going through slides too fast
			this.currentSlide.style.zIndex = 2;
			this.currentSlide.style.height = this.viewHeight+'px';
			this.currentFader.style.opacity = 0
			
			
			this.currentSlide.addEventListener('webkitTransitionEnd', function( e ) {
				self.transitioning = false;
				//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
			}, false );

		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].style.zIndex = 0;
			//this.slides[i].style.top  =  this.viewHeight+'px';
			var fader = this.slides[i].getElementsByClassName('fader')[0];
			fader.style.opacity = 1;
			
		}else{
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){

				this.slides[i].style.zIndex = 0;
				//this.slides[i].style.top  =  -this.viewHeight+'px';
				var fader = this.slides[i].getElementsByClassName('fader')[0];
				fader.style.opacity = 1;
			}
			
		}
	}

};



