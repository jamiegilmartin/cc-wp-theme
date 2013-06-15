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