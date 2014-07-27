var HOSTNAME = "http://172.17.149.126:8080/db-term-project/";
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