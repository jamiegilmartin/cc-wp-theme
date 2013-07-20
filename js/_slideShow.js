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
	
	this.over = false;
	this.overLeftSide = false;
	//console.log(this.viewWidth ,this.viewHeight )
	this.indicatorOn = true;
	this.transitioning = false;
	this.active_index = 0;
	
	//hide next and prev
	//this.nextBtn.style.opacity = 0
	//this.prevBtn.style.opacity = 0;
	
	//indicator
	this.indicator = document.createElement('div');
	this.indicator.classList.add('indicator');
	this.indicator.innerHTML = '1 of '+this.slides.length;
	this.view.appendChild(this.indicator);
	
	this.updateSlides();
	//set agian for ff
	this.transitioning = false;
	
	this.events();
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
	
	/*
	//hide show next and prev
	this.slideShow.addEventListener('mouseover', function(e){
		self.over = true;
		self.showButtons();
	}, false);
	this.slideShow.addEventListener('mousemove', function(e){
		if(self.over === true){
			var x = e.offsetX==undefined?e.layerX:e.offsetX;
			var y = e.offsetY==undefined?e.layerY:e.offsetY;
			
			if(x > this.offsetWidth/2){
				self.overLeftSide = false;
			}else{
				self.overLeftSide = true;
			}
			self.showButtons();
		}
	}, false);
	this.slideShow.addEventListener('mouseout', function(e){
		self.over = false;
		self.hideButtons();
	}, false);
	
	//next and prev over and out
	
	this.nextBtn.addEventListener('mouseover', function(){
		self.over = true;
		self.overLeftSide = false;
		self.showButtons();
	}, false);
	this.prevBtn.addEventListener('mouseover', function(){
		self.over = true;
		self.overLeftSide = true;
		self.showButtons();
	}, false);
	this.nextBtn.addEventListener('mouseout', function(){
		self.over = false;
		self.hideButtons()
	}, false);
	this.prevBtn.addEventListener('mouseout', function(){
		self.over = false;
		self.hideButtons()
	}, false);
	*/
	
	//next and prev click
	this.nextBtn.addEventListener('click', function(){
		//console.log(self.transitioning)
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
/*
SlideShow.prototype.showButtons = function(){
	if(this.overLeftSide===true){
		this.prevBtn.style.opacity = 1;
		this.nextBtn.style.opacity = 0;
	}else{
		this.nextBtn.style.opacity = 1;
		this.prevBtn.style.opacity = 0;
	}
	
};
SlideShow.prototype.hideButtons = function(){
	var self = this;
	
	function hide(){
		if(self.over === false){
			self.nextBtn.style.opacity = 0;
			self.prevBtn.style.opacity = 0;
		}
	}
	setTimeout(hide,1000);
};
*/

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
	this.active_index = num-1;
	this.updateSlides();
	if(this.indicatorOn)
	this.indicator.style.display = 'block';
	
};
SlideShow.prototype.close = function(){
	this.indicator.style.display = 'none';
	this.first = true;
};
SlideShow.prototype.updateSlides = function( dir ){
	var self = this;
	for(var i=0;i<this.slides.length;i++){
		//add transitioning class
		//this.slides[i].classList.remove('transitioning');
		
		if(i === this.active_index ){
			//set prev slide
			if(this.active_index-1 >= 0){
				this.previousSlide = this.slides[this.active_index-1];
				this.previousSlide.classList.add('transitioning');
			}else{
				//on first slide
				this.previousSlide = this.slides[this.slides.length-1];
				//move previous slide stage left
				if(dir === 'next'){
					this.previousSlide.classList.add('transitioning');
				}else{
					this.previousSlide.classList.remove('transitioning');
				}
				this.previousSlide.style.zIndex = 0;
				this.previousSlide.style.left  =  -this.viewWidth+'px';
				
			}
			
			//set current
			//console.log(i,this.slides[i],this.active_index)
			this.currentSlide = this.slides[i];
			this.currentSlide.classList.add('currentSlide');
			this.currentSlide.classList.add('transitioning');

			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
				//move next slide stage right
				
				this.nextSlide.classList.remove('transitioning');
				this.nextSlide.style.zIndex = 0;
				this.nextSlide.style.left  =  this.viewWidth+'px';
			}
			
			
			this.transitioning = true; //prevents user from going through slides too fast
			this.currentSlide.style.zIndex = 2;
			this.currentSlide.style.left = 0;
			
			
			var transitionEnd = whichTransitionEvent();
			if(transitionEnd){
				this.currentSlide.addEventListener(transitionEnd, function( e ) {
					//set transitioning false so next can click
					self.transitioning = false;
					//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
				}, false );
			}else{
				self.transitioning = false;
			}
			
		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].classList.remove('currentSlide');
			this.slides[i].classList.remove('transitioning');
			
			this.slides[i].style.zIndex = 0;
			this.slides[i].style.left = -this.viewWidth+'px';
			
		}else{
			this.slides[i].classList.remove('currentSlide');
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){
				this.slides[i].classList.remove('transitioning');
				
				this.slides[i].style.zIndex = 0;
				this.slides[i].style.left = this.viewWidth+'px';
			}
		}
	}
	
	
	//update indicator
	this.indicator.innerHTML = (this.active_index+1) +' of '+this.slides.length;
	//set indicator top
	var img  = this.slides[this.active_index].getElementsByTagName('img')[0];
	this.indicator.style.top = img.offsetHeight+10+'px';
};





