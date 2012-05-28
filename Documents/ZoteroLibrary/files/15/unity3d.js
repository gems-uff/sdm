
// Google Analytics
// ==
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

try {
	var d = new Date();
	var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var indexArr = new Array(3,4,5,1,2,3,4,5,1,2,1,2);
	index = indexArr[d.getMonth()];
	period = months[d.getMonth()]+' '+d.getFullYear();
	var pageTracker = _gat._getTracker("UA-2854981-1");
	pageTracker._setAllowAnchor(true);
	pageTracker._setCustomVar( index, "Month", period, 1 );
	pageTracker._trackPageview( location.pathname + location.search + location.hash );
} catch(err) {}

// AdRoll Retargeting
// ==
adroll_adv_id = "SMJJKZV5MJCFTGSTCKQE23";
adroll_pix_id = "NDIMBWPXFJGF7LPTAXZGRG";
(function () {
	var oldonload = window.onload;
	window.onload = function(){
	__adroll_loaded=true;
	var scr = document.createElement("script");
	var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
	scr.setAttribute('async', 'true');
	scr.type = "text/javascript";
	scr.src = host + "/j/roundtrip.js";
	((document.getElementsByTagName('head') || [null])[0] ||
	document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
	if(oldonload){oldonload()}};
}());

// Remove page header background if no page header exists
// ===
if($('#page-header').length == 0){
	$('.master_wrapper').addClass('no-section-header');
}

// Check for pro feature headlines and add icon with tooltip
// ===
proHeadlines = $('.pro-feature');
if(proHeadlines.length > 0){
	$.each(proHeadlines, function(key, headline){
		headlineTemplate = '<div class="pro-feature">';
		headlineTemplate += '<h3>'+$(this).text()+'</h3>';
		headlineTemplate += '<div class="pro-icon">';
		headlineTemplate += '<a href="'+$(this).attr('data-url')+'"></a>';
		headlineTemplate += '<div class="tooltip corners3px">Learn more</div>';
		headlineTemplate += '</div>';
		headlineTemplate += '<div class="clear"></div>';
		$(this).parent().prepend(headlineTemplate);
		$(this).remove();
	});
	$('.pro-icon').hover(function(){
		$(this).find('.tooltip').stop(true, true).show().animate({ 'top': -28, 'opacity': 1 }, 300 );
		},function(){
		$(this).find('.tooltip').stop(true, false).animate({ 'top': -38, 'opacity': 0 }, 300, function(){
			$(this).hide();
		});
	});
}