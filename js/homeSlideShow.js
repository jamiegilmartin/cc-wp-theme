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
	
	console.log(this.viewHeight)
	
	for(var i=0;i<this.slides.length;i++){
		this.slideHeights.push(this.slides[i].offsetHeight);
		this.imgArr.push(this.slides[i].getElementsByTagName('img')[0]);
	}

	
	this.updateSlides();
	this.events();
	
	this.customScrollAnimations();
};
HomeSlideShow.prototype.events = function(){
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
		if(self.transitioning === false)
		self.next();
	}, false);
	
	
};
HomeSlideShow.prototype.customScrollAnimations = function(){
	var self = this;
	/*jquery scroll stuff*/
	//$(window).scrollTop(0);
	var leftToScroll = self.slides.length;
	$(window).scroll(function(e){
		//console.log('scrolling ',e,$(window).height()-$(document).scrollTop(),$(document).scrollTop())
		/*TweenLite.fromTo($(self.nextSlide), $(document).scrollTop(), 
			{css:{top:0,height:0}, ease:Quad.easeOut},
			{css:{top:0,height:$(self.currentSlide).height()}, ease:Quad.easeOut}
		);*/
		//console.log($(document).scrollTop(),$(window).height())
		
		for(var i=0;i<self.slides.length;i++){
			if($(document).scrollTop() > $(window).height() / i+1){
				//leftToScroll = leftToScroll-1;
				//console.log('i+1',i,$(window).height() / i+1)
				//console.log('this.slides.length' , self.slides.length,leftToScroll)
			}
		}
	});
	
	
	
};
HomeSlideShow.prototype.animate = function(){
	
};


HomeSlideShow.prototype.scrollorama = function(){
	//scrollorama
	var self = this,
		controller = $.superscrollorama(),
		update = 0,
		last = false,
		animation = (new TimelineLite())
			.append([
				TweenMax.fromTo($(self.nextSlide), 1.5, 
					{css:{top:0,height:0}, ease:Quad.easeOut}, 
					{css:{top:0,height:$(self.currentSlide).height()},
					onUpdate: function(){
						update++;
						//console.log(update)
					},
					onComplete: function(){
						console.log('end');
						//controller.removePin($(self.view), true)
						//self.next();
						//self.scrollorama();
					}
				}),
				TweenMax.fromTo($(self.nextSlide).find('.fader'), 1.5, 
					{css:{opacity:1}, ease:Quad.easeOut}, 
					{css:{opacity:0},
					onUpdate: function(){
						//update++;
						//console.log(update)
					},
					onComplete: function(){
						//console.log('end');
						//controller.removePin($(self.view), true)
						//self.next();
						//self.scrollorama();
					}
				})
			]);
	
	
	//$('.cc-home ul.slideList li')
	/*
	controller.addTween(
		'.cc-home ul.slideList li',
		animation,
		1000// scroll duration of tween
	);*/
	controller.pin(
		$('.slideList'),//ele
		$(window).height() / (self.slides.length + 1),//duration
		{anim : animation,
			onPin: function() {
				
				if(self.active_index >= self.slides.length - 2){
					last = true;
					console.log('on pin last')
					//self.view.style.height = self.currentSlide.offsetHeight + 'px';
					
				}
			}, 
			onUnpin: function() {
				console.log('un pin',self.currentSlide,self.active_index)
				if(last){
					//stay pinned
					//controller.removePin('.slideList', false);
					console.log('endndndnd');
					self.reverse = true;
				}else{
					if(self.reverse){
						self.prev();
					}else{
						self.next();
					}
					
					//self.scrollorama();
				}
			}//,
			//pushFollowers: false
		}
	);
	/*
	controller.pin($(self.currentSlide), $(window).height(),
		{
			anim : (new TimelineLite())
			.append(
				TweenMax.fromTo($(self.nextSlide), .5, 
				{css:{height:0}, ease:Quad.easeOut}, 
				{css:{height:$(self.currentSlide).height()},
				onUpdate: function(){
					//update++;
					//console.log(update)
				},
				onComplete: function(){
					console.log('end');
					//controller.removePin($(self.view), true)
					//self.next();
					//self.scrollorama();
				}})
			)
			.append(
				TweenMax.fromTo($(self.nextSlide).find('.fader'), .5, 
				{css:{opacity: 0.5}, ease:Quad.easeOut}, 
				{css:{opacity: 0},
				onUpdate: function(){
					//update++;
					//console.log(update)
				},
				onComplete: function(){
					console.log('end');
					//controller.removePin($(self.view), true)
					//self.next();
					//self.scrollorama();
				}})
			),
			onPin: function() {
				console.log('on pin')
			}, 
			onUnpin: function() {
				console.log('un pin')
				self.next();
				self.scrollorama();
			}
		}
	);*/
};

HomeSlideShow.prototype.next = function(){
	if(this.reverse === false && this.active_index < this.slides.length-1){
		this.active_index++;
		
		this.updateSlides('next');
	}else{
		this.reverse = true;
		console.log('go prev, last ')
		//this.active_index = 0;
		this.prev();
	}
};
HomeSlideShow.prototype.prev = function(){
	if(this.active_index > 0){
		this.active_index--;
		
		this.updateSlides('prev');
	}else{
		this.reverse = false;
		//this.active_index = this.slides.length-1;
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
					console.log('t e')
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



