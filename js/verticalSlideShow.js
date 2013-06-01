var VerticalSlideShow = window.VerticalSlideShow || {};
 
/**
 * @class VerticalSlideShow 
 * @description a responsive slide show
 * @param view - slide show view port
 * @param slides - slides, array of elements
 * @param nextBtn - next btn
 * @param prevBtn - prev btn
 */

VerticalSlideShow = function(view,  lis, nextBtn, prevBtn){
	var self = this;
	this.view = view;
	//this.slideShow = ul;
	this.slides = lis;
	this.nextBtn = nextBtn;
	//this.prevBtn = prevBtn;

	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	this.active_index = 0;
	
	
	//set slides & make fader
	for(var i=0;i<this.slides.length;i++){
		var fader = document.createElement('div')
		
		
		
		//center and set all negitave top
		this.slides[i].style.left = (this.viewWidth-this.slides[i].offsetWidth)/2+'px';
		//this.slides[i].style.top = -this.viewHeight+'px';
		//this.slides[i].style.height = 0;
		//this.slides[i].style.opacity = 1;
	}
	
	this.updateSlides();

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
		if(self.transitioning === false)
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
VerticalSlideShow.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
	}else{
		this.active_index = this.slides.length-1;
	}
	this.updateSlides('prev');
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
				this.previousSlide.style.top  =  -this.viewHeight+'px';

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
				this.nextSlide.style.top  =  -this.viewHeight+'px';
			}

			this.transitioning = true; //prevents user from going through slides too fast
			this.currentSlide.style.zIndex = 2;
			this.currentSlide.style.top = 0;//this.viewHeight+'px';

			this.currentSlide.addEventListener('webkitTransitionEnd', function( e ) {
				self.transitioning = false;
				//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
			}, false );

		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].style.zIndex = 0;
			this.slides[i].style.top  =  -this.viewHeight+'px';
		
		}else{
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){

				this.slides[i].style.zIndex = 0;
				this.slides[i].style.top  =  -this.viewHeight+'px';
			}
		}
	}

};





