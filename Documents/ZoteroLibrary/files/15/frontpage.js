// Hero rotation
//
var t;
var speed = 14000;
var blured = false;
var current;
var hashed;
var running;

$(function() {

	// Initial page load
	if(document.location.hash){
		hash = document.location.hash.split('#');
		slide = hash[1];
		hashed = true;
		loadSlide(slide,true);
	} else {
		slide = $('#hero-content div:first').attr('id').replace('-content','');
		loadSlide(slide);
	}
	current = slide;

	// Hero tab click event
	$('#hero-tabs a').click(function(e) {
		clearTimeout(t);
		slide = $(this).attr('id').replace('tab-','');
		if(slide == current) return false;
		$('#hero-tabs li').removeClass('selected');
		$(this).parent().addClass('selected');
		hashed = true;
		loadSlide(slide,true);
	});

	// Keyboard controls
	$(document).keydown(function(e){
		clearTimeout(t);
		if(!running){
			// Find next slide
			nextSlide = $('#'+current+'-content').next();
			if(nextSlide.length == 0){
				nextSlide = $('#hero-content div:first').attr('id').replace('-content','');
			} 
			else {
				nextSlide = nextSlide.attr('id').replace('-content','');
			}
			// Find previous slide
			prevSlide = $('#'+current+'-content').prev();
			if(prevSlide.length == 0){
				prevSlide = $('#hero-content div.content:last').attr('id').replace('-content','');
			}
			else {
				prevSlide = prevSlide.attr('id').replace('-content','');
			}
			// Left arrow press
			if(e.keyCode == 37){
				loadSlide(prevSlide,true);
				document.location.hash = current;
			}
			// Right arrow press
			if(e.keyCode == 39){
				loadSlide(nextSlide,true);
				document.location.hash = current;
			}
			
		}
	});

});


function loadSlide(slide,stop){
	
	running = true;
	
	// If slide doesn't exists select first one and start slideshow
	if($('#'+slide+'-content').length == 0){
		slide = $('#hero-content div:first').attr('id').replace('-content','');
		stop = false;
	}
	
	// Hide and show
	$('#'+current+'-content').fadeOut(300);
	$('#'+slide+'-content').fadeIn(300);
	$('#'+current+'-bg').fadeOut(300);
	$('#'+slide+'-bg').fadeIn(300, function(){
		running = false;
	});
	
	// Thumb select
	$('#hero-tabs li').removeClass('selected');
	$('#tab-'+slide).parent().addClass('selected');

	// Find next slide
	nextSlide = $('#'+slide+'-content').next();
	if(nextSlide.length == 0){
		nextSlide = $('#hero-content div:first').attr('id').replace('-content','');
	} 
	else {
		nextSlide = nextSlide.attr('id').replace('-content','');
	}
	current = slide;

	if(!stop){
		t = setTimeout('loadSlide(nextSlide)', speed);
	}
	
}

// Blur and focus events
$(window).bind('blur', function(){
	blured = true;
	clearTimeout(t);
});

$(window).bind('focus', function(){ 
	if(blured && !hashed){
		t = setTimeout('loadSlide(nextSlide)', speed);
	}
});


// Lastes news scroll
//
$(function() {

	var $el	= $('#jp-container').jScrollPane({
		verticalGutter : -16
	}),

	extensionPlugin = {

		extPluginOpts : {
			mouseLeaveFadeSpeed	: 250,
			mouseEnterFadeSpeed	: 250,
			hovertimeout_t			: 1000,
			useTimeout					: false,
			deviceWidth					: 980
		},
		hovertimeout		: null,
		isScrollbarHover: false,
		elementtimeout	: null,
		isScrolling			: false,

		addHoverFunc : function(){

			if( $(window).width() <= this.extPluginOpts.deviceWidth ) return false;

			var instance = this;
			$.fn.jspmouseenter = $.fn.fadeIn;
			$.fn.jspmouseleave = $.fn.fadeOut;
			var $vBar = this.getContentPane().siblings('.jspVerticalBar').hide();

			$el.bind('mouseenter.jsp',function() {
				$vBar.stop( true, true ).jspmouseenter(instance.extPluginOpts.mouseEnterFadeSpeed || 0);

				if( !instance.extPluginOpts.useTimeout ) return false;

				clearTimeout( instance.hovertimeout );
				instance.hovertimeout = setTimeout(function() {
					if( !instance.isScrolling )
						$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
				}, instance.extPluginOpts.hovertimeout_t );

			}).bind('mouseleave.jsp',function() {
				if( !instance.extPluginOpts.useTimeout )
					$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
				else {
				clearTimeout( instance.elementtimeout );
				if( !instance.isScrolling )
						$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
				}

			});

			if( this.extPluginOpts.useTimeout ) {

				$el.bind('scrollstart.jsp', function() {
					clearTimeout( instance.hovertimeout );
					instance.isScrolling = true;
					$vBar.stop( true, true ).jspmouseenter();
				}).bind('scrollstop.jsp', function() {
					clearTimeout( instance.hovertimeout );
					instance.isScrolling = false;
					instance.hovertimeout = setTimeout(function() {
						if( !instance.isScrollbarHover )
							$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
					}, instance.extPluginOpts.hovertimeout_t );
				});

				var $vBarWrapper	= $('<div/>').css({
					position	: 'absolute',
					left			: $vBar.css('left'),
					top				: $vBar.css('top'),
					right			: $vBar.css('right'),
					bottom		: $vBar.css('bottom'),
					width			: $vBar.width(),
					height		: $vBar.height()
				}).bind('mouseenter.jsp',function() {

					clearTimeout( instance.hovertimeout );
					clearTimeout( instance.elementtimeout );

					instance.isScrollbarHover = true;

					instance.elementtimeout = setTimeout(function() {
						$vBar.stop( true, true ).jspmouseenter();
					}, 100 );

				}).bind('mouseleave.jsp',function() {
					clearTimeout( instance.hovertimeout );
					instance.isScrollbarHover = false;
					instance.hovertimeout = setTimeout(function() {
						if( !instance.isScrolling )
							$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
					}, instance.extPluginOpts.hovertimeout_t );
				});

				$vBar.wrap( $vBarWrapper );
			}
		}
	},

	jspapi = $el.data('jsp');
	$.extend( true, jspapi, extensionPlugin );
	jspapi.addHoverFunc();

});

// Newsletter Signup
//
var def = 'Enter your email here…';
var email = $('#email');
var rege = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function CheckAnnounceForm(form){
	if(email.attr('value') == '' || email.attr('value') == def || !rege.test(email.val())){
		alert("To receive news from us, you can enter your email address here.");
		email.focus();
		return false;
	} else {
		alert("Thanks… we will be notifying you of interesting things in the future.\n\nRemember to check out the forums too. It's a great way to connect to our great community.");
		return form.submit();
	}
}
$(document).ready(function(){
	email.focus(function(){
		if(email.attr('value') == def){
			email.attr('value','');
			email.css('color','#444');
		}
	});
	email.blur(function(){
		if(email.attr('value') == ''){
			email.attr('value', def);
			email.css('color','#999');
		}
	});
});