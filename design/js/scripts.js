var cssTransitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

var Wow = new WOW({
	boxClass: 'wow', // default
	animateClass: 'animated', // default
	offset: 0, // default
	mobile: true, // default
	live: true // default
});

Wow.init();


//window resize
$(window).on('resize', function(){

});

//all images loaded
$(window).on('load', function(){
	if($().imParallax) $('.parallax').imParallax();
});

$(document).on('click', '.popup-img', function() {
	var src = $(this).attr('src');
	$.fancybox.open({
		type: 'image',
		href: src,
		fitToView: true,
		autoSize: true,
		width: 'false',
		height: 'false',
		padding: 0,
		helpers     : {
			overlay : {
				opacity : 0.4,
				locked: true
			}
		}
	});
});


$(document).on('click', '.order-popup', function(e) {
	e.preventDefault();
	var package = $(this).attr('href').replace('#','');
	$('#package-select').val(package);
    $.fancybox.open({
		href: '#order-package',
		fitToView: true,
		autoSize: true,
		width: false,
		height: false,
		padding: 0,
		wrapCSS: 'popup',
		closeBtn: true,
		helpers     : {
			overlay : {
				opacity : 0.4,
				locked: true
			}
		}
	});
});

$(function() {

	$('.fancybox').fancybox({
		fitToView: true,
		autoSize: true,
		width: false,
		height: false,
		padding: 0,
		wrapCSS: 'popup',
		closeBtn: true,
		helpers     : {
			overlay : {
				opacity : 0.4,
				locked: true
			}
		}
	});

	$('.counter > span').each(function(){
		var endVal = parseInt($(this).text());
		new CountUp(this,0,endVal,0,3).start();
	});

	//Google map
	//with single point
	$('.map.single').each(function(){
		var container = this;
		var latlng = new google.maps.LatLng(
		    parseFloat($(container).data('lat')),
		    parseFloat($(container).data('lng'))
		);
		var mapOptions = {
		    zoom: parseInt($(container).data('zoom')) || 17,
		    center: latlng,
		    zoomControl: true,
		    mapTypeControl: false,
		    streetViewControl: false,
		    scrollwheel: $(container).data('scroll') || false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(container, mapOptions);

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: $(container).data('marker')
		});
	});


})