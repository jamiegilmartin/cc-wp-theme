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
	this.nextBtn = nextBtn;
	
	this.imgArr = [];
	for(var i=0;i<this.slides.length;i++){
		this.imgArr.push(this.slides[i].getElementsByTagName('img')[0]);
	}
	
	
	this.active_index = 0;
	
	

	this.resize();
	this.updateSlides();
	this.events();
	
	this.scrollorama();

};
HomeSlideShow.prototype.resize = function(){
	var self = this;
	var arr = this.slides.concat(this.imgArr);
	arr.push(this.view);
	
	function resizeElements( elementsToResize ){
		this.windowHeight = window.innerHeight,
		this.windowWidth = window.innerWidth;

		function isImage(i) {
			return i instanceof HTMLImageElement;
		}
		//resize elements
		for(var i=0;i<elementsToResize.length;i++){
			var oldW,
				oldH;
			if(isImage(elementsToResize[i])){
				oldH = elementsToResize[i].offsetHeight;
				oldW = elementsToResize[i].offsetWidth;

				elementsToResize[i].style.width = (oldW*this.windowHeight)/oldH + 'px';
			}
			elementsToResize[i].style.height = this.windowHeight + 'px';
		}
	};
	resizeElements(arr);
	
	this.viewWidth = this.view.offsetWidth;
	this.viewHeight = this.view.offsetHeight;
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
		//if(self.transitioning === false)
		self.next();
	}, false);
	
	window.onresize = function(e){
		self.resize();
	};
		
		/*
	window.onscroll = function(e){
		e.preventDefault();
		e.returnValue=false;
		
		console.log(window.pageXOffset + " " + window.pageYOffset + ' '+ document.body.scrollTop + ' ' +(self.viewHeight-window.innerHeight) );
		
		if( window.pageYOffset > window.innerHeight){
			console.log('scroll end')
		}
	}

	//scrolling
	if(window.addEventListener){
	    window.addEventListener('DOMMouseScroll',wheel,false);
	}
	function wheel(e){
		e.preventDefault();
		e.returnValue=false;
		console.log(window.pageXOffset + " " + window.pageYOffset + ' '+ document.body.scrollTop + ' ' +(self.viewHeight-window.innerHeight) );
	}
	window.onmousewheel=document.onmousewheel=wheel;
	
	//onscroll
	window.onscroll = function(e){
		//console.log(window.pageXOffset + " " + window.pageYOffset + ' '+ document.body.scrollTop + ' ' +(self.viewHeight-window.innerHeight) );

		if( window.pageYOffset > window.innerHeight){
			console.log('scroll end')
		}
	}
	*/
	

	
};

HomeSlideShow.prototype.scrollorama = function(){
	//scrollorama
	var self = this,
		controller = $.superscrollorama();

	/*
	controller.addTween('.cc-home ul li', 
	  TweenMax.from($(self.currentSlide),0,{
	    css:{opacity:1}, 
	    onComplete: function(){alert('test')}
	  }));

	controller.addTween(
		  '.cc-home ul li',
		  (new TimelineLite())
		    .append([
		      TweenMax.fromTo($(self.currentSlide).find('.fader'), 1, 
		        {css:{opacity: 0},immediateRender:true }, 
		        {css:{opacity: 1}}),
		      // TweenMax.fromTo($(self.currentSlide).find('.fader'), 1, 
		      // 		        {css:{top: 500}, 
		      // 		        {css:{top: -1250}})
		    ]),
		  .5 // scroll duration of tween
		);
	*/
	controller.pin($(self.view), 0,{
		anim : (new TimelineLite())
		.append(
			TweenMax.fromTo($(self.currentSlide), .5, 
			{css:{opacity: 0, height: 0}, immediateRender:true,ease:Quad.easeOut}, 
			{css:{opacity: 1, height: $(self.currentSlide).height() },
			onComplete: function(){
				console.log('end');
				//controller.removePin($(self.view), true)
				self.next();
			}}),
			700
		)
	});
	
};

HomeSlideShow.prototype.next = function(){
	if(this.active_index < this.slides.length-1){
		this.active_index++;
	}else{
		this.active_index = 0;
	}
	this.updateSlides('next');
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
				this.previousSlide.style.zIndex = 0;
				//this.previousSlide.style.top  =  this.viewHeight+'px';
			}
			//this.previousFader = this.previousSlide.getElementsByClassName('fader')[0];
			
			
			
			//set current
			this.currentSlide = this.slides[i];
			this.currentSlide.classList.add('c')
			//this.currentFader = this.currentSlide.getElementsByClassName('fader')[0];
			
			
			
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
			//this.currentSlide.style.height = this.viewHeight+'px';
			//this.currentFader.style.opacity = 0
			
			
			var transitionEnd = whichTransitionEvent();
			if(transitionEnd){
				this.currentSlide.addEventListener(transitionEnd, function( e ) {
					self.transitioning = false;
					//TODO: self.currentSlide.removeEventListener('webkitTransitionEnd', this , false);
				}, false );
			}else{
				self.transitioning = false;
			}

		}else if(i < this.active_index ){
			//slide is less than active, move stage left
			this.slides[i].style.zIndex = 0;
			this.slides[i].classList.remove('c')
			//this.slides[i].style.top  =  this.viewHeight+'px';
			//var fader = this.slides[i].getElementsByClassName('fader')[0];
			//fader.style.opacity = 1;
			
		}else{
			this.slides[i].classList.remove('c')
			//slide is greater than active, move stage right
			if(this.slides[i] !== this.previousSlide){

				this.slides[i].style.zIndex = 0;
				//this.slides[i].style.top  =  -this.viewHeight+'px';
				//var fader = this.slides[i].getElementsByClassName('fader')[0];
				//fader.style.opacity = 1;
			}
			
		}
	}

};


