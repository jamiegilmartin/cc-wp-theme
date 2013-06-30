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
	this.setCounter();
};
ScreenSaver.prototype.setCounter = function(){
	var self = this,
		now = Date.now();
		
	this.startTime = now;
	this.then = now;

	this.milliSecondsRunning = 0;
	this.duration = 1;


	//animate
	this.playing = true;
	this.interval = 0;
	this.count();
	this.events();

};
ScreenSaver.prototype.events = function(){
	var self = this;
	window.onresize = function(e){
		self.resize();
	}
	this.doc.addEventListener('click',function(e){
	//self.moved = true;
		self.stop();
	});
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
	this.view.display = 'block';

};
ScreenSaver.prototype.stop = function(){
	console.log('stop screen saver');
	this.doc.style.overflow = 'auto';
	this.doc.style.height = 'auto';
	this.view.display = 'none';
	
	this.count();
};
ScreenSaver.prototype.count = function(lastTime){
	var self = this,
		now = Date.now(), //new Date().getTime();
		deltaTime = now - ( lastTime || now);

	this.delta = now - this.then;
	
	
	//time in seconds
	this.milliSecondsRunning = (now - this.startTime);
	
	console.log(this.milliSecondsRun)
	this.interval++;
	//console.log(this.moved,this.milliSecondsRunning);
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
			self.count( now );
		}else{
			self.playing = false;
		}
	});
};
