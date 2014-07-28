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
		var tempUser = $(this).serializeObject();
		
		USER = "{'userID':0,'username':'','email':'','displayName':'','avatar':''}";
		
		USER.displayName = tempUser.name;
		USER.email = tempUser.email;
		USER.username = tempUser.username;
		USER.avatar = tempUser.avatar;
		
		//Go to Home Screen
		window.location = "home.html";
	});
});

//set titles
function titles(mainTitle) {
	$("#page-title").text(mainTitle); //Page Title
	document.title = mainTitle; //Document Title
}