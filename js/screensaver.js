var ScreenSaver = window.ScreenSaver || {};
 
/**
 * @class ScreenSaver 
 * @description contains animation code for each ScreenSaver
 * @param ScreenSaver - a ScreenSaver
 */
ScreenSaver =  function(delay){
	var self = this,
		doc = document.documentElement || document.body;
		view = document.createElement('div'),
		moved = false,
		interval = 0;
		
	view.classList.add('screensaver');
	doc.appendChild(view);
	
	this.delay = delay;
	this.start();
};
ScreenSaver.prototype.start = function(){
	var self = this,
		now = Date.now();
		
	this.startTime = now;
	this.then = now;

	this.secondsRunning = 0;
	this.duration = 1;


	//animate
	this.playing = true;
	this.interval = 0;
	this.animate();
};
ScreenSaver.prototype.stop = function(){
	this.playing = false;
};
ScreenSaver.prototype.animate = function(lastTime){
	var self = this,
		now = Date.now(), //new Date().getTime();
		deltaTime = now - ( lastTime || now);

	this.delta = now - this.then;

	//time in seconds
	this.milliSecondsRunning = (now - this.startTime);
	this.interval++;

	if(this.milliSecondsRunning > this.delay){
		console.log('sss',this.milliSecondsRunning)
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