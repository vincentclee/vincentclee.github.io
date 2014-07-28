var HOSTNAME = "json/";
var SITE_NAME = "Project Pusheen";
var POPUP_DURATION = 2000; //in ms

$(document).ready(function() {
	//Popup Close
	$(".kdnotification").click(function() {
		$(this).hide();
	});
	
	//set correct height on browser open
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	//Table Columns Overflow
	$("div.table-column").css("max-height", $(window).height() - 156);
	
	//Plugin
	$("html").fn.serializeObject;
});

//dynamically resize height
$(window).resize(function() {
	$("div.kdview .workspace").css("height", $(window).height() - 113);
	
	//Table Columns Overflow
	$("div.table-column").css("max-height", $(window).height() - 156);
});

//Popup with message
function popup(message) {
	$(".kdnotification-title").text(message);
	$(".kdnotification").show();
	$(".kdnotification").delay(POPUP_DURATION).fadeOut();
}

/*!
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Whereas .serializeArray() serializes a form into an array, .serializeObject()
// serializes a form into an (arguably more useful) object.

$.fn.serializeObject = function(){
	var obj = {};
	
	$.each( this.serializeArray(), function(i,o){
		var n = o.name,
		v = o.value;
		
		obj[n] = obj[n] === undefined ? v
				: $.isArray( obj[n] ) ? obj[n].concat( v )
						: [ obj[n], v ];
	});
	
	return obj;
};
