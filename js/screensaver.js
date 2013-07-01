var ScreenSaver = window.ScreenSaver || {};
 
/**
 * @class ScreenSaver 
 * @description contains animation code for each ScreenSaver
 * @param ScreenSaver - a ScreenSaver
 */
ScreenSaver =  function(){
	var self = this;
	
	this.doc = document.documentElement || document.body;
	this.view = document.createElement('div');
	this.clock = document.createElement('div');
	this.moved = false
	this.interval = 0;
		
	this.view.classList.add('screensaver');
	this.clock.classList.add('clock');
	this.clock.setAttribute('id','clock');
	
	this.hasBeenStarted = false;
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
	
	Saver.startTime = now;
	Saver.count( now );
	this.events();
};
ScreenSaver.prototype.events = function(){
	var self = this;
	window.onresize = function(e){
		self.resize();
	}
	this.doc.addEventListener('click',function(e){
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
	window.scrollTo(0,0);
	this.playing = false;
	this.doc.style.overflow = 'hidden';
	this.doc.appendChild(this.view);
	this.view.style.height = this.doc.offsetHeight + 'px';
	this.view.appendChild(this.clock);
	this.hasBeenStarted = true;
	
	
	Saver.setClock('clock');
	
	this.view.display = 'block';

};
ScreenSaver.prototype.stop = function(){
	if(this.hasBeenStarted === true){
		this.doc.style.overflow = 'auto';
		this.doc.style.height = 'auto';
		this.doc.removeChild(this.view);
	}
	clearTimeout(Saver.timer);
	var now = Date.now()
	Saver.startTime = now;
	Saver.count( Saver.startTime );
};


Saver = {};
Saver.delay = 1000;// 300000;
/**
 * count
 */
Saver.init = function(){
	
	this.screensaver = new ScreenSaver();
};

Saver.count = function(lastTime){
	var now = Date.now();
	console.log(lastTime - Saver.startTime )
	if( (lastTime - Saver.startTime ) >  Saver.delay){
		this.screensaver.start();
	}
	Saver.timer = setTimeout('Saver.count("'+Date.now()+'");','5000');
}
/**
 * clock
 */
Saver.setClock = function( id ){
	var date = new Date,
		year = date.getFullYear(),
		month = date.getMonth(),
		months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'),
		d = date.getDate(),
		day = date.getDay(),
		days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
		h = date.getHours();
		if(h<10){
			h = "0"+h;
		}
		m = date.getMinutes();
		if(m<10){
			m = "0"+m;
		}
		s = date.getSeconds();
		if(s<10){
			s = "0"+s;
		}
		//result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
		if(document.getElementById(id))
		document.getElementById(id).innerHTML = h+':'+m;
		
	setTimeout('Saver.setClock("'+id+'");','1000');
	return true;
}