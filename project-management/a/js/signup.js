$(document).ready(function() {
	//Top left green box
	$("#koding-logo").click(function() {
		window.location = "index.html";
	});
	
	//titles
	titles("Create a " + SITE_NAME + " Account");
	
	//Sign Up Form Button
	$("#signup").submit(function(event) {
		event.preventDefault();
		
		//Submit the form
		$.post(HOSTNAME + "signup", $(this).serialize(), function(data) {
			var tempUser = jQuery.parseJSON(data);
			
			if (tempUser.userID == 0) {
				window.location = "home.html";
			} else if (tempUser.userID == -1) {
				popup(tempUser.message);
			} else {
				window.location = "index.html";
			}
		});
	});
});

//set titles
function titles(mainTitle) {
	$("#page-title").text(mainTitle); //Page Title
	document.title = mainTitle; //Document Title
}