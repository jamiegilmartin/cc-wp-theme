$(document).ready( function() {
	
	
	/* BINDINGS */
	$('.scrollto').live('click', scrollto);
	//$('.open_menu').live('click', open_menu);
	$('.close_menu').live('click', close_menu);
	$('.open_menu').live('mouseenter', open_menu);
	$('#menu .chapters').live('mouseleave', close_menu);
	
	$('.go_next').live('click', scrollto);
	$('.go_previous').live('click', scrollto);
	
	//$('.inverter').live('mouseenter', invert_on);
	//$('.inverter').live('mouseleave', invert_off);
	$('.inverter').live('hover', invert);
	
	$('.activecorner').live('click', activecorner);
	
	
	
	/* MAP */
    var city = new google.maps.LatLng(48.856612,2.334638);
    var markers = [{
    	"latitude": "48.856612",
    	"longitude": "2.334638",
    	"mapmarker": null,
    	"pinimage": ".\/img\/marker_m.png"
    }];
    loadMap(city, markers);
	
	
	
	
	
	/* FITTEXT */
	$("#title").fitText(0.55);
	
	
	/* IMAGE RESIZE & CROP */
	img_fix_all();
	
	
	/* CENETRING HEADLINES */
	$("#title").css('marginTop',($(window).height()-$('#title').height())/2);
	$(".centerheadline").css('marginTop',($(window).height()-300)/2);
	
	/* FIX WINDOW WIDTH */
	$(".windowwidth").css('width',$(window).width());
	$(".windowheight").css('height',$(window).height());
	
	
	/* WINDOW RESIZE */
	$(window).resize(function() {
		$("#title").css('marginTop',($(window).height()-$('#title').height())/2);
		$(".centerheadline").css('marginTop',($(window).height()-300)/2);
	
		$(".windowwidth").css('width',$(window).width());
		$(".windowheight").css('height',$(window).height());
		
		$('#status').html('Width: ' + $(window).width() + '<br />Height: ' + $(window).height());
		
		img_fix_all();
		});
	
	
	
	
	
	/* SCROLLORAMA */
	
	var scrollorama = $.scrollorama({ blocks:'.scrollblock' });
	
	/* DEBUG
	scrollorama.onBlockChange(function() {
		var i = scrollorama.blockIndex;
		$('#console')
			.css('display','block')
			.text('onBlockChange | blockIndex:'+i+' | current block: '+scrollorama.settings.blocks.eq(i).attr('id'));
	});
	*/
	
	// Front paper
	scrollorama.animate('#scroll_frontpaper .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 1, end: 0, baseline: 'bottom', remote: $('#cover #title') });
	scrollorama.animate('#scroll_frontpaper .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#frontpaper') });

	// About, Chapters
	scrollorama.animate('#scroll_about .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#frontpaper .fade') });
	scrollorama.animate('#scroll_about .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#about') });
	
	// Participants Titlepage
	scrollorama.animate('#scroll_titlepage_participants .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#about .fade') });
	scrollorama.animate('#scroll_titlepage_participants .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#titlepage_participants') });
	
	// Participants
	scrollorama.animate('#scroll_participants .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#titlepage_participants .fade') });
	scrollorama.animate('#scroll_participants .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#participants') });
	
	// Participants 2
	scrollorama.animate('#scroll_participants2 .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#participants .fade') });
	scrollorama.animate('#scroll_participants2 .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#participants2') });
	
	// Participants 3
	scrollorama.animate('#scroll_participants3 .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#participants2 .fade') });
	scrollorama.animate('#scroll_participants3 .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#participants3') });
	
	// Lectures Titlepage
	scrollorama.animate('#scroll_titlepage_lectures .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#participants3 .fade') });
	scrollorama.animate('#scroll_titlepage_lectures .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#titlepage_lectures') });
	
	// Lectures
	scrollorama.animate('#scroll_lectures .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#titlepage_lectures .fade') });
	scrollorama.animate('#scroll_lectures .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#lectures') });
	
	// Address Titlepage
	scrollorama.animate('#scroll_titlepage_address .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#lectures .fade') });
	scrollorama.animate('#scroll_titlepage_address .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#titlepage_address') });
	
	// Address, Opening Hours
	scrollorama.animate('#scroll_address .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#titlepage_address .fade') });
	scrollorama.animate('#scroll_address .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#address') });
	
	// Google Maps
	scrollorama.animate('#scroll_googlemaps .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#address .fade') });
	scrollorama.animate('#scroll_googlemaps .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#googlemaps') });
	
	// Information Titlepage
	scrollorama.animate('#scroll_titlepage_information .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#googlemaps .fade') });
	scrollorama.animate('#scroll_titlepage_information .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#titlepage_information') });
	
	// Information, Partners
	scrollorama.animate('#scroll_information .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#titlepage_information .fade') });
	scrollorama.animate('#scroll_information .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#information') });
	
	// Last Page
	scrollorama.animate('#scroll_backcover .action',{ delay: 0, duration: 'windowheight', property:'opacity', start: 0, end: 1, baseline: 'bottom', remote: $('#information .fade') });
	scrollorama.animate('#scroll_backcover .action',{ delay: 0, duration: 'windowheight', property:'width', start: 0, end: 'windowwidth', baseline: 'bottom', remote: $('#backcover') });
	
	
	
});



