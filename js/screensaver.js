var ScreenSaver = window.ScreenSaver || {};
 
/**
 * @class ScreenSaver 
 * @description contains animation code for each ScreenSaver
 * @param ScreenSaver - a ScreenSaver
 */
ScreenSaver =  function(delay){
	var self = this;
		
	this.doc = document.documentElement || document.body;
	this.view = document.createElement('div');
	this.moved = false
	this.interval = 0;
		
	this.view.classList.add('screensaver');
	this.doc.appendChild(this.view);
	
	this.delay = delay;
	this.set();
};
ScreenSaver.prototype.set = function(){
	var self = this,
		now = Date.now();
		
	this.startTime = now;
	this.then = now;

	this.milliSecondsRunning = 0;
	this.duration = 1;


	//animate
	this.playing = true;
	this.interval = 0;
	this.animate();
	this.events();

};
ScreenSaver.prototype.events = function(){
	var self = this;
	window.onresize = function(e){
		self.resize();
	}
	window.onClick = function(){
		//sssself.moved = true;
	}
};
ScreenSaver.prototype.resize = function(){
	this.windowHeight = window.innerHeight;
	this.windowWidth = window.innerWidth;
			
	this.doc.style.height = this.windowHeight +'px';
	this.doc.style.width = this.windowWidth + 'px';
	this.view.style.width = this.windowWidth + 'px';			
	this.view.style.height = this.windowHeight + 'px';
			
};
ScreenSaver.prototype.start = function(){
	console.log('start screen saver');
	this.playing = false;
	this.resize();
	this.doc.style.overflow = 'hidden';
	this.view.classList.add('activateScreenSaver');
			
};
ScreenSaver.prototype.stop = function(){

	this.doc.style.overflow = 'hidden';
	this.view.classList.remove('activateScreenSaver');
	this.animate();
};
ScreenSaver.prototype.animate = function(lastTime){
	var self = this,
		now = Date.now(), //new Date().getTime();
		deltaTime = now - ( lastTime || now);

	this.delta = now - this.then;

	//time in seconds
	this.milliSecondsRunning = (now - this.startTime);
	this.interval++;
	console.log(this.moved,this.milliSecondsRunning);
	if(this.moved === true){
		console.log('mooove');
		this.startTime = now;
		//this.stop();
	}
	if(this.milliSecondsRunning > this.delay){
		console.log('sss',this.milliSecondsRunning)
		this.start();
		this.startTime = now;
	}

	//request new frame
	requestAnimFrame(function(){
		if(self.playing){ // && self.secondsRunning < (self.duration)
			self.animate( now );
		}else{
			self.playing = false;
		}
	});
};
