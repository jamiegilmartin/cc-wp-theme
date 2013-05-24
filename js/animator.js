var Slide = window.Slide || {};
 
/**
 * @class Slide 
 * @description contains animation code for each slide
 * @param slide - a Slide
 */

Slide =  function( slide ){
	this.header = slide.getElementsByTagName('header')[0];
	this.content = this.header.getElementsByClassName('content')[0];
		
	this.bgObject = this.content.getElementsByClassName('svg');
	this.character = this.content.getElementsByClassName('character')[0];
	
	this.animationObject = [];
	for(var i=0;i<this.bgObject.length;i++){
		var obj = {};
		obj.ele = this.bgObject[i];
		obj.top = this.bgObject[i].offsetTop;
		obj.left = this.bgObject[i].offsetLeft;
		
		//console.log(obj.ele,obj.top,obj.left);
		
		this.animationObject.push(obj);
	}
};
Slide.prototype.start = function(){
	var self = this,
		now = Date.now();


	this.startTime = now;
	this.then = now;

	this.secondsRunning = 0;
	this.duration = 1;
	this.fps = 10;//24;
	this.fpsInterval = 1000 / this.fps;
	this.delta;
	this.frame = 0;


	//animate
	this.playing = true;
	this.interval = 0;
	this.animate();
};
Slide.prototype.stop = function(){
	this.playing = false;
};
Slide.prototype.animate = function(lastTime){
	var self = this,
		now = Date.now(), //new Date().getTime();
		deltaTime = now - ( lastTime || now);

	this.delta = now - this.then;

	//http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
	//http://creativejs.com/resources/requestanimationframe/
	if( this.delta > this.fpsInterval){
		this.then = now - (this.delta % this.fpsInterval);

		this.draw();
		this.frame ++;

		//console.log(this.frame + ' /' + Math.floor((this.then - this.startTime)/1000)+'s === ' + parseInt(this.frame/((this.then - this.startTime)/1000))+'fps');


	}

	//time in seconds
	this.secondsRunning = (now - this.startTime) / 1000;

	this.interval++;
	
	
	
	//this.bgObject[0].style.left = this.interval + 'px';

	//this.obj.style.left = -1* this.interval* 3+ 'px';




	//request new frame
	requestAnimFrame(function(){
		if(self.playing){ // && self.secondsRunning < (self.duration)
			self.animate( now );
		}else{
			self.playing = false;
		}
	});
};
Slide.prototype.draw = function(){
	for(var i=0;i<this.animationObject.length;i++){
		var obj = this.animationObject[i];
		
		obj.ele.style.top = obj.top + this.frame*1 + 'px';
		obj.ele.style.left = obj.left - this.frame*10 + 'px';
		//console.log(obj.ele, obj.ele.style.left)
	}
};