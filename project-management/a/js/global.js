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
 * jQuery viewportOffset - v0.3 - 2/3/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Like the built-in jQuery .offset() method, but calculates left and top from
// the element's position relative to the viewport, not the document.

(function($){
  '$:nomunge'; // Used by YUI compressor.
  
  var win = $(window);
  
  $.fn.viewportOffset = function() {
    var offset = $(this).offset();
    
    return {
      left: offset.left - win.scrollLeft(),
      top: offset.top - win.scrollTop()
    };
  };
  
})(jQuery);
