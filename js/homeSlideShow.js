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
	this.slideHeights = [];
	this.imgArr = [];
	this.nextBtn = nextBtn;
	this.active_index = 0;
	this.reverse = false;
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
	
	

	for(var i=0;i<this.slides.length;i++){
		this.slideHeights.push(this.slides[i].offsetHeight);
		this.imgArr.push(this.slides[i].getElementsByTagName('img')[0]);
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
		scrollInterval = 0;
		
		
	window.addEventListener('scroll',function(e){
		offsetHeight  = document.documentElement.offsetHeight || document.body.offsetHeight;
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		scrollHeight  = document.documentElement.scrollHeight || document.body.scrollHeight;
		clientHeight  = document.documentElement.clientHeight || document.body.clientHeight;
		position = scrollTop;
		max = scrollHeight - clientHeight;
		percentScrolled = position / max;
		scrollInterval = max / self.slides.length;
			
		//console.log(offsetHeight,scrollTop,scrollHeight,clientHeight);
		//console.log(position, max, percent, (percentScrolled / self.slides.length));
		console.log(percentScrolled)
		
		for(var i = 0;i<self.slides.length;i++){
			
			if(!self.reverse && scrollTop > scrollInterval*i){
				//nextScroll = nextScroll < i ? i : nextScroll;
				if(nextScroll < i){
					nextScroll = i;
					self.active_index = nextScroll;
					console.log(nextScroll);
					self.updateSlides();
				}else{
					nextScroll = nextScroll;
				}
			
			}//else if(self.reverse && )
		}
		
		
		if(percentScrolled === 0 ){
			self.reverse = false;
		}
		if(percentScrolled > 1){
			//hit the end unfix
			self.slideShow.style.position = 'relative';
			
			self.reverse = true;
		}else{
			self.slideShow.style.position = 'fixed';
		}
	});
	
	this.nextBtn.addEventListener('click', function(){
		if(self.transitioning === false)
		self.next();
	}, false);
	
};
HomeSlideShow.prototype.scrollAnimation = function(){
	var self = this,
		lastScroll;
	window.onscroll = function (oEvent) {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//window.scrollTo(0,100);
		//self.currentSlide.style.position = 'fixed';
		
		
		//console.log(self.doc.offsetHeight )
		
		if(self.reverse === false && scrollTop > self.currentScrollTop ){
			self.next();
			self.currentScrollTop += self.scrollTopDif;
		
			if(self.currentScrollTop === self.scrollTopDif*self.slides.length){
				self.reverse = true;
			}
			
		}else if(self.reverse === true && scrollTop <  100 ){ //self.currentScrollTop-self.scrollTopDif
			self.prev();
			self.currentScrollTop -= self.scrollTopDif;
			console.log('p ',self.currentScrollTop)
			
			if(self.currentScrollTop === 0){
				self.reverse = false;
			}
		}
		
		lastScroll = scrollTop;
	}
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

	for(var i=0;i<this.slides.length;i++){
		
		if(i === this.active_index ){
			
			//set prev slide
			if(this.active_index-1 >= 0){
				this.previousSlide = this.slides[this.active_index-1];
			}else{
				//on first slide
				this.previousSlide = this.slides[this.slides.length-1];
			}
			this.previousSlide.classList.add('p');
			
			
			//set current
			this.currentSlide = this.slides[i];
			//this.currentSlide.style.height = this.slideHeights[i] + 'px';
			this.currentSlide.classList.add('c');
			this.currentFader = this.currentSlide.getElementsByClassName('fader')[0];
			//this.currentFader.style.opacity = 0;
			
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
			}
			this.nextFader = this.nextSlide.getElementsByClassName('fader')[0];
			this.nextSlide.classList.add('n')


			this.transitioning = true; //prevents user from going through slides too fast
			//this.currentSlide.style.zIndex = 2;
			//this.currentSlide.style.height = this.viewHeight+'px';

			
			
			var transitionEnd = whichTransitionEvent();
			if(transitionEnd){
				this.currentSlide.addEventListener(transitionEnd, function( e ) {
					self.transitioning = false;
					//console.log('t e')
					//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
				}, false );
			}else{
				self.transitioning = false;
			}
			
		}else if(i < this.active_index ){
			//slide is less than active
			this.slides[i].classList.remove('c');
			//this.slides[i].classList.add('transitioning');
			//this.slides[i].style.top  =  this.viewHeight+'px';
			//var fader = this.slides[i].getElementsByClassName('fader')[0];
			//fader.style.opacity = 1;
			
		}else{
			//this.slides[i].style.height = 0;
			this.slides[i].classList.remove('c');
			//this.slides[i].classList.add('transitioning');
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){
				
				//this.slides[i].style.zIndex = 0;
				//this.slides[i].style.top  =  -this.viewHeight+'px';
				//this.slides[i].getElementsByClassName('fader')[0].style.opacity = 1;
				//fader
			}
			
		}
		*/
	}
};

/**
 * @class HomeSlideShowSlide 
 */
HomeSlideShowSlide = function(){
	
}
/*
HomeSlideShow.prototype.updateSlides = function( dir ){
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
				//this.previousSlide.style.zIndex = 0;
				//this.previousSlide.style.top  =  this.viewHeight+'px';
			}
			//this.previousFader = this.previousSlide.getElementsByClassName('fader')[0];
			
			
			
			//set current
			this.currentSlide = this.slides[i];
			this.currentSlide.style.height = this.slideHeights[i] + 'px';
			this.currentSlide.classList.add('c');
			this.currentFader = this.currentSlide.getElementsByClassName('fader')[0];
			this.currentFader.style.opacity = 0;
			
			
			//set next slide
			if(this.active_index+1 <= this.slides.length-1){
				this.nextSlide = this.slides[this.active_index+1];
			}else{
				//on last slide
				this.nextSlide = this.slides[0];
				//move next slide stage right
				//this.nextSlide.style.zIndex = 0;
				//this.nextSlide.style.top  =  -this.viewHeight+'px';
			}
			this.nextFader = this.nextSlide.getElementsByClassName('fader')[0];
			//this.nextFader.style.opacity = 0;


			this.transitioning = true; //prevents user from going through slides too fast
			//this.currentSlide.style.zIndex = 2;
			//this.currentSlide.style.height = this.viewHeight+'px';

			
			
			var transitionEnd = whichTransitionEvent();
			if(transitionEnd){
				this.currentSlide.addEventListener(transitionEnd, function( e ) {
					self.transitioning = false;
					//console.log('t e')
					//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
				}, false );
			}else{
				self.transitioning = false;
			}
			
		}else if(i < this.active_index ){
			//slide is less than active
			//this.slides[i].style.height = 0;
			//this.slides[i].style.zIndex = 0;
			this.slides[i].classList.remove('c');
			this.slides[i].classList.add('transitioning');
			//this.slides[i].style.top  =  this.viewHeight+'px';
			//var fader = this.slides[i].getElementsByClassName('fader')[0];
			//fader.style.opacity = 1;
			
		}else{
			this.slides[i].style.height = 0;
			this.slides[i].classList.remove('c');
			this.slides[i].classList.add('transitioning');
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){
				
				//this.slides[i].style.zIndex = 0;
				//this.slides[i].style.top  =  -this.viewHeight+'px';
				this.slides[i].getElementsByClassName('fader')[0].style.opacity = 1;
				//fader
			}
			
		}
	}

};




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
/*
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
	//console.log(deltaY)

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
*/