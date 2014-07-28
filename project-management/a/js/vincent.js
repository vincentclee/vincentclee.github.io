var USER;

$(document).ready(function() {
	//Top left green box
	$("#koding-logo").click(function() {
		if (USER.userID == 0) {
			__projects();
		} else {
			window.location = "index.html";
		}
	});
	
	//Account Settings
	$("#account-settings").click(function() {
		$("div.kdview.group-switcher").removeClass("active"); //Close Drop Down
		__account_settings();
	});
	
	//About
	$("#about-us").click(function() {
		$("div.kdview.group-switcher").removeClass("active"); //Close Drop Down
		popup("Powered by Koding.com Inc. Open Source Bootstrap");
	});
	
	//Logout
	$("#logout").click(function() {
		USER = null;
		window.location = "index.html"; //Go to homepage
	});
	
	//Initialize
	__login();
});

//Initialize
function init() {
	//Send Cookie
	$.post(HOSTNAME + "login", function(data) {
		USER = jQuery.parseJSON(data);
		
		//Change Canvas
		if (USER.userID == -1) {
			__login();
		} else if (USER.userID == 0) {
			__accountarea();
			__projects();
		}
	});
}

//Wipe main canvas, page title, document title
function setup(page_title, document_title) {
	$("#page-title").text(page_title); //Page Title
	document.title = document_title + " | " + SITE_NAME; //Document Title
	
	//Clear Main Area
	$(".kdview .workspace").empty();
}

//Add Project to Nav Bar
function nav_adder(project_id, imageURL, project_title) {
	//Turn off All selected
	$("#main-nav > a").removeClass("running selected");
	
	//If Icon already exists turn on
	if ($("#n" + project_id).length != 0) {
		$("#n" + project_id).addClass("running selected");
		return;
	}
	
	//Number of icons in Nav Bar
	var items = $("#main-nav > a").length;
	
	//Create Nav Bar Icon
	var icon = $("<a>", {id:"n" + project_id, class:"kdview kdlistitemview kdlistitemview-main-nav"});
	$(icon).css("left", items*55); //Set position to # of items * 55
	$("<img>", {src:imageURL, height:45, width:45}).css("margin", "5px").appendTo(icon);
	$("<cite>", {text:project_title}).appendTo(icon); //Store Project Title
	$(icon).addClass("running selected");
	
	//Add a click for each div
	$(icon).on("click", function() {
		//removes all click handlers
		$(".kdview .workspace").off("click", "**");
		
		//Setup page for board
		setup($(this).find("cite").text(), $(this).find("cite").text());
		
		//Add Icon to Nav Bar
		nav_adder($(this).attr("id").substring(1), $(this).find("img").attr("src"));
		
		//Go to Kanban Board
		__board($(this).attr("id").substring(1));
	});
	
	//Attach Icon to Nav Bar
	icon.appendTo("#main-nav");
}

//Login Canvas
function __login() {
	setup("Customer Login", "Log In");
	
	//Clear Navigation Area
	$("#main-nav").empty();
	
	//Clear Account Area
	$(".account-area").empty();
	
	//Load Login Screen
	$(".kdview .workspace").load("login-p.html", function() {
		//Bind Form Button
		$(document).on("submit", "#login-form", function(event) {
			event.preventDefault();
			
			//Send Login request + Serialize the form
			$.getJSON(HOSTNAME + "user.json", $(this).serialize(), function(data) {
				USER = data;
				
				if (USER.userID == -1) {
					popup("Access Denied!");
				} else if (USER.userID == 0) {
					__accountarea();
					__projects();
				}
			});
		});
	});
}

//Account Area
function __accountarea() {
	//Load Account Area
	$(".account-area").load("account-area-p.html", function () {
		//Display Name
		$("#el-15").text(USER.displayName);
		
		//Username
		$("#el-12").text(USER.username);
		
		//Avatar
		$("#my-avatar").attr("src", USER.avatar);
		
		//Toggle User drop down menu
		$(document).on("click", "a.groups", function() {
			$(".kdview.group-switcher").toggleClass("active");
		});
		
		//Close the drop down menu
		$(document).on("click", ".kdview .application-page, .kdview .account-menu, .kdcustomscrollview, #koding-logo", function() {
			$("div.kdview.group-switcher").removeClass("active");
		});
		
		//Top Right Search Open
		$(document).on("click", "#fatih-launcher", function() {
			$(".account-area").toggleClass("search-open");
			$("div.kdview.group-switcher").removeClass("active");
		});
	});
}