function scrollto() {
	$('html,body').animate({scrollTop:$(this.hash).offset().top}, 1500);
	close_menu();
	return false;
}



function invert_on() {
	if ($(window).scrollTop() < $(window).height())  {
		$('body').addClass('inverted');
	}
	return false;
}

function invert_off() {
	if ($(window).scrollTop() < $(window).height())  {
		$('body').removeClass('inverted');
	}
	return false;
}


function invert() {
	if ($(window).scrollTop() < $(window).height())  {
		$('body').toggleClass('inverted');
	} else {
		$('body').removeClass('inverted');
	}
	return false;
}


function activecorner() {
	if ($(window).scrollTop() < $(window).height()) {
		$('html,body').animate({scrollTop:$('#scroll_about').offset().top}, 1500);
	} else {
		$('html,body').animate({scrollTop:0}, 1500);
	}
	$('body').removeClass('inverted');
	return false;
}



function open_menu() {
	$('#menu').addClass('active');
	return false;
}

function close_menu() {
	$('#menu').removeClass('active');
	return false;
}






/* IMAGE RESIZING & CROPPING */

function img_remember_size(img) {
    if (!img.originalsize) {
        img.originalsize = {width : img.width, height : img.height};
    }
}

function img_fix(div, img, format) {

    //img_remember_size(img);

    if (format == 'windowwidth') {
    	var targetwidth = $(window).width();
    	var targetheight = $(window).height();
        if (!img.originalsize) {
    	    img.originalsize = {width : '1200', height : '800'};
    	}
    } else {
    	var targetwidth = $(window).width()/2;
    	var targetheight = $(window).height();
        if (!img.originalsize) {
    	    img.originalsize = {width : '600', height : '800'};
    	}
    }
    
    var srcwidth = img.originalsize.width;
    var srcheight = img.originalsize.height;
    var result = ScaleImage(srcwidth, srcheight, targetwidth, targetheight, false);

    //alert(result.targettop);

    img.width = result.width;
    img.height = result.height;
    $(img).css("left", result.targetleft);
    $(img).css("top", result.targettop);
}

function img_fix_all() {
    $("div.centerimage").each(function (index, div) {
        var img = $(div).find("img").get(0);
        if ($(div).hasClass('windowwidth')) {
	        format = 'windowwidth';
        } else {
	        format = 'halfwidth';
        };
        img_fix(div, img, format);
    });
}











/*
	scrollorama - The jQuery plugin for doing cool scrolly stuff
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.
*/

