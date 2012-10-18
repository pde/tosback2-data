
$(document).ready(function(){
	var $body = $(document.body);
	//there must be one banner loaded in page source
	var createSlideshow = $("#content_1 .banner").length > 0;
	
	// Home page
	if($body.hasClass("home") && createSlideshow) {
		argos.api.slideshow.create({
			buttons : true,
			delay : argos.ecxreg("BANNER_CYCLE_RESTART_DELAY"),
			duration : 1000,
			interval : argos.ecxreg("BANNER_CYCLE_SLIDE_INTERVAL"),
			replaceContent : false,
			target : "#content_1",
			text : null,
			urls : argos.app.contentDir + "homepage/banner_slides.htm"

			/*
			done : function() {
				argos.api.hotspot.create("#banner2 img", {
						coords : "100,100,100",
						href : "http://www.argos.co.uk",
						message : {
							title : "Default hotspot",
							text : "<p>Hotspot message goes here...</p>" 
						}
					},
					{
						coords : "763,30, 1078,187",
						href : "http://www.argos.co.uk",
						message : {
							text : "<p>This is my test message</p>" 
						}
					}
				);		
			}
			*/
		});	
	}
	
	// Category Landing page
	if($body.hasClass("category") && createSlideshow) {
		argos.api.slideshow.create({
			buttons : true,
			delay : argos.ecxreg("BANNER_CYCLE_RESTART_DELAY"),
			duration : 1000,
			interval : argos.ecxreg("BANNER_CYCLE_SLIDE_INTERVAL"),
			replaceContent : false,
			target : "#content_1",
			text : null,
			urls : argos.app.contentDir + "catlanding/"+argos.app.currentCategoryId+"/banner_slides.htm"
		});
	}	
		
});
