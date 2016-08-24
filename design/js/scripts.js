var cssTransitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

//Языковые настройки DataTables
var dataTablesLng = {
	"emptyTable":     "Нет данных",
	"info":           "Показано _START_ - _END_ из _TOTAL_",
	"infoEmpty":      "Showing 0 to 0 of 0 entries",
	"infoFiltered":   "(filtered from _MAX_ total entries)",
	"infoPostFix":    "",
	"thousands":      ",",
	"lengthMenu":     "_MENU_",
	"loadingRecords": "Загрузка...",
	"processing":     "Обработка...",
	"search":         "Поиск: ",
	"zeroRecords":    "По данному запросу записей не найдено",
	"paginate": {
	  "first":      "Первая",
	  "last":       "Последняя",
	  "next":       "<i class='fa fa-angle-right'></i>",
	  "previous":   "<i class='fa fa-angle-left'></i>"
	},
	"aria": {
	  "sortAscending":  ": activate to sort column ascending",
	  "sortDescending": ": activate to sort column descending"
	}
};
var dataTablesDom = '<"table-top">t<"row"<"col-xs-6"p><"col-xs-6 text-right"l>><"clear">';

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