(function($) {
    $.scrollorama = function(options) {
		var scrollorama = this,
			blocks = [],
			browserPrefix = '',
			onBlockChange = function() {},
			latestKnownScrollY = 0,
            ticking = false,
            requestAnimFrame =	window.requestAnimationFrame ||
								window.webkitRequestAnimationFrame ||
								window.mozRequestAnimationFrame    ||
								window.oRequestAnimationFrame      ||
								window.msRequestAnimationFrame     ||
								function( callback ){
									window.setTimeout(callback, 1000 / 60);
								},
			defaults = {offset:0, enablePin: true, enableFix: true};
		
		scrollorama.settings = $.extend({}, defaults, options);
		scrollorama.blockIndex = 0;
		
		if (options.blocks === undefined) { alert('ERROR: Must assign blocks class selector to scrollorama plugin'); }
		
		// PRIVATE FUNCTIONS
		function init() {
			var i, block, didScroll, marginTop = false;
			if (typeof scrollorama.settings.blocks === 'string') { scrollorama.settings.blocks = $(scrollorama.settings.blocks); }
			
			// set browser prefix
			if ($.browser.mozilla) { browserPrefix = '-moz-'; }
			if ($.browser.webkit) { browserPrefix = '-webkit-'; }
			if ($.browser.opera) { browserPrefix = '-o-'; }
			if ($.browser.msie) { browserPrefix = '-ms-'; }
			
			// create blocks array to contain animation props
			$('body').css('position','relative');
			for (i=0; i<scrollorama.settings.blocks.length; i++) {
				block = scrollorama.settings.blocks.eq(i);
				marginTop = block.css('margin-top');
				blocks.push({
					block: block,
					top: block.offset().top - (!Boolean(marginTop) ? parseInt(marginTop, 10) : 0),
					pin: 0,
					fix: 0,
					animations:[]
				});
			}
			
			// convert block elements to absolute position
			if (scrollorama.settings.enablePin.toString() === 'true' || scrollorama.settings.enableFix.toString() === 'true') {
				for (i=0; i<blocks.length; i++) {
					blocks[i].block
						.css('position', 'absolute')
						.css('top', blocks[i].top);
				}
			}
			
			$('body').prepend('<div id="scroll-wrap"></div>');
			
			latestKnownScrollY = 0;
            ticking = false;
            $(window).on( 'scroll.scrollorama', onScroll );
		}

		function onScroll() {
            latestKnownScrollY = window.scrollY;
            requestTick();
        }
        
        function requestTick() {
            if(!ticking) {
                requestAnimFrame(function(){
                    onScrollorama();
                    update();
                });
            }
            ticking = true;
        }
        
        function update() {
            // reset the tick so we can
            // capture the next onScroll
            ticking = false;
        }
		
		function onScrollorama() {
			var scrollTop = $(window).scrollTop(),
			currBlockIndex = getCurrBlockIndex(scrollTop),
			i, j, anim, startAnimPos, endAnimPos, animPercent, animVal;
			
			// update all animations
			for (i=0; i<blocks.length; i++) {
				
				// go through the animations for each block
				if (blocks[i].animations.length) {
					for (j=0; j<blocks[i].animations.length; j++) {
						anim = blocks[i].animations[j];
						
						/*
						$(window).resize(function() {
							if (anim.durationName = 'windowheight') {
								anim.duration = $(window).height();
								console.log('Windowheight!');
								};
							if (anim.endName = 'windowwidth') {
								anim.endVal = $(window).width();
								console.log('Windowwidth!');
								};
								
							// Update scrollorama...
							// move this into new function completely that updates targetBlock.animations
										
							});
						*/
						
						//if (anim.endName == 'windowwidth') console.log('Window Width!');
						//if (anim.endName == 'windowwidth') $('#status').append('Window Width!');
						
						//if (anim.endName == 'windowwidth') console.log('Window Width!');
						
						// if above current block, settings should be at start value
						if (i > currBlockIndex) {
							if (currBlockIndex !== i-1 && anim.baseline !== 'bottomx') {
								setProperty(anim.element, anim.property, anim.startVal);
							}
							if (blocks[i].pin) {
								blocks[i].block
								.css('position', 'absolute')
								.css('top', blocks[i].top);
							}
							if (blocks[i].fix) {
								blocks[i].block
								.css('position', 'absolute')
								.css('top', blocks[i].top);
							}
						}
						
						//if (anim.property) alert(anim.property);
						
						// if below current block, settings should be at end value
						// unless on an element that gets animated when it hits the bottom of the viewport
						else if (i < currBlockIndex) {
							setProperty(anim.element, anim.property, anim.endVal);
							if (blocks[i].pin) {
								blocks[i].block
                                    .css('position', 'absolute')
                                    .css('top', (blocks[i].top + blocks[i].pin));
							}
							/*
							if (blocks[i].fix) {
								blocks[i].block
                                    .css('position', 'absolute')
                                    .css('top', (blocks[i].top + blocks[i].fix));
							}
							*/
						}
						
						// otherwise, set values per scroll position
						if (i === currBlockIndex || (currBlockIndex === i-1 && anim.baseline === 'bottom')) {
							// if block gets pinned, set position fixed
							if (blocks[i].pin && currBlockIndex === i) {
								blocks[i].block
                                    .css('position', 'fixed')
                                    .css('top', 0);
							}
							if (blocks[i].fix && currBlockIndex === i) {
								blocks[i].block
                                    .css('position', 'fixed')
                                    .css('top', 0);
							}
							
							// set start and end animation positions
							startAnimPos = blocks[i].top + anim.delay;
							if (anim.baseline === 'bottom') { startAnimPos -= $(window).height(); }
							endAnimPos = startAnimPos + anim.duration;
							
							// if scroll is before start of animation, set to start value
							if (scrollTop < startAnimPos) {
								setProperty(anim.element, anim.property, anim.startVal);
							}
							
							// if scroll is after end of animation, set to end value
							else if (scrollTop > endAnimPos) {
								setProperty(anim.element, anim.property, anim.endVal);
								if (blocks[i].pin) {
									blocks[i].block
                                        .css('position', 'absolute')
                                        .css('top', (blocks[i].top + blocks[i].pin));
								}
								/*
								if (blocks[i].fix) {
									blocks[i].block
                                        .css('position', 'absolute')
                                        .css('top', (blocks[i].top + blocks[i].fix));
								}
								*/
							}
							
							// otherwise, set value based on scroll
							else {
								//console.log('onniScrollorama');
								//if (anim.endName == 'windowwidth') console.log('Window Width!');
								// calculate percent to animate
								animPercent = (scrollTop - startAnimPos) / anim.duration;
								// account for easing if there is any
								if ( anim.easing && $.isFunction( $.easing[anim.easing] ) ) {
									animPercent = $.easing[anim.easing]( animPercent, animPercent*1000, 0, 1, 1000 );
								}
								// then multiply the percent by the value range and calculate the new value
								animVal = anim.startVal + (animPercent * (anim.endVal - anim.startVal));
								setProperty(anim.element, anim.property, animVal);
							}
						}
					}
				}
			}
			
			// update blockIndex and trigger event if changed
			if (scrollorama.blockIndex !== currBlockIndex) {
				scrollorama.blockIndex = currBlockIndex;
				onBlockChange();
			}
		}
		
		function getCurrBlockIndex(scrollTop) {
			var currBlockIndex = 0, i;
			for (i=0; i<blocks.length; i++) {
				// check if block is in view
				if (blocks[i].top <= scrollTop - scrollorama.settings.offset) { currBlockIndex = i; }
			}
			return currBlockIndex;
		}
		
		function setProperty(target, prop, val) {
			var scaleCSS, currentPosition;
			if (prop === 'rotate' || prop === 'zoom' || prop === 'scale') {
				if (prop === 'rotate') {
					target.css(browserPrefix+'transform', 'rotate('+val+'deg)');
				} else if (prop === 'zoom' || prop === 'scale') {
					scaleCSS = 'scale('+val+')';
					if (browserPrefix !== '-ms-') {
						target.css(browserPrefix+'transform', scaleCSS);
					} else {
						target.css('zoom', scaleCSS);
					}
				}
			}
			else if(prop === 'background-position-x' || prop === 'background-position-y' ) {
				currentPosition = target.css('background-position').split(' ');
				if(prop === 'background-position-x') {
					target.css('background-position',val+'px '+currentPosition[1]);
				}
				if(prop === 'background-position-y') {
					target.css('background-position', currentPosition[0]+' '+val+'px');
				}
			}
			else if(prop === 'text-shadow' ) {
				target.css(prop,'0px 0px '+val+'px #ffffff');
			} else {
				target.css(prop, val);
			}
		}
		
		
		// PUBLIC FUNCTIONS
		scrollorama.animate = function(target) {
			var targetIndex,
				targetBlock,
				anim,
				offset,
				i, j;
			/*
				target		= animation target
				arguments	= array of animation parameters
				anim		= object that contains all animation params (created from arguments)
				offset		= positioning helper for pinning
				
				animation parameters:
				delay		= amount of scrolling (in pixels) before animation starts
				duration	= amount of scrolling (in pixels) over which the animation occurs
				property	= css property being animated
				start		= start value of the property
				end			= end value of the property
				pin			= pin block during animation duration (applies to all animations within block)
				baseline	= top (default, when block reaches top of viewport) or bottom (when block first comies into view)
				easing		= just like jquery's easing functions
				
				NEW
				remote		= $() of remote object to be transformed (if not the target should be transformed)
				(pinnable	= true (pins to top, but enables roll-over))
				fix			= true (fixes to top, NEW)
			*/
			
			// if string, convert to DOM object
			if (typeof target === 'string') { target = $(target); }
			
			
			// find block of target
			for (i=0; i<blocks.length; i++) {
				if (blocks[i].block.has(target).length) {
					targetBlock = blocks[i];
					targetIndex = i;
				}
			}
			
			// add each animation to the blocks animations array from function arguments
			for (i=1; i<arguments.length; i++) {
				
				anim = arguments[i];
				
					
				
					if (anim.duration == 'windowheight') {
						anim.duration = $(window).height();
						anim.durationName = 'windowheight';
						}
					if (anim.end == 'windowwidth') {
						anim.end = $(window).width();
						anim.endName = 'windowwidth';
						}
				
					if (typeof anim.remote != 'undefined') {
						theTarget = anim.remote;
					} else {
						theTarget = target;
					}
					
					// for top/left/right/bottom, set relative positioning if static
					if (anim.property === 'top' || anim.property === 'left' || anim.property === 'bottom' || anim.property === 'right' ) {
						if (theTarget.css('position') === 'static') { theTarget.css('position','relative'); }
						// set anim.start, anim.end defaults
						cssValue = parseInt(theTarget.css(anim.property),10);
						if (anim.start === undefined) {
							anim.start = isNaN(cssValue) ? 0 : cssValue;
						} else if (anim.end === undefined) {
							anim.end = isNaN(cssValue) ? 0 : cssValue;
						}
					}
					
					// set anim.start/anim.end defaults for rotate, zoom/scale, letter-spacing
					if (anim.property === 'rotate') {
						if (anim.start === undefined) { anim.start = 0; }
						if (anim.end === undefined) { anim.end = 0; }
					} else if (anim.property === 'zoom' || anim.property === 'scale' ) {
						if (anim.start === undefined) { anim.start = 1; }
						if (anim.end === undefined) { anim.end = 1; }
					} else if (anim.property === 'letter-spacing' && theTarget.css(anim.property)) {
						if (anim.start === undefined) { anim.start = 1; }
						if (anim.end === undefined) { anim.end = 1; }
					}
					
					if (anim.baseline === undefined) {
						if (anim.pin || anim.fix || targetBlock.pin || targetBlock.fix || targetIndex === 0) {
							anim.baseline = 'top';
						} else {
							anim.baseline = 'bottom';
						}
					}
					
					if (anim.delay === undefined) { anim.delay = 0; }
					
					targetBlock.animations.push({
						element: theTarget,
						delay: anim.delay,
						duration: anim.duration,
						durationName: anim.durationName,
						property: anim.property,
						startVal: anim.start !== undefined ? anim.start : parseInt(theTarget.css(anim.property),10),	// if undefined, use current css value
						endVal: anim.end !== undefined ? anim.end : parseInt(theTarget.css(anim.property),10),			// if undefined, use current css value
						endName: anim.endName,
						baseline: anim.baseline !== undefined ? anim.baseline : 'bottom',
						easing: anim.easing
					});
					
					if (anim.pin) {
						if (targetBlock.pin < anim.duration + anim.delay) {
							offset = anim.duration + anim.delay - targetBlock.pin;
							targetBlock.pin += offset;
							
							// adjust positions of blocks below target block
							for (j=targetIndex+1; j<blocks.length; j++) {
								blocks[j].top += offset;
								blocks[j].block.css('top', blocks[j].top);
							}
						}
					}
					
					if (anim.fix) {
						if (targetBlock.fix < anim.duration + anim.delay) {
							offset = anim.duration + anim.delay - targetBlock.fix;
							targetBlock.fix += offset;
							
							// adjust positions of blocks below target block
							for (j=targetIndex+1; j<blocks.length; j++) {
								blocks[j].top += offset;
								blocks[j].block.css('top', blocks[j].top);
							}
						}
					}
						
					
					
					
			}
			
			onScrollorama();
		};
		
		// function for passing blockChange event callback
		scrollorama.onBlockChange = function(f) {
			onBlockChange = f;
		};
		
		// function for getting an array of scrollpoints
		// (top of each animation block and animation element scroll start point)
		scrollorama.getScrollpoints = function() {
			var scrollpoints = [],i,j,anim;
			for (i=0; i<blocks.length; i++) {
				scrollpoints.push(blocks[i].top);
				// go through the animations for each block
				if (blocks[i].animations.length && blocks[i].pin > 0) {
					for (j=0; j<blocks[i].animations.length; j++) {
						anim = blocks[i].animations[j];
						scrollpoints.push(blocks[i].top + anim.delay + anim.duration);
					}
				}
				if (blocks[i].animations.length && blocks[i].fix > 0) {
					for (j=0; j<blocks[i].animations.length; j++) {
						anim = blocks[i].animations[j];
						scrollpoints.push(blocks[i].top + anim.delay + anim.duration);
					}
				}
			}
			// make sure scrollpoints are in numeric order
			scrollpoints.sort(function(a,b) {return a - b;});
			return scrollpoints;
		};
		
		// Remove scrollorama
		scrollorama.destroy = function () {
			// Remove animations
			for (i=0; i<blocks.length; i++) {
				// Remove CSS rules
				blocks[i].block.css({
					top: '',
					position: ''
				});
				
				// Remove scrolloroma-specific attributes
				delete blocks[i].animations;
				delete blocks[i].top;
				delete blocks[i].pin;
				delete blocks[i].fix;
			}

			// Unbind the window scroll event
			$(window).off('scroll.scrollorama');
			$('#scroll-wrap').remove();
			
			// Remove the scrolloroma object
			delete scrollorama;
		};
		
		
		// INIT
		init();
		
		return scrollorama;
    };

	//
	//		Easing functions from jQuery UI
	//
	$.extend($.easing, {
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert($.easing.default);
			return $.easing[$.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) { return c/2*t*t + b; }
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) { return c/2*t*t*t + b; }
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) { return c/2*t*t*t*t + b; }
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) { return c/2*t*t*t*t*t + b; }
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t===0) { return b; }
			if (t===d) { return b+c; }
			if ((t/=d/2) < 1) { return c/2 * Math.pow(2, 10 * (t - 1)) + b; }
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) { return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; }
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158,p=0,a=c;
			if (t===0) { return b; }
			if ((t/=d)===1) { return b+c; }
			if (!p) { p=d*0.3; }
			if (a < Math.abs(c)) { a=c; s=p/4; }
			else{ s = p/(2*Math.PI) * Math.asin (c/a); }
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158,p=0,a=c;
			if (t===0) { return b; }
			if ((t/=d)===1) { return b+c; }
			if (!p) { p=d*0.3; }
			if (a < Math.abs(c)) { a=c; s=p/4; }
			else { s = p/(2*Math.PI) * Math.asin (c/a); }
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158,p=0,a=c;
			if (t===0) { return b; }
			if ((t/=d/2)===2) { return b+c; }
			if (!p) { p=d*(0.3*1.5); }
			if (a < Math.abs(c)) { a=c; s=p/4; }
			else { s = p/(2*Math.PI) * Math.asin (c/a); }
			if (t < 1) { return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; }
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s === undefined) { s = 1.70158; }
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s === undefined) { s = 1.70158; }
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s === undefined) { s = 1.70158; }
			if ((t/=d/2) < 1) { return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; }
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d/2) { return $.easing.easeInBounce (x, t*2, 0, c, d) * 0.5 + b; }
			return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
	});
     
})(jQuery);

Type
Location
Request & Response
Method	—
Cached	No
Status	—
Code	—