//Projects Canvas
function __projects() {
	setup("My Projects", "My Projects");
	
	//Load Projects Holder
	$("<div>", {class: "tw-playgrounds"}).appendTo(".kdview .workspace");
	
	//Create Objects
	$.getJSON(HOSTNAME + "projects.json", function(projects) {
		$.each(projects, function(index, project) {
			//Create Div Block
			var div = $("<div>", {id:"p" + project.projectID, class:"tw-playground-item"});
			$("<img>", {src:project.imageURL, alt:project.title, height:115, width:115}).appendTo(div);
			$("<p>", {text:project.title}).appendTo(div);
			
			//Add a click for each div
			$(div).one("click", function() {
				//removes all click handlers
				$(".kdview .workspace").off("click", "**");
								
				//Setup page for board
				setup($(this).find("p").text(), $(this).find("p").text());
				
				//Add Icon to Nav Bar
				nav_adder($(this).attr("id").substring(1), $(this).find("img").attr("src"), project.title);
				
				//Go to Kanban Board
				__board($(this).attr("id").substring(1));
			});
			
			//Attach Div to outer
			div.appendTo(".kdview .workspace .tw-playgrounds");
		});
	});
}

//Kanban Board Canvas
function __board(project_id) {
	//Load Table
	$(".kdview .workspace").load("board-p.html", function () {
		//Populate the Table
		$.getJSON(HOSTNAME + "pId/" + project_id + ".json", function(data) {
			$.each(data, function(key, value) {
				$.each(value, function(index, element) {
					//Create Div Block
					var div = $("<div>", {id:"t" + element.taskID, class:"terminal-bottom-message"});
					$("<h1>", {text:element.title}).appendTo(div);
					
					//Add a click for each div
					$(div).one("click", function() {
						//removes all click handlers
						$(".kdview .workspace").off("click", "**");
						
						//Setup page for task
						setup($("#page-title").text(), $(this).find("h1").text() + " on " + $("#page-title").text());
						
						//Go to the Task Canvas
						__task($(this).attr("id").substring(1));
					});
					
					//Add to correct column
					div.appendTo("#" + key);
				});
			});
			
			$(".kdview .workspace").mousewheel(function(event, delta) {
				this.scrollLeft -= (delta * 30);
			});
		});
	});
}

//Task Canvas
function __task(task_id) {
	//Load Task Page
	$(".kdview .workspace").load("task-p.html", function () {
		//Populate
		$.getJSON(HOSTNAME + "tId/" + task_id + ".json", function(task) {
			//Title
			$("#tTitle").text(task.title);
			
			//Description
			var description_html = $.parseHTML(task.description);
			$("#tDescription").append(description_html);
			
			//Notes
			var task_html = $.parseHTML(task.notes);
			$("#tNotes").append(task_html);
			

			
			//Project Members
			$.getJSON(HOSTNAME + "tuId/" + task_id + ".json", function(users) {
				$.each(users, function(index, user) {
					//Create span block
					var span = $("<span>", {class:"avatarview"});
					$("<img>", {class:"avatarviewimg", src:user.avatar, alt:user.displayName, height:30, width:30}).appendTo(span);
					
					//Add a hover for each span
					$(span).hover(function() {
						//Set the tooltip with the displayName
						$("#member-tooltip").find("div").text($(this).find("img").attr("alt"));
						
						//Find the coordinates of avatar
						var x = $(this).offset().left;
						var y = $(this).offset().top;
						
						//Get the width of the tooltip with name in it
						var width = $("#member-tooltip").width();
						
						//Some PhD relational calculus bs
						$("#member-tooltip").css("top", y-30);
						$("#member-tooltip").css("left", x-(width/2)+15);
						
						//Show the tooltip
						$("#member-tooltip").show();
					}, function() {
						//Hide the tooltip
						$("#member-tooltip").hide();
					});
					
					//Attach span to Members area
					span.appendTo(".tw-users");
				});
				
				//Add members button
				var div = $("<div>", {class:"tw-add-user"});
				div.appendTo(".tw-users");
			});
		});
	});
}

//Account Settings Canvas
function __account_settings() {
	setup("Account", "Account");
	
	//Load Page
	$(".kdview .workspace").load("account-p.html", function () {
		//Populate with User info
		$("input[name='actualName']").val(USER.displayName);
		$("input[name='email']").val(USER.email);
		$("input[name='username']").val(USER.username);
		$("input[name='avatar']").val(USER.avatar);
		
		//Terms of Service
		$(document).on("click", "#tos", function() {
			setup("Terms of Service", "Terms of Service");
			$(".kdview .workspace").load("tos-p.html");
		});
		
		//Privacy Policy
		$(document).on("click", "#privacy", function() {
			setup("Privacy Policy", "Terms of Service");
			$(".kdview .workspace").load("privacy-p.html");
		});
		
		//Save Changes Form Button
		$("#save-changes").submit(function(event) {
			event.preventDefault();
			
			//Submit the form
			var tempUser = JSON.stringify($(this).serializeArray());
			
			if (tempUser.userID == 0) {
				USER = tempUser;
				
				popup(USER.message);
				
				//Display Name
				$("#el-15").text(USER.displayName);
				
				//Username
				$("#el-12").text(USER.username);
				
				//Avatar
				$("#my-avatar").attr("src", USER.avatar);
				
				//Re-Populate with User info
				$("input[name='actualName']").val(USER.displayName);
				$("input[name='email']").val(USER.email);
				$("input[name='avatar']").val(USER.avatar);
			}
		});
	});